import React from 'react'
import { useState , useEffect} from "react"
import Header from './components/Header';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Main from "./components/Main"
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import logo from "./images/jobpuglogo.png" 
//

export const GlobalCtx = React.createContext(null)



function App() {

  const [gState, setGState] = useState({url: "https://jobpug.herokuapp.com/", token: null})

  useEffect(()=>{
    const token = JSON.parse(window.localStorage.getItem("token"))
    console.log(token)
    if (token){
      setGState({...gState, token: token.token})
    }
  },[])

  

  return (
    <GlobalCtx.Provider value={{gState, setGState}}>
    <div className="App">
      <Link to="/"><h1><img className="logo" src={logo} alt=" "></img></h1></Link>
      <Header />
      {gState.token ? <Main/> : <Home />}
        <Switch>
          {/* <Route exact path="/" render={(rp) => gState.token ? <Main/> : <Home />}/> */}
          <Route path="/signup" render={(rp) => <Signup {...rp}/>}/>
          <Route path="/login" render={(rp) => <Login {...rp}/>}/>
          {/* <Route path="/job/:id" render={(rp) => <Show {...rp}/>}/> */}
        </Switch>
     
    </div>
     </GlobalCtx.Provider>
  );
}

////
export default App;
