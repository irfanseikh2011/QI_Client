import { Avatar } from '@mui/material'
import React, {useEffect,useState,useCallback} from 'react'
import { Link } from 'react-router-dom'
import './css/Questions.css'
import ReactHtmlParser from 'react-html-parser'
import userSlice, { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";

function Questions({question,stateChange}) {
// console.log(question?.tags[0])
const tags = JSON.parse(question?.tags[0]);
function truncate(str,n) {
    return str?.length > n ? str.substr(0,n-1) + "..." : str
}

const user = useSelector(selectUser);
const userData = { user: user };

// const [questionData, setQuestionData] = useState(question);



// useEffect(() => {
//     console.log("Refresh");
// },[question])


// console.log(userData)


const handleDelete = async (q) => {
    console.log(q._id);
    await axios({
        method: "PUT",
        url: `https://queue-interest.onrender.com/api/question/delete/${q._id}`,
        timeout: 3000,
        headers: {
          "Content-Type": "application/json",
        },
        data: userData,
      })
        .then((data) => {
          console.log(data);
          console.log("question deleted");
          stateChange(data.data.data)
          window.alert("Question deleted");
        })
        .catch((err) => console.log(err));
    }


  return (
    <div className='all-questions'>
        <div className='all-questions-container'>
            <div className='all-questions-left'>
                <div className='all-options'>
                    <div className='all-option'>
                        <p>{question?.liked_by?.length}</p>
                        <span>Votes</span>
                    </div>
                    <div className='all-option'>
                        <p>{question?.answerDetails?.length}</p>
                        <span>Answers</span>
                    </div>
                </div>
            </div>
            <div className='question-answer'>
                <Link to={`/question?q=${question?._id}`}><div className='question-title-box'><h3>{ReactHtmlParser(question?.title) }</h3></div> </Link>
                <div style={{
                    width:"90%"
                }}>
                    <div><h5>{ReactHtmlParser(truncate(question?.body,200))}</h5></div>
                </div>
                <div style={{display:"flex"
                    }}>
                    {
                        tags.map((_tag) => (<>
                       
                           <span className='question-tags'>
                        {_tag}    
                    </span>
                        </>))
                    }

                    </div>

                    <button onClick={()=> handleDelete(question)} className={question.user.uid===user.uid ? "deleteButton" : "deleteDispNone"}>Delete</button>

                <div className='author'>
                    <small>{new Date(question.created_at).toLocaleString()}</small>
                    <div className='author-details'>
                        <Avatar src={question?.user?.photo}/>
                        <p>{question?.user?.displayName ? question?.user?.displayName : String(question?.user?.email).split('@')[0] }</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
  )
}

export default Questions