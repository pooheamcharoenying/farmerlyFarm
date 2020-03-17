import React,{useState,useEffect,useContext} from "react";
import { Input,Popover } from "antd";
import ReactQuill from "react-quill";
import {FaTrashAlt} from 'react-icons/fa'
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import SwitchR from "react-switch";
import TagCom from '../tagCom/TagCom'

import { GlobalContext } from "../../hook/GlobalHook";
import {SaveAllAction,CheckMutateAction} from "../../actions"
import TextEditorComp from '../textEditor/TextEditor'

const StudioDocumentContent = () => {
  const GlobalHook = useContext(GlobalContext);

  const [val,setval] = useState("")

  const [getLessionTime,setLessionTime] = useState("0")
  const [getLessionName,setLessionName] = useState("")
  const [getInitStateDoc,setInitStateDoc] = useState("")
  const [getInitStateName,setInitStateName] = useState("")
  const [getInitStateTime,setInitStateTime] = useState("")
  const [getShowConfirmDel, setShowConfirmDel] = useState(false);
  const [getInitStatePreview, setInitStatePreview] = useState(null);
  const [getLessionPreview, setLessionPreview] = useState(null);



useEffect(() => {
  CheckMutateAction(GlobalHook,getInitStateDoc,val)
}, [val]);
  useEffect(() => {

    setLessionName(GlobalHook.getGlobalLessionSelect.mediaName)
    setInitStateName(GlobalHook.getGlobalLessionSelect.mediaName)
    

    setLessionTime(GlobalHook.getGlobalLessionSelect.mediaTime)
    setInitStateTime(GlobalHook.getGlobalLessionSelect.mediaTime)

    setLessionPreview(GlobalHook.getGlobalLessionSelect.mediaPreview)
    setInitStatePreview(GlobalHook.getGlobalLessionSelect.mediaPreview)

 }, [GlobalHook.getGlobalLessionSelect])

  useEffect(() => {
    setval(GlobalHook.getGlobalMediaDocument)
    setInitStateDoc(GlobalHook.getGlobalMediaDocument)
   }, [GlobalHook.getGlobalMediaDocument])

  function handleChange(e) {

    setval(e)
    GlobalHook.setGlobalMediaNew(e)
  }

  useEffect(() => {

     let oldCourseStructure = GlobalHook.getGlobalCourseStructure
    const { parentIndex,selfIndex } = GlobalHook.getGlobalLessionSelect
    if(oldCourseStructure[parentIndex] && getLessionName){
      (oldCourseStructure[parentIndex].subItems)[selfIndex].title = getLessionName;
      (oldCourseStructure[parentIndex].subItems)[selfIndex].time = getLessionTime;
      (oldCourseStructure[parentIndex].subItems)[selfIndex].preview = getLessionPreview;

      GlobalHook.setGlobalCourseStructure(oldCourseStructure);
      GlobalHook.setGlobalCourseStructureNew(oldCourseStructure);

    }
    
    }, [getLessionName,getLessionTime,getLessionPreview])


    useEffect(() => {
      CheckMutateAction(GlobalHook,getInitStateName,getLessionName)

    }, [getLessionName])

    
    useEffect(() => {
      CheckMutateAction(GlobalHook,getInitStateTime,getLessionTime)


    }, [getLessionTime])

    useEffect(() => {
      CheckMutateAction(GlobalHook, getInitStatePreview, getLessionPreview);
    }, [getLessionPreview]);

    useEffect(() => {
   if(GlobalHook.getGlobalStatusCode == "CreateNewLession"){
     setval("")
     GlobalHook.setGlobalStatusCode("")
   }

    },[GlobalHook.getGlobalStatusCode])


  var modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [{ align: [] }, "direction"],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      ["blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image", "video"],
      ["clean"]
    ]
  };

  function handleDeleteLession(){

    let oldCourseStructure = GlobalHook.getGlobalCourseStructure
    const { parentIndex,selfIndex } = GlobalHook.getGlobalLessionSelect
    GlobalHook.setGlobalLessionSelect({"mediaType":"CourseOverview"})


    if(oldCourseStructure[parentIndex]){
      (oldCourseStructure[parentIndex].subItems).splice(selfIndex, 1)
      
      GlobalHook.setGlobalCourseStructure(oldCourseStructure);
    SaveAllAction(GlobalHook)
     
    }
  }
  
  return (
    <div className=" h-auto min-h-full w-full flex flex-col items-center py-4 justify-start">
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

        <div className="flex flex-col text-center mb-6">
          <div className="font-bold text-lg mb-2">
          ระยะเวลาบทเรียน
          </div>
          <Input value={getLessionTime} onChange={(e)=>setLessionTime(e.target.value)} suffix="นาที" style={{width:"100px"}}/>
        </div>

        <div className="flex flex-col text-center mb-6 justify-center">
          <div className="font-bold text-lg mb-2">Lession Preview</div>
          <SwitchR
            className="self-center"
            onChange={e => setLessionPreview(e)}
            checked={getLessionPreview}
          />
        
        </div>
        <TagCom InTagThai={GlobalHook.getGlobalCourseTagThaiLession} InTagEnglish={GlobalHook.getGlobalCourseTagEnglishLession} OutTagThai={GlobalHook.setGlobalCourseTagThaiLession} OutTagEnglish={GlobalHook.setGlobalCourseTagEnglishLession}/>

        <div className="w-11/12 md:w-10/12">
          <ReactQuill
            value={val || ""}
            onChange={handleChange}
            theme="snow"
            className="editor"
            modules={modules}
          />
        </div>
        <div style={{ minHeight: "60px" }} />
      </div>
  );
};

export default StudioDocumentContent;
