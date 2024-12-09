import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";


export const Register = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(user);
        console.log(user);
        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if(response.ok){
                const res_data = await response.json();
                console.log("response from server: ", res_data);

                //storing token in local storage
                // localStorage.setItem("token", res_data);
                storeTokenInLS(res_data.token);

                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: ""
                });
                navigate("/login");
            }
            console.log(response);
        } 
        catch (error) {
            console.log("register ", error);
        }
        
    };

    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img 
                            src="/public/register.png" 
                            alt="Registration Form" 
                            width="400"
                            height="400"
                            />
                        </div>
                        
                        {/* REGISTRATION_FORM */}
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Registation Form</h1>

                            <br/>

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input 
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        id="username"
                                        required
                                        autoComplete="off"
                                        value={user.username}
                                        onChange={handleInput}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email">email</label>
                                    <input 
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        id="email"
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone">phone</label>
                                    <input 
                                        type="number"
                                        name="phone"
                                        placeholder="enter phone number"
                                        id="phone"
                                        required
                                        autoComplete="off"
                                        value={user.phone}
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

                                <br />

                                <button type="submit" className="btn btn-submit">Register Now</button>

                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
};