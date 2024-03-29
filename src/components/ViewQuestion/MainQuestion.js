import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import "./index.css";
import ReactHtmlParser from "react-html-parser";
import userSlice, { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'

const MainQuestion = () => {
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState("");
  const [comment, setComment] = useState("");
  const [questionVote, setQuestionVote] = useState(0);
  const [likeButton,setLikeButton] = useState();

  const handleQuill = (value) => {
    setAnswer(value);
  };

  

  async function getUpdatedAnswer() {
    await axios
      .get(`https://queue-interest.onrender.com/api/question/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        setQuestionData(res.data[0]);
      })
      .catch((err) => {
        console.log("Errorr", err);
      });
  }

  // const handleDisLike = () => {
  //   setQuestionVote((prev) => (prev ? prev - 1 : 0));
  // };

  const handleLike = () => {
    setQuestionVote((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (answer !== "") {
      const body = {
        question_id: id,
        answer: answer,
        user: user,
      };

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios
        .post(
          "https://queue-interest.onrender.com/api/answer",
          body,
          config
        )
        .then((res) => {
          console.log(res.data);
          alert("Answer added successfully");

          setAnswer("");
          getUpdatedAnswer();
        })
        .catch((err) => console.log(err));
    }
  };

  const [questionData, setQuestionData] = useState();

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  useEffect(() => {
    async function getQuestionDetails() {
      await axios
        .get(`https://queue-interest.onrender.com/api/question/${id}`)
        .then((res) => {
          console.log(res.data[0]);
          setQuestionData(res.data[0]);
        })
        .catch((err) => {
          console.log("Errorr", err);
        });
    }
    getQuestionDetails();
  }, [id],[questionData]);

  const handleComment = async () => {
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        user: user,
      };

      await axios
        .post(
          `https://queue-interest.onrender.com/api/comment/${id}`,
          body
        )
        .then((res) => {
          console.log(res.data);
          setComment("");
          setShow(false);
          getUpdatedAnswer();
        });
    }
  };



  // Like button handling 

  const [likeButtonPress, setLikeButtonPress] = useState(false);
  const [disLikeButtonPress, setDisLikeButtonPress] = useState(false);
  const userData = { user: user };


  async function getQuestionDetails() {
    await axios
      .get(`https://queue-interest.onrender.com/api/question/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        setQuestionData(res.data[0]);
      })
      .catch((err) => {
        console.log("Errorr", err);
      });
  }



  const handleLikeButton = async () => {

      await axios({
        method: "PUT",
        url: `https://queue-interest.onrender.com/api/question/${id}/like`,
        headers: {
          "Content-Type": "application/json",
        },
        data:
          userData,
      })
        .then((data) => {
          console.log(data);
          console.log("updated votes");
          setLikeButtonPress(true);
        })
        .catch((err) => console.log(err));


        getQuestionDetails();
    }

  // const handleDisLikeButton = async () => {
  //     await axios({
  //       method: "PUT",
  //       url: `http://localhost:4000/api/question/${id}/dislike`,
  //       timeout: 3000,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: userData.email,
  //     })
  //       .then((data) => {
  //         console.log(data);
  //         console.log("votes deleted");
  //         setLikeButtonPress(false);
  //       })
  //       .catch((err) => console.log(err));

    // await axios({
    //   method: "PUT",
    //   url: `http://localhost:4000/api/question/adddislike?q=${id}`,
    //   timeout: 3000,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: userData,
    // })
    //   .then((data) => {
    //     console.log(data);
    //     console.log("updated dislikes");
    //     setDisLikeButtonPress(true);
    //   })
    //   .catch((err) => console.log(err));


  //     getQuestionDetails();
  // };



  // console.log(currAnswer);

  const handleLikeAnswerButton = async (_q) => {
    await axios({
      method: "PUT",
      url: `https://queue-interest.onrender.com/api/answer/${_q._id}/like`,
      headers: {
        "Content-Type": "application/json",
      },
      data:
        userData,
    })
        .then((data) => {
          console.log(data);
          console.log("votes changed");
          setLikeButtonPress(false);
        })
        .catch((err) => console.log(err));

      // await axios({
      //   method: "PUT",
      //   url: `http://localhost:4000/api/answer/answer/addvote?q=${_q._id}`,
      //   timeout: 3000,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   data: userData,
      // })
      //   .then((data) => {
      //     console.log(data);
      //     console.log("updated votes");
      //     setLikeButtonPress(true);
      //   })
      //   .catch((err) => console.log(err));

        getQuestionDetails();

  };

  // const handleDisLikeAnswerButton = async (_q) => {
  //     await axios({
  //       method: "PUT",
  //       url: `http://localhost:4000/api/answer/subvote?q=${_q._id}`,
  //       timeout: 3000,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: userData,
  //     })
  //       .then((data) => {
  //         console.log(data);
  //         console.log("votes deleted");
  //         setLikeButtonPress(false);
  //       })
  //       .catch((err) => console.log(err));

  //   await axios({
  //     method: "PUT",
  //     url: `http://localhost:4000/api/answer/adddislike?q=${_q._id}`,
  //     timeout: 3000,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: userData,
  //   })
  //     .then((data) => {
  //       console.log(data);
  //       console.log("updated dislikes");
  //     })
  //     .catch((err) => console.log(err));

  //     getQuestionDetails();
  // };

  console.log(questionData)


  const handleDelete = async (q) => {
    await axios({
        method: "PUT",
        url: `https://queue-interest.onrender.com/api/answer/delete/${q._id}`,
        timeout: 3000,
        headers: {
          "Content-Type": "application/json",
        },
        data: userData,
      })
        .then((data) => {
          console.log(data);
          console.log("question deleted");
          window.alert("Answer has been deleted")
        })
        .catch((err) => console.log(err));

        getQuestionDetails();
    }



  return (
    <div className="main main-flex">
      <div className="main-container">
        <div className="div-flex">
          <div className="link-tag-mobile link-tag ">
            <Link to="/">
              <QuestionAnswerIcon />
              Question Bank
            </Link>
          </div>
          <Link to="/add-question">
            <button className="button-ask">Ask Question</button>
          </Link>
        </div>
        <div className="main-top">
          <h2 className="main-question question-title-box">
            {questionData?.title}
          </h2>
        </div>
        <div className="main-desc"></div>
        <div className="all-questions">
          <div className="all-questions-container question-flex">
            <div className="all-questions-left">
              <div className="all-options">
                {/* <p onClick={handleLikeButton} className="arrow arrow-button">
                  ▲
                </p> */}
               <FontAwesomeIcon onClick={handleLikeButton} className="like_but" color="#14BDBD" size="3x" icon={faThumbsUp} />
                <p className="arrow">
                  {questionData?.liked_by?.length}
                </p>
                {/* <p onClick={handleDisLikeButton}  className="arrow arrow-button">
                  ▼
                </p> */}
              </div>
            </div>
            <div className="question-answer">
              <h5 className="question-body">
                {ReactHtmlParser(questionData?.body)}
              </h5>
              <div style={{ marginTop: "1em" }} className="author">
                <small>
                  asked at {new Date(questionData?.created_at).toLocaleString()}
                </small>
                <div className="auth-details">
                  <Avatar src={questionData?.user?.photo} />
                  <p>
                    {questionData?.user?.displayName
                      ? questionData?.user?.displayName
                      : String(questionData?.user?.email).split("@")[0]}
                  </p>
                </div>
              </div>
              <div className="comments">
                <div className="comment">
                  {questionData?.comments &&
                    questionData?.comments?.map((_qd) => (
                      <p>
                        {_qd?.comment}-{" "}
                        <span>
                          {_qd?.user?.displayName
                            ? _qd?.user?.displayName
                            : String(_qd?.user?.email).split("@")[0]}
                        </span>
                        <small>
                          {new Date(_qd?.created_at).toLocaleString()}
                        </small>
                      </p>
                    ))}
                </div>
                <div class="comment-button">
                  <p onClick={() => setShow(!show)}>Add a comment</p>
                </div>
                {show && (
                  <div className="title">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add a comment.."
                      rows={5}
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "8px",
                        outline: "none",
                      }}
                    ></textarea>
                    <button type="submit" onClick={handleComment}>
                      Add comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="all-questions"
        >
          <div>
            <p
              style={{
                marginBottom: "20px",
                fontSize: "1.3rem",
                fontWeight: "300",
              }}
            >
              {questionData?.answerDetails?.length} Answers
            </p>
          </div>
          {questionData?.answerDetails?.map((_q) => (
            
            <div key={_q?._id} className="all-answers-container answer-flex">
              <div className="all-questions-left">
                <div className="all-options">
                  <p
                   onClick={()=>handleLikeAnswerButton(_q)}
                    className="arrow arrow-button"
                  >
                    <FontAwesomeIcon className="like_but" color="#14BDBD" size="1x" icon={faThumbsUp} />
                  </p>
                  <p className="arrow">
                    {_q?.liked_by?.length}
                  </p>
                  {/* <p
                    onClick={()=> handleDisLikeAnswerButton(_q)}
                    className="arrow arrow-button"
                  >
                    ▼
                  </p> */}
                </div>
              </div>
              <div className="question-answer">
                <h5 className="answer-body">{ReactHtmlParser(_q?.answer)}</h5>
                <div style={{ marginTop: "1em" }} className="author">
                  <small>at {new Date(_q?.created_at).toLocaleString()}</small>
                  <button onClick={()=> handleDelete(_q)} className={_q.user.uid === user.uid ? "answerDelButton" : "dispNone"}>Delete</button>
                  <div className="auth-details">
                    <Avatar src={_q?.user?.photo} />
                    <p>
                      {_q?.user?.displayName
                        ? _q?.user?.displayName
                        : String(_q?.user?.email).split("@")[0]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>
        <ReactQuill
          value={answer}
          onChange={handleQuill}
          className="react-quill"
          theme="snow"
          style={{ height: "200px", marginBottom: "50px" }}
        />
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        style={{ maxWidth: "fit-content", marginTop: "100px" }}
      >
        Post your answer
      </button>
    </div>
  );
};

export default MainQuestion;
