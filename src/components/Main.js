import React, { useEffect, useState } from "react"
import { GlobalCtx } from "../App"
import { useContext } from "react"
import { Route, Switch } from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"
import Applied from "../pages/Applied"

const Main = (props) => {

const { gState, setGState } = useContext(GlobalCtx)
const { url, token} = gState

const [jobs, setJobs] = useState(null)
const [appliedJobs, setAppliedJobs] = useState(null)
const [firstLoad, setFirstLoad] = useState(true)

// useEffect(()=>{

// })

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
    setGState({...gState, jobs: data})
}

const getAppliedJobs = async ()=>{
    const response = await fetch(url + "/appliedjob", {
        method: "get",
        headers: {
            Authorization: "bearer " + token
        }
    })
    const applieddata = await response.json()
    console.log(applieddata)
    setAppliedJobs(applieddata)
    setGState({...gState, appliedJobs: applieddata})
}


useEffect(()=>{
   if(firstLoad){ 
       getJobs()
       getAppliedJobs()
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
}

const createAppliedJob =  (oneJob) =>{
    console.log(oneJob)
      fetch(url + "/appliedjob/", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token
        },
        body: JSON.stringify(oneJob),
    })
    .then(response => response.json())
        .then(applieddata =>  {
            getAppliedJobs()
        })
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

const updateAppliedJob = async (oneJob, id) =>{
  
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
            getAppliedJobs()
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

const deleteAppliedJob = async (id) =>{

    await fetch(url + "/appliedjob/" + id, {
    method: "delete",
    headers: {
        
        "Authorization": "bearer " + token
    },
    
})
.then(response => response.json())
    .then(data =>  {
        getAppliedJobs()
    })
}


return (

<main>
        <Switch>
            
            <Route exact path="/">
                <Index jobs={jobs} setJobs={setJobs} appliedJobs={appliedJobs} setAppliedJobs={setAppliedJobs} createJob={createJob} createAppliedJob={createAppliedJob}/>
            </Route>
            <Route path="/job/:id" 
            render={(rp) => ( jobs ?
                <Show 
                {...rp}
                jobs={jobs}
                updateJob={updateJob}
                deleteJob={deleteJob}
                />
                : null    
            )}
            />
            <Route path="/appliedjob/:id" 
            render={(rp) => ( appliedJobs ?
                <Applied 
                {...rp}
                appliedJobs={appliedJobs}
                updateAppliedJob={updateAppliedJob}
                deleteAppliedJob={deleteAppliedJob}
                />
                : null    
            )}
            />
        
        </Switch>
    </main>

)
}


export default Main