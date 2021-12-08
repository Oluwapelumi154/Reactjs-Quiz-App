import React from "react";
const Timer = (props) => {
   return (
      <div className='container'>
         <div className='timer mt-3'>
            {/*<small style={{fontSize:'18px'}} className="text-muted">{props.numOfAnsweredQues} of {props.numOfQuestion.length}</small>*/}
            {/*<span style={{color:props.color&&props.color}}><small className="me-1" style={{fontSize:'20px'}}>{props.timer.minutes}:{props.timer.seconds}</small><i class="bi bi-clock"></i></span>*/}
         </div>
      </div>
   );
};
export default Timer;
