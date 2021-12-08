import React,{useState,useEffect} from "react";
import Helmet from "react-helmet";
import Timer from "./timer";
import questions from "../data.js/Question.json";
import isEmpty from "../data.js/isEmpty";
import Alert from "../HomePage/message";
import {useHistory} from 'react-router-dom'
/*class QuizLayout extends React.Component{
   
   
state: { questions: { question: string; title: string; 
  optionA: string; optionB: string;
   optionC: string; optionD: string;
    answer: string; }[]; currentQuestion:
     {}; nextQuestion: {}; previousQuestion: {};
      answer: string; message: string;
       numOfQuestions: number; 
       numOfAnsweredQuestion: number; 
       currentQuestionIndex: number;
        correctAnswers: number;
         wrongAnswers: number;
          score: number;
          disablePreviousBtn:Boolean,
          disableNextBtn:Boolean ,
          time: {} };
   interval: any;   
  
   constructor(props){
     super(props);
     this.state={
      questions,
      currentQuestion: {}, 
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      message:"",
      numOfQuestions: 0,
      numOfAnsweredQuestion: 0,
      currentQuestionIndex: 0,
      correctAnswers: 0,
      disablePreviousBtn:false,
      disableNextBtn:false,
      wrongAnswers: 0,
      score: 0,
      time: {},
     }
    this.interval=null;
   }
   componentDidMount(){
     this.displayQuestions(this.state.questions,this.state.currentQuestion,this.nextQuestion,this.previousQuestion)
     this.startTimer()
   }
   componentWillUnmount(){
     clearInterval(this.interval)
   }
  displayQuestions = (
    questions,
    currentQuestion,
    nextQuestion,
    prevQuestion
  ) => {
    if (!isEmpty(this.state.questions)) {
      questions = [...this.state.questions];
      currentQuestion = questions[this.state.currentQuestionIndex];
      nextQuestion = questions[this.state.currentQuestionIndex + 1];
      prevQuestion = questions[this.state.currentQuestionIndex - 1];
      const answer = currentQuestion.answer.toLowerCase();
      this.setState({
        questions,
        currentQuestion,
        nextQuestion,
        prevQuestion,
        answer,
      },()=>{
        this.disableBtn()
      });
    }
  };
wrongAnswer = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        numOfAnsweredQuestion: prevState.numOfAnsweredQuestion + 1,
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      };
    },()=>{
      if(this.state.nextQuestion===undefined){
        this.endQuestion()
      }else{
        this.displayQuestions(this.state.questions,this.state.currentQuestion,this.nextQuestion,this.previousQuestion)

      }
    });
  };
  handleClickOptions = (e) => {
    const answer = this.state.answer.toLowerCase();
    const userAnswer = e.target.textContent.toLowerCase();
    if (userAnswer === answer) {
      this.setState((prevState)=>{
        return {
          ...prevState,
          message:'correct Answer'
        }
      })
      this.correctAnswer();
    } else {
      this.wrongAnswer();
      this.setState((prevState)=>{
        return {
          ...prevState,
          message:'wrong Answer'
        }
      })
    }
  };
  correctAnswer=()=> {
    this.setState((prevState) => {
      return {
        ...prevState,
        score: prevState.score + 1,
        numOfAnsweredQuestion: prevState.numOfAnsweredQuestion + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      };
    },()=>{
      if(this.state.nextQuestion===undefined){
         this.endQuestion()
      }else{
        this.displayQuestions(this.state.questions,this.state.currentQuestion,this.nextQuestion,this.previousQuestion)

      }
    });
  }
 
  handleNextButtonClick=()=>{
    if(this.state.nextQuestion!==undefined){
      this.setState((prevState)=>{
        return{
          ...prevState,
          currentQuestionIndex:prevState.currentQuestionIndex+ 1,
        }
      
      },()=>{
        this.displayQuestions(this.state.questions,this.state.currentQuestion,this.nextQuestion,this.previousQuestion)

      })
    }
  }
  handleQuitButton=()=>{
    alert('Are you sure you want to quit')
 
    
  }
  startTimer=()=>{
    const countDownTime=Date.now() + 30000
    this.interval=setInterval(()=>{
      const date=new Date()
      const distance= countDownTime - date
      
      const minutes=Math.floor((distance % (60*60*10000))/(1000*60))
    
      const seconds=Math.floor((distance % (60*1000))/1000)
      if(distance < 0){
        clearInterval(this.interval)
        this.setState({
          time:{
          minutes:0,
        seconds:0
      }},()=>{
        this.endQuestion()
        })
      }else{
        this.setState({
        time:{
         minutes,
         seconds
        }
        })
      }
      
      

    },1000)
  }
  endQuestion=()=>{
    const {state}=this
    alert('Quiz has ended')
    const candidateResult={
     score:state.score,
     numOfAnsweredQuestion:state.numOfAnsweredQuestion,
     numOfQuestions:state.numOfQuestions,
     correctAnswers:state.correctAnswers,
     wrongAnswers:state.wrongAnswers
     
    }
    console.log(candidateResult)
   
   

    

  }
  handlePrevButtonClick=()=>{
    if(this.state.prevQuestion!==undefined){
      this.setState((prevState)=>{
        return{
          ...prevState,
          currentQuestionIndex:prevState.currentQuestionIndex - 1,
        }
      
      },()=>{
        this.displayQuestions(this.state.questions,this.state.currentQuestion,this.nextQuestion,this.previousQuestion)

      })
    }
  }
   disableBtn=()=>{
   if(this.state.previousQuestion===undefined || this.state.currentQuestionIndex===0){
     this.setState({
       disablePreviousBtn:true,
       
     })
   }else{
    this.setState({
      disablePreviousBtn:false,
      
    })
   }
   if(this.state.nextQuestion===undefined || this.state.currentQuestionIndex + 1===this.state.numOfQuestions){
    this.setState({
      disableNextBtn:true,
      
    })
  }else{
   this.setState({
     disableNextBtn:false,
     
   })
  }
   }
   
   render(){
     console.log(this.props.location)
     return(
      <div className="questions-container">
      <Helmet>
        <title>Question Page</title>
      </Helmet>
      {this.state.message&& <Alert message={this.state.message}/>}
      
      <Timer timer={this.state.time} numOfAnsweredQues={this.state.currentQuestionIndex + 1} numOfQuestion={this.state.questions} />
      <div className="container d-flex justify-content-center mt-3">
        <div className="question-detail" style={{ width: "80vw" }}>
          
          <div className="card-body p-0 m-0">
          <div className="text-end">
            <button className="btn btn-danger">End quiz</button>
          </div>
            <div className="question">
              <h3 className="display-6">{this.state.currentQuestion.question}</h3>
              <span
                className="text-muted blockquote-footer"
                style={{ fontWeight: 600, textTransform: "capitalize" }}
              >
                {this.state.currentQuestion.title}
              </span>
            </div>
          
            <div className="options">
              <ol>
                <div className="row">
                <div className="col-lg-6">
                <li className="answer">
                  <span onClick={this.handleClickOptions} className="ms-2">
                    {this.state.currentQuestion.optionA}
                  </span>
                </li>
                <li className="answer">
                  <span onClick={this.handleClickOptions} className="ms-2">
                    {this.state.currentQuestion.optionB}
                  </span>
                </li>
                </div>
                <div className="col-lg-6">
                <li className="answer">
                  <span onClick={this.handleClickOptions} className="ms-2">
                    {this.state.currentQuestion.optionC}
                  </span>
                </li>
                <li className="answer">
                  <span onClick={this.handleClickOptions} className="ms-2">
                    {this.state.currentQuestion.optionD}
                  </span>
                </li>
                </div>
                </div>
              </ol>
              <div className="Buttons">
                <button onClick={this.handlePrevButtonClick} id="previous-btn" className={this.state.disablePreviousBtn ? 'btn disabled': 'btn'}>
                  Previous
                </button>
                <button onClick={this.handleNextButtonClick} id="next-btn" className={this.state.disableNextBtn? 'btn disabled': 'btn'}>
                  Next
                </button>
                <button onClick={this.handleQuitButton} id="quitbtn" className="btn d-none">
                End Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     )
   }
  }
   export default QuizLayout;

   /*const displayQuestions = (
    questions,
    currentQuestion,
    nextQuestion,
    prevQuestion
  ) => {
    if (!isEmpty(this.state.questions)) {
      questions = [...data.questions];
      currentQuestion = questions[data.currentQuestionIndex];
      nextQuestion = questions[data.currentQuestionIndex + 1];
      prevQuestion = questions[data.currentQuestionIndex - 1];
      const answer = currentQuestion.answer.toLowerCase();
      setData({
        ...data,
        questions,
        currentQuestion,
        nextQuestion,
        prevQuestion,
        answer,
      });
    }
  };

 } 
 */
/*const QuizLayout=()=>{
  const [data, setData] = useState({
    questions,
    currentQuestion: {},
    nextQuestion: {},
    previousQuestion: {},
    answer: "",
    message:"",
    numOfQuestions: 0,
    numOfAnsweredQuestion: 0,
    currentQuestionIndex: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    score: 0,
    timer: {},
  });
  const interval=null;
  useEffect(() => {
    displayQuestions(
      data.questions,
      data.currentQuestion,
      data.nextQuestion,
      data.prevQuestion
    );
  }, []);

  const displayQuestions = (
    questions,
    currentQuestion,
    nextQuestion,
    prevQuestion
  ) => {
    if (!isEmpty(data.questions)) {
      questions = [...data.questions];
      currentQuestion = questions[data.currentQuestionIndex];
      nextQuestion = questions[data.currentQuestionIndex + 1];
      prevQuestion = questions[data.currentQuestionIndex - 1];
      const answer = currentQuestion.answer.toLowerCase();
      setData({
        ...data,
        questions,
        currentQuestion,
        nextQuestion,
        prevQuestion,
        answer,
      });
    }
  };
  let message;
  const handleClickOptions = (e) => {
    const answer = data.answer.toLowerCase();
    const userAnswer = e.target.textContent.toLowerCase();
    if (userAnswer === answer) {
      setData((prevState)=>{
        return {
          ...prevState,
          message:'correct Answer'
        }
      })
      correctAnswer();
    } else {
      wrongAnswer();
      setData((prevState)=>{
        return {
          ...prevState,
          message:'wrong Answer'
        }
      })
    }
  };
  const correctAnswer = () => {
    setData((prevState) => {
      return {
        ...prevState,
        score: prevState.score + 1,
        numOfAnsweredQuestion: prevState.numOfAnsweredQuestion + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      };
    });
   
    
  };
  const wrongAnswer = () => {
    setData((prevState) => {
      return {
        ...prevState,
        numOfAnsweredQuestion: prevState.numOfAnsweredQuestion + 1,
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      };
    });
  };
  const handleNextButtonClick=()=>{
    if(data.nextQuestion!==undefined){
      setData((prevState)=>{
        return{
          ...prevState,
          currentQuestionIndex:prevState.currentQuestionIndex +1
        }
      
      })
    }
  }
  const startTimer=()=>{
    const countDownTime=Date.now() +30000
    console.log(countDownTime)
    console.log(countDownTime- new Date())
  }
  startTimer()
  const handlePrevButtonClick=()=>{
    if(data.previousQuestion!==undefined){
      setData((prevState)=>{
        return{
          ...prevState,
          currentQuestionIndex:prevState.currentQuestionIndex - 1
        }
      
      })
    }
  }
  return(
    <div className="questions-container">
    <Helmet>
      <title>Question Page</title>
    </Helmet>
    {data.message&& <Alert message={data.message}/>}
    
    <Timer timer={data.time} numOfAnsweredQues={data.currentQuestionIndex + 1} numOfQuestion={data.questions} />
    <div className="container d-flex justify-content-center mt-3">
      <div className="question-detail" style={{ width: "80vw" }}>
        
        <div className="card-body p-0 m-0">
        <div className="text-end">
          <button className="btn btn-danger">End quiz</button>
        </div>
          <div className="question">
            <h3 className="display-6">{data.currentQuestion.question}</h3>
            <span
              className="text-muted blockquote-footer"
              style={{ fontWeight: 600, textTransform: "capitalize" }}
            >
              {data.currentQuestion.title}
            </span>
          </div>
        
          <div className="options">
            <ol>
              <div className="row">
              <div className="col-lg-6">
              <li className="answer">
                <input className="form-check-input" type="radio"/>
                <span onClick={handleClickOptions} className="ms-2">
                  {data.currentQuestion.optionA}
                </span>
              </li>
              <li className="answer">
              <input className="form-check-input" type="radio"/>
                <span onClick={handleClickOptions} className="ms-2">
                  {data.currentQuestion.optionB}
                </span>
              </li>
              </div>
              <div className="col-lg-6">
              <li className="answer">
              <input className="form-check-input" type="radio"/>
                <span onClick={handleClickOptions} className="ms-2">
                  {data.currentQuestion.optionC}
                </span>
              </li>
              <li className="answer">
              <input className="form-check-input" type="radio"/>
                <span onClick={handleClickOptions} className="ms-2">
                  {data.currentQuestion.optionD}
                </span>
              </li>
              </div>
              </div>
            </ol>
            <div className="Buttons">
              <button onClick={handlePrevButtonClick} id="previous-btn" className={data.disablePreviousBtn ? 'btn disabled': 'btn'}>
                Previous
              </button>
              <button onClick={handleNextButtonClick} id="next-btn" className={data.disableNextBtn? 'btn disabled': 'btn'}>
                Next
              </button>
              <button onClick={handleQuitButton} id="quitbtn" className="btn d-none">
              End Quiz
  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   )
};
export default QuizLayout

*/