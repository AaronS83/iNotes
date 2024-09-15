import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()
        console.log(json)

        if (json.success) {
            //save auth token and redirect if the value is right
            localStorage.setItem('token', json.authToken)
            history("/")
        }
        else {
            alert("Invalid creds");
        }
    }

    return (
        <div className="mt-3">
            <h2 > Enter The Correct Credentials</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row my-4">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="email" value={credentials.email} name="email" onChange={onChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={credentials.password}
                            name="password"
                            onChange={onChange}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mb-3 my-4" >
                    Submit creds
                </button>
            </form>
        </div>
    );
};

export default Login;
