import React, { useRef, useState } from 'react'
import firebase from 'firebase/app';
import 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { collection, query, where, orderBy, limit, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';
import ChatMessage from './ChatMessage';
import './Mail.css'
import {useSelector } from 'react-redux';
import {selectUser } from '../../features/userSlice';

const Mail = () => {
    const user = useSelector(selectUser)
    const messageRef = collection(db,"messages");
    const q = query(messageRef, orderBy("createdAt"), limit(25));
    console.log(user)
    const [messages] = useCollectionData(q, {idField:'id'});


    const handleKeyPress = (event) => {
      console.log(event.key)
      if(event.key === 'Enter'){
        sendMessage()
      }
    }

    // console.log(q);

    const avator = 'https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1655376837~hmac=bf7e3c6ce18136a3abac712fea422974';
    const [formvalue, setFormValue] = useState("");

    const sendMessage = async (e) => {
        // e.preventDefault();

        await setDoc(doc(messageRef),{
            text: formvalue,
            createdAt: serverTimestamp(),
            uid: user.uid,
            photo: user.photo ? user.photo: avator,
            displayName: user.displayName ? user.displayName :  String(user?.email).split('@')[0]
        })

        setFormValue("");
        dummy.current.scrollIntoView({behavior:'smooth'})
       
    }

    const dummy = useRef()


  return (
    <div className='mainbox'>
        <div className='mail'>
         <div className='messages'>
             {messages && messages.map(msg => <ChatMessage key ={msg.id} message = {msg} />)}
             <div ref={dummy}></div>
        </div>
       

    </div>

    <div className="message-input">
            <input onKeyDown={handleKeyPress} placeholder='Enter a message..' value={formvalue} onChange={(e) => setFormValue(e.target.value)}/>
            <button  onClick={sendMessage} type="submit">Send</button>
          </div>
    </div>
    
   
  )
}

export default Mail