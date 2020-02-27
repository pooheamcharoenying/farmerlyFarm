import React, { useContext, useState, useEffect } from "react";
import { Input, message, Button, Modal, Tabs, Select, Table } from "antd";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCaretLeft,
  FaCaretRight
} from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import moment from "moment";
import { GlobalContext } from "../../hook/GlobalHook";
import QuestionHeadNumberDrag from "./quiz/QuestionHeadNumberDrag";
import TextEditor from "../../components/textEditor/TextEditor";
import CreateAnswerDrag from "./quiz/CreateAnswerDrag";
import { QuizLogAction } from "../../actions";
import TextEditorComp from "../textEditor/TextEditor";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
export default function CourseQuizContent() {
  const GlobalHook = useContext(GlobalContext);
  const [getStartedQuiz, setStartedQuiz] = useState(false);
  const [getQuestionAmount, setQuestionAmount] = useState(0);
  const [getModalExplainOpenStatus, setModalExplainOpenStatus] = useState(
    false
  );
  const [getRemainingTime, setRemainingTime] = useState("");
  const [
    getModalQuizResultSummaryOpenStatus,
    setModalQuizResultSummaryOpenStatus
  ] = useState(false);
  const [
    getModalQuizHistoryOpenStatus,
    setModalQuizHistoryOpenStatus
  ] = useState(false);
  const [getShowTimeOutModal, setShowTimeOutModal] = useState(false);

  const [getQuizHistory, setQuizHistory] = useState([]);
  const [getQuizHistoryDataSelect, setQuizHistoryDataSelect] = useState("");
  const [getisSubscription, setisSubscription] = useState(false);

  useEffect(() => {
    if (GlobalHook.getGlobalUser) {
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseId == GlobalHook.getGlobalcourseId) {
          setisSubscription(true);
        }
      });
    }
  }, [GlobalHook.getGlobalUser]);

  useEffect(() => {
    if (GlobalHook.getGlobalMediaQuiz) {
    }
  }, [GlobalHook.getGlobalMediaQuiz]);

  useEffect(() => {
    if (GlobalHook.getGlobalMediaQuiz) {
      if (
        parseInt(GlobalHook.getGlobalMediaQuiz.length) -
          parseInt(GlobalHook.getGlobalLessionSelect.mediaEtc5) ==
        0
      ) {
        setQuestionAmount(parseInt(GlobalHook.getGlobalMediaQuiz.length));
      } else {
        setQuestionAmount(
          parseInt(GlobalHook.getGlobalMediaQuiz.length) -
            parseInt(GlobalHook.getGlobalLessionSelect.mediaEtc5)
        );
      }
    }
  }, [GlobalHook.getGlobalMediaQuiz]);

  function CheckanswerResult() {
    if (GlobalHook.getGlobalUserAnswerSelect != "") {
      if (
        GlobalHook.getGloblaQuizAnswerCorrect ==
        GlobalHook.getGlobalUserAnswerSelect
      ) {
        return (
          <div className="flex items-center">
            คุณตอบถูก
            <FaCheckCircle className="text-green-500 ml-2" />
          </div>
        );
      } else {
        return (
          <div className="flex items-center">
            คุณตอบผิด
            <FaTimesCircle className="text-red-500 ml-2" />
          </div>
        );
      }
    }
  }
  function CreateExplainPopUp() {
    return (
      <Modal
        visible={getModalExplainOpenStatus}
        onOk={() => setModalExplainOpenStatus(false)}
        onCancel={() => {
          setModalExplainOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => setModalExplainOpenStatus(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
            {GlobalHook.getGloblaQuizQuestionSelect.selfIndex + 1 ==
            getQuestionAmount ? (
              <button
                onClick={() => {
                  FinishQuizClick();
                }}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
              >
                Finish
              </button>
            ) : (
              <button
                onClick={() => {
                  GlobalHook.setPrevNextStatus("Next");
                  setModalExplainOpenStatus(false);
                  AnswerLog();
                }}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
              >
                Next
              </button>
            )}
          </div>
        ]}
      >
        <div
          className="flex flex-col justify-center items-center mx-auto"
          style={{ maxWidth: "300px" }}
        >
          <div className="mb-4 text-xl"> {CheckanswerResult()}</div>

          <div className="mb-2 text-lg underline">คำอธิบาย</div>

          {GlobalHook.getGloblaQuizExplainType == "Text" ? (
            <TextEditor
              dataIn={GlobalHook.getGloblaQuizExplainField}
              dataOut={() => {}}
              readOnly
              noAll
            />
          ) : (
            <div style={{ width: "400px", height: "300px" }}>
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
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
      </Modal>
    );
  }

  function handleIsCountdown() {
    if (GlobalHook.getGlobalLessionSelect.mediaEtc2) {
      startTimer(GlobalHook.getGlobalLessionSelect.mediaTime);
    }
  }
  function startTimer(duration) {
    let timer = duration * 60,
      minutes,
      seconds;
    let countdown = setInterval(() => {
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
  function AnswerLog() {}

  function FinishQuizClick() {
    setModalQuizResultSummaryOpenStatus(true);
    setModalExplainOpenStatus(false);
    if (GlobalHook.getGlobalToken) {
      QuizLogAction(GlobalHook);
    }
  }

  function RenderQuizTimeOut() {
    return (
      <Modal
        visible={getShowTimeOutModal}
        title="QuizResultSummary"
        onOk={() => setShowTimeOutModal(false)}
        onCancel={() => {
          setShowTimeOutModal(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => setShowTimeOutModal(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
            >
              Ignore
            </button>

            <button
              onClick={() => {
                setShowTimeOutModal(false);
                FinishQuizClick();
              }}
              className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-400"
            >
              Submit
            </button>

            <button
              onClick={() => {
                setShowTimeOutModal(false);
                handleRestartClick();
              }}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
            >
              Restart
            </button>
          </div>
        ]}
      >
        TimeOut
      </Modal>
    );
  }

  function RenderQuizResultSummary() {
    return (
      <Modal
        visible={getModalQuizResultSummaryOpenStatus}
        title="QuizResultSummary"
        onOk={() => setModalQuizResultSummaryOpenStatus(false)}
        onCancel={() => {
          setModalQuizResultSummaryOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => setModalQuizResultSummaryOpenStatus(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
            >
              Close
            </button>

            <button
              onClick={() => {
                setModalQuizResultSummaryOpenStatus(false);
                GlobalHook.setGlobalQuizFinishStatus(true);
              }}
              className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-400"
            >
              ReviewQuestion
            </button>

            <button
              onClick={() => {
                setModalQuizResultSummaryOpenStatus(false);
                handleRestartClick();
              }}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
            >
              Restart
            </button>
          </div>
        ]}
      >
        <div className="flex flex-col justify-center items-center mx-auto">
          <Pie data={dataFinish} />

          <div>ถูก{CalSocreFinish().correctAnswerAmount}</div>
          <div>
            ผิด
            {GlobalHook.getGlobalLessionSelect.mediaEtc5 -
              CalSocreFinish().correctAnswerAmount}
          </div>
          <div>จำนวนทำเสร็จ{CalSocreFinish().doneQuestionAmount}</div>

          <div>จำนวนข้อ{GlobalHook.getGlobalLessionSelect.mediaEtc5}</div>
        </div>
      </Modal>
    );
  }
  const dataFinish = {
    labels: ["ถูก", "ผิด", "ข้าม"],
    datasets: [
      {
        data: [
          CalSocreFinish().correctAnswerAmount,
          CalSocreFinish().doneQuestionAmount -
            CalSocreFinish().correctAnswerAmount,
          GlobalHook.getGlobalLessionSelect.mediaEtc5 -
            CalSocreFinish().doneQuestionAmount
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  };

  function CalSocreFinish() {
    let correctAnswerAmount = 0;
    let doneQuestionAmount = 0;
    let UserAnswerPool = GlobalHook.getGlobalUserAnswerPool;
    Object.values(UserAnswerPool).forEach(value => {
      if (value.result == "true") {
        correctAnswerAmount++;
      }
      doneQuestionAmount++;
    });
    return {
      correctAnswerAmount: correctAnswerAmount,
      doneQuestionAmount: doneQuestionAmount
    };
  }

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
              style={{ maxHeight: "300px", width: "auto" }}
            />
          </div>
        </div>
      </Modal>
    );
  }

  const dataSource2 = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street"
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street"
    }
  ];

  const dataSource = getQuizHistory.map(data => ({
    key: 1,
    date: moment(parseInt(data.logTime)).format("DD/MM/YYYY HH:mm:ss"),
    finish: CalQuizHistoryFinish(data),
    correct: CalQuizHistoryCorrect(data),
    percentage: CalQuizHistoryPercentage(data)
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
      key: "correct",
      sorter: (a, b) => a.correct - b.correct
    },
    {
      title: "เปอร์เซ็นทำถูก",
      dataIndex: "percentage",
      key: "percentage"
    }
  ];

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
  }, [GlobalHook.getGlobalUser]);

  function CalQuizHistoryCorrect(data) {
    let correctAnswerAmount = 0;
    let doneQuestionAmount = 0;
    if (data.quizData) {
      Object.values(data.quizData).forEach(value => {
        if (value.result == "true") {
          correctAnswerAmount++;
        }
      });
    }
    return correctAnswerAmount;
  }

  function CalQuizHistoryFinish(data) {
    let doneQuestionAmount = 0;
    if (data.quizData) {
      Object.values(data.quizData).forEach(value => {
        doneQuestionAmount++;
      });
    }
    return doneQuestionAmount;
  }

  function CalQuizHistoryPercentage(data) {
    let correctAnswerAmount = 0;
    let doneQuestionAmount = 0;
    let percentage = "-";
    if (data.quizData) {
      Object.values(data.quizData).forEach(value => {
        if (value.result == "true") {
          correctAnswerAmount++;
        }
        doneQuestionAmount++;
      });
    }
    percentage = (correctAnswerAmount / doneQuestionAmount) * 100;
    return percentage;
  }

  function handleRestartClick() {
    handleIsCountdown();
    GlobalHook.setGlobalUserAnswerPool({});
    GlobalHook.setGlobalQuizFinishStatus(false);
    GlobalHook.setPrevNextStatus("RestartQuiz");
  }

  return (
    <>
      {CreateExplainPopUp()}
      {RenderQuizResultSummary()}
      {RenderQuizHistory()}
      {RenderQuizTimeOut()}
      <div className="min-h-full h-auto w-full flex flex-col items-center justify-start py-4">
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
        <div
          className="self-start flex items-center w-11/12 md:w-10/12 mx-auto pl-4 bg-transparent"
          style={{
            height: "50px",
            display: getRemainingTime ? "flex" : "none"
          }}
        >
          <div className="bg-white w-auto p-3 rounded-lg">
            Remaining:{getRemainingTime}
          </div>
        </div>
        <div className="flex flex-col overflow-y-auto  h-full w-full items-center">
          {getStartedQuiz ? (
            <div className="w-11/12 md:w-10/12 bg-white rounded-lg border-dotted border-2 flex flex-col items-center">
              <div
                id="QuestionEditorHead"
                className="w-full bg-white mb-4"
                style={{ height: "50px" }}
              >
                <QuestionHeadNumberDrag />
              </div>

              <div className="w-full bg-blue-400 mb-4">
                <TextEditor
                  dataIn={GlobalHook.getGloblaQuizQuestionField}
                  dataOut={() => {}}
                  readOnly
                  noAll
                />
              </div>

              <div className="w-full bg-blue-400 mb-4">
                {GlobalHook.getGloblaQuizAnswerType == "MultipleChoice" ? (
                  <CreateAnswerDrag />
                ) : (
                  <div className="flex flex-col w-10/12">
                    {" "}
                    <TextArea
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      value={GlobalHook.getGloblaQuizAnswerCorrect}
                      onChange={e => {
                        GlobalHook.setGlobalUserAnswerSelect(e.target.value);
                      }}
                    />
                  </div>
                )}
              </div>

              {GlobalHook.getGloblaQuizQuestionSelect.selfIndex + 1 ==
              getQuestionAmount ? (
                <div>
                  {GlobalHook.getGlobalLessionSelect.mediaEtc1 && (
                    <button
                      className="bg-green-600 p-2 rounded text-white hover:bg-green-500 mb-4 mr-2"
                      onClick={() => {
                        setModalExplainOpenStatus(true);
                        AnswerLog();
                      }}
                    >
                      Submmit
                    </button>
                  )}
                  <button
                    onClick={() => {
                      FinishQuizClick();
                    }}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
                  >
                    Finish
                  </button>
                </div>
              ) : (
                <div>
                  {GlobalHook.getGlobalLessionSelect.mediaEtc1 ? (
                    <button
                      className="bg-green-600 p-2 rounded text-white hover:bg-green-500 mb-4"
                      onClick={() => {
                        setModalExplainOpenStatus(true);
                        AnswerLog();
                      }}
                    >
                      Submmit
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        GlobalHook.setPrevNextStatus("Next");
                        setModalExplainOpenStatus(false);
                        AnswerLog();
                      }}
                      className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
                    >
                      Next
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div
              className="bg-white w-11/12 md:w-10/12 flex flex-col items-center justify-center rounded-lg border-dotted border-2 py-6"
              style={{ minHeight: "60vh" }}
            >
              <div className="mb-6">จำนวน {getQuestionAmount} ข้อ</div>
             {GlobalHook.getGlobalLessionSelect.mediaEtc2&& <div className="mb-6">
                ใช้เวลาทำ{GlobalHook.getGlobalLessionSelect.mediaTime} นาที
              </div>}

              <button
                className="bg-green-600 p-2 rounded text-white hover:bg-green-500 mb-8"
                onClick={() => {
                  setStartedQuiz(true);
                  handleIsCountdown();
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
              {!GlobalHook.getGlobalToken && (
                <button
                  className="bg-yellow-500 p-2 rounded text-white hover:bg-yellow-400"
                  onClick={() => {
                    GlobalHook.setGlobalShowLoginModal(true);
                  }}
                >
                  ดูคะแนนย้อนหลัง
                </button>
              )}
            </div>
          )}
        </div>
        <div style={{minHeight:"60px"}}/>
      </div>
    </>
  );
}
