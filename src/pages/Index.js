// import React from "react"
import { useState, useRef } from "react";
import { Link } from "react-router-dom"

function Index(props) {

  // const state = {
  //   button: 1
  // };

  

  // state to hold formData
  const [newForm, setNewForm] = useState({
    title: "",
    company: "",
    url: "",
    date:"",
    location:"",
    status:"",
  });

const formRef = useRef()
  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
     const { value } = formRef.current.name

    
      props.createJob(newForm);
    setNewForm({
        title: "",
        company: "",
        url: "",
        date:"",
        location:"",
        status:"",
    })};

    const handleSubmitWish = (event) => {
    event.preventDefault();
     const { value } = formRef.current.name;

    
      props.createWishlist(newForm);
    setNewForm({
        title: "",
        company: "",
        url: "",
        date:"",
        location:"",
        status:"",
    });
     
    // props.createWishlist(newForm);
    // setNewForm({
    //     title: "",
    //     company: "",
    //     url: "",
    //     date:"",
    //     location:"",
    //     status:"",
    // })};
    
  

    // props.createJob(newForm);
    // setNewForm({
    //     title: "",
    //     company: "",
    //     url: "",
    //     date:"",
    //     location:"",
    //     status:"",
    // });
  };

  // const handleSubmitWish = (event) => {
  //   event.preventDefault();
  //   props.createWishlist(newForm);
  //   setNewForm({
  //       title: "",
  //       company: "",
  //       url: "",
  //       date:"",
  //       location:"",
  //       status:"",
  //   });
  // };


  // loaded function
  const loaded = () => { 

    


    return ( 
    <div>
    <div className="applied">
      <h2>Applied</h2>
      <input type="text" placeholder="Search.." />
      <hr />
      {props.jobs ? props.jobs.map((job) => (
      <div key={job._id} className="job">
        <Link to={`/job/${job._id}`}><h4>{job.title}</h4></Link>
        <h3>{job.company}</h3>
        <h3>{job.date}</h3>
        <h3>{job.location}</h3>
        <h3>{job.status}</h3>
        <a href={job.url}>{job.url}</a>
      </div>  
    )) : null}
    </div>

    <div className="wishlist">
    <h2>Wishlist</h2>
    <input type="text" placeholder="Search.." />
    <hr />
    {props.jobs ? props.jobs.map((job) => (
    <div key={job._id} className="job">
      <Link to={`/job/${job._id}`}><h4>{job.title}</h4></Link>
      <h3>{job.company}</h3>
      <h3>{job.date}</h3>
      <h3>{job.location}</h3>
      <h3>{job.status}</h3>
      <a href={job.url}>{job.url}</a>
    </div>  
    )) : null}
    </div>
    </div>
    )
  };

  const loading = () => {
    return <h1>Loading...</h1>
  };
  
  return (
    <section>
      <form className="createform" ref={formRef} >
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
        <input type="submit" onClick={handleSubmit} value="Create Job" />
        <input type="submit"  onClick={handleSubmitWish} value="Add Wishlist Job" />
      </form>
      {props.jobs ? loaded() : loading()}
    </section>
  );
}

export default Index;