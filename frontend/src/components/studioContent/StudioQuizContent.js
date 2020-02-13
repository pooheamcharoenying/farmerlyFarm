import React,{useState,useEffect,useContext} from "react";
import { Input, Switch,Select,Tabs,Popover } from "antd";
import {FaTrashAlt} from 'react-icons/fa'
import { GlobalContext } from "../../hook/GlobalHook";
import QuestionHeadNumberDrag from './quiz/QuestionHeadNumberDrag'
import TextEditor from './quiz/TextEditor'
import CreateAnswerDrag from './quiz/CreateAnswerDrag'
import VideoUpload from "./quiz/VideoUpload";
import {SaveAllAction,CheckMutateAction} from "../../actions"
import TextEditorComp from '../textEditor/TextEditor'


const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const StudioQuizContent = () => {
    const GlobalHook = useContext(GlobalContext);
    const [getLessionTime,setLessionTime] = useState(null)
    const [getLessionName,setLessionName] = useState("")
    const [getQuizSettingShowAns, setQuizSettingShowAns] = useState(true);
  const [getQuizSettingTimeCount, setQuizSettingTimeCount] = useState(true);
  const [getQuizSettingRandom, setQuizSettingRandom] = useState(true);
  const [getQuizSettingAmountPass, setQuizSettingAmountPass] = useState(1);
  const [getQuizSettingAmountRandom, setQuizSettingAmountRandom] = useState(1);
  const [getShowConfirmDel, setShowConfirmDel] = useState(false);
  const [getShowConfirmDelQuestion, setShowConfirmDelQuestion] = useState(false);
  const [getInitStateName,setInitStateName] = useState(null)
  const [getInitStateTime,setInitStateTime] = useState("")
  const [getInitStateSettingShowAns,setInitStateSettingShowAns] = useState(true)
  const [getInitStateSettingTimeCount,setInitStateSettingTimeCount] = useState(true)
  const [getInitStateSettingRandom,setInitStateSettingRandom] = useState(true)
  const [getInitStateSettingAmountPass,setInitStateSettingAmountPass] = useState(1)
  const [getInitStateSettingAmountRandom,setInitStateSettingAmountRandom] = useState(1)





    const [getQuizDataPool,setQuizDataPool] = useState([{"mock":"1"}])

    useEffect(() => {
      if(GlobalHook.getGlobalMediaQuiz){
      
        setQuizDataPool(GlobalHook.getGlobalMediaQuiz)
      }
    }, [GlobalHook.getGlobalMediaQuiz])

    useEffect(() => {
  
      setLessionName(GlobalHook.getGlobalLessionSelect.mediaName)
      setInitStateName(GlobalHook.getGlobalLessionSelect.mediaName)

  
      setLessionTime(GlobalHook.getGlobalLessionSelect.mediaTime)
      setInitStateTime(GlobalHook.getGlobalLessionSelect.mediaTime)


      setQuizSettingShowAns(GlobalHook.getGlobalLessionSelect.mediaEtc1);
      setInitStateSettingShowAns(GlobalHook.getGlobalLessionSelect.mediaEtc1);


      setQuizSettingTimeCount(GlobalHook.getGlobalLessionSelect.mediaEtc2);
      setInitStateSettingTimeCount(GlobalHook.getGlobalLessionSelect.mediaEtc2);


      setQuizSettingRandom(GlobalHook.getGlobalLessionSelect.mediaEtc3);
      setInitStateSettingRandom(GlobalHook.getGlobalLessionSelect.mediaEtc3);


      setQuizSettingAmountPass(GlobalHook.getGlobalLessionSelect.mediaEtc4);
      setInitStateSettingAmountPass(GlobalHook.getGlobalLessionSelect.mediaEtc4);


      setQuizSettingAmountRandom(GlobalHook.getGlobalLessionSelect.mediaEtc5);
      setInitStateSettingAmountRandom(GlobalHook.getGlobalLessionSelect.mediaEtc5);


  
   }, [GlobalHook.getGlobalLessionSelect])

   //Mutate
   useEffect(() => {
    CheckMutateAction(GlobalHook,getInitStateName,getLessionName)


  }, [getLessionName])

  useEffect(() => {
    CheckMutateAction(GlobalHook,getInitStateTime,getLessionTime)


  }, [getLessionTime])

  useEffect(() => {
    CheckMutateAction(GlobalHook,getInitStateSettingShowAns,getQuizSettingShowAns)


  }, [getQuizSettingShowAns])

  useEffect(() => {
    CheckMutateAction(GlobalHook,getInitStateSettingTimeCount,getQuizSettingTimeCount)


  }, [getQuizSettingTimeCount])

  useEffect(() => {
    CheckMutateAction(GlobalHook,getInitStateSettingRandom,getQuizSettingRandom)


  }, [getQuizSettingRandom])

  useEffect(() => {
    CheckMutateAction(GlobalHook,getInitStateSettingAmountPass,getQuizSettingAmountPass)


  }, [getQuizSettingAmountPass])

  useEffect(() => {
    CheckMutateAction(GlobalHook,getInitStateSettingAmountRandom,getQuizSettingAmountRandom)


  }, [getQuizSettingAmountRandom])




   useEffect(() => {
    let oldCourseStructure = GlobalHook.getGlobalCourseStructure
   const { parentIndex,selfIndex } = GlobalHook.getGlobalLessionSelect
   if(oldCourseStructure[parentIndex]){
     (oldCourseStructure[parentIndex].subItems)[selfIndex].title = getLessionName;
     oldCourseStructure[parentIndex].subItems[selfIndex].time = getLessionTime;
     oldCourseStructure[parentIndex].subItems[selfIndex].etc1 = getQuizSettingShowAns
     oldCourseStructure[parentIndex].subItems[selfIndex].etc2 = getQuizSettingTimeCount
     oldCourseStructure[parentIndex].subItems[selfIndex].etc3 = getQuizSettingRandom
     oldCourseStructure[parentIndex].subItems[selfIndex].etc4 = getQuizSettingAmountPass
     oldCourseStructure[parentIndex].subItems[selfIndex].etc5 = getQuizSettingAmountRandom
     GlobalHook.setGlobalCourseStructure(oldCourseStructure);
   }
   
   }, [getLessionName, getLessionTime,getQuizSettingAmountPass,getQuizSettingShowAns,getQuizSettingTimeCount,getQuizSettingRandom,getQuizSettingAmountRandom]);

   function handleDeleteLession(){
  
    let oldCourseStructure = GlobalHook.getGlobalCourseStructure
    const { parentIndex,selfIndex } = GlobalHook.getGlobalLessionSelect
    GlobalHook.setGlobalLessionSelect({"mediaType":"CourseOverview"})

    console.log(oldCourseStructure)
  
    if(oldCourseStructure[parentIndex]){
      (oldCourseStructure[parentIndex].subItems).splice(selfIndex, 1)
    console.log(oldCourseStructure)
      
      GlobalHook.setGlobalCourseStructure(oldCourseStructure);
    SaveAllAction(GlobalHook)
     
    }
  }

  function handleDeleteQuestion(){
    // GlobalHook.setGlobalLessionSelect({"mediaType":"CourseOverview"})
  
    let oldQuizStructure = GlobalHook.getGlobalMediaQuiz
    const { selfIndex } = GlobalHook.getGloblaQuizQuestionSelect
    GlobalHook.setGloblaQuizQuestionSelect({})

    console.log(oldQuizStructure)
  
    if(oldQuizStructure[selfIndex]){
      oldQuizStructure.splice(selfIndex, 1)
    console.log(oldQuizStructure)
      
      GlobalHook.setGloblaQuizQuestionSelect(oldQuizStructure);
    SaveAllAction(GlobalHook)
     
    }
  }

  return (
    <div className=" h-full w-full flex flex-col items-center pt-4 overflow-hidden pb-4">
      <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold bg-blue-500">
        {getLessionName}
      </div>
      <div className="flex flex-col overflow-y-auto  h-full w-full over items-center justify-start py-4">
      <div className="flex flex-col text-center mb-4">
          <div className="flex items-baseline justify-center">
          <div className="font-bold text-lg mb-2">
         
          ชื่อบทเรียน
         
          </div>
          <Popover
             content={<div className="flex w-full justify-center"><div className="text-red-600 hover:text-red-400 mr-4 cursor-pointer" onClick={()=> {setShowConfirmDel(false);handleDeleteLession()}}>Delete</div> <div className="text-gray-600 hover:text-gray-500 cursor-pointer" onClick={()=> {setShowConfirmDel(false);}}>cancel</div></div>}
             title="Are you sure to delete this Lession?"
             trigger="click"
             visible={getShowConfirmDel}
             onVisibleChange={()=>setShowConfirmDel(!getShowConfirmDel)}
            >
          <FaTrashAlt className="text-red-600 ml-4 text-xl cursor-pointer hover:text-red-500 "/>
          </Popover>
          </div>
        
     <Input value={getLessionName} onChange={(e)=>setLessionName(e.target.value)}/>

        </div>


    <div className="flex justify-around w-10/12 md:w-4/12 mb-4">
        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">ข้อกำหนดในการผ่าน</div>
          <Select
          style={{maxWidth:"100px",width:"100px"}}
          className="self-center"
              defaultValue="1"
              onChange={e => setQuizSettingAmountPass(e)}
              value={getQuizSettingAmountPass}
            >

        {getQuizDataPool.map((temp,index)=>( <Option value={index+1}>{index+1}</Option>))}
            </Select>
        </div>
        

        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">เฉลยทันที</div>
          <Switch style={{width:"50px"}}  className="self-center"  defaultChecked={getQuizSettingShowAns} onChange={(e)=>setQuizSettingShowAns(e)}/>
        </div>
        </div>

        <div className="flex justify-around w-11/12 md:w-4/12 mb-4">
        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">จับเวลาหรือไม่</div>
          <Switch style={{width:"50px"}}  className="self-center"  defaultChecked={getQuizSettingTimeCount} onChange={(e)=>setQuizSettingTimeCount(e)}/>
        </div>
        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">
          ระยะเวลาที่กำหนด
          </div>
          <Input className="self-center" value={getLessionTime} onChange={(e)=>setLessionTime(e.target.value)} suffix="นาที" style={{maxWidth:"100px"}}/>
        </div>
          </div>

          <div className="flex justify-around w-11/12 md:w-4/12 mb-8">
          <div className="flex flex-col text-center ">
          <div className="font-bold text-lg mb-2">สุ่มคำถามหรือไม่</div>
          <Switch style={{width:"50px"}} className="self-center"  defaultChecked={getQuizSettingRandom} onChange={(e)=>setQuizSettingRandom(e)}/>
        </div>
     
        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">จำนวนข้อที่เลือกสุม</div>
          <Select
          style={{maxWidth:"100px",width:"100px"}}
          className="self-center"
              defaultValue="1"
              onChange={e => setQuizSettingAmountRandom(e)}
              value={getQuizSettingAmountRandom}
            >

        {getQuizDataPool.map((temp,index)=>( <Option value={index+1}>{index+1}</Option>))}
            </Select>
        </div>
            </div>

     <div id="QuestionEditorZone" className="w-11/12 md:w-10/12 flex flex-col bg-gray-300  h-auto rounded-lg border-dotted border-2 items-center">

       <div id="QuestionEditorHead" className=" w-full  bg-white mb-4" style={{minHeight:"50px"}}>
         
         <QuestionHeadNumberDrag/>
         
       </div>


{GlobalHook.getGloblaQuizQuestionSelect.questionId ?
       <div id="QuestionEditorBody" className="flex flex-col items-center w-full">

        <div className="flex flex-col text-center mb-4">
        <div className="flex items-baseline justify-center">
          <div className="font-bold text-lg mb-2">
         
          ประเภทคำถาม
         
          </div>
          <Popover
             content={<div className="flex w-full justify-center"><div className="text-red-600 hover:text-red-400 mr-4 cursor-pointer" onClick={()=> {setShowConfirmDelQuestion(false);handleDeleteQuestion()}}>Delete</div> <div className="text-gray-600 hover:text-gray-500 cursor-pointer" onClick={()=> {setShowConfirmDel(false);}}>cancel</div></div>}
             title="Are you sure to delete this Question?"
             trigger="click"
             visible={getShowConfirmDelQuestion}
             onVisibleChange={()=>setShowConfirmDelQuestion(!getShowConfirmDelQuestion)}
            >
          <FaTrashAlt className="text-red-600 ml-4 text-xl cursor-pointer hover:text-red-500 "/>
          </Popover>
          </div>
          <Select
          style={{maxWidth:"200px",width:"200px"}}
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
          style={{maxWidth:"300px"}}
            value={GlobalHook.getGloblaQuizQuestionName}
            onChange={e => GlobalHook.setGloblaQuizQuestionName(e.target.value)}
          />
        </div>

        <div className="w-full md:w-10/12 flex flex-col  mb-4" >
        <div className="font-bold text-lg mb-2 text-center">ตั้งคำถาม</div>
        <TextEditorComp dataIn={GlobalHook.getGloblaQuizQuestionField} dataOut={GlobalHook.setGloblaQuizQuestionField} />
        </div>

        </div>:<div className="h-full w-full flex justify-center items-center">โปรดเลือกหรือสร้างคำถามใหม่</div>}

        <div className="w-full md:w-10/12  flex flex-col  mb-4 mx-auto bg-white">
      {GlobalHook.getGloblaQuizQuestionSelect.questionId&&<Tabs type="card">
  <TabPane tab="คำตอบ" key="1">
  {GlobalHook.getGloblaQuizAnswerType == "Temp"&&<div className="mb-6"></div>}
  {GlobalHook.getGloblaQuizAnswerType == "MultipleChoice"&&<div className="mb-6"> <CreateAnswerDrag /></div>}
  {GlobalHook.getGloblaQuizAnswerType == "ShortAnswer"&& <div className="flex flex-col w-11/12 mx-auto mb-6"> <div className="w-10/12 mx-auto"><TextArea   autoSize={{ minRows: 2, maxRows: 6 }} value={ GlobalHook.getGloblaQuizAnswerCorrect} onChange={(e)=>{ GlobalHook.setGloblaQuizAnswerCorrect(e.target.value)}}/></div></div>}
  
  </TabPane>
  <TabPane tab="คำอธิบาย" key="2">
  <div className="flex flex-col mb-4">
       <Select
          style={{maxWidth:"200px",width:"200px"}}
          className="self-center mb-2"
              defaultValue="Text"
              onChange={e => GlobalHook.setGloblaQuizExplainType(e)}
              value={GlobalHook.getGloblaQuizExplainType}
            >
          <Option value="Text">อธิบายด้วย Text Editor</Option>
          <Option value="Video">อธิบายด้วย Video</Option>

        </Select>
      {GlobalHook.getGloblaQuizExplainType=="Text"&&<div className="w-full md:w-10/12 mx-auto"><TextEditorComp  dataIn={GlobalHook.getGloblaQuizExplainField} dataOut={GlobalHook.setGloblaQuizExplainFieldNew} /></div>}
      {GlobalHook.getGloblaQuizExplainType=="Video"&&<VideoUpload />}

   </div>
  </TabPane>
  
</Tabs>}
      </div>


      </div>

     </div>

     
    </div>
  );
};

export default StudioQuizContent;
