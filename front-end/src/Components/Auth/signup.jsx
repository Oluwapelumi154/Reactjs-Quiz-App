import React, { useState } from "react";
import joi from "joi-browser";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
   signUp_pending,
   signUp_fulfilled,
   signUp_rejected,
} from "../../Redux/Slices/signUpSlices";
import LoadingIcon from "../HomePage/spinner";
const Register = () => {
   const dispatch = useDispatch();
   const data = useSelector((state) => state.signUp);
   const { loading, errormsg } = data;
   const navigate = useNavigate();
   const [credentials, setCredentials] = useState({
      firstName: "",
      LastName: " ",
      email: " ",
      password: " ",
      passwordConfirm: "",
   });
   const { firstName, lastName, email, password, passwordConfirm } =
      credentials;

   const fetchDetails = async (
      firstName,
      lastName,
      email,
      password,
      passwordConfirm
   ) => {
      dispatch(signUp_pending());

      await axios
         .post("api/v1/users/register", {
            firstName,
            lastName,
            email,
            password,
            passwordConfirm,
         })
         .then((res) => {
            dispatch(dispatch(signUp_fulfilled(res.data)));
            navigate("/login");
         })
         .catch((err) => {
            console.log(err.response.data);
            dispatch(signUp_rejected(err.response.data));
         });
   };
   const [validationError, setValidationError] = useState({});
   const schema = {
      firstName: joi.string().required().label("firstName"),
      lastName: joi.string().required().label("lastName"),
      email: joi.string().email().required().label("email"),
      password: joi.string().required().label("password").min(8),
      passwordConfirm: joi.string().required().label("passwordConfirm").min(8),
   };
   const validate = () => {
      const { error } = joi.validate(credentials, schema, {
         abortEarly: false,
      });
      if (!error) return null;
      const errors = {};
      for (let item of error.details) {
         errors[item.path[0]] = item.message;
      }
      return errors;
   };

   const handleUserInput = (e) => {
      const errormsg = validateField(e);
      setCredentials({
         ...credentials,
         [e.target.name]: e.target.value,
      });
      setValidationError({
         ...validationError,
         [e.target.name]: errormsg,
      });
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      const error = validate();
      setCredentials({
         firstName: " ",
         lastName: " ",
         email: " ",
         password: " ",
         passwordConfirm: " ",
      });

      fetchDetails(firstName, lastName, email, password, passwordConfirm);

      setValidationError(error);
   };
   const validateField = (e) => {
      const obj = { [e.target.name]: e.target.value };
      const Schema = { [e.target.name]: schema[e.target.name] };
      const { error } = joi.validate(obj, Schema);
      return error ? error.details[0].message : null;
   };
   return (
      <div className='signup-form'>
         <div></div>
         <div
            className='container d-flex justify-content-center'
            style={{ overflowY: "hidden" }}>
            {loading ? (
               <LoadingIcon value='250px' />
            ) : (
               <div className='signUp-section p-2' style={{ width: "450px" }}>
                  <h4 className='signup-header'>Sign Up</h4>
                  <div>
                     {errormsg && (
                        <small
                           className='text-danger'
                           style={{ fontSize: "14px" }}>
                           {errormsg}
                        </small>
                     )}
                  </div>
                  <form onSubmit={handleSubmit}>
                     <div className='mb-3'>
                        <label className='form-label'>first Name</label>
                        <input
                           type='text'
                           name='firstName'
                           onChange={handleUserInput}
                           placeholder='Enter your firstName'
                           className='form-control'
                        />
                        <div className='validation-message'>
                           {validationError && (
                              <small
                                 className='text-danger'
                                 style={{ fontWeight: "500" }}>
                                 {validationError.firstName}
                              </small>
                           )}
                        </div>
                     </div>
                     <div className='mb-3'>
                        <label className='form-label'>last Name</label>
                        <input
                           type='text'
                           name='lastName'
                           onChange={handleUserInput}
                           placeholder='Enter your lastName'
                           className='form-control'
                        />
                        <div className='validation-message'>
                           {validationError && (
                              <small
                                 className='text-danger'
                                 style={{ fontWeight: "500" }}>
                                 {validationError.lastName}
                              </small>
                           )}
                        </div>
                     </div>
                     <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input
                           type='email'
                           name='email'
                           onChange={handleUserInput}
                           placeholder='Enter your Email'
                           className='form-control'
                        />
                        <div className='validation-message'>
                           {validationError && (
                              <small
                                 className='text-danger'
                                 style={{ fontWeight: "500" }}>
                                 {validationError.email}
                              </small>
                           )}
                        </div>
                     </div>
                     <div className='mb-3'>
                        <label className='form-label'>password</label>
                        <input
                           type='password'
                           name='password'
                           onChange={handleUserInput}
                           placeholder='Enter your Password'
                           className='form-control'
                        />
                        <div className='validation-message'>
                           {validationError && (
                              <small
                                 className='text-danger'
                                 style={{ fontWeight: "500" }}>
                                 {validationError.password}
                              </small>
                           )}
                        </div>
                     </div>
                     <div className='mb-3'>
                        <label className='form-label'>password Confirm</label>
                        <input
                           type='password'
                           name='passwordConfirm'
                           onChange={handleUserInput}
                           placeholder='Enter your Password'
                           className='form-control'
                        />
                        <div className='validation-message'>
                           {validationError && (
                              <small
                                 className='text-danger'
                                 style={{ fontWeight: "500" }}>
                                 {validationError.passwordConfirm}
                              </small>
                           )}
                        </div>
                     </div>
                     <div className='d-grid mt-4'>
                        <button
                           id='signup-btn'
                           style={{ backgrounColor: "#8948F9" }}
                           className='btn'>
                           {loading ? <LoadingIcon /> : "sign up"}
                        </button>
                     </div>
                     <div className='text-center mt-3'>
                        <span
                           style={{
                              fontSize: "15px",
                              fontWeight: "500",
                           }}>
                           Already have an Account?{" "}
                           <Link to='/login'>
                              <small
                                 className='sign-text'
                                 id='sign-text'
                                 style={{
                                    fontWeight: "700",
                                    color: "#00000",
                                 }}>
                                 log In
                              </small>
                           </Link>
                        </span>
                     </div>
                  </form>
               </div>
            )}
         </div>
      </div>
   );
};
export default Register;
