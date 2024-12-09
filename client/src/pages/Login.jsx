import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { storeTokenInLS, userAuthentication } = useAuth();
    const URL = "http://localhost:5000/api/auth/login";

    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        // alert(user);
        console.log(user);
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if(response.ok){
                alert("Login Successful");

                const res_data = await response.json();
                //storing token in local storage
                // localStorage.setItem("token", res_data.token);
                storeTokenInLS(res_data.token);

                setUser({
                    email: "",
                    password: "",
                });
                navigate("/");
            }
            else{
                alert("Login Failed");
                console.log("Invalid Credentials", response);
            }
        } catch (error) {
            console.log("login ", error);
        }
    };

    return<>
        <section>
            <main>
                <div className="section-login">
                    <div className="container grid grid-two-cols">

                        <div className="login-image">
                            <img 
                                src="/public/LEGENDS.png"
                                alt="Login Form"
                                width="400"
                                height="400"
                            />
                        </div>

                        <div className="login-form">
                            <h1 className="main-heading mb-3">Login Form</h1>

                            <br/>

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email">email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        id="email"
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password">password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        id="password"
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                </div>

                                <br/>

                                <button type="submit" className="btn btn-submit">Login</button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </section>
    </>
        
};