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
  maxWidth:"100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflowX: "auto",
  
});

function QuestionNumberHead(props) {

  const GlobalHook = useContext(GlobalContext);
  const [items, setitems] = useState([]);
  const [getCurrentQuestionIndex,setCurrentQuestionIndex] = useState(0)
  const [getQuestionLength,setQuestionLength] = useState(0)


  useEffect(() => {
    GlobalHook.setGlobalMediaNew(items)
    
  }, [items]);



  useEffect(() => {
    if (GlobalHook.getGlobalMediaQuiz) {
      setQuestionLength(parseInt(GlobalHook.getGlobalMediaQuiz.length))
    let FinalQuizBank = []
    let randomAmount = parseInt(GlobalHook.getGlobalMediaQuiz.length) - parseInt(GlobalHook.getGlobalLessionSelect.mediaEtc5)
      console.log(randomAmount)
    if(GlobalHook.getGlobalLessionSelect.mediaEtc3){
      FinalQuizBank = shuffle(GlobalHook.getGlobalMediaQuiz).slice(randomAmount)
      console.log(FinalQuizBank)
    }else{
      FinalQuizBank = GlobalHook.getGlobalMediaQuiz
  

    }

    setitems(FinalQuizBank);
    handleQuizSelect(FinalQuizBank[0],0)


// if(GlobalHook.getGlobalLessionSelect.mediaEtc5 == 0){
//   randomAmount = 0
//       if(GlobalHook.getGlobalLessionSelect.mediaEtc3){
  

//         FinalQuizBank = shuffle(GlobalHook.getGlobalMediaQuiz).slice(randomAmount)
   

    // }else{
    //   FinalQuizBank = GlobalHook.getGlobalMediaQuiz.slice(randomAmount)
    // console.log(FinalQuizBank)

    // }
//     console.log(GlobalHook.getGlobalMediaQuiz)
//     console.log(FinalQuizBank)

//     setitems(FinalQuizBank);
//     handleQuizSelect(FinalQuizBank[0],0)


//     }else{
//       setitems(GlobalHook.getGlobalMediaQuiz);
//     }
  }
  }, [GlobalHook.getGlobalMediaQuiz]);

  useEffect(() => {
    if(GlobalHook.getPrevNextStatus == "RestartQuiz"){
      handleQuizSelect(items[0],0)
     setTimeout(() => {
       GlobalHook.setPrevNextStatus(null)
     }, 100);
    }
   }, [GlobalHook.getPrevNextStatus])

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

 


  function handleQuizSelect(item, index) {

    setCurrentQuestionIndex(index)
    ClearCreateQuizFieldAction(GlobalHook)
    console.log(item)
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

useEffect(() => {
 if(GlobalHook.getPrevNextStatus == "Next"){
  handleNextClick();
  setTimeout(() => {
    GlobalHook.setPrevNextStatus(null)
  }, 100);
 }
}, [GlobalHook.getPrevNextStatus])

useEffect(() => {
  if(GlobalHook.getGlobalUserAnswerSelect != ""){
    let result = "false"
    if(GlobalHook.getGloblaQuizAnswerCorrect == GlobalHook.getGlobalUserAnswerSelect ){
      result = "true"
    }else{
      result = "false"
    }

  let userAnswerPool = GlobalHook.getGlobalUserAnswerPool
  userAnswerPool[GlobalHook.getGloblaQuizQuestionSelect.questionId] = {userAns:GlobalHook.getGlobalUserAnswerSelect,result:result}
  GlobalHook.setGlobalUserAnswerPool(userAnswerPool)
      
}
}, [GlobalHook.getGlobalUserAnswerSelect])

useEffect(() => {
console.log(GlobalHook.getGlobalUserAnswerPool)
}, [GlobalHook.getGlobalUserAnswerPool,GlobalHook.getGlobalUserAnswerSelect])
  return (
    <div className="max-w-full min-w-full w-full overflow-x-auto flex h-full border-solid border-b-2 rounded-b-none rounded-lg border-gray-300">
       <button className="text-5xl mr-4 " onClick={()=>handlePreviousClick()}> <FaCaretLeft /></button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type="app" direction="horizontal">
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
             
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button className="text-5xl ml-4 " onClick={()=>handleNextClick()}> <FaCaretRight /></button>
    </div>
  );
}

export default QuestionNumberHead;
