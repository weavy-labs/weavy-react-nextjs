import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="flex-column" style={{ width: 320 }}>

                    <div className="text-center">
                        <img className="mb-4" src="/logo.png" height="50" alt="" />
                        <p className="text-muted">Sign in to get access to your account.</p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setLoading(true);

                            signIn("credentials", {
                                redirect: false,
                                username: e.currentTarget.username.value,
                                password: e.currentTarget.password.value,
                                // @ts-ignore
                            }).then(({ ok, error }) => {                                
                                setLoading(false);
                                if (ok) {
                                    router.push("/");
                                } else {
                                    console.error(error);
                                }
                            });

                        }}>
                        <div className=" mb-3">
                            <input className="form-control" type="text" id="username" name="username" placeholder="Username" />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="password" id="password" name="password" placeholder="Password" />
                        </div>
                        <button className="w-100 btn btn-primary" type="submit">

                            {loading ? (
                                <>Working...</>
                            ) : (
                                <>Sign In</>
                            )}
                        </button>
                    </form>
                    <p>
                        Don&apos;t have an account?{" "}
                        <Link href="/register">
                            Sign up
                        </Link>{" "}
                        now.
                    </p>
                </div>
            </div>
        </div>
    )
}

// Return the page without additional layout.
Login.getLayout = (page: ReactElement) => page