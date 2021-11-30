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

  const [query, setQuery] = useState("");
  const [AppliedQuery, AppliedSetQuery] = useState("");


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

  //  *******SEARCH BAR*****************************
        let wishlist = props.jobs

  const getFilteredItems = (query, wishlist) => {
    if (!query) {
      return wishlist;
    }
    return wishlist.filter((job) => job.title.includes(query));
  }

  const filteredItems = getFilteredItems(query, wishlist);

  // *******SEARCH BAR*****************************

  let applied = props.appliedJobs

    const getFilteredItemsApplied = (AppliedQuery, applied) => {
      if (!AppliedQuery) {
        return applied;
      }
      return applied.filter((job) => job.title.includes(AppliedQuery));
    }
  
    const FilteredItemsApplied = getFilteredItemsApplied(AppliedQuery, applied);
  
    // *******SEARCH BAR*****************************

        return(
          
          <DragDropContext onDragEnd={onDragEnd}>
          <div className="list-container">
          
          <Droppable droppableId="wishlist">
            {(provided, snapshot) => (
                <div className={`wishlist ${snapshot.isDraggingOver ? 'dragactive' : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                <h2>Wishlist</h2>

                
                {/* *******SEARCH BAR***************************** */}

                {/* <div className="App"> */}
                <label>Search  </label>
                <input type="text" onChange={(e) => setQuery(e.target.value)} />

                {/* *******SEARCH BAR***************************** */}


                {filteredItems ? filteredItems.map((job, index) => (
                  <Draggable key={job._id} draggableId={job._id} index={index}>
                    {(provided, snapshot)=>( 
                      <div ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps} className={`job ${snapshot.isDragging ? 'drag' : ""}`}>
                        <Link to={`/job/${job._id}`}><h4>{job.title}</h4></Link>
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
            {(provided, snapshot) =>(
                <div className={`applied ${snapshot.isDraggingOver ? 'dragcomplete' : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                <h2>Applied</h2>
                {/* *******SEARCH BAR***************************** */}

                {/* <div className="App"> */}
                <label>Search  </label>
                <input type="text" onChange={(e) => AppliedSetQuery(e.target.value)} />

                {/* *******SEARCH BAR***************************** */}


                {FilteredItemsApplied ? FilteredItemsApplied.map((job, index) => (
                  <Draggable key={job._id} draggableId={job._id} index={index}>
                    {(provided, snapshot)=>( 
                      <div ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps} className={`job ${snapshot.isDragging ? 'drag' : ""}`}>
                        <Link to={`/appliedjob/${job._id}`}><h4>{job.title}</h4></Link>
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


<label>Select Status:    </label>
        <select name="status" value={newForm.status} onChange={handleChange}>
        <option value="applied">Applied</option>
        <option value="In Process">In Process</option>
        <option value="Offer Extended/Rejected">Offer Extended/Rejected</option>
        <option value="Offer Extended/Accepted">Offer Extended/Accepted</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
        </select> 
        <br></br>

        <input type="submit" value="Add to Wishlist" onClick={handleWishlistSubmit}/>
        <input type="submit" id="applied" value="Add to Applied" onClick={handleAppliedSubmit}/>
      </form>
      {props.jobs ? loaded() : loading()}
    </section>
  );
}

export default Index;