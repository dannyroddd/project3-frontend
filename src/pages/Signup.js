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
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()   
        // setErrors(validate(form))
        const error = validate(form)
        setIsSubmit(true)

        if (error.username || error.password){
            console.error(error)
            setErrors(error)
            return 0
        }

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

    const validate = (value) => {
        let error = {}
        if(!value.username.trim()) {
            error.username = "Username is required"
        }
        if(!value.password) {
            error.password = "Password is required"       
        } else if (value.password.length < 5){
            error.password = "Password needs to be 5 characters or more"
        }
        return error
    }


    return (
        <div>
            <form id="signup" onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <input type="text" name="username" placeholder="Enter Username" value={form.username} onChange={handleChange}/>
                <p>{errors.username}</p>
                <input type="password" name="password" value={form.password} placeholder="Enter Password" onChange={handleChange}/>
                <p>{errors.password}</p><br/>
                <input type="submit" value="Signup"/>
            </form>
        </div>
    )
}

export default Signup 



