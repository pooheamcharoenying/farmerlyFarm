import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid";
import { Button, Modal, Input, message, Select,Tooltip,Popover } from "antd";
import { FaPlusCircle,FaEdit } from "react-icons/fa";
import { GlobalContext,NewContext } from "../../hook/GlobalHook";

import { getItemStyle, getListStyle } from "./DragMainStyle";
import SubDragStudio from "./SubDragStudio";
import {ClearCreateLessionAction,SaveAllAction,CheckMutateAction} from '../../actions'
const { Option } = Select;
export default function MainDragStudio() {
  const GlobalHook = useContext(GlobalContext);
  const [getGlobalLessionSelectNew, setGlobalLessionSelectNew] = useContext(
    NewContext
  );
  const [items, setitems] = useState([]);
  const [getModalTopicOpenStatus, setModalTopicOpenStatus] = useState(false);
  const [getShowConfirmDel, setShowConfirmDel] = useState(false);

  const [getModalLessionOpenStatus, setModalLessionOpenStatus] = useState(
    false
  );
  const [getEditSectionOpenStatus, setEditSectionOpenStatus] = useState(false)


  const [getTopicName, setTopicName] = useState("");
  const [getTopicNameEdit, setTopicNameEdit] = useState("");
  const [getTopicIndexEdit, setTopicIndexEdit] = useState("");

  const [getLessionName, setLessionName] = useState("");
  const [getLessionType, setLessionType] = useState("Video");
  const [getLessionParent, setLessionParent] = useState("");
  const [getLessionParentIndex, setLessionParentIndex] = useState(null);
  const [getUnSaveAlertStatus,setUnSaveAlertStatus] = useState(false)
  const [getAfterLeaveType,setAfterLeaveType] = useState(null)


  function RenderUnSaveAlert(){

    return(
        <Modal
    visible={getUnSaveAlertStatus}
    title="UnSaveAlert"
    onOk={() => setUnSaveAlertStatus(false)}
    onCancel={() => {
      setUnSaveAlertStatus(false);
    }}
    footer={[
      <div className="w-full flex justify-center">
         <button
          onClick={() =>{
            setUnSaveAlertStatus(false);
              GlobalHook.setMutantStatus(false);
              GlobalHook.setGlobalCourseStructure(JSON.parse(localStorage.getItem("InitStructure")))

            if(getAfterLeaveType == "NewTopic"){
              setModalTopicOpenStatus(true);
            }else if(getAfterLeaveType == "NewLession"){
              setModalLessionOpenStatus(true);
            }
            
          
            
          

          }}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
        >
          Leave
        </button>
      
        <button
          onClick={() => {setUnSaveAlertStatus(false)}}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
        >
          cancel
        </button>


        
      </div>
    ]}
  >
    Changes that you made may not be saved.

  </Modal> 
    )
  }


  useEffect(() => {
    GlobalHook.setGlobalCourseStructureNew(items)

  }, [items]);

  useEffect(() => {
    if (GlobalHook.getGlobalCourseStructure) {
      setitems(GlobalHook.getGlobalCourseStructure);
      
    }
  }, [GlobalHook.getGlobalCourseStructure]);

  var sectionCounter = 1;

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    GlobalHook.setMutantStatus(true)

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === "droppableItem") {
      var mockarr = Array.from(items);
      var [removed] = mockarr.splice(sourceIndex, 1);
      mockarr.splice(destIndex, 0, removed);
      setitems(mockarr);
    } else if (result.type === "droppableSubItem") {
      const itemSubItemMap = items.reduce((acc, item) => {
        acc[item.id] = item.subItems;
        return acc;
      }, {});

      const sourceParentId = parseInt(result.source.droppableId);
      const destParentId = parseInt(result.destination.droppableId);

      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...items];

      if (sourceParentId === destParentId) {
        var reorderedSubItems = Array.from(sourceSubItems);
        const [removed] = reorderedSubItems.splice(sourceIndex, 1);
        reorderedSubItems.splice(destIndex, 0, removed);

        newItems = newItems.map(item => {
          if (item.id === sourceParentId) {
            item.subItems = reorderedSubItems;
          }
          return item;
        });
        setitems(newItems);
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map(item => {
          if (item.id === sourceParentId) {
            item.subItems = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.subItems = newDestSubItems;
          }
          return item;
        });
        setitems(newItems);
      }
    }
  }

  function CreateNewTopicPopUp() {
    return (
      <Modal
        visible={getModalTopicOpenStatus}
        title="สร้างหัวข้อใหม่"
        onOk={() => setModalTopicOpenStatus(false)}
        onCancel={() => {
          setModalTopicOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => {handleNewTopicCreate();GlobalHook.setMutantStatus(true)}}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
            >
              Create
            </button>
          </div>
        ]}
      >
        <div
          className="flex flex-col justify-center items-center mx-auto"
          style={{ maxWidth: "300px" }}
        >
          <div className="flex flex-col text-center mb-4">
            <div className="font-bold text mb-2">ชื่อหัวข้อ</div>
            <Input
              value={getTopicName}
              onChange={e => setTopicName(e.target.value)}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  handleNewTopicCreate();
                }
              }}
            />
          </div>
        </div>
      </Modal>
    );
  }
// setEditSectionOpenStatus(false);handleDeleteTopic()
  function EditSectionPopUp() {
    return (
      <Modal
        visible={getEditSectionOpenStatus}
        title="แก้ไข"
        onOk={() => setEditSectionOpenStatus(false)}
        onCancel={() => {
          setEditSectionOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <Popover
             content={<div className="flex w-full justify-center"><div className="text-red-600 hover:text-red-400 mr-4 cursor-pointer" onClick={()=> {setEditSectionOpenStatus(false);setShowConfirmDel(false);handleDeleteTopic();}}>Delete</div> <div className="text-gray-600 hover:text-gray-500 cursor-pointer" onClick={()=> {setEditSectionOpenStatus(false);setShowConfirmDel(false);}}>cancel</div></div>}
             title="Are you sure to delete this item?"
             trigger="click"
             visible={getShowConfirmDel}
             onVisibleChange={()=>setShowConfirmDel(!getShowConfirmDel)}
            >
             <button
            
              className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
            >
              Delete
            </button>
            </Popover>
            <button
              onClick={() =>{setEditSectionOpenStatus(false);SaveAllAction(GlobalHook)}}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
            >
              Save
            </button>
           
          </div>
        ]}
      >
        <div
          className="flex flex-col justify-center items-center mx-auto"
          style={{ maxWidth: "300px" }}
        >
          <div className="flex flex-col text-center mb-4">
            <div className="font-bold text mb-2">ชื่อหัวข้อ</div>
            <Input
              value={getTopicNameEdit}
              onChange={e => setTopicNameEdit(e.target.value)}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  {setEditSectionOpenStatus(false);SaveAllAction(GlobalHook)}
                }
              }}
            />
          </div>
        </div>
      </Modal>
    );
  }

  function handleDeleteTopic(){
    let oldCourseStructure = items
    oldCourseStructure.splice(getTopicIndexEdit, 1); 
    setitems(oldCourseStructure)
    SaveAllAction(GlobalHook)
  }
  useEffect(() => {
   
    let oldCourseStructure = items
   if(oldCourseStructure[getTopicIndexEdit]){
     (oldCourseStructure[getTopicIndexEdit]).content = getTopicNameEdit
   
    setitems(oldCourseStructure)
   }
   
   }, [getTopicNameEdit])

  function handleNewTopicCreate() {
    setTopicName("");
    const oldstate = [...items];
    oldstate.push({
      id: Math.floor(Math.random() * 1000) + 1,
      content: getTopicName,
      subItems: [
        {
          id: Math.floor(Math.random() * 1000) + 1,
          title: "999",
          content: "",
          type: "",
          preview: "",
          mediaId: uuid.v4(),
          date: Date.now(),
          time: "",
          etc1: "",
          etc2: "",
          etc3: "",
          etc4: "",
          etc5: ""
        }
      ]
    });
    setitems(oldstate);
    setModalTopicOpenStatus(false);
    message.success("สร้างหัวข้อใหม่สำเร็จ");
  }

  function CreateNewLessionPopUp() {
    return (
      <Modal
        visible={getModalLessionOpenStatus}
        title="สร้างบทเรียนใหม่"
        onOk={() => setModalLessionOpenStatus(false)}
        onCancel={() => {
          setModalLessionOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => {handleNewLessionCreate();GlobalHook.setMutantStatus(true);}}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
            >
              Create
            </button>
          </div>
        ]}
      >

        <div
          className="flex flex-col justify-center items-center mx-auto"
          style={{ maxWidth: "300px" }}
        >
          <div className="flex flex-col text-center mb-4">
            <div className="font-bold text mb-2">ชื่อบทเรียน</div>
            <Input
              value={getLessionName}
              onChange={e => setLessionName(e.target.value)}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  handleNewLessionCreate();
                }
              }}
            />
          </div>

          <div className="flex flex-col text-center mb-4">
            <div className="font-bold text mb-2">ประเภทบทเรียน</div>
            <Select
              defaultValue="Video"
              value={getLessionType}
              onChange={e => setLessionType(e)}
              style={{ minWidth: "210px" }}
            >
              <Option value="Video">Video</Option>
              <Option value="Document">Document</Option>
              <Option value="Quiz">Quiz</Option>
            </Select>
          </div>
        </div>
      </Modal>
    );
  }

  function handleNewLessionCreate() {
    GlobalHook.setGlobalMessage("ClearAll")
    const oldstate = [...items];
    oldstate.map((res, index) => {
      if (res.id == getLessionParent.id) {
        const mediaId = uuid.v4()
        oldstate[index].subItems.push({
          id: Math.floor(Math.random() * 1000) + 1,
          title: getLessionName,
          type: getLessionType,
          mediaId: mediaId,
          preview: true,
          etc1: true,
          etc2: true,
          etc3: true,
          etc4: 1,
          etc5: 1,
          date: Date.now(),
          time: ""
        });
        setitems(oldstate);

      
        GlobalHook.setGlobalLessionSelect({
          parentIndex: getLessionParentIndex,
          selfIndex:( oldstate[index].subItems.length) -1,
          mediaId: mediaId,
          mediaType: getLessionType,
          mediaName: getLessionName,
          mediaPreview: true,
          sectionName: getLessionParent.content,
          mediaTime: "",
          mediaEtc1:true,
          mediaEtc2:false,
          mediaEtc3:true,
          mediaEtc4:1,
          mediaEtc5:1,
          new:"new"
        });
        setModalLessionOpenStatus(false);
        message.success("สร้างหัวบทเรียนใหม่สำเร็จ");
        setLessionName("");
        setLessionType("Video");
        GlobalHook.setGlobalStatusCode("CreateNewLession")
        ClearCreateLessionAction(GlobalHook)
        setGlobalLessionSelectNew({
          parentIndex: getLessionParentIndex,
          selfIndex:( oldstate[index].subItems.length) -1,
          mediaId: mediaId,
          mediaType: getLessionType,
          mediaName: getLessionName,
          mediaPreview: true,
          sectionName: getLessionParent.content,
          mediaTime: "",
          mediaEtc1:true,
          mediaEtc2:false,
          mediaEtc3:true,
          mediaEtc4:1,
          mediaEtc5:1,
          new:"new"
        })

        console.log(getLessionName)
      }
    });
  }

  return (
    <div className="w-full h-auto px-2 min-h-screen relative" >
      {CreateNewTopicPopUp()}
      {CreateNewLessionPopUp()}
      {EditSectionPopUp()}
      {RenderUnSaveAlert()}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type="droppableItem">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div className="relative">
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          {...provided.dragHandleProps}
                        >
                          <div
                            style={{
                              height: "10px",
                              backgroundColor: "#e2e8f0"
                            }}
                          />
                          <div
                            style={{
                              height: "10px",
                              backgroundColor: "#8897A2"
                            }}
                          ></div>
                          <strong>
                            <div
                              style={{
                                paddingLeft: "10px",
                                fontSize: "16px",
                                fontWeight: "normal"
                              }}
                              className="truncate"
                            >
                              {sectionCounter++}. {item.content}
                            </div>
                          </strong>
                          <div
                            style={{
                              height: "10px",
                              backgroundColor: "#8897A2"
                            }}
                          ></div>

                          <div
                            style={{ display: "none" }}
                            {...provided.dragHandleProps}
                          />
                          <Tooltip title="สร้างบทเรียนใหม่">
                          <button
                            className=" flex justify-center items-center hover:text-gray-200 z-30"
                            style={{
                              position: "absolute",
                              right: 5,
                              marginTop: "-30px",
                              width: "20px",
                              height: "20px"
                            }}
                            onClick={() => {
                              if(GlobalHook.getMutantStatus){
                                setUnSaveAlertStatus(true)
                              }else{
                                setModalLessionOpenStatus(true);
                                setLessionParent(item);
                                setLessionParentIndex(index);
                                setLessionName("");
                                setLessionType("Video");
                              }
                              setAfterLeaveType("NewLession");

                            }}
                          >
                            <FaPlusCircle />
                          </button>
                          </Tooltip>
                          <Tooltip title="แก้ไขTopic">
                          <button
                            className=" flex justify-center items-center hover:text-gray-200 z-30"
                            style={{
                              position: "absolute",
                              right: 40,
                              marginTop: "-30px",
                              width: "20px",
                              height: "20px"
                            }}
                            onClick={() => {
                              setEditSectionOpenStatus(true);
                              setTopicNameEdit(item.content);
                              setTopicIndexEdit(index)
                            }}
                          >
                            <FaEdit />
                          </button>
                          </Tooltip>

                          <SubDragStudio
                            Dkey={item.id}
                            subItems={item.subItems}
                            mainId={item.id}
                            parentIndex={index}
                            sectionName={item.content}
                            itemsPool={items}
                          />
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                );
              })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="w-full flex justify-center my-4">
          <Button
            className="m-auto hover:text-black hover:border-black focus:text-black focus:border-black"
            onClick={() => {
              if(GlobalHook.getMutantStatus){
                setUnSaveAlertStatus(true)
              }else{
              setModalTopicOpenStatus(true);
              }
              setAfterLeaveType("NewTopic");
            }}
          >
            สร้างหัวข้อใหม่
          </Button>
        </div>
      </DragDropContext>
    </div>
  );
}
