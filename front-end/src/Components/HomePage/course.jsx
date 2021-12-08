import React from 'react'
const Courses=()=>{
return (<div className="courses-list">
<div className="container mt-5">
    <div className="row g-3">
        <div className="col-lg-4">
        <div className="card course">
            <img className="card-img-top" alt="course-1" src={`${process.env.PUBLIC_URL}/assests/img-1.jpg`}/>
            <div className="card-body">
                   <div className="icon">
                    <i className="bi bi-triangle-fill"/>
                   
                    </div>
                    <div className="d-inline-block w-50 m-3">
                    <h6>Quiz-1</h6>
                    <div className="course-title">
                    <h6>Understanding craft mechanics</h6>
                </div>
                   
                    </div>
                   
                
                
                <div className="course-description">
                    <p>Lorem ipsum dolor sit amet,  sit amet venenutrum ullamcorper.</p>
                    <div className="d-grid mt-4">
                    <button style={{backgroundColor:'#ffffff', marginBottom:'15px',color:'#00000', fontWeight:'600',textTransform:'uppercase', padding:'10px',borderRadius:'20px'}} className="btn">Begin</button>  
                    </div>
                </div>
            </div>

          
        </div>
        </div>
        <div className="col-lg-4">
        <div className="card">
            <img className="card-img-top" alt="course-1" src={`${process.env.PUBLIC_URL}/assests/img-1.jpg`}/>
            <div className="card-body">
                   <div className="icon">
                    <i className="bi bi-triangle-fill"/>
                   
                    </div>
                    <div className="d-inline-block w-50 m-3">
                    <h6>Quiz-1</h6>
                    <div className="course-title">
                    <h6>Understanding craft mechanics</h6>
                </div>
                   
                    </div>
                   
                
                
                <div className="course-description">
                    <small>Description</small>
                    <div className="d-grid mt-4">
                    <button style={{backgroundColor:'#ffffff', marginBottom:'15px',color:'#00000', fontWeight:'600',textTransform:'uppercase', padding:'10px',borderRadius:'20px'}} className="btn">Begin</button>  
                    </div>
                </div>
            </div>

          
        </div>
            
            </div>
            <div className="col-lg-4">
            
            </div>
    </div>
</div>
</div>)
}
export default Courses