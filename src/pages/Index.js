// import React from "react"
import { useState } from "react";
import { Link } from "react-router-dom"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

function Index(props) {

  // state to hold formData
  const [newForm, setNewForm] = useState({
    title: "",
    company: "",
    url: "",
    date:"",
    location:"",
    status:"",
  });


  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  // handle submit function for form

  const handleWishlistSubmit = (event) => {
    event.preventDefault();
      props.createJob(newForm);
    setNewForm({
        title: "",
        company: "",
        url: "",
        date:"",
        location:"",
        status:"",
  })};
  const handleAppliedSubmit = (event) => {
    event.preventDefault();
      props.createAppliedJob(newForm);
    setNewForm({
        title: "",
        company: "",
        url: "",
        date:"",
        location:"",
        status:"",
  })};

  // loaded function
  const loaded = () => { 

      const onDragEnd = (result) => {
        const {source, destination} = result;
        console.log(result)
        if(!destination) {
          return;
        }
        if(destination.draggableId === source.draggableId && destination.index === source.index) {
          return;
        }
        let add;
        let wishlist = props.jobs
        let applied = props.appliedJobs
        //source logic
        if(source.droppableId==="wishlist"){
          add = wishlist[source.index]
          wishlist.splice(source.index, 1)
        } else {
          add = applied[source.index]
          applied.splice(source.index, 1)
        }
        // destination logic
        if(destination.droppableId==="wishlist"){
          wishlist.splice(destination.index, 0, add)
        } else {
          applied.splice(destination.index, 0, add)
        }
        props.setAppliedJobs(applied)
        props.setJobs(wishlist)
      }
        return(
          <DragDropContext onDragEnd={onDragEnd}>
          <div className="list-container">
          <Droppable droppableId="wishlist">
            {(provided) => (
                <div className="wishlist" ref={provided.innerRef} {...provided.droppableProps}>
                <h2>Wishlist</h2>
                {props.jobs ? props.jobs.map((job, index) => (
                  <Draggable key={job._id} draggableId={job._id} index={index}>
                    {(provided)=>( 
                      <div ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps} className="job">
                        <Link to={`/job/${job._id}`}><h4>{job.title}</h4></Link>
                        {/* <h3>{job.company}</h3>
                        <h3>{job.date}</h3>
                        <h3>{job.location}</h3>
                        <h3>{job.status}</h3>
                        <a href={job.url}>{job.url}</a> */}
                      </div>
                    )}
                  </Draggable> 
                )) : null}
                {provided.placeholder}
                </div>
            )
            }
         </Droppable>
         <Droppable droppableId="applied">
            {(provided) =>(
                <div className="applied" ref={provided.innerRef} {...provided.droppableProps}>
                <h2>Applied</h2>
                {props.appliedJobs ? props.appliedJobs.map((job, index) => (
                  <Draggable key={job._id} draggableId={job._id} index={index}>
                    {(provided)=>(
                      <div ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps} className="job">
                          <Link to={`/job/${job._id}`}><h4>{job.title}</h4></Link>
                          {/* <h3>{job.company}</h3>
                          <h3>{job.date}</h3>
                          <h3>{job.location}</h3>
                          <h3>{job.status}</h3>
                          <a href={job.url}>{job.url}</a> */}
                    </div>
                    )}
                  </Draggable> 
                )) : null}
                {provided.placeholder}
                </div>
            )
            }
        </Droppable>
          </div>
        </DragDropContext>
        )
      }

  const loading = () => {
    return <h1>Loading...</h1>
  };


  
  return (
    <section>
      <form className="createform">
        <h2>Add a New Job</h2>
        <input
          type="text"
          value={newForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.url}
          name="url"
          placeholder="URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.company}
          name="company"
          placeholder="company"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.date}
          name="date"
          placeholder="date"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.location}
          name="location"
          placeholder="Location"
          onChange={handleChange}
        /><br/>
        <select
        id = "status-select"
        value={newForm.status}
        name="status"
        //   placeholder="Status"
          >
          <option value="">--Please choose an option--</option>
          <option value="applied">Applied</option>
          <option value="In Process">In Process</option>
          {/* <option value="Offer Extended/Rejected">Offer Extended/Rejected</option>
          <option value="Offer Extended/Accepted">Offer Extended/Accepted</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option> */}
          {/* onChange={handleChange} */}
        </select>
        <br/>
        <input type="submit" value="Add to Wishlist" onClick={handleWishlistSubmit}/>
        <input type="submit" id="applied" value="Add to Applied" onClick={handleAppliedSubmit}/>
      </form>
      {props.jobs ? loaded() : loading()}
    </section>
  );
}

export default Index;