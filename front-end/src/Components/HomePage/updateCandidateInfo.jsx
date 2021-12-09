import React,{useState} from "react";
import joi from 'joi-browser'
import {Link} from 'react-router-dom'
const CandidateProfile = () => {
const [credentials,setCredentials]=useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    currentPassword:'',

})
const [validationError,setValidationError]=useState({})
const schema={
    firstName:joi.string().required().label('firstName'),
    lastName:joi.string().required().label('lastName'),
    email:joi.string().email().required().label('email'),
    password:joi.string().required().min(8).label('password'),
    currentPassword:joi.string().required().min(8).label('currentPassword')
}
const validate=()=>{
    const {error}=joi.validate(credentials,schema,{abortEarly:false})
    if(!error) return null;
    const errors={}
    for(let item of error.details){
        errors[item.path[0]]=item.message
    }
    return errors
}
const handleUserInput=(e)=>{
    setCredentials({
        ...credentials,
        [e.target.name]:e.target.value
    })
}
const handleSubmit=(e)=>{
    e.preventDefault()
    const error=validate()
    setValidationError(error)
}

  return (
    <div className="updateCandidate-details">
      <div className="container d-flex justify-content-center mt-4">
        <div style={{width:'850px'}}>
            <div className="d-flex justify-content-between candidate-profile">
                <div className="row p-3">
                    <div className="col-lg-6">
                <h4>Orebayo Oluwapelumi</h4>
                </div>
                <div className="col-lg-6 ">
                <button className="btn" id="change-photo">
                Change your photo
              </button>
              </div>
              </div>
              
               
            </div>
          <div className="row mt-5">
              <div className="col-lg-3">
              <div class="list-group">
              <h6 className="list-group-item list-group-item">Account Information</h6>

  <Link to="/" className="list-group-item list-group-item" aria-current="true">
    The current link item
  </Link>
  <Link to="/" className="list-group-item list-group-item-action">My Results</Link>
  <Link to="/" className="list-group-item list-group-item-action">profile</Link>
  <Link to="/" className="list-group-item list-group-item-action">A fourth link item</Link>
  <Link to="/" className="list-group-item list-group-item-action disabled">A disabled link item</Link>
</div>
              </div>
              <div className="col-lg-9">
              <div className="" style={{  }}>
          <h4 className="mt-3 text-capitalize">Change your profile</h4>
          <hr/>
         

          <form className="row mt-4" onSubmit={handleSubmit}>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">first{' '}Name</label>
                <input type="text" name="firstName" value={credentials.firstName} placeholder="Enter your firstName" onChange={handleUserInput} className="form-control" />
                <div className="validation-message">
                  {validationError&&<small style={{fontWeight:'600'}} className="text-danger">{validationError.firstName}</small>}
                </div>
              </div>
              
            
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">last{' '}Name</label>
                <input type="text" name="lastName" value={credentials.lastName} placeholder="Enter your lastName" onChange={handleUserInput} className="form-control" />
                <div className="validation-message">
                  {validationError&&<small style={{fontWeight:'600'}} className="text-danger">{validationError.lastName}</small>}
                </div>
              </div>
              
            </div>
            <div className="col-lg-12">
              <div className="mb-3">
                <label className="form-label">email</label>
                <input type="text" name="email" value={credentials.email} placeholder="Enter your email" onChange={handleUserInput} className="form-control" />
                <div className="validation-message">
                  {validationError&&<small style={{fontWeight:'600'}} className="text-danger">{validationError.email}</small>}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">password</label>
                <input type="text" name="password" value={credentials.password} placeholder="Enter your password" onChange={handleUserInput} className="form-control" />
                <div className="validation-message">
                  {validationError&&<small style={{fontWeight:'600'}} className="text-danger">{validationError.password}</small>}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">current password</label>
                <input  type="text" name="currentPassword" value={credentials.currentPassword} placeholder="Enter your current Password" onChange={handleUserInput} className="form-control" />
                <div className="validation-message">
                  {validationError&&<small style={{fontWeight:'600'}} className="text-danger">{validationError.currentPassword}</small>}
                </div>
               </div>

            </div>
            <div className="text-end d-grid mt-3 mb-3">
              <button id="save-btn" className="btn ">
                save
              </button>
            </div>
          </form>
        </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CandidateProfile;
