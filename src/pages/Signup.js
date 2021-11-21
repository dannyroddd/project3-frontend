import React, { useState } from "react";
import { GlobalCtx } from "../App"
import { useContext } from "react"

const Signup =(props) =>{

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

         //signup
        fetch(`${url}/auth/signup`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setForm(blankForm)
            props.history.push("/login")
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={form.username} onChange={handleChange}/>
                <input type="password" name="password" value={form.password} onChange={handleChange}/>
                <input type="submit" value="signup"/>
            </form>
        </div>
    )
}

export default Signup 