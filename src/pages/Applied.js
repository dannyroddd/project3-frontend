import React, { useEffect, useState } from "react"
import { GlobalCtx } from "../App"
import { useContext } from "react"

function Applied(props) {

    const { gState, setGState } = useContext(GlobalCtx)

    const id = props.match.params.id

    const [editForm, setEditForm] = useState({})

    if (!gState.appliedJobs){
        return <h1> NO JOBS</h1>
    }
    const appliedJob = gState.appliedJobs.find((singleJob) => {
        console.log(singleJob._id)
        return singleJob._id === id
    })

    const handleChange = (event) => {
        setEditForm({...editForm, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.updateAppliedJob(editForm, appliedJob._id)
        props.history.push("/")
    }

    const removeJob = () => {
        props.deleteAppliedJob(appliedJob._id)
        props.history.push("/")
    }

    return (
        <div>
            <h1>{appliedJob.title}</h1>
            <h3>{appliedJob.company}</h3>
            <h3>{appliedJob.location}</h3>
            <h3>Status: {appliedJob.status}</h3>
            <h4><a href={appliedJob.url}>{appliedJob.url}</a></h4>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="title" value={editForm.title} onChange={handleChange} />

                <input type="text" name="company" placeholder="company" value={editForm.company} onChange={handleChange} />

                <input type="text" name="location" placeholder="location" value={editForm.location} onChange={handleChange} />

                <input type="text" name="url" placeholder="url" value={editForm.url} onChange={handleChange} /><br />

                <label>Select Status:   </label>
                <select name="status" value={editForm.status} onChange={handleChange}>
                <option value="applied">Applied</option>
                <option value="In Process">In Process</option>
                <option value="Offer Extended/Rejected">Offer Extended/Rejected</option>
                <option value="Offer Extended/Accepted">Offer Extended/Accepted</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                    </select> 
                <br></br>
                <input class="showbutton" type="submit" value="Update Job" />
                <br></br>
                <button class="showbutton" onClick={removeJob} id="delete">Delete</button>
                    </form>
                        </div>
    )
}

export default Applied;