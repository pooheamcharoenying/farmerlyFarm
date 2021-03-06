import React, { useContext, useState, useEffect } from "react";
import { Input, message, Button, Modal, Tabs, Select, Table } from "antd";
import moment from "moment";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCaretLeft,
  FaCaretRight
} from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { GlobalContext, CourseQuizContext } from "../../hook/GlobalHook";
import TextEditor from "../textEditor/TextEditor";
import { LessionVisitedLogAction, QuizLogAction } from "../../actions";

import {
  FetchQuestionWhenSelectAction,
  ClearCreateQuizFieldAction
} from "../../actions";

const { TextArea } = Input;

var countdown;
export default function CourseQuizContent() {
  const GlobalHook = useContext(GlobalContext);
  const [getQuestionAmount, setQuestionAmount] = useState(1);
  const [getStartedQuiz, setStartedQuiz] = useContext(CourseQuizContext);
  const [
    getModalQuizHistoryOpenStatus,
    setModalQuizHistoryOpenStatus
  ] = useState(false);
  const [getRemainingTime, setRemainingTime] = useState("Loading");
  const [getShowTimeOutModal, setShowTimeOutModal] = useState(false);
  const [getSelectQuestion, setSelectQuestion] = useState(0);
  const [getSelectAns, setSelectAns] = useState("");
  const [getQuizHistory, setQuizHistory] = useState([]);

  const [getQuestionPool, setQuestionPool] = useState();
  const [getAnsPool, setAnsPool] = useState([]);
  const [getUserAnsBank, setUserAnsBank] = useState({});
  const [getShowCorrectAns, setShowCorrectAns] = useState(false);
  const [getAnsSubtmited, setAnsSubtmited] = useState(false);
  const [getIsReviewQuestion, setIsReviewQuestion] = useState(false)

  const [getUserClick, setUserClick] = useState("");

  const [getUserAnsCheckStatus, setUserAnsCheckStatus] = useState(false);

  const [getStartQuizTime, setStartQuizTime] = useState(0)
  const [getEndQuizTime, setEndQuizTime] = useState(0)

  const [
    getModalQuizResultSummaryOpenStatus,
    setModalQuizResultSummaryOpenStatus
  ] = useState(false);

  const [getisSubscription, setisSubscription] = useState(false);

  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalcourseId) {
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseId == GlobalHook.getGlobalcourseId) {
          setisSubscription(true);
        }
      });
    } else {
      setisSubscription(false);
    }
  });

  useEffect(() => {
    setAnsPool(shuffle(GlobalHook.getGloblaQuizAnswerField));
  }, [GlobalHook.getGloblaQuizAnswerField]);

  useEffect(() => {
    setIsReviewQuestion(false)
  }, [GlobalHook.getGlobalLessionSelect])

  useEffect(() => {
    if (GlobalHook.getGlobalMediaQuiz) {
      if (GlobalHook.getGlobalLessionSelect.mediaEtc3) {
        setQuestionAmount(GlobalHook.getGlobalLessionSelect.mediaEtc5);
      } else {
        setQuestionAmount(parseInt(GlobalHook.getGlobalMediaQuiz.length));
      }
    }
  }, [GlobalHook.getGlobalMediaQuiz]);

  function handleIsCountdown() {
    if (GlobalHook.getGlobalLessionSelect.mediaEtc2) {
      startTimer(GlobalHook.getGlobalLessionSelect.mediaTime);
    }
  }
  function startTimer(duration) {
    let timer = duration * 60,
      minutes,
      seconds;
    countdown = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      timer--;
      if (timer < 0) {
        clearInterval(countdown);
        setShowTimeOutModal(true);
      }
      setRemainingTime(`${minutes}:${seconds}`);
    }, 1000);
  }

  useEffect(() => {
    if (GlobalHook.getGlobalStatusCode == "resetUserClicker") {
      clearInterval(countdown);
    }

    setTimeout(() => {
      GlobalHook.setGlobalStatusCode(null);
    }, 100);
  }, [GlobalHook.getGlobalStatusCode]);

  useEffect(() => {
    if (GlobalHook.getGlobalMediaQuiz) {
      let FinalQuizBank = [];
      let randomAmount =
        parseInt(GlobalHook.getGlobalMediaQuiz.length) -
        parseInt(GlobalHook.getGlobalLessionSelect.mediaEtc5);
      if (GlobalHook.getGlobalLessionSelect.mediaEtc3) {
        FinalQuizBank = shuffle(GlobalHook.getGlobalMediaQuiz).slice(
          randomAmount
        );
      } else {
        FinalQuizBank = GlobalHook.getGlobalMediaQuiz;
      }

      setQuestionPool(FinalQuizBank);
      // InitUserAnsBank(FinalQuizBank)
      FetchQuestionWhenSelectAction(GlobalHook, FinalQuizBank[0].questionId);
    }
  }, [GlobalHook.getGlobalMediaQuiz]);

  function InitUserAnsBank(FinalQuizBank) {
    let UserAnsInitBank = {};
    FinalQuizBank.map(item => {
      UserAnsInitBank[item.questionId] = {};
      console.log(item.questionId);
    });
    setUserAnsBank(UserAnsInitBank);
  }
  function handleQuizSelect(index) {
    setShowCorrectAns(false);

    ClearCreateQuizFieldAction(GlobalHook);

    FetchQuestionWhenSelectAction(
      GlobalHook,
      getQuestionPool[index].questionId
    );
    setUserClick(null);

    if (getUserAnsBank[getQuestionPool[index].questionId]) {
      setUserClick(getUserAnsBank[getQuestionPool[index].questionId].ans);
    }
  }

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function handlePreviousClick() {
    if (getSelectQuestion != 0) {
      handleQuizSelect(getSelectQuestion - 1);
      setSelectQuestion(getSelectQuestion - 1);
    }
  }

  function handleNextClick() {
    if (getSelectQuestion + 1 != getQuestionAmount) {
      handleQuizSelect(getSelectQuestion + 1);
      setSelectQuestion(getSelectQuestion + 1);
    }
  }

  function UserAnsClick(content) {
    let oldUserAnsBank = getUserAnsBank;
    console.log(getUserAnsBank);
    oldUserAnsBank[getQuestionPool[getSelectQuestion].questionId] = {
      ans: content
    };
    setUserAnsBank(oldUserAnsBank);
    console.log(getUserAnsBank);
  }

  function handleAnsSubmit() {
    if (getUserAnsBank[getQuestionPool[getSelectQuestion].questionId].ans) {
      // if (GlobalHook.getGlobalLessionSelect.mediaEtc1) {
      //   setShowCorrectAns(true);
      //   console.log('joey1')
      // } else {
      setShowCorrectAns(false);
      console.log('joey2')
      handleNextClick();
      if (getSelectQuestion + 1 == getQuestionAmount) {
        ShowResult();
      }
      // }
      CalUserAnsStatus();
    } else {
      getUserAnsBank[
        getQuestionPool[getSelectQuestion].questionId
      ].result = null;
    }
  }

  function CalUserAnsStatus() {
    if (
      GlobalHook.getGloblaQuizAnswerCorrect ==
      getUserAnsBank[getQuestionPool[getSelectQuestion].questionId].ans
    ) {
      getUserAnsBank[
        getQuestionPool[getSelectQuestion].questionId
      ].result = true;
      setUserAnsCheckStatus(true);
    } else {
      getUserAnsBank[
        getQuestionPool[getSelectQuestion].questionId
      ].result = false;

      setUserAnsCheckStatus(false);
    }
  }

  function RenderQuizTimeOut() {
    return (
      <Modal
        visible={getShowTimeOutModal}
        title="TimeOut"
        onOk={() => setShowTimeOutModal(false)}
        onCancel={() => {
          setShowTimeOutModal(false);
        }}
        footer={[
          <div className="w-full flex justify-center">

            <button
              onClick={() => { setModalQuizResultSummaryOpenStatus(false); GlobalHook.setPrevNextStatus("NextLession") }}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
            >
              ไปบทต่อไป
            </button>


            {(GlobalHook.getGlobalLessionSelect.mediaEtc1) ?
              <>

                <button
                  onClick={() => { setModalQuizResultSummaryOpenStatus(false); setIsReviewQuestion(true) }}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
                // disabled={!GlobalHook.getGlobalLessionSelect.mediaEtc1}
                >
                  ดูเฉลย
            </button>
              </> : <></>}


          </div>
        ]}
      >
        TimeOut - หมดเวลาในการทําโจทย์
      </Modal>
    );
  }

  function RenderQuizResultSummary() {

    return (
      <Modal
        visible={getModalQuizResultSummaryOpenStatus}
        title="Results"
        onOk={() => setModalQuizResultSummaryOpenStatus(false)}
        onCancel={() => {
          setModalQuizResultSummaryOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            {/* <button
              onClick={() => {
                RestartQuiz();
              }}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
            >
              Restart
            </button> */}


            <button
              onClick={() => { setModalQuizResultSummaryOpenStatus(false); GlobalHook.setPrevNextStatus("NextLession") }}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
            >
              ไปบทต่อไป
            </button>


            {(GlobalHook.getGlobalLessionSelect.mediaEtc1) ?
              <>

                <button
                  onClick={() => { setModalQuizResultSummaryOpenStatus(false); setIsReviewQuestion(true) }}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
                // disabled={!GlobalHook.getGlobalLessionSelect.mediaEtc1}
                >
                  ดูเฉลย
            </button>
              </> : <></>}

            {/* <button
              onClick={() => {
                setModalQuizResultSummaryOpenStatus(false);
              }}
              className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-400"
            >
              ReviewQuestion
            </button> */}
          </div>
        ]}
      >
        <div className="flex flex-col justify-center items-center mx-auto">
          <Pie data={dataResult} />

          {/* <div>ถูก {CalSocreFinish().correctAnswerAmount}</div>
          <div>
            ผิด
             {GlobalHook.getGlobalLessionSelect.mediaEtc5 -
              CalSocreFinish().correctAnswerAmount}
          </div>
          <div>จำนวนทำเสร็จ {CalSocreFinish().doneQuestionAmount}</div>

          <div>จำนวนข้อmทั้งหมด {GlobalHook.getGlobalLessionSelect.mediaEtc5}</div> */}
          <div>จำนวนข้อทั้งหมด {CalSocreFinish().questionAmount}</div>
        </div>
      </Modal>
    );
  }

  let dataResult = {
    labels: ["ถูก", "ผิด", "ข้าม"],
    datasets: [
      {
        data: [
          CalSocreFinish().correctAnswerAmount,
          CalSocreFinish().inCorrectAnswerAmount,
          CalSocreFinish().skipAnsAmount
        ],
        backgroundColor: ["#c6f1d6", "#ff8080", "#ffba92"]
      }
    ]
  };

  function CalSocreFinish() {
    let correctAnswerAmount = 0;
    let inCorrectAnswerAmount = 0;
    let skipAnsAmount = 0;
    let questionAmount = 0;
    let UserAnswerPool = getUserAnsBank;
    Object.values(UserAnswerPool).forEach(value => {

      if (value.result == true) {
        correctAnswerAmount++;
      } else if (value.result == false) {
        inCorrectAnswerAmount++;
      } else {
        skipAnsAmount++;
      }
      questionAmount++;
    });

    return {
      correctAnswerAmount,
      inCorrectAnswerAmount,
      skipAnsAmount,
      questionAmount
    };
  }

  function CalSocreResult(data) {
    //console.log(data)
    let correctAnswerAmount = 0;
    let inCorrectAnswerAmount = 0;
    let skipAnsAmount = 0;
    let questionAmount = 0;
    let UserAnswerPool = data;
    Object.values(UserAnswerPool).forEach(value => {

      if (value.result == true) {
        correctAnswerAmount++;
      } else if (value.result == false) {
        inCorrectAnswerAmount++;
      } else {
        skipAnsAmount++;
      }
      questionAmount++;
    });

    return {
      correctAnswerAmount,
      inCorrectAnswerAmount,
      skipAnsAmount,
      questionAmount
    };
  }

  function ResetUserAnsBank() {
    let UserAnsInitBank = {};
    getQuestionPool.map(item => {
      UserAnsInitBank[item.questionId] = { "Z": "Z" };

    });
    setUserAnsBank(UserAnsInitBank);
  }
  function RestartQuiz() {
    setIsReviewQuestion(false)
    setModalQuizResultSummaryOpenStatus(false);
    setShowTimeOutModal(false);
    GlobalHook.setGlobalStatusCode("resetUserClicker");



  }
  function ShowResult() {
    setModalQuizResultSummaryOpenStatus(true);
    clearInterval(countdown);

    var dt = new Date();
    setEndQuizTime(dt.getTime())

    if (GlobalHook.getGlobalToken && getisSubscription) {
      // LessionVisitedLogAction(
      //   GlobalHook,
      //   GlobalHook.getGlobalLessionSelect.mediaId
      // );

      //   let QuizLogData = {
      //     "correct":CalSocreFinish().correctAnswerAmount,
      //     "done":CalSocreFinish().doneQuestionAmount -
      //   CalSocreFinish().correctAnswerAmount,
      // "totalAmount":getQuestionAmount}
      if (!getIsReviewQuestion) {
        console.log('recording quiz results')
        console.log(GlobalHook.getGlobalLessionSelect.mediaEtc4)
        var passCondition = GlobalHook.getGlobalLessionSelect.mediaEtc4;
        console.log('your score')
        console.log(CalSocreFinish().correctAnswerAmount)
        var passResult = false;
        if (CalSocreFinish().correctAnswerAmount >= passCondition) {
          passResult = true;
        }

        QuizLogAction(GlobalHook, getUserAnsBank, getStartQuizTime, dt.getTime(), passResult);
      }

    }
  }


  useEffect(() => {
    if (GlobalHook.getGlobalToken && getisSubscription) {
      let user = GlobalHook.getGlobalUser;
      const findCourseMatch = user.courseSubscription.filter(
        data => data.courseId == GlobalHook.getGlobalcourseId
      );
      const findMatchLession = findCourseMatch[0].quizLog.filter(
        data => data.lessionId == GlobalHook.getGlobalLessionSelect.mediaId
      );

      setQuizHistory(findMatchLession);
    }
  }, [
    GlobalHook.getGlobalUser,
    getisSubscription,
    GlobalHook.getGlobalLessionSelect
  ]);

  const dataSource = getQuizHistory.map((data, index) => ({
    key: index,
    date: moment(parseInt(data.logTime)).format("DD/MM/YYYY HH:mm:ss"),
    finish: CalSocreResult(data.quizData).questionAmount - CalSocreResult(data.quizData).skipAnsAmount,
    correct: CalSocreResult(data.quizData).correctAnswerAmount,
    percentage: parseInt(
      (CalSocreResult(data.quizData).correctAnswerAmount / CalSocreResult(data.quizData).questionAmount) * 100
    )
  }));


  const columns = [
    {
      title: "วันที่/เวลา",
      dataIndex: "date",
      key: "date"
    },

    {
      title: "ทำเสร็จ(ข้อ)",
      dataIndex: "finish",
      key: "finish",
      sorter: (a, b) => a.finish - b.finish
    },
    {
      title: "ทำถูก(ข้อ)",
      dataIndex: "correct",
      key: "correct"
    },
    {
      title: "เปอร์เซ็นทำถูก",
      dataIndex: "percentage",
      key: "percentage"
    }
  ];

  function RenderQuizHistory() {
    return (
      <Modal
        visible={getModalQuizHistoryOpenStatus}
        title="QuizHistory"
        onOk={() => setModalQuizHistoryOpenStatus(false)}
        onCancel={() => {
          setModalQuizHistoryOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => setModalQuizHistoryOpenStatus(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        ]}
      >
        <div
          className="flex flex-col items-center mx-auto"
          style={{ maxWidth: "300px" }}
        >
          <div
            style={{
              maxWidth: "400px",
              height: "300px"
            }}
          >
            <Table
              dataSource={dataSource}
              columns={columns}
              className="overflow-y-scroll"
              style={{ maxHeight: "300px", width: "auto", minWidth: "400px" }}
            />
          </div>
        </div>
      </Modal>
    );
  }

  function CalShowAnsOrNot() {
    if (getIsReviewQuestion) {
      return true
    } else {
      if (getShowCorrectAns) {
        return true
      } else {
        return false
      }
    }


  }
  return (
    <>
      {RenderQuizTimeOut()}
      {RenderQuizResultSummary()}
      {RenderQuizHistory()}
      <div className="min-h-full h-auto w-full flex flex-col items-center justify-start py-4">
        {/* HEAD */}
        <div className="w-full flex mb-2  justify-center items-center">
          <FaCaretLeft
            className="hover:text-gray-700 text-gray-900 cursor-pointer"
            style={{ fontSize: "35px" }}
            onClick={() => GlobalHook.setPrevNextStatus("PrevLession")}
          />

          <div className="w-10/12 rounded-lg text-center text-white text-xl md:text-2xl font-bold  bg-blue-500 mx-2 py-2 px-2">
            {GlobalHook.getGlobalLessionSelect.mediaName}
          </div>
          <FaCaretRight
            className="hover:text-gray-700 text-gray-900 cursor-pointer"
            style={{ fontSize: "35px" }}
            onClick={() => GlobalHook.setPrevNextStatus("NextLession")}
          />
        </div>

        {/* BODY */}
        {GlobalHook.getGlobalLessionSelect.mediaEtc2 & getStartedQuiz ? (
          <div
            className="self-start flex items-center w-11/12 md:w-10/12 mx-auto pl-4 bg-transparent"
            style={{
              height: "50px"
            }}
          >
            <div className="bg-white w-auto p-3 rounded-lg border-dotted border-2">
              Remaining:{getRemainingTime}
            </div>
          </div>
        ) : (
            <div />
          )}
        {console.log('mama')}
        {console.log(GlobalHook.getGlobalLessionSelect.mediaTime)}
        {!getStartedQuiz && (
          <div
            className="bg-white w-11/12 md:w-10/12 flex flex-col items-center justify-center rounded-lg border-dotted border-2 py-6"
            style={{ minHeight: "60vh" }}
          >
            <div className="mb-6 text-lg">
              {" "}
              Quiz: {GlobalHook.getGlobalLessionSelect.mediaName}
            </div>
            <div className="mb-6">จำนวน {getQuestionAmount} ข้อ</div>
            {GlobalHook.getGlobalLessionSelect.mediaEtc2 && (
              <div className="mb-6">
                ใช้เวลาทำ {GlobalHook.getGlobalLessionSelect.mediaTime} นาที
              </div>
            )}

            <button
              className="bg-green-600 p-2 rounded text-white hover:bg-green-500 mb-8"
              onClick={() => {
                setStartedQuiz(true);
                // var dt = new Date( "December 25, 1995 23:15:20" );
                setStartQuizTime(Date.now())
                handleIsCountdown();
                GlobalHook.setMutantStatus(true);
                FetchQuestionWhenSelectAction(
                  GlobalHook,
                  getQuestionPool[0].questionId
                );
                setSelectQuestion(0);
                ResetUserAnsBank();
                setUserClick(null);
              }}
            >
              เริ่มทำแบบทดสอบ
            </button>
            {GlobalHook.getGlobalToken && (
              <button
                className="bg-orange-500 p-2 rounded text-white hover:bg-orange-400"
                onClick={() => {
                  setModalQuizHistoryOpenStatus(true);
                }}
              >
                ดูคะแนนย้อนหลัง
              </button>
            )}
          </div>
        )}

        {getStartedQuiz && (
          <div className="w-11/12 md:w-10/12 bg-white rounded-lg border-dotted border-2 flex flex-col items-center mt-4 ">
            <div
              id="QuestionEditorHead"
              className="w-full bg-white my-4 flex justify-between items-center"
              style={{ height: "50px" }}
            >
              <button
                className="text-5xl mr-4 "
                onClick={() => {
                  handlePreviousClick();
                }}
              >
                <FaCaretLeft />
              </button>
              <div className="w-full flex items-center overflow-x-auto  max-w-4xl mx-auto  justify-around bg-gray-100 rounded-lg p-2">
                {getQuestionPool.map((item, index) => {
                  return (
                    <div
                      className="bg-yellow-400 hover:bg-yellow-300 mx-2 rounded-full flex justify-center items-center text-xl cursor-pointer  border-dotted border-2"
                      style={{
                        minWidth: "40px",
                        minHeight: "40px",
                        backgroundColor:
                          getSelectQuestion == index ? "wheat" : "white"
                      }}
                      onClick={() => {
                        setSelectQuestion(index);
                        handleQuizSelect(index);
                      }}
                    >
                      {index + 1}
                    </div>
                  );
                })}
              </div>

              <button
                className="text-5xl ml-4 "
                onClick={() => {
                  handleNextClick();
                }}
              >
                <FaCaretRight />
              </button>
            </div>

            <div className="w-full  mb-4">
              {getIsReviewQuestion && (
                <div style={{ textAlign: "center", width: "60%", marginRight: "20%", marginLeft: "20%", color: "green" }}>
                  <p style={{ fontSize: "20px" }} > แสดงผลการเฉลย</p>
                </div>
              )}
              <TextEditor
                dataIn={GlobalHook.getGloblaQuizQuestionField}
                dataOut={() => { }}
                readOnly
                noAll
              />
              <div></div>
              {GlobalHook.getGloblaQuizAnswerType == "MultipleChoice" ? (
                <div className="flex flex-col w-full items-center mt-8">
                  {getAnsPool.map(item => {
                    return (
                      <div
                        className=" mt-4 rounded-lg flex justify-center items-center cursor-pointer border-dotted border-2"
                        style={{
                          minWidth: "200px",
                          minHeight: "40px",
                          display: item.id == "9999" ? "none" : "",
                          background:
                            getUserClick == item.content ? "lightblue" : "white"
                        }}
                        onClick={() => {
                          setUserClick(item.content);
                          UserAnsClick(item.content);
                        }}
                      >
                        {item.content}
                      </div>
                    );
                  })}
                </div>
              ) : (
                  <TextArea
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    value={getUserClick}
                    onChange={e => {
                      setUserClick(e.target.value);
                      UserAnsClick(e.target.value);
                    }}
                  />
                )}
              <div className="w-full flex  mt-8 flex-col items-center">
                {!CalShowAnsOrNot() && (
                  <button
                    className="bg-red-600 p-2 text-white font-semibold rounded-lg "
                    style={{
                      maxWidth: "200px",
                      background: getUserAnsBank[
                        getQuestionPool[getSelectQuestion].questionId
                      ]
                        ? "gray"
                        : "lightgray"
                    }}
                    onClick={() => {
                      if (
                        getUserAnsBank[
                        getQuestionPool[getSelectQuestion].questionId
                        ]
                      ) {
                        handleAnsSubmit();
                      }
                    }}
                  >
                    SUBMIT ANSWER
                  </button>
                )}

                {CalShowAnsOrNot() && (

                  <div className="flex flex-col items-center">
                    {/* <p className="green-500" style={{ fontSize: "20px" }} > แสดงผลการเฉลย</p> */}
                    {" "}
                    <div
                      className="flex flex-col items-start mt-6 w-10/12"
                      style={{ minHeight: "50px" }}
                    >
                      {!getUserAnsCheckStatus && (
                        <div
                          className="text-white bg-red-400 p-2 rounded-lg"
                          style={{ minWidth: "400px" }}
                        >
                          Incorrect ตอบผิด
                        </div>
                      )}
                      {getUserAnsCheckStatus && (
                        <div
                          className="text-white bg-green-500 p-2 rounded-lg"
                          style={{ minWidth: "400px" }}
                        >
                          Correct
                        </div>
                      )}
                      <div style={{ marginTop: "2vh" }}>
                        คําตอบที่ถูกต้อง:
                      </div>
                      <div style={{ marginTop: "1vh", marginLeft: "2vw" }}>
                        {GlobalHook.getGloblaQuizAnswerCorrect}
                      </div>
                      {console.log('answer')}
                      {console.log(GlobalHook.getGloblaQuizAnswerCorrect)}
                      {/* {console.log(getUserAnsBank[getQuestionPool[getSelectQuestion].questionId].ans)} */}


                      <div style={{ marginTop: "2vh" }}>
                        คําอธิบาย:
                        {GlobalHook.getGloblaQuizExplainType == "Text" ? (
                          <TextEditor
                            dataIn={GlobalHook.getGloblaQuizExplainField}
                            dataOut={() => { }}
                            readOnly
                            noAll
                          />
                        ) : (
                            <div style={{ width: "400px", height: "300px" }}>
                              <div
                                style={{
                                  padding: "56.25% 0 0 0",
                                  position: "relative"
                                }}
                              >
                                <iframe
                                  src={`https://player.vimeo.com/video/${GlobalHook.getGloblaQuizExplainField}?title=0&byline=0&portrait=0`}
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%"
                                  }}
                                  frameBorder="0"
                                  allow="autoplay; fullscreen"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                    {!getIsReviewQuestion && <>
                      {getSelectQuestion + 1 != getQuestionAmount && (
                        <button
                          className="bg-blue-500 p-2 text-white font-semibold rounded-lg mt-6"
                          onClick={() => {
                            handleNextClick();
                          }}
                        >
                          Next Question >
                        </button>
                      )}
                    </>
                    }
                    {!getIsReviewQuestion && <>
                      {getSelectQuestion + 1 == getQuestionAmount && (
                        <button
                          className="bg-orange-500 p-2 text-white font-semibold rounded-lg mt-6"
                          onClick={() => {
                            console.log('jaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                            console.log(GlobalHook.getGlobalLessionSelect)
                            ShowResult();
                          }}
                        >
                          View Results >
                        </button>
                      )}
                    </>}
                    {getIsReviewQuestion && (
                      <>
                        <button
                          onClick={() => { GlobalHook.setPrevNextStatus("NextLession") }}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
                        >
                          ไปบทต่อไป
                        </button>

                        {/* <button
                          onClick={() => {

                            RestartQuiz();
                          }}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
                        >
                          Restart
                      </button> */}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
