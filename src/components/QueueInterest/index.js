import axios from 'axios'
import React from 'react'
import Aside from './Aside'
import './css/index.css'
import Main from './Main'


const Index = () => {
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(()=> {
    async function getQuestion() {
      await axios.get('https://queue-interest2011.herokuapp.com/api/question').then((res) => {
        console.log(res.data)
        setQuestions(res.data.reverse())
      })
    }

    getQuestion()

  },[])


  return (
    <div className='stack-index'>
        <div className='stack-index-content'>
            <Main questions={questions}/>
        </div>
    </div>
  )
}

export default Index