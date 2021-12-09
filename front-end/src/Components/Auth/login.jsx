import React, { useState } from "react";
import joi from "joi-browser";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   signIn_pending,
   signIn_fulfilled,
   signIn_rejected,
} from "../../Redux/Slices/loginSlices";
import LoadingIcon from "../HomePage/spinner";

const Login = () => {
   const [errmsg, setErrorMsg] = useState({});
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const data = useSelector((state) => state.user);
   const { loading, errormsg } = data;
   const [credentials, setCredentials] = useState({
      email: "",
      password: "",
   });
   const { email, password } = credentials;
   const fetchDetails = async (email, password) => {
      dispatch(signIn_pending());
      await axios
         .post("api/v1/users/login", {
            email,
            password,
         })
         .then((res) => {
            dispatch(signIn_fulfilled(res.data));
            localStorage.setItem("token", "Bearer " + res.data.token);
            localStorage.setItem("userInfo", JSON.stringify(res.data.user));
            navigate("/quiz-details");
         })
         .catch((err) => {
            dispatch(signIn_rejected(err.response.data));
         });
   };
   const [validationError, setValidationError] = useState({});
   const schema = {
      email: joi.string().required().email().label("email"),
      password: joi.string().min(8).required(),
   };
   const validate = () => {
      const { error } = joi.validate(credentials, schema, {
         abortEarly: false,
      });
      const errors = {};
      if (!error) return null;
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
      fetchDetails(email, password);
      setValidationError(error);
      setCredentials({
         ...credentials,
         email: "",
         password: "",
      });
   };
   const validateField = (e) => {
      const obj = {
         [e.target.name]: e.target.value,
      };
      const Schema = {
         [e.target.name]: schema[e.target.name],
      };
      const { error } = joi.validate(obj, Schema);
      return error ? error.details[0].message : null;
   };
   return (
      <div className='signup-form'>
         <div className='container mt-3  d-flex justify-content-center'>
            {loading ? (
               <LoadingIcon value='250px' />
            ) : (
               <div
                  className='signUp-section mt-1 p-2'
                  style={{
                     width: "400px",
                  }}>
                  <h3 className='signup-header'> log In </h3>{" "}
                  <div>
                     {errormsg && (
                        <small className='text-danger'>{errormsg}</small>
                     )}
                  </div>
                  <div>
                     {errmsg && (
                        <small
                           className='text-danger'
                           style={{
                              fontWeight: "500",
                           }}>
                           {" "}
                           {errmsg.message}{" "}
                        </small>
                     )}{" "}
                  </div>{" "}
                  <form className='' onSubmit={handleSubmit}>
                     {" "}
                     {errmsg && <small> {errmsg.message} </small>}{" "}
                     <div className='mb-3'>
                        <label className='form-label'> email </label>{" "}
                        <input
                           type='text'
                           name='email'
                           value={credentials.email}
                           onChange={handleUserInput}
                           placeholder='Enter your email'
                           className='form-control'
                        />
                        <div className='validation-message'>
                           {" "}
                           {validationError && (
                              <small
                                 className='text-danger'
                                 style={{
                                    fontWeight: "600",
                                 }}>
                                 {" "}
                                 {validationError.email}{" "}
                              </small>
                           )}{" "}
                        </div>{" "}
                     </div>{" "}
                     <div className='mb-3'>
                        <label className='form-label'> password </label>{" "}
                        <input
                           type='password'
                           name='password'
                           value={credentials.password}
                           onChange={handleUserInput}
                           placeholder='Enter your password'
                           className='form-control'
                        />
                        <div className='validation-message'>
                           {" "}
                           {validationError && (
                              <small
                                 style={{
                                    fontWeight: "600",
                                 }}
                                 className='text-danger'>
                                 {" "}
                                 {validationError.password}{" "}
                              </small>
                           )}{" "}
                        </div>{" "}
                     </div>{" "}
                     <div className='d-grid'>
                        <button id='signup-btn' className='btn'>
                           login
                        </button>{" "}
                     </div>{" "}
                  </form>{" "}
                  <div className='text-center mt-2'>
                     <span
                        style={{
                           fontSize: "15px",
                           fontWeight: "500",
                        }}>
                        Don 't have an account?{" "}
                        <Link to='/register'>
                           <small className='sign-text'> sign Up </small>{" "}
                        </Link>{" "}
                     </span>{" "}
                  </div>{" "}
               </div>
            )}
         </div>
      </div>
   );
};
export default Login;
