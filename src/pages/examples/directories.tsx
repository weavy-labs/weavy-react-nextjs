import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";

interface DirectoryProps {
  name: string;
  id: number;
  member_count: number;
}

interface UserListItemProps extends User {
  directories: DirectoryProps[];
  current_directory: string;
}

const UserListItem = ({
  id,
  name,
  email,
  directories,
  current_directory,
}: UserListItemProps) => {
  const [currentDirectory, setDirectory] = useState(current_directory);

  const handleDirectoryChange = async (e: any) => {
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        directory: e.target.value,
      }),
    });

    setDirectory(e.target.value);
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <p className="font-weight-bold"> {name} </p>

        <p className="font-weight-bold"> {email} </p>

        <div className="d-flex flex-column">
          <label className="mb-2" htmlFor="directory">
            Directory
          </label>

          <select value={currentDirectory} onChange={handleDirectoryChange}>
            {directories.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

interface test extends DirectoryProps {
  directories: DirectoryProps[];
}

const Directory = ({ id, name, member_count, directories }: test) => {
  const [directoryUsers, setDirectoryUsers] = useState<User[] | null>(null);

  useEffect(() => {
    (async () => {
      const req = await fetch(`/api/directory?directory_id=${id}`);

      if (req.ok) {
        const { data } = await req.json();

        setDirectoryUsers(data);
      }
    })();
  }, [id]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <p className="font-italic"> #{id} </p>
        <p className="font-weight-bold"> {name} </p>
        <p className="badge badge-primary badge-pill">
          {" "}
          {member_count} members{" "}
        </p>
      </div>

      <hr />

      <ul className="list-group list-group-flush">
        {!directoryUsers ? (
          <p> Loading All Users In {name} </p>
        ) : (
          directoryUsers?.map((user) => (
            <li
              className="list-group-item list-group-item-action"
              key={user.id}
            >
              <UserListItem
                {...user}
                current_directory={name}
                directories={directories}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const Directories = () => {
  const [availableDirectories, setAvailableDirectories] = useState<
    DirectoryProps[] | null
  >(null);

  useEffect(() => {
    (async () => {
      const req = await fetch("/api/directory");

      if (req.ok) {
        const { data } = await req.json();

        setAvailableDirectories(data);
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <div>
        <h3>Directories API</h3>
        <p>
          Example that shows how to group Weavy users through{" "}
          <a href="https://www.weavy.com/docs/reference/web-api/directories">
            directories
          </a>{" "}
          via the Web API.
        </p>
      </div>
      <br />

      <div className="mt-12">
        <div className="d-flex  justify-content-between">
          <h4>Available Users In Directories</h4>
        </div>
        <hr />

        <ul className="list-group">
          {!availableDirectories ? (
            <p> Loading All Directories </p>
          ) : (
            availableDirectories?.map((directory) => (
              <li
                className="list-group-item list-group-item-action"
                key={directory.id}
              >
                <Directory {...directory} directories={availableDirectories} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Directories;
