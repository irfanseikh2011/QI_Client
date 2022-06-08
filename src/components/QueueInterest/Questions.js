import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './css/Questions.css'
import ReactHtmlParser from 'react-html-parser'

function Questions({question}) {
// console.log(question?.tags[0])
const tags = JSON.parse(question?.tags[0]);
function truncate(str,n) {
    return str?.length > n ? str.substr(0,n-1) + "..." : str
}

console.log(question)
// const tags = []

  return (
    <div className='all-questions'>
        <div className='all-questions-container'>
            <div className='all-questions-left'>
                <div className='all-options'>
                    <div className='all-option'>
                        <p>{question?.liked_by?.length - question?.disliked_by?.length}</p>
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