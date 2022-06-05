import React from 'react'
import {Public} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import './css/Aside.css'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function Aside() {
  return (
    <div className='sidebar'> 
        <div className='sidebar-container'>
            <div className='sidebar-options'>
                <div className='sidebar-option'>
                    {/* <Link><Public/>Public</Link> */}
                    <div className='link'> 
                   
                        <Link to='/'><div className='link-tag'> <QuestionAnswerIcon/>Questions</div></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Aside