import React, { useEffect, useState } from "react"
import { GlobalCtx } from "../App"
import { useContext } from "react"
import { Route, Switch } from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"

const Main = (props) => {

const { gState, setGstate } = useContext(GlobalCtx)
const { url, token} = gState

const [jobs, setJobs] = useState(null)
const [firstLoad, setFirstLoad] = useState(true)

useEffect(()=>{

})

const getJobs = async ()=>{
    const response = await fetch(url + "/job", {
        method: "get",
        headers: {
            Authorization: "bearer " + token
        }
    })
    const data = await response.json()
    console.log(data)
    setJobs(data)
}


useEffect(()=>{
   if(firstLoad){ 
       getJobs()
       setFirstLoad(false)
   } 
    console.log(jobs)
 }, [firstLoad])

const createJob =  (oneJob) =>{
  
    console.log(oneJob)
      fetch(url + "/job/", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token
        },
        body: JSON.stringify(oneJob),
    })
    .then(response => response.json())
        .then(data =>  {
            getJobs()
        })
    
//    getJobs()
}

const updateJob = async (oneJob, id) =>{
  
    await fetch(url + id, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token
        },
        body: JSON.stringify(oneJob)
    })
  
    .then(response => response.json())
        .then(data =>  {
            getJobs()
        })
}

const deleteJob = async (id) =>{
  
  
     await fetch(url + "/job/" + id, {
        method: "delete",
        headers: {
            
            "Authorization": "bearer " + token
        },
        
    })
    .then(response => response.json())
        .then(data =>  {
            getJobs()
        })
    }

console.log({jobs})
// 


return (

<main>
        <Switch>
            <Route exact path="/">
                <Index jobs={jobs} createJob={createJob}/>
            </Route>
            <Route exact path="/job/:id" 
            render={(rp) => 
                <Show 
                {...rp}
                jobs={jobs}
                updateJob={updateJob}
                deleteJob={deleteJob}
                />

                
            }
            />
                
            
        </Switch>
    </main>

)
}


export default Main