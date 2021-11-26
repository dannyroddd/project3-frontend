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

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    const handleSubmit = (event) => {
        event.preventDefault()

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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Log in</h2>
                <input type="text" name="username" placeholder="Enter Username"value={form.username} onChange={handleChange}/>
                <input type="password" name="password" value={form.password} placeholder="Enter Password" onChange={handleChange}/><br/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default Login 