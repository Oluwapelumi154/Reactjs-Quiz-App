/* eslint-disable no-loop-func */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./spinner";
import {
   question_pending,
   question_fulfilled,
   question_rejected,
} from "../../Redux/Slices/questionSlices";
const QuestionPage = (props) => {
   const [score, setScore] = useState(0);
   const [selectedOptions, setSelectedOptions] = useState([]);
   const handleAnswerOption = (answer) => {
      setSelectedOptions([
         (selectedOptions[currentQuestionIndex] = {
            answerByUser: answer,
         }),
      ]);
      setSelectedOptions([...selectedOptions]);
   };
   const navigate = useNavigate();
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const dispatch = useDispatch();
   const data = useSelector((state) => state.questions);
   const { loading, errormsg, question } = data;
   console.log(question);
   useEffect(() => {
      const fetchData = async () => {
         dispatch(question_pending());
         await axios
            .get("api/v1/questions", {
               headers: {
                  authorization: localStorage.getItem("token"),
               },
            })
            .then((res) => {
               dispatch(question_fulfilled(res.data));
            })
            .catch((err) => {
               dispatch(question_rejected(err.response.data));
            });
      };
      fetchData();
   }, [dispatch]);
   const nextQuestion = () => {
      const nextQuestion = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextQuestion);
   };
   const prevQuestion = () => {
      const previousQuestion = currentQuestionIndex - 1;
      setCurrentQuestionIndex(previousQuestion);
   };
   const handleSubmitBtn = () => {
      let score = 0;
      for (let i = 0; i < question.length; i++) {
         question[i].answerOptions.map((options, id) => {
            if (selectedOptions[id]?.answerByUser === options.answer) {
               score = score + 1;
            }
         });
      }
      setScore(score);
      navigate("/result", { state: { score: score } });
   };

   return (
      <div className='question-container'>
         {loading ? (
            <Spinner value='250px' />
         ) : errormsg ? (
            <div className='container mt-5'>
               <h6 className='text-muted'>{errormsg}</h6>
            </div>
         ) : (
            <div className='container d-flex justify-content-center  mt-5'>
               <div className='card p-3 mb-4' style={{ width: "800px" }}>
                  {question.length > 0 && (
                     <div className='cont card-body'>
                        <div>
                           <h6 className='text-capitalize'>
                              question <span>{currentQuestionIndex + 1}</span>{" "}
                              of
                              <span className='ms-2'>{question.length}</span>
                           </h6>
                        </div>
                        <div className='question mt-4'>
                           <h6 className='text-lowercase'>
                              {question[currentQuestionIndex].question}
                           </h6>
                        </div>
                        <div className='options'>
                           {question[currentQuestionIndex].answerOptions.map(
                              (options, id) => {
                                 return (
                                    <div key={id}>
                                       <form className='question-options mb-0 mt-4'>
                                          <label>
                                             <input
                                                type='radio'
                                                value={options.answer}
                                                name={options.answer}
                                                style={{ color: "red" }}
                                                className='me-2'
                                                checked={
                                                   options.answer ===
                                                   selectedOptions[
                                                      currentQuestionIndex
                                                   ]?.answerByUser
                                                }
                                                onChange={(e) =>
                                                   handleAnswerOption(
                                                      options.answer
                                                   )
                                                }
                                             />
                                          </label>
                                          {options.answer}
                                       </form>
                                    </div>
                                 );
                              }
                           )}
                        </div>
                        <div className=''>
                           <div className='row mt-4 g-2'>
                              <div className='col-lg-6 d-grid '>
                                 <button
                                    onClick={prevQuestion}
                                    className='btn btns'
                                    disabled={currentQuestionIndex === 0}>
                                    previous
                                 </button>
                              </div>
                              <div className='col-lg-6 d-grid'>
                                 <button
                                    disabled={
                                       currentQuestionIndex ===
                                       question.length - 1
                                    }
                                    onClick={nextQuestion}
                                    className='btn btns'>
                                    next
                                 </button>
                              </div>
                           </div>
                        </div>
                        {currentQuestionIndex === question.length - 1 && (
                           <div className='mt-2'>
                              <button
                                 onClick={handleSubmitBtn}
                                 className='btn mt-2 submit-btn w-100'>
                                 submit
                              </button>
                           </div>
                        )}
                     </div>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default QuestionPage;
