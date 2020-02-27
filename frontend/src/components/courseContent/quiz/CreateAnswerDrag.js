import React, { useContext, useState, useEffect } from "react";
import uuid from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Modal, Input, message, Select,Tooltip } from "antd";


// a little function to help us with reordering the result
import { GlobalContext,CourseQuizContext } from "../../../hook/GlobalHook";

const getItemStyle = (isDragging, draggableStyle,item,selectedItem,correctAnswer,QuizFinishStatus) => ({
  // some basic styles to make the items look a bit nicer
  display: item.id == 9999 ? "none" : "flex",

  borderStyle: "solid",
  borderWidth: "1px",
    // change background colour if dragging
  background:selectedItem == item.content  ? "#ffe06c" : "white",
  borderColor:correctAnswer == item.content  ? QuizFinishStatus? "green" :"lightGray" : "lightGray",

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
  width:"100%"
  
});

function CreateAnswerDrag() {
  const GlobalHook = useContext(GlobalContext);
  const [items, setitems] = useState([]);
  const [getModalNewQAnswerOpenStatus, setModalNewQAnswerOpenStatus] = useState(false);
  const [getAnswerName, setAnswerName] = useState("");
  const [getUserAnswer,setUserAnswer] = useState("")
  const [
    getStartedQuiz,
    setStartedQuiz,
    getGlobalUserAnsSelectNew,
    setGlobalUserAnsSelectNew,
    getGlobalUserAnswerPoolNew,
    setGlobalUserAnswerPoolNew,
    getGloblaQuizQuestionSelectNew,
    setGloblaQuizQuestionSelectNew
  ] = useContext(CourseQuizContext);
 
  useEffect(() => {
    GlobalHook.setGloblaQuizAnswerFieldNew(items)
    
  }, [items]);

  useEffect(() => {
    if (GlobalHook.getGloblaQuizAnswerField) {
      setitems(shuffle(GlobalHook.getGloblaQuizAnswerField));
    }
  }, [GlobalHook.getGloblaQuizAnswerField]);

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
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


  function handleUserAnswerSelect(item,index){
  
    // setUserAnswer(item.content)
    GlobalHook.setGlobalUserAnswerSelect(item.content)

    setGlobalUserAnsSelectNew(item.content)
  }

  function getUserSelectAns(){
    if(getGlobalUserAnswerPoolNew[getGloblaQuizQuestionSelectNew.questionId]){
      return getGlobalUserAnswerPoolNew[getGloblaQuizQuestionSelectNew.questionId].userAns
    }
  }


    return (
      <div>   
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" type="droppableItem">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
      
                {items.map((item, index) => {
                  const kid = item.id;
                
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                     
                      {(provided, snapshot) => (
                        <div   onClick={()=>handleUserAnswerSelect(item,index)}>
                          <div>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                item,
                                getUserSelectAns(),
                                GlobalHook.getGloblaQuizAnswerCorrect,
                                GlobalHook.getGlobalQuizFinishStatus
                              )}
                            
                            >
                
                              {item.content}
                             
                              <div
                                style={{ display: "none" }}
                                {...provided.dragHandleProps}
                              />
          
                            </div>
                          
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
      </div>
    );
  }


export default CreateAnswerDrag;
