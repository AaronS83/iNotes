import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';

const Signup = () => {
    const [addDetails, setAddDetails] = useState({name:"", email:"", password:""})
    let history = useNavigate();
    const onChange = (e) => {
        setAddDetails({ ...addDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: addDetails.name, email:addDetails.email, password: addDetails.password}),
          });
          const json = await response.json()
          console.log(json)

          if(json.success)
          {
            // save auth token and redirect if the value is right
            localStorage.setItem('token', json.authToken)
            history("/")
          }
          else
          {
            if (Array.isArray(json.errors)) {
                alert(json.errors[0].msg); // Display first validation error message
            } else {
                alert(json.error);
            }
          }
    }

    return (
        <div className="mt-3">
            <h2 > Enter Your New Credentials</h2>
            <h6> (Do not forget them)</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row my-4">
                    <label htmlFor="staticname" className="col-sm-2 col-form-label">Enter your name/userName</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={onChange} id="name" name='name' value={addDetails.name} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Enter your Email ID</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={onChange} id="email" name='email' value={addDetails.email} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Enter a secure Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" onChange={onChange} id="password" name='password' value={addDetails.password} />
                    </div>
                </div>
            <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
            </form>
        </div>
    )
}

export default Signup
