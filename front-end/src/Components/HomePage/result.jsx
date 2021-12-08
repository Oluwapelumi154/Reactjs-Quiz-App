import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
const DisplayResult = () => {
   const { state } = useLocation();
   const result = state.score.toFixed(2);

   let comment;
   let icon;
   if (state.score >= 70 && state.score <= 100) {
      comment = <div>You performed Excellenty</div>;
      icon = "#F0F0F2";
   } else if (state.score >= 60 && state.score < 70) {
      comment = <div>You performed well</div>;
   } else if (state.score >= 50 && state.score < 60) {
      icon = "#F0F0F2";
      comment = <div>This is an Average Performance</div>;
   } else if (state.score < 50 && state.score >= 45) {
      icon = "#F0F0F2";
      comment = <div>You can do better</div>;
   } else if (state.score < 45 && state.score.score >= 40) {
      comment = <div>This a poor performance</div>;
   } else if (state.score < 40 && state.score >= 0) {
      comment = "";
      icon = "#CD7F32";
   }
   //https://ultimatecourses.com/blog/get-value-checked-radio-buttons
   // https://www.youtube.com/watch?v=3aKOQn2NPFs&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=12
   return (
      <div className='display-candidate-result'>
         <div className='container d-flex justify-content-center mt-5'>
            <div
               className='result-details text-center'
               style={{ width: "800px" }}>
               <h2 className='text-capitalize'>Quiz result</h2>
               <div>
                  <div>
                     <i
                        className='bi bi-trophy-fill'
                        style={{ fontSize: "150px", color: icon }}></i>
                  </div>

                  <span>{comment}</span>
                  <div className='score mt-2'>
                     <span
                        className='text-capitalize text-muted'
                        style={{ fontWeight: "600", fontSize: "20px" }}>
                        Your Score
                     </span>
                     <span
                        style={{ fontSize: "30px", fontWeight: "500" }}
                        className='d-block mt-3'>
                        {result}%
                     </span>
                     <Link to='/quiz-details'>
                        <small id='retake-quiz'>Retake quiz</small>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
export default DisplayResult;
