import React from "react";
import {Link} from "react-router-dom"
import { GlobalCtx } from "../App"
import { useContext } from "react"

const Header =(props) =>{

    const {gState, setGState} = useContext(GlobalCtx) 

    const logout =(  <Link to="/Login"><button className="toggle-btn" onClick={()=>{
        window.localStorage.removeItem("token")
        setGState({...gState, token: null})
    }}>Logout</button></Link>)

    return (<nav>
        <Link to="/signup"><button className="toggle-btn">Signup</button></Link>
        <Link to="/login"><button className="toggle-btn">Login</button></Link>
        {gState.token ? logout : null }
    </nav>)
}

export default Header