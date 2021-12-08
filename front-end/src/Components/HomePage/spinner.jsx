import React from "react";
const Spinner = (props) => {
   return (
      <div class='d-flex justify-content-center spinner'>
         <div
            class='spinner-border'
            style={{ marginTop: props.value, color: "#000075" }}
            role='status'></div>
      </div>
   );
};
export default Spinner;
