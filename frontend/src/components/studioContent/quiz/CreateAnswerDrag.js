import React, { useContext, useState, useEffect } from "react";
import uuid from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Modal, Input, message, Select,Tooltip,Popover } from "antd";
import {FaTrashAlt} from 'react-icons/fa'


// a little function to help us with reordering the result
import { GlobalContext } from "../../../hook/GlobalHook";


const getItemStyle = (isDragging, draggableStyle,item,selectedItem) => ({
  // some basic styles to make the items look a bit nicer
  display: item.id == 9999 ? "none" : "flex",

  borderStyle: "solid",
  borderWidth: "1px",
    // change background colour if dragging
  background:selectedItem == item.content  ? "#ffe06c" : "white",
  minWidth:"300px",
  minHeight:"30px",
  alignSelf:"center",
  marginBottom:"10px",
  borderRadius:"35px",
  cursor:"pointer",
  padding:"10px",

 justifyContent:"center",


 
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  background: isDraggingOver ? "#f3f3f3" : "white",
 
  minWidth: "200px",
  width:"95%"
  
});

function CreateAnswerDrag() {
  const GlobalHook = useContext(GlobalContext);
  const [items, setitems] = useState([]);
  const [getModalNewQAnswerOpenStatus, setModalNewQAnswerOpenStatus] = useState(false);
  const [getAnswerName, setAnswerName] = useState("");
  const [getShowConfirmDel, setShowConfirmDel] = useState(false);

 
  useEffect(() => {
    GlobalHook.setGloblaQuizAnswerFieldNew(items)
    
  }, [items]);

  useEffect(() => {
    if (GlobalHook.getGloblaQuizAnswerField) {
      setitems(GlobalHook.getGloblaQuizAnswerField);
    }
  }, [GlobalHook.getGloblaQuizAnswerField]);

  function handleDeleteChoice(selfIndex){
    let oldtype = GlobalHook.getGloblaQuizAnswerType
    GlobalHook.setGloblaQuizAnswerType("Temp")
    let oldChoiceStructure = items
  
      oldChoiceStructure.splice(selfIndex, 1)


      
      setitems(oldChoiceStructure);
      setTimeout(() => {
       GlobalHook.setGloblaQuizAnswerType(oldtype)
        
      }, 100);
   
    

  }



  function onDragEnd(result) {
    // dropped outside the list

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


  function handleNewAnswerCreate() {

    setModalNewQAnswerOpenStatus(false);

    const newQuestionId = uuid.v4()
    const newId =  Math.floor(Math.random() * 1000) + 1
    const oldstate = [...items];
    oldstate.push({
      id:newId,
      content: getAnswerName,
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
    
  }
  function handleCorrectAnswerSelect(item,index){
  
    GlobalHook.setGloblaQuizAnswerCorrect(item.content)
  }

  function renderAddAnswerModal() {

    return (
     <Modal
        visible={getModalNewQAnswerOpenStatus}
        title="สร้างคำตอบใหม่"
        onOk={() => setModalNewQAnswerOpenStatus(false)}
        onCancel={() => {
          setModalNewQAnswerOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => handleNewAnswerCreate()}
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
            <div className="font-bold text mb-2">คำตอบ</div>
            <Input
              value={getAnswerName}
              onChange={e => setAnswerName(e.target.value)}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  handleNewAnswerCreate();
                }
              }}
            />
          </div>
        </div>
      </Modal>
    );
  }


    return (
      <>   
        {renderAddAnswerModal()}   
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" type="droppableItem">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              
              >
      
                {items.map((item, index) => {
               
                
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                     
                      {(provided, snapshot) => (
                        <div className="flex justify-center items-center">
                        
                        <div onClick={()=>handleCorrectAnswerSelect(item,index)}>
                          <div>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                item,
                                GlobalHook.getGloblaQuizAnswerCorrect
                              )}
                              {...provided.dragHandleProps}
                            >
                
                              {item.content}
                             
                              <div
                                style={{ display: "none" }}
                                {...provided.dragHandleProps}
                              />
                           
          
                            </div>
                            {provided.placeholder}
                          </div>
                        </div>
                        <div className="ml-2" style={{display:(item.id == 9999)?"none":"",marginTop:"-5px"}}>
                           <FaTrashAlt className="text-red-600 hover:text-red-500 cursor-pointer" onClick={()=>handleDeleteChoice(index)}/>
                           </div>
                          </div>
                      )}
                      
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div  className="flex justify-center items-center" style={{width:"100%",marginTop:"10px"}}>
        <div className="flex justify-center items-center" style={{ width:"40px",height:"40px",borderRadius:"35px",cursor:"pointer", borderStyle: "solid",
  borderWidth: "0.5px" }} onClick={() => {setModalNewQAnswerOpenStatus(true);setAnswerName("");}}>
        +
        </div>
        </div>
      </>
    );
  }


export default CreateAnswerDrag;
