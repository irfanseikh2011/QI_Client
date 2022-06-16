import React from 'react'
import {useSelector } from 'react-redux';
import {selectUser } from '../../features/userSlice';

const ChatMessage = (props) => {
 const {text,displayName,photo,uid} = props.message;
//  const {createdAt} = props.message;
const user = useSelector(selectUser)

console.log(props)
  return (
    <div className="message">
        <img className='message-photo' src={photo}/>
        <div className='chat-details'>
            <p className='message-text'>{text}</p>
            <small className='message-name'>{displayName}</small>
        </div>
        
    </div>
  )
}

export default ChatMessage