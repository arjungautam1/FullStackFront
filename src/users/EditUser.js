import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const EditUser = () => {
    //1.input lai store garnu parxa
    //let's make object
    let navigate = useNavigate();

    // we want to access the parameters of the current route
    const {id} =useParams()

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
    });

    const { name, username, email } = user;

    const onInputChange = (e) => {
        //spread operator (since we are giving only name field)
        //new update will keep on adding
        setUser({ ...user, [e.target.name]: e.target.value });
        //check in components
    };

    useEffect(()=>{
        loadUser()
    },[])

    const onSubmit = async (e) => {
        e.preventDefault();
        //backtick character (template character)
        await axios.put(`http://localhost:8080/user/${id}`, user);
        navigate("/");
    };


    // Added Part in Edit
    const loadUser  = async () => {
        const result=await axios.get(`http://localhost:8080/user/${id}`)
        setUser(result.data)
    }

    return (
        <div className="container">
            <div className="row">
                {/*col-md-6 : colums of medium size with 6 span */}
                <div
                    className={
                        "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"
                    }
                >
                    <h2 className={"text-center m-4"}>Edit User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className={"mb-3"}>
                            <label htmlFor={"Name"} className={"form-label"}>
                                Name
                            </label>
                            <input
                                type={"text"}
                                className={"form-control"}
                                placeholder={"Enter your name"}
                                name={"name"}
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor={"Name"} className={"form-label"}>
                                UserName
                            </label>
                            <input
                                type={"text"}
                                className={"form-control"}
                                placeholder={"Enter your username"}
                                name={"username"}
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor={"Name"} className={"form-label"}>
                                Email
                            </label>
                            <input
                                type={"text"}
                                className={"form-control"}
                                placeholder={"Enter your email"}
                                name={"email"}
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type={"submit"} className={"btn btn-success"}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
