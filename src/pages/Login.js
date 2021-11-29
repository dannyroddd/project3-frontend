import React, { useState } from "react";
import { GlobalCtx } from "../App"
import { useContext } from "react"

const Login =(props) =>{

    const {gState, setGState} = useContext(GlobalCtx)
    const {url} = gState

    const blankForm = {
            username: "",
            password: ""
    }

    const [form, setForm] = useState(blankForm)
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        const error = validate(form)
        if (error.username || error.password){
            console.error(error)
            setErrors(error)
            return 0
        }

        const {username, password} = form

         //Login
        fetch(`${url}/auth/login`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            window.localStorage.setItem("token", JSON.stringify(data))
            setGState({...gState, token: data.token})
            setForm(blankForm)
            props.history.push("/")
        })
    }

    const validate = (value) => {
        let error = {}
        if(!value.username.trim()) {
            error.username = "Username is required"
        }
        if(!value.password) {
            error.password = "Password is required"       
        } 
        return error
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Log in</h2>
                <input type="text" name="username" placeholder="Enter Username"value={form.username} onChange={handleChange}/>
                <p className="errormessage">{errors.username}</p>
                <input type="password" name="password" value={form.password} placeholder="Enter Password" onChange={handleChange}/><br/>
                <p className="errormessage">{errors.password}</p><br/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default Login 