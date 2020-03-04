import React, { useContext, useState, useEffect } from "react";
import { Input, message, Button, Modal, Tabs, Select, Table } from "antd";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCaretLeft,
  FaCaretRight
} from "react-icons/fa";
import { GlobalContext, CourseQuizContext } from "../../hook/GlobalHook";
import TextEditor from "../../components/textEditor/TextEditor";
import QuestionHeadNumberDrag from "./quiz/QuestionHeadNumberDrag";
import CreateAnswerDrag from "./quiz/CreateAnswerDrag";
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

  const [getQuestionPool, setQuestionPool] = useState();
  const [getAnsPool, setAnsPool] = useState([]);
  const [getUserAnsBank, setUserAnsBank] = useState({});
  const [getShowCorrectAns,setShowCorrectAns] = useState(true)
  const [getAnsSubtmited,setAnsSubtmited] = useState(false)
  useEffect(() => {
   console.log(getUserAnsBank)
  },);
  useEffect(() => {
    setAnsPool(shuffle(GlobalHook.getGloblaQuizAnswerField));
  }, [GlobalHook.getGloblaQuizAnswerField]);

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
    if (GlobalHook.getGlobalStatusCode == "resetCounter") {
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
      FetchQuestionWhenSelectAction(GlobalHook, FinalQuizBank[0].questionId);
    }
  }, [GlobalHook.getGlobalMediaQuiz]);

  function handleQuizSelect(index) {
  

    ClearCreateQuizFieldAction(GlobalHook);

    FetchQuestionWhenSelectAction(
      GlobalHook,
      getQuestionPool[index].questionId
    );
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
    console.log(content)
    let oldUserAnsBank = getUserAnsBank;
    oldUserAnsBank[getQuestionPool[getSelectQuestion].questionId] = `${content}`;
    setUserAnsBank(oldUserAnsBank);

    console.log(oldUserAnsBank)
  }


  function handleAnsSubmit(){
    setAnsSubtmited(true)
    if(GlobalHook.getGlobalLessionSelect.mediaEtc1){
      setShowCorrectAns(true)
    }else{
      setShowCorrectAns(false)

    }
  }

  return (
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
          <div className="bg-white w-auto p-3 rounded-lg">
            Remaining:{getRemainingTime}
          </div>
        </div>
      ) : (
        <div />
      )}
      {!getStartedQuiz && (
        <div
          className="bg-white w-11/12 md:w-10/12 flex flex-col items-center justify-center rounded-lg border-dotted border-2 py-6"
          style={{ minHeight: "60vh" }}
        >
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
              handleIsCountdown();
              GlobalHook.setMutantStatus(true);
            }}
          >
            เริ่มทำแบบทดสอบ
          </button>
          {GlobalHook.getGlobalToken && (
            <button
              className="bg-yellow-500 p-2 rounded text-white hover:bg-yellow-400"
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
            <div className="w-full flex items-center overflow-x-auto  max-w-4xl mx-auto bg-blue-200 justify-around">
              {getQuestionPool.map((item, index) => {
                return (
                  <div
                    className="bg-yellow-400 hover:bg-yellow-300 mx-2 rounded-full flex justify-center items-center text-xl cursor-pointer "
                    style={{
                      minWidth: "40px",
                      minHeight: "40px",
                      backgroundColor:
                        getSelectQuestion == index ? "green" : "yellow"
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
            <TextEditor
              dataIn={GlobalHook.getGloblaQuizQuestionField}
              dataOut={() => {}}
              readOnly
              noAll
            />
            {GlobalHook.getGloblaQuizAnswerType == "MultipleChoice" ? (
              <div className="flex flex-col w-full items-center mt-8">
                {getAnsPool.map(item => {
                  return (
                    <div
                      className=" mt-4 rounded-lg flex justify-center items-center cursor-pointer "
                      style={{
                        minWidth: "200px",
                        minHeight: "40px",
                        display: item.id == "9999" ? "none" : "",
                        backgroundColor:
                          getUserAnsBank[
                            getQuestionPool[getSelectQuestion].questionId
                          ] == item.content
                            ? "pink"
                            : "yellow"
                      }}
                      onClick={() => {
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
                value={GlobalHook.getGloblaQuizAnswerCorrect}
                onChange={e => {
                  GlobalHook.setGlobalUserAnswerSelect(e.target.value);
                }}
              />
            )}
            <div className="w-full flex  mt-8 flex-col items-center">
              <button
                className="bg-gray-600 p-2 text-white font-semibold rounded-lg "
                style={{ maxWidth: "200px" }}
                onClick={() => {handleAnsSubmit()}}
              >
                SUBMIT ANSWER
              </button>

          {  true &&   <div className="flex flex-col items-center"> <div
                className="bg-red-400 flex flex-col items-start mt-6 w-10/12"
                style={{ minHeight: "50px" }}
              >
                <div>Incorrect</div>
                <div>
                  {GlobalHook.getGloblaQuizExplainType == "Text" ? (
                    <TextEditor
                      dataIn={GlobalHook.getGloblaQuizExplainField}
                      dataOut={() => {}}
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
              <button
                className="bg-blue-500 p-2 text-white font-semibold rounded-lg mt-6"
                onClick={() => {}}
              >
                Next Question >
              </button> </div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
