import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="flex-column" style={{ width: 320 }}>

                    <div className="text-center">
                        <img className="mb-4" src="/logo.png" height="50" alt="" />
                        <p className="text-muted">Register an account.</p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setLoading(true);

                            fetch("/api/auth/register", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    username: e.currentTarget.username.value,
                                    password: e.currentTarget.password.value,
                                    fullname: e.currentTarget.fullname.value,
                                    email: e.currentTarget.email.value,
                                    image: ""
                                }),
                            }).then(async (res) => {
                                setLoading(false);
                                if (res.status === 200) {
                                    console.log("Account created! Redirecting to login...");
                                    setTimeout(() => {
                                        router.push("/login");
                                    }, 2000);
                                } else {
                                    console.error(await res.text());
                                }
                            });

                        }}>
                        <div className=" mb-3">
                            <input className="form-control" type="text" id="username" name="username" placeholder="Username" />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="password" id="password" name="password" placeholder="Password" />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="text" id="fullname" name="fullname" placeholder="Your fullname" />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="email" id="email" name="email" placeholder="Your email address" />
                        </div>
                        <button className="w-100 btn btn-primary" type="submit">

                            {loading ? (
                                <>Working...</>
                            ) : (
                                <>Sign Up</>
                            )}
                        </button>
                    </form>
                    <p >
                        Already have an account?{" "}
                        <Link href="/login" >
                            Sign in
                        </Link>{" "}
                        instead.
                    </p>
                </div>
            </div>
        </div>
    );
}

// Return the page without additional layout.
Register.getLayout = (page: ReactElement) => page