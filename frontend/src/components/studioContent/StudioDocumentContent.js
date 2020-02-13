import React,{useState,useEffect,useContext} from "react";
import { Input,Popover } from "antd";
import ReactQuill from "react-quill";
import {FaTrashAlt} from 'react-icons/fa'
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


useEffect(() => {
  CheckMutateAction(GlobalHook,getInitStateDoc,val)
}, [val]);
  useEffect(() => {

    setLessionName(GlobalHook.getGlobalLessionSelect.mediaName)
    setInitStateName(GlobalHook.getGlobalLessionSelect.mediaName)
    

    setLessionTime(GlobalHook.getGlobalLessionSelect.mediaTime)
    setInitStateTime(GlobalHook.getGlobalLessionSelect.mediaTime)


 }, [GlobalHook.getGlobalLessionSelect])

  useEffect(() => {
    setval(GlobalHook.getGlobalMediaDocument)
    setInitStateDoc(GlobalHook.getGlobalMediaDocument)
   }, [GlobalHook.getGlobalMediaDocument])

  function handleChange(e) {

    console.log(e)
    setval(e)
    GlobalHook.setGlobalMediaNew(e)
  }

  useEffect(() => {

     let oldCourseStructure = GlobalHook.getGlobalCourseStructure
    const { parentIndex,selfIndex } = GlobalHook.getGlobalLessionSelect
    if(oldCourseStructure[parentIndex]){
      (oldCourseStructure[parentIndex].subItems)[selfIndex].title = getLessionName;
      (oldCourseStructure[parentIndex].subItems)[selfIndex].time = getLessionTime;
      GlobalHook.setGlobalCourseStructure(oldCourseStructure);
      GlobalHook.setGlobalCourseStructureNew(oldCourseStructure);

    }
    
    }, [getLessionName,getLessionTime])


    useEffect(() => {
      CheckMutateAction(GlobalHook,getInitStateName,getLessionName)

    }, [getLessionName])

    
    useEffect(() => {
      CheckMutateAction(GlobalHook,getInitStateTime,getLessionTime)


    }, [getLessionTime])

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

    console.log(oldCourseStructure)

    if(oldCourseStructure[parentIndex]){
      (oldCourseStructure[parentIndex].subItems).splice(selfIndex, 1)
    console.log(oldCourseStructure)
      
      GlobalHook.setGlobalCourseStructure(oldCourseStructure);
    SaveAllAction(GlobalHook)
     
    }
  }
  
  return (
    <div className=" h-full w-full flex flex-col items-center pt-4 overflow-hidden">
      <div className="w-11/12 md:w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold bg-blue-500 flex justify-center items-center">
      {getLessionName}
      
      {/* <FaTrashAlt className="self-end text-red-500 text-md text-right ml-4 cursor-pointer" onClick={()=>handleDeleteLession()}/> */}
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

        <div className="flex flex-col text-center mb-6">
          <div className="font-bold text-lg mb-2">
          ระยะเวลาบทเรียน
          </div>
          <Input value={getLessionTime} onChange={(e)=>setLessionTime(e.target.value)} suffix="นาที" style={{width:"100px"}}/>
        </div>

        <div className="w-11/12 md:w-10/12">
          <ReactQuill
            value={val || ""}
            onChange={handleChange}
            theme="snow"
            className="editor"
            modules={modules}
          />
          {/* <TextEditorComp dataIn={val} dataOut={handleChange}/> */}
        </div>
      </div>
    </div>
  );
};

export default StudioDocumentContent;
