import React, { useState,useContext } from "react";
import { Modal, Button, Input,Select ,Tooltip} from "antd";
import {GlobalContext} from '../../hook/GlobalHook'
import {ClearCreateCourseFieldAction,CreateCourseAction,UploadAction} from '../../actions'

const { TextArea } = Input;
const { Option } = Select;

export default function FabCreateCourse() {
  const GlobalHook = useContext(GlobalContext)

  const [getModalOpenStatus, setModalOpenStatus] = useState(false);

  function handleImageTransform(raw) {
    const filesSelected = raw.target.files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      
     UploadAction(fileToLoad).then((data)=>
     {
      GlobalHook.setGlobalCourseImage(data);
     })

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64
        
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  function CreateCoursePopUp() {
    return (
      <Modal
        visible={getModalOpenStatus}
        title="Create Course"
        onOk={() => setModalOpenStatus(false)}
        onCancel={() =>{ setModalOpenStatus(false);ClearCreateCourseFieldAction(GlobalHook)}}
        footer={[
            <div className="w-full flex justify-center"><button onClick={()=>CreateCourseAction(GlobalHook,setModalOpenStatus)} className="bg-green-500 text-white p-2 rounded hover:bg-green-400">Create</button></div>
        ]}
      >
        <div className="flex flex-col justify-center items-center mx-auto" style={{maxWidth:"300px"}} 
         onKeyPress={event => {
          if (event.key === "Enter") {
            CreateCourseAction(GlobalHook,setModalOpenStatus);
          }
        }}
        >

        <div className="flex flex-col text-center mb-4">
          <div className="font-bold text mb-2">
          ชื่อคอร์ส
          </div>
          <Input   placeholder="English Only"
             value={GlobalHook.getGlobalCourseName}
             
             onChange={(e)=>GlobalHook.setGlobalCourseName(e.target.value)}/>
        </div>

       <div className="flex flex-col text-center mb-4">
          <div className="font-bold text mb-2">
          วิชาเรียน
          </div>
          <Select
              defaultValue="Mathematic"
             
              value={GlobalHook.getGlobalCourseSubject}
              onChange={e => GlobalHook.setGlobalCourseSubject(e)}
              style={{minWidth:"210px"}}
             
            >
              <Option value="Mathematic">Mathematic</Option>
              <Option value="Physics">Physics</Option>
              <Option value="Robotics">Robotics</Option>
              <Option value="Coding">Coding</Option>
            </Select>
        </div>

        <div className="flex flex-col text-center mb-4">
          <div className="font-bold text mb-2">
          ระดับชั้น
          </div>
          <Select
              defaultValue="ประถม"
              
              onChange={e => GlobalHook.setGlobalCourseLevel(e)}
              value={GlobalHook.getGlobalCourseLevel}
              style={{minWidth:"210px"}}
            >
              <Option value="ประถม">ประถม</Option>
              <Option value="มัธยมต้น">มัธยมต้น</Option>
              <Option value="มัธยมปลาย">มัธยมปลาย</Option>
              <Option value="มหาวิทยาลัย">มหาวิทยาลัย</Option>
            

            </Select>
        </div>

        <div className="flex flex-col text-center mb-4">
          <div className="font-bold text mb-2">
          ครูผู้สอน
          </div>
          <Input  onChange={e => GlobalHook.setGlobalCourseTeacher(e.target.value)}
              value={GlobalHook.getGlobalCourseTeacher}/>
        </div>

        <div className="flex flex-col text-center mb-4">
          <div className="font-bold text mb-2">
          รายละเอียดคอร์ส
          </div>
          <TextArea
           onChange={e => GlobalHook.setGlobalCourseDescription(e.target.value)}
           value={GlobalHook.getGlobalCourseDescription}
         
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        </div>

        <div className="flex flex-col text-center mb-4">
          <div className="font-bold text mb-2">
          รูปหน้าปก
          </div>
          <Input  type="file"
           onChange={handleImageTransform}/>
        </div>

        <div className="flex flex-col text-center mb-4">
          <div className="font-bold text mb-2">
          ตัวอย่างรูป
          </div>
          <img src={GlobalHook.getGlobalCourseImage}  style={{maxHeight:"100px"}}/>
        </div>

        </div>
      </Modal>
    );
  }
  return (
    <>
      {CreateCoursePopUp()}
      <Tooltip title="Create Course">
      <button
        onClick={() => setModalOpenStatus(true)}
        className="bg-orange-600 fixed right-0 bottom-0 m-4 text-white rounded-full flex justify-center items-center hover:bg-orange-500"
        style={{ width: "60px", height: "60px", fontSize: "40px" }}
      >
        +
      </button>
      </Tooltip>
    </>
  );
}
