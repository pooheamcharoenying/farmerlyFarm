import React, { useContext, useState, useEffect } from "react";
import uuid from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Modal, Input, message, Select,Tooltip } from "antd";
import {FaCaretLeft,FaCaretRight} from 'react-icons/fa'

import { GlobalContext } from "../../../hook/GlobalHook";
import {FetchQuestionWhenSelectAction,ClearCreateQuizFieldAction} from '../../../actions'


const getItemStyle = (isDragging, draggableStyle, item, isSelect) => ({
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "white" : "white",
  marginLeft: "10px",
  width: "40px",
  height: "40px",
  borderRadius: "35px",
  fontSize: "20px",
  borderStyle: " solid",
  borderWidth: "1px",
  cursor: "pointer",
  background: isSelect.mediaId == item.id ? "#ffe06c" : "rgba(0,0,0,0)",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  borderColor:"gray",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "white" : "white",
  width:"100%",
  
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflowX: "auto",
  paddingLeft:"20px"


  
});

function QuestionNumberHead(props) {

  const GlobalHook = useContext(GlobalContext);
  const [items, setitems] = useState([]);
  const [getModalNewQuestionOpenStatus, setModalNewQuestionOpenStatus] = useState(false);
  const [getQuestionName, setQuestionName] = useState("");
  const [getCurrentQuestionIndex,setCurrentQuestionIndex] = useState(0)
  const [getQuestionLength,setQuestionLength] = useState(0)
  const [getUnSaveAlertStatus,setUnSaveAlertStatus] = useState(false)

  useEffect(() => {
    GlobalHook.setGlobalMediaNew(items)
    
  }, [items]);

  useEffect(() => {
    if (GlobalHook.getGlobalMediaQuiz) {
      setQuestionLength(parseInt(GlobalHook.getGlobalMediaQuiz.length))

      setitems(GlobalHook.getGlobalMediaQuiz);
    }
  }, [GlobalHook.getGlobalMediaQuiz]);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === "droppableItem") {
      var mockarr = Array.from(items);
      const [removed] = mockarr.splice(sourceIndex, 1);
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

      /** In this case subItems are reOrdered inside same Parent */
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


  function renderAddQuestionModal() {
  

    return (
     <Modal
        visible={getModalNewQuestionOpenStatus}
        title="สร้างคำถามใหม่"
        onOk={() => setModalNewQuestionOpenStatus(false)}
        onCancel={() => {
          setModalNewQuestionOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => handleNewQuestionCreate()}
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
            <div className="font-bold text mb-2">ชื่อคำถาม</div>
            <Input
              value={getQuestionName}
              onChange={e => setQuestionName(e.target.value)}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  handleNewQuestionCreate();
                }
              }}
            />
          </div>
        </div>
      </Modal>
    );
  }

  function handleNewQuestionCreate() {

    setModalNewQuestionOpenStatus(false)
    GlobalHook.setGlobalStatusCodeQ("CreateNewQuestion")
    GlobalHook.setMutantStatus(true)
    const newQuestionId = uuid.v4();
    const newId = Math.floor(Math.random() * 1000) + 1;
    const oldstate = [...items];
    oldstate.push({
      id: newId,
      questionId: newQuestionId,
      subItems: [
        {
          id: Math.floor(Math.random() * 1000) + 1,
          title: "999",
          content: "",
          type: "",
          preview: "",
          mediaId: uuid.v4(),
          time: Date.now()
        }
      ]
    });
    setitems(oldstate);

    const initSelfIndex = oldstate.length - 1;
   
    ClearCreateQuizFieldAction(GlobalHook)
    GlobalHook.setGloblaQuizQuestionSelect({
      selfIndex: initSelfIndex,
      mediaId: newId,
      questionId: newQuestionId,
      new:"new"
    });
      GlobalHook.setGloblaQuizQuestionName(getQuestionName);
   
    
  }


  function handleQuizSelect(item, index) {
    setCurrentQuestionIndex(index)

    ClearCreateQuizFieldAction(GlobalHook)
    GlobalHook.setGloblaQuizQuestionSelect({
      selfIndex: index,
      mediaId: item.id,
      questionId: item.questionId
    });
    FetchQuestionWhenSelectAction(GlobalHook,item);
  }

  function handlePreviousClick(){
    if(getCurrentQuestionIndex != 0){
      handleQuizSelect(items[getCurrentQuestionIndex-1],getCurrentQuestionIndex-1)
    }
  } 
  
  function handleNextClick(){
    if(getCurrentQuestionIndex+1 != getQuestionLength){
      handleQuizSelect(items[getCurrentQuestionIndex+1],getCurrentQuestionIndex+1)
    }
  }
  
  

  return (
    <>
       {renderAddQuestionModal()}
        {RenderUnSaveAlert()}
    <div className="bg-red-200">
    {/* <button className="text-5xl mr-2 " onClick={()=>handlePreviousClick()}> <FaCaretLeft /></button> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable"  direction="horizontal" className="max-h-full bg-green-300" >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
          
            
              {items.map((item, index) => {
              

                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div>
                        <div onClick={() => handleQuizSelect(item, index)}>
                          <div>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                item,
                                GlobalHook.getGloblaQuizQuestionSelect
                              )}
                              {...provided.dragHandleProps}
                            
                            >
                              {index + 1}

                              <div
                                style={{ display: "none" }}
                                {...provided.dragHandleProps}
                              />
                            </div>

                            {provided.placeholder}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  if(GlobalHook.getMutantStatus){
                    setUnSaveAlertStatus(true)
                  }else{
                  setModalNewQuestionOpenStatus(true);  
                  setQuestionName("");
                  }
                  // setAfterLeaveType("NewQuestion");
                }}
                style={{
                  marginLeft: "10px",
                  minWidth: "40px",
                  minHeight: "40px",
                  borderRadius: "35px",
                  fontSize: "20px",
                  borderStyle: " solid",
                  borderWidth: "1px",
                  cursor: "pointer",
                  borderColor:"black"
                }}
              >
                +
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* <button className="text-5xl ml-2 " onClick={()=>handleNextClick()}> <FaCaretRight /></button> */}

    </div>
    </>
  );
}

export default QuestionNumberHead;
