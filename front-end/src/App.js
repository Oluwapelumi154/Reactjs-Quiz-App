import "./App.css";
import Register from "./Components/Auth/signup";
import Navbar from "./Components/Navbar/navbar";
import Login from "./Components/Auth/login";
import { Routes, Route } from "react-router-dom";
import CandidateProfile from "./Components/HomePage/updateCandidateInfo";
import NotFound from "./Components/Navbar/NotFound";
import DisplayResult from "./Components/HomePage/result";
import QuestionPage from "./Components/HomePage/question";
function App() {
   return (
      <div className='App'>
         <header>
            <Navbar />
         </header>

         <main>
            <Routes>
               <Route path='/login' element={<Login />} />
               <Route path='/register' element={<Register />} />
               <Route path='/quiz-details' element={<QuestionPage />} />
               <Route path='/profile' element={<CandidateProfile />} />
               <Route path='/result' element={<DisplayResult />} />
               <Route path='*' element={<NotFound />} />
            </Routes>
         </main>
      </div>
   );
}

export default App;
