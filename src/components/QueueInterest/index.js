import axios from 'axios'
import React from 'react'
import Aside from './Aside'
import './css/index.css'
import Main from './Main'


const Index = () => {
  const [questions, setQuestions] = React.useState();

  async function getQuestion() {
    await axios.get('http://localhost:4000/api/question').then((res) => {
      console.log(res.data)
      setQuestions(() => res.data.reverse())
    })
  }

  React.useEffect(()=> {
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