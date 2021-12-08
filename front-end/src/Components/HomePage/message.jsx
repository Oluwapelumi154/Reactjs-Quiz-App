import React from 'react'
const Alert=(props)=>{
   
    return (
    <div className="">
    <div className="alert-message text-center">
      
   <div className={props.message.startsWith('c')?'alert correct-answer ':'alert incorrect-answer'} role="alert">
   {props.message}
</div>
        
       
</div>
    </div>)
}
export default Alert