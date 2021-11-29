import React, { useEffect, useState } from "react"
import { GlobalCtx } from "../App"
import { useContext } from "react"

function Show(props) {

    const { gState, setGState } = useContext(GlobalCtx)

    const id = props.match.params.id

    const [editForm, setEditForm] = useState({})

    if (!gState.jobs){
        return <h1> NO JOBS</h1>
    }
    const job = gState.jobs.find((singleJob) => {
        console.log(singleJob._id, id)
        return singleJob._id === id
    })



    const handleChange = (event) => {
        setEditForm({...editForm, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.updateJob(editForm, job._id)
        props.history.push("/")
    }

    const removeJob = () => {
        props.deleteJob(job._id)
        props.history.push("/")
    }


    return (
        <div>

            <div className="showjob">
            
            <h1>{job.title} - {job.company}</h1>
            <p>{job.location}</p>
            <p><a href={job.url}>{job.url}</a></p>
            <p>{job.status}</p>

            {/* <h1>{job.title} - {job.company}</h1>
            <p>{job.location}</p>
            <p><a href={job.url}>{job.url}</a></p>
            <p>Status: {job.status}</p> */}
            </div>

            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="title" value={editForm.title} onChange={handleChange} />

                <input type="text" name="company" placeholder="company" value={editForm.company} onChange={handleChange} />

                <input type="text" name="location" placeholder="location" value={editForm.location} onChange={handleChange} />

                <input type="text" name="url" placeholder="url" value={editForm.url} onChange={handleChange} /><br />

                <input type="text" name="status" placeholder="status" value={editForm.status} onChange={handleChange} />
                <select id = "status-select" value={editForm.status} name="status"
        //   placeholder="Status"
        >
                <option value="">--Please choose an option--</option>
                <option value="applied">Applied</option>
                <option value="In Process">In Process</option>
                <option value="Offer Extended/Rejected">Offer Extended/Rejected</option>
                <option value="Offer Extended/Accepted">Offer Extended/Accepted</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
            </select> 
            <br></br>

            <input type="submit" value="Update Job" />
            <br></br>

            </form>
            <button className="delete" onClick={removeJob} id="delete">Delete this Job</button>


        </div>
    )
}

export default Show;