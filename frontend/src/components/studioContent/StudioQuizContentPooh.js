import React, { useState, useEffect, useContext } from "react";
import { Input, Switch, Select, Tabs, Popover } from "antd";
import { FaTrashAlt, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import SwitchR from "react-switch";
import TagCom from '../tagCom/TagCom'

import { GlobalContext, NewContext } from "../../hook/GlobalHook";
import QuizHead from "./horizonDrag/QuizHead";
import TextEditor from "./quiz/TextEditor";
import CreateAnswerDrag from "./quiz/CreateAnswerDrag";
import VideoUpload from "./quiz/VideoUpload";
import { SaveAllAction, CheckMutateAction, deleteQuestionsInQuiz, deleteQuestionById, SaveCourseStructureOnly, getSubjectCategories, getSubjectLevels, deleteMediaFromDB } from "../../actions";
import TextEditorComp from "../textEditor/TextEditor";



const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const StudioQuizContent = () => {
  const GlobalHook = useContext(GlobalContext);

  const [getGlobalLessionSelectNew, setGlobalLessionSelectNew] = useContext(
    NewContext
  );

  const [getLessionTime, setLessionTime] = useState(null);
  const [getLessionName, setLessionName] = useState("");
  const [getQuizSettingShowAns, setQuizSettingShowAns] = useState(
    getGlobalLessionSelectNew.mediaEtc1
  );
  const [getQuizSettingTimeCount, setQuizSettingTimeCount] = useState(
    getGlobalLessionSelectNew.mediaEtc2
  );
  const [getQuizSettingRandom, setQuizSettingRandom] = useState(
    getGlobalLessionSelectNew.mediaEtc3
  );

  const [getLessionPreview, setLessionPreview] = useState(GlobalHook.getGlobalLessionSelect.mediaPreview);


  const [getQuizSettingAmountPass, setQuizSettingAmountPass] = useState(1);
  const [getQuizSettingAmountRandom, setQuizSettingAmountRandom] = useState(1);
  const [getShowConfirmDel, setShowConfirmDel] = useState(false);
  const [getShowConfirmDelQuestion, setShowConfirmDelQuestion] = useState(
    false
  );
  const [getInitStateName, setInitStateName] = useState(null);
  const [getInitStateTime, setInitStateTime] = useState("");
  const [getInitStateSettingShowAns, setInitStateSettingShowAns] = useState(
    true
  );
  const [getInitStateSettingTimeCount, setInitStateSettingTimeCount] = useState(
    true
  );
  const [getInitStateSettingRandom, setInitStateSettingRandom] = useState(true);
  const [
    getInitStateSettingAmountPass,
    setInitStateSettingAmountPass
  ] = useState(1);
  const [
    getInitStateSettingAmountRandom,
    setInitStateSettingAmountRandom
  ] = useState(1);

  const [getQuizDataPool, setQuizDataPool] = useState([{ mock: "1" }]);


  const [getSubjectMenu, setSubjectMenu] = useState([]);
  const [getSubjects, setSubjects] = useState([]);
  const [getLevels, setLevels] = useState([]);

  useEffect(() => {
    console.log('getting subjects')
    getSubjectCategories()
      .then(data => {

        setSubjects(data)
        GlobalHook.setGlobalCourseSubjectFilter("All Subjects");
      })
      .catch(error => {
        console.log(error)
      })

    getSubjectLevels()
      .then(data => {
        console.log('show levels')
        console.log(data)
        for (var x of data) {
          if (x.type == "levelmenu") {
            console.log('level menu found')
            console.log(x)
            setLevels(x.menu)
          }
          if (x.type == "subjectmenu") {
            console.log('subject menu found')
            console.log(x)
            setSubjectMenu(x.menu)
          }
        }
        GlobalHook.setGlobalCourseLevelFilter("ทั้งหมด");
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  useEffect(() => {
    console.log('supersaiya')
    console.log(GlobalHook.getGlobalMediaNew)
    if (GlobalHook.getGlobalMediaNew) {
      setQuizDataPool(GlobalHook.getGlobalMediaNew);
    }

  }, [GlobalHook.getGlobalMediaNew]);

  // useEffect(() => {
  //   if(GlobalHook.getGlobalLessionSelect){
  //     setLessionName(GlobalHook.getGlobalLessionSelect.mediaName)
  //   }
  // }, )



  useEffect(() => {
    if (GlobalHook.getGlobalMessage == "ClearAll") {
      setInitStateSettingAmountPass(0)
      setQuizSettingShowAns(null)
      setQuizSettingTimeCount(null)
      setQuizSettingRandom(null)
      setQuizSettingAmountRandom(0)
      setQuizSettingAmountPass(0)
      //  setLessionName(getGlobalLessionSelectNew.mediaName)


      setTimeout(() => {
        GlobalHook.setGlobalMessage(null)
      }, 1000);

    }
  }, [GlobalHook.getGlobalMessage]);

  useEffect(() => {
    setLessionName(getGlobalLessionSelectNew.mediaName);
    setInitStateName(getGlobalLessionSelectNew.mediaName);

    setLessionTime(getGlobalLessionSelectNew.mediaTime);
    setInitStateTime(getGlobalLessionSelectNew.mediaTime);

    setQuizSettingShowAns(getGlobalLessionSelectNew.mediaEtc1);
    setInitStateSettingShowAns(getGlobalLessionSelectNew.mediaEtc1);

    setQuizSettingTimeCount(getGlobalLessionSelectNew.mediaEtc2);
    setInitStateSettingTimeCount(getGlobalLessionSelectNew.mediaEtc2);

    setQuizSettingRandom(getGlobalLessionSelectNew.mediaEtc3);
    setInitStateSettingRandom(getGlobalLessionSelectNew.mediaEtc3);

    setQuizSettingAmountPass(getGlobalLessionSelectNew.mediaEtc4);
    setInitStateSettingAmountPass(getGlobalLessionSelectNew.mediaEtc4);

    setQuizSettingAmountRandom(getGlobalLessionSelectNew.mediaEtc5);
    setInitStateSettingAmountRandom(getGlobalLessionSelectNew.mediaEtc5);


  }, [getGlobalLessionSelectNew]);





  //Mutate
  useEffect(() => {
    // CheckMutateAction(GlobalHook, getInitStateName, getLessionName);
    if (GlobalHook.getMutantStatus == true) {
      GlobalHook.setMutantStatus(false)
    } else {
      GlobalHook.setMutantStatus(true)
    }
  }, [getLessionName, getLessionPreview, getLessionTime]);

  // useEffect(() => {
  //   CheckMutateAction(GlobalHook, getInitStateTime, getLessionTime);
  // }, [getLessionTime]);

  useEffect(() => {
    CheckMutateAction(
      GlobalHook,
      getInitStateSettingShowAns,
      getQuizSettingShowAns
    );
  }, [getQuizSettingShowAns]);

  useEffect(() => {
    CheckMutateAction(
      GlobalHook,
      getInitStateSettingTimeCount,
      getQuizSettingTimeCount
    );
  }, [getQuizSettingTimeCount]);

  useEffect(() => {
    CheckMutateAction(
      GlobalHook,
      getInitStateSettingRandom,
      getQuizSettingRandom
    );
  }, [getQuizSettingRandom]);

  useEffect(() => {
    CheckMutateAction(
      GlobalHook,
      getInitStateSettingAmountPass,
      getQuizSettingAmountPass
    );
  }, [getQuizSettingAmountPass]);

  useEffect(() => {
    CheckMutateAction(
      GlobalHook,
      getInitStateSettingAmountRandom,
      getQuizSettingAmountRandom
    );
  }, [getQuizSettingAmountRandom]);

  useEffect(() => {
    console.log('woonaanaa')
    let oldCourseStructure = GlobalHook.getGlobalCourseStructure;
    const { parentIndex, selfIndex } = getGlobalLessionSelectNew;
    if (oldCourseStructure[parentIndex] && getLessionName) {
      oldCourseStructure[parentIndex].subItems[
        selfIndex
      ].title = getLessionName;
      oldCourseStructure[parentIndex].subItems[selfIndex].time = getLessionTime;
      oldCourseStructure[parentIndex].subItems[selfIndex].preview = getLessionPreview;
      oldCourseStructure[parentIndex].subItems[
        selfIndex
      ].etc1 = getQuizSettingShowAns;
      oldCourseStructure[parentIndex].subItems[
        selfIndex
      ].etc2 = getQuizSettingTimeCount;
      oldCourseStructure[parentIndex].subItems[
        selfIndex
      ].etc3 = getQuizSettingRandom;
      oldCourseStructure[parentIndex].subItems[
        selfIndex
      ].etc4 = getQuizSettingAmountPass;
      oldCourseStructure[parentIndex].subItems[
        selfIndex
      ].etc5 = getQuizSettingAmountRandom;

      // console.log(oldCourseStructure)
      GlobalHook.setGlobalCourseStructure(oldCourseStructure);
    }
  }, [
    getLessionName,
    getLessionTime,
    getQuizSettingAmountPass,
    getQuizSettingShowAns,
    getQuizSettingTimeCount,
    getQuizSettingRandom,
    getQuizSettingAmountRandom,
    getGlobalLessionSelectNew,
    getLessionPreview
  ]);

  function handleDeleteLession() {
    let oldCourseStructure = GlobalHook.getGlobalCourseStructure;
    const { parentIndex, selfIndex } = getGlobalLessionSelectNew;

    console.log('banoffee')
    console.log(parentIndex)
    console.log(oldCourseStructure[parentIndex].subItems[selfIndex].mediaId)

    deleteQuestionsInQuiz(oldCourseStructure[parentIndex].subItems[selfIndex].mediaId);

    deleteMediaFromDB(GlobalHook)

    GlobalHook.setGlobalLessionSelect({ mediaType: "CourseOverview" });

    if (oldCourseStructure[parentIndex]) {
      oldCourseStructure[parentIndex].subItems.splice(selfIndex, 1);
      console.log('check global')
      console.log(oldCourseStructure)

      GlobalHook.setGlobalCourseStructure(oldCourseStructure);

      SaveCourseStructureOnly(GlobalHook);
    }
  }

  function handleDeleteQuestion() {
    let oldQuizStructure = GlobalHook.getGlobalMediaQuiz;
    const { selfIndex } = GlobalHook.getGloblaQuizQuestionSelect;
    GlobalHook.setGloblaQuizQuestionSelect({});

    console.log('handleDeleteQuestion1')
    console.log(GlobalHook.getGlobalMediaQuiz)
    console.log(selfIndex)
    console.log(oldQuizStructure)

    if (oldQuizStructure[selfIndex]) {
      deleteQuestionById(oldQuizStructure[selfIndex]);

      oldQuizStructure.splice(selfIndex, 1);

      GlobalHook.setGloblaQuizQuestionSelect(oldQuizStructure);
      console.log('handleDeleteQuestion2')
      console.log(GlobalHook.getGlobalMediaQuiz)
      SaveCourseStructureOnly(GlobalHook);
    }
  }

  function renderQuizPassCondition() {

    if(typeof(getQuizDataPool) == "object") {
      console.log("enter")
      console.log(typeof(getQuizDataPool))
      console.log(getQuizDataPool.length)
      
      if (getQuizDataPool.length > 1) {
        return (
          <>
            <Select
              style={{ maxWidth: "100px", width: "100px" }}
              className="self-center"
              defaultValue="0"
              onChange={e => setQuizSettingAmountPass(e)}
              value={getQuizSettingAmountPass}
            >
              <Option value={0}>{0}</Option>
              {getQuizDataPool.map((temp, index) => (
                <Option value={index + 1}>{index + 1}</Option>
              ))}
  
            </Select>
          </>
        )
      } else {
  
        return (
          <>
            <Select
              style={{ maxWidth: "100px", width: "100px" }}
              className="self-center"
              defaultValue="0"
              onChange={e => setQuizSettingAmountPass(e)}
              value={getQuizSettingAmountPass}
            >
                            <Option value={0}>{0}</Option>
              
              <Option value={1}> 1 </Option>
            </Select>
          </>
        )
      }
    }
  }

  function renderQuizRandomCondition() {

    if(typeof(getQuizDataPool) == "object") {
      console.log("enter")
      console.log(typeof(getQuizDataPool))
      console.log(getQuizDataPool.length)
      
      if (getQuizDataPool.length > 1) {
        return (
          <>
            <Select
              style={{ maxWidth: "100px", width: "100px" }}
              className="self-center"
              defaultValue="0"
              onChange={e => setQuizSettingAmountRandom(e)}
              value={getQuizSettingAmountRandom}
              disabled={!getQuizSettingRandom}
            >

  
            </Select>
          </>
        )
      } else {
  
        return (
          <>
            <Select
              style={{ maxWidth: "100px", width: "100px" }}
              className="self-center"
              defaultValue="0"
              onChange={e => setQuizSettingAmountRandom(e)}
              value={getQuizSettingAmountRandom}
              disabled={!getQuizSettingRandom}
            >
                            <Option value={0}>{0}</Option>
              
              <Option value={1}> 1 </Option>
            </Select>
          </>
        )
      }
    }
  }

  return (
    <div className=" h-auto min-h-full w-full flex flex-col items-center py-4 justify-start">
      {/* //////////////////////HEAD////////// */}
      <div className="w-full flex mb-2  justify-center items-center">
        <FaCaretLeft
          className="hover:text-gray-700 text-gray-900 cursor-pointer"
          style={{ fontSize: "35px" }}
          onClick={() => GlobalHook.setPrevNextStatus("PrevLession")}
        />

        <div className="w-10/12 rounded-lg text-center text-white text-xl md:text-2xl font-bold  bg-blue-500 mx-2 py-2 px-2">
          {getLessionName}
        </div>
        <FaCaretRight
          className="hover:text-gray-700 text-gray-900 cursor-pointer"
          style={{ fontSize: "35px" }}
          onClick={() => GlobalHook.setPrevNextStatus("NextLession")}
        />
      </div>

      {/* ////////////////INFO////////////*/}
      <div className="flex flex-col text-center mb-4">
        <div className="flex items-baseline justify-center">
          <div className="font-bold text-lg mb-2">ชื่อบทเรียน</div>
          <Popover
            content={
              <div className="flex w-full justify-center">
                <div
                  className="text-red-600 hover:text-red-400 mr-4 cursor-pointer"
                  onClick={() => {
                    setShowConfirmDel(false);
                    handleDeleteLession();
                  }}
                >
                  Delete
                </div>{" "}
                <div
                  className="text-gray-600 hover:text-gray-500 cursor-pointer"
                  onClick={() => {
                    setShowConfirmDel(false);
                  }}
                >
                  cancel
                </div>
              </div>
            }
            title="Are you sure to delete this Lession?"
            trigger="click"
            visible={getShowConfirmDel}
            onVisibleChange={() => setShowConfirmDel(!getShowConfirmDel)}
          >
            <FaTrashAlt className="text-red-600 ml-4 text-xl cursor-pointer hover:text-red-500 " />
          </Popover>
        </div>

        <Input
          value={getLessionName}
          onChange={e => { setLessionName(e.target.value) }}
        />
      </div>

      <div className="flex flex-col text-center mb-6 justify-center">
        <div className="font-bold text-lg mb-2">Lesson Preview</div>
        <SwitchR
          className="self-center"
          onChange={e => setLessionPreview(e)}
          checked={getLessionPreview}
        />

      </div>

      {console.log("siberia")}
      {console.log(getQuizDataPool)}
      {/* {console.log(getQuizDataPool.length)} */}


      <div className="flex justify-around w-10/12 md:w-4/12 mb-4">
        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">ข้อกำหนดในการผ่าน</div>

          {renderQuizPassCondition()}

          {/* <Select
            style={{ maxWidth: "100px", width: "100px" }}
            className="self-center"
            defaultValue="1"
            onChange={e => setQuizSettingAmountPass(e)}
            value={getQuizSettingAmountPass}
          >
           <Option value={1}> Nes No </Option>
           <Option value={2}> Yes Yo </Option>
          </Select> */}

          {/* <Select
            style={{ maxWidth: "100px", width: "100px" }}
            className="self-center"
            defaultValue="1"
            onChange={e => setQuizSettingAmountPass(e)}
            value={getQuizSettingAmountPass}
          >
            
            {getQuizDataPool.map((temp, index) => (
              <Option value={index + 1}>{index + 1}</Option>
            ))} 

          </Select> */}
        </div>

        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">เฉลยทันที</div>

          <SwitchR
            className="self-center"
            onChange={e => setQuizSettingShowAns(e)}
            checked={getQuizSettingShowAns}
          />
        </div>
      </div>

      <div className="flex justify-around w-11/12 md:w-4/12 mb-4">
        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">จับเวลาหรือไม่</div>

          <SwitchR
            className="self-center"
            onChange={e => setQuizSettingTimeCount(e)}
            checked={getQuizSettingTimeCount}
          />
        </div>
        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">ระยะเวลาที่กำหนด</div>
          <Input
            className="self-center"
            value={getLessionTime}
            onChange={e => setLessionTime(e.target.value)}
            suffix="นาที"
            style={{ maxWidth: "100px" }}
            // disabled={!getQuizSettingTimeCount}
          />
        </div>
      </div>

      <div className="flex justify-around w-11/12 md:w-4/12 mb-8">
        <div className="flex flex-col text-center ">
          <div className="font-bold text-lg mb-2">สุ่มคำถามหรือไม่</div>
          {console.log("randyselector")}
          {console.log(getQuizSettingRandom)}
          <SwitchR
            className="self-center"
            onChange={e => setQuizSettingRandom(e)}
            checked={getQuizSettingRandom}
          />
        </div>

        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">จำนวนข้อที่เลือกสุม</div>
          {renderQuizRandomCondition()}
          {/* <Select
            style={{ maxWidth: "100px", width: "100px" }}
            className="self-center"
            defaultValue="1"
            onChange={e => setQuizSettingAmountRandom(e)}
            value={getQuizSettingAmountRandom}
            disabled={!getQuizSettingRandom}
          >
            {getQuizDataPool.map((temp, index) => (
              <Option value={index + 1}>{index + 1}</Option>
            ))}
          </Select> */}
        </div>
      </div>

      <div className="flex flex-col text-center mb-6 justify-center">
        <div className="font-bold text-lg mb-2">ใช้ Tag เหมือนกับ Course</div>
        <SwitchR
          className="self-center"
          onChange={e => GlobalHook.setLessionTagSameAsCourseStatus(e)}
          checked={GlobalHook.getLessionTagSameAsCourseStatus}
        />

      </div>

      {console.log('taggart')}
      {/* {console.log(getSubjects)} */}
      {console.log(GlobalHook.getGlobalCourseTagThaiLession)}
      {console.log(GlobalHook.getGlobalCourseTagEnglishLession)}

      {!GlobalHook.getLessionTagSameAsCourseStatus && <TagCom SubjectCat={getSubjects} InTagThai={GlobalHook.getGlobalCourseTagThaiLession} InTagEnglish={GlobalHook.getGlobalCourseTagEnglishLession} OutTagThai={GlobalHook.setGlobalCourseTagThaiLession} OutTagEnglish={GlobalHook.setGlobalCourseTagEnglishLession} />}

      {/* {!GlobalHook.getLessionTagSameAsCourseStatus &&         <TagCom SubjectCat={getSubjects} InTagThai={GlobalHook.getGlobalCourseTagThai} InTagEnglish={GlobalHook.getGlobalCourseTagEnglish} OutTagThai={GlobalHook.setGlobalCourseTagThai} OutTagEnglish={GlobalHook.setGlobalCourseTagEnglish} /> } */}


      <div
        id="QuestionEditorZone"
        className="w-11/12 md:w-10/12 flex flex-col bg-gray-200 rounded-lg border-dotted border-2 items-center"
      >
        <div id="QuestionEditorHead" className=" w-full  bg-white mb-4">
          <QuizHead />
        </div>
        {GlobalHook.getGloblaQuizQuestionSelect.questionId ? (
          <div
            id="QuestionEditorBody"
            className="flex flex-col items-center w-full"
          >
            <div className="flex flex-col text-center mb-4">
              <div className="flex items-baseline justify-center">
                <div className="font-bold text-lg mb-2">ประเภทคำถาม</div>
                <Popover
                  content={
                    <div className="flex w-full justify-center">
                      <div
                        className="text-red-600 hover:text-red-400 mr-4 cursor-pointer"
                        onClick={() => {
                          setShowConfirmDelQuestion(false);
                          handleDeleteQuestion();
                        }}
                      >
                        Delete
                      </div>{" "}
                      <div
                        className="text-gray-600 hover:text-gray-500 cursor-pointer"
                        onClick={() => {
                          setShowConfirmDel(false);
                        }}
                      >
                        cancel
                      </div>
                    </div>
                  }
                  title="Are you sure to delete this Question?"
                  trigger="click"
                  visible={getShowConfirmDelQuestion}
                  onVisibleChange={() =>
                    setShowConfirmDelQuestion(!getShowConfirmDelQuestion)
                  }
                >
                  <FaTrashAlt className="text-red-600 ml-4 text-xl cursor-pointer hover:text-red-500 " />
                </Popover>
              </div>
              <Select
                style={{ maxWidth: "200px", width: "200px" }}
                className="self-center"
                defaultValue="1"
                onChange={e => GlobalHook.setGloblaQuizAnswerType(e)}
                value={GlobalHook.getGloblaQuizAnswerType}
              >
                <Option value="MultipleChoice">MultipleChoice</Option>
                <Option value="ShortAnswer">ShortAnswer</Option>
                <Option value="LongAnswer">LongAnswer</Option>
              </Select>
            </div>
            <div className="flex flex-col text-center mb-4">
              <div className="font-bold text-lg mb-2">ชื่อคำถาม</div>
              <Input
                style={{ maxWidth: "300px" }}
                value={GlobalHook.getGloblaQuizQuestionName}
                onChange={e =>
                  GlobalHook.setGloblaQuizQuestionName(e.target.value)
                }
              />
            </div>


            <div className="flex flex-col text-center mb-6 justify-center">
              <div className="font-bold text-lg mb-2">ใช้ Tag เหมือนกับ Lesson</div>
              <SwitchR
                className="self-center"
                onChange={e => GlobalHook.setQuizTagSameAsLessionStatus(e)}
                checked={GlobalHook.getQuizTagSameAsLessionStatus}
              />

            </div>

            {console.log('cherbio')}
            {console.log(GlobalHook.getQuizTagSameAsLessionStatus)}

            {!GlobalHook.getQuizTagSameAsLessionStatus && <TagCom SubjectCat={getSubjects} InTagThai={GlobalHook.getGlobalCourseTagThaiQuiz} InTagEnglish={GlobalHook.getGlobalCourseTagEnglishQuiz} OutTagThai={GlobalHook.setGlobalCourseTagThaiQuiz} OutTagEnglish={GlobalHook.setGlobalCourseTagEnglishQuiz} />}
            {/* {!GlobalHook.getQuizTagSameAsLessionStatus &&  <TagCom SubjectCat={getSubjects} InTagThai={GlobalHook.getGlobalCourseTagThai} InTagEnglish={GlobalHook.getGlobalCourseTagEnglish} OutTagThai={GlobalHook.setGlobalCourseTagThai} OutTagEnglish={GlobalHook.setGlobalCourseTagEnglish} />  } */}



            <div className="w-full md:w-10/12 flex flex-col  mb-4">
              <div className="font-bold text-lg mb-2 text-center">
                ตั้งคำถาม
              </div>
              <TextEditorComp
                dataIn={GlobalHook.getGloblaQuizQuestionField}
                dataOut={GlobalHook.setGloblaQuizQuestionField}
              />
            </div>
          </div>
        ) : (
            <div className="h-full w-full flex justify-center items-center">
              โปรดเลือกหรือสร้างคำถามใหม่
            </div>
          )}
        <div className="w-full md:w-10/12  flex flex-col  mb-4 mx-auto bg-white">
          {GlobalHook.getGloblaQuizQuestionSelect.questionId && (
            <Tabs type="card">
              <TabPane tab="คำตอบ" key="1">
                {GlobalHook.getGloblaQuizAnswerType == "Temp" && (
                  <div className="mb-6"></div>
                )}
                {GlobalHook.getGloblaQuizAnswerType == "MultipleChoice" && (
                  <div className="mb-6">
                    {" "}
                    <CreateAnswerDrag />
                  </div>
                )}
                {GlobalHook.getGloblaQuizAnswerType == "ShortAnswer" && (
                  <div className="flex flex-col w-11/12 mx-auto mb-6">
                    {" "}
                    <div className="w-10/12 mx-auto">
                      <TextArea
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        value={GlobalHook.getGloblaQuizAnswerCorrect}
                        onChange={e => {
                          GlobalHook.setGloblaQuizAnswerCorrect(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}
              </TabPane>
              <TabPane tab="คำอธิบาย" key="2">
                <div className="flex flex-col mb-4">
                  <Select
                    style={{ maxWidth: "200px", width: "200px" }}
                    className="self-center mb-2"
                    defaultValue="Text"
                    onChange={e => GlobalHook.setGloblaQuizExplainType(e)}
                    value={GlobalHook.getGloblaQuizExplainType}
                  >
                    <Option value="Text">อธิบายด้วย Text Editor</Option>
                    <Option value="Video">อธิบายด้วย Video</Option>
                  </Select>
                  {GlobalHook.getGloblaQuizExplainType == "Text" && (
                    <div className="w-full md:w-10/12 mx-auto">
                      <TextEditorComp
                        dataIn={GlobalHook.getGloblaQuizExplainField}
                        dataOut={GlobalHook.setGloblaQuizExplainFieldNew}
                      />
                    </div>
                  )}
                  {GlobalHook.getGloblaQuizExplainType == "Video" && (
                    <VideoUpload />
                  )}
                </div>
              </TabPane>
            </Tabs>
          )}
        </div>
      </div>

      <div style={{ minHeight: "70px" }} />
    </div>
  );
};

export default StudioQuizContent;
