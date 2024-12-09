import {createContext, useContext, useState, useEffect} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    
    const storeTokenInLS = (servertoken) => {
        setToken(servertoken);
        return localStorage.setItem("token", servertoken);
    };

    let isLoggedIn = !!token;
    console.log("isLoggedIn: ", isLoggedIn);

    //Logout fucntionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    //JWT athentication - to get currently loggedin user
    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", 
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            console.log("Response status: ", response.status); // Log response status

            if(response.ok){
                const data = await response.json();
                console.log("User data (client): ", data.userData); // Log user data on the client side
                setUser(data.userData);
            } else {
                console.error("Failed to fetch user data: ", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user data: ", error);
        }
    };

    useEffect(() => {
        if (token) {
            userAuthentication();
        }
    }, [token]);

    return <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user, userAuthentication}}>
            {children}
     </AuthContext.Provider>    
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    return authContextValue;
};