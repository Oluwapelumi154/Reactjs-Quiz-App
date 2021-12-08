import React from 'react'
const ErrorMsg=(props)=>{
    return (<div className="container" style={{width:'800px'}}>
       <h4  style={{marginTop:"140px"}}>{props.message}</h4>
    </div>)
}
export default ErrorMsg