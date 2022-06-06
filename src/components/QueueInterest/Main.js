import { FilterList } from "@mui/icons-material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Questions from "./Questions";
import "./css/Main.css";
import {useSelector } from 'react-redux';
import {selectUser } from '../../features/userSlice';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { async } from "@firebase/util";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';


const Main = ({ questions }) => {
  const user = useSelector(selectUser)
  const [questionsDisplay, setQuestionsDisplay] = React.useState(questions)
  const [searchValue,setSearchValue] = React.useState("")

  const handleSearch = async () => {
    if(searchValue!== ""){
    await axios.get(`https://queue-interest2011.herokuapp.com/api/search?title=${searchValue}`).then((res) => {
      setQuestionsDisplay(res.data);
  }).catch((err)=> {
      console.log("Errorr",err);
  })
  }else{
    setQuestionsDisplay(questions)
  }
  }

  const handleReset = () => {
    setSearchValue("")
  }


  useEffect(() => {
   setQuestionsDisplay(questions)
  },[questions,searchValue,])

  //  console.log(searchValue)
   console.log(questionsDisplay)
   console.log(questions)

  return (
    <div className="main">
      <div className="header-middle">
          <div className="header-search-container">
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Search.." />
          </div>
          <div onClick={handleSearch} className="searchIcon">
            <SearchIcon />
            </div>
        </div> 

      {user ? (    <div className="main-container">
      <div onClick={
        handleReset} className='link-tag-mobile link-tag'><Link to='/'><QuestionAnswerIcon/>Question Bank</Link></div>
        <div className="main-top">
        
          <h2 className="all-h2">All Questions</h2>
          
          <Link to="/add-question">
            <button className="button-ask">Ask Question</button>
          </Link>
        </div>

        <div className="main-desc">
          <p>{questionsDisplay && questionsDisplay.length} Questions</p>
          <div className="main-filter">
            <div className="main-tabs">
              {/* <div className="main-tab">
                <Link to="/">Newest</Link>
              </div>
              <div className="main-tab">
                <Link to="/">Active</Link>
              </div>
              <div className="main-tab">
                <Link to="/">More</Link>
              </div> */}
            </div>
            <div className="main-filter-item">
              <FilterList />
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="questions">

          {questionsDisplay?.map((_q, index) => (
            <>
              <div className="question" key={index}>
                <Questions question={_q} />
              </div>
            </>
          ))}
        </div>
      </div>) : (<div className="hello-world">Hekkkooo </div>)}
  
    </div>
  );
};

export default Main;
