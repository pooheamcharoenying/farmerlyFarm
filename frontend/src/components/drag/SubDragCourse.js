import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  FaCheckCircle,
  FaVideo,
  FaPen,
  FaFileAlt,
  FaLock
} from "react-icons/fa";

import { GlobalContext, CourseQuizContext } from "../../hook/GlobalHook";
import { getItemStyle, getListStyle } from "./DragSubStyle";

import { GetMediaFreeAction, LessionVisitedLogAction } from "../../actions";
const SubDragStudio = ({ parentIndex, subItems, itemsPool, mainItem }) => {
  const GlobalHook = useContext(GlobalContext);
  const [getStartedQuiz, setStartedQuiz] = useContext(CourseQuizContext);
  const [getisShow, setisShow] = useState(false);
  const [getLessionMediaId, setLessionMediaId] = useState([]);
  const [getLessionBank, setLessionBank] = useState([]);
  const [getNowLessionIndex, setNowLessionIndex] = useState();

  const [getisSubscription, setisSubscription] = useState(false);

  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalcourseId) {
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseId == GlobalHook.getGlobalcourseId) {
          setisSubscription(true);
        }
      });
    } else {
      setisSubscription(false);
    }
  });

  useEffect(() => {
    if (itemsPool[0]) {
      let LessionBank = getLessionBank;
      let LessionMediaId = getLessionMediaId;

      itemsPool.map(data => {
        data.subItems.map(item => {
          if (item.title != "999") {
            LessionBank.push(item);
            setLessionBank(LessionBank);
            LessionMediaId.push(item.mediaId);
            setLessionMediaId(LessionMediaId);
          }
        });
      });
    }
  }, [itemsPool]);

  useEffect(() => {
    setNowLessionIndex(
      getLessionMediaId.indexOf(GlobalHook.getGlobalLessionSelect.mediaId)
    );
  }, [getLessionBank, GlobalHook.getGlobalLessionSelect]);

  useEffect(() => {
    if (GlobalHook.getPrevNextStatus == "Init") {
      LessionSelect(itemsPool[0].subItems[1], 0);
      setTimeout(() => {
        GlobalHook.setPrevNextStatus(null);
      }, 100);
    } else if (GlobalHook.getPrevNextStatus == "NextLession") {
      if (getNowLessionIndex + 1 != getLessionBank.length) {
        LessionSelect(
          getLessionBank[getNowLessionIndex + 1],
          getNowLessionIndex + 1
        );
      }
      setTimeout(() => {
        GlobalHook.setPrevNextStatus(null);
      }, 100);
    } else if (GlobalHook.getPrevNextStatus == "PrevLession") {
      if (getNowLessionIndex != 0) {
        LessionSelect(
          getLessionBank[getNowLessionIndex - 1],
          getNowLessionIndex - 1
        );
      }
      setTimeout(() => {
        GlobalHook.setPrevNextStatus(null);
      }, 100);
    }
  }, [GlobalHook.getPrevNextStatus]);

  function LessionSelect(item, index) {
    // window.history.replaceState(null,null,`/course/${GlobalHook.getGlobalCourseName}/${mainItem.content}/${item.title}`)
    GlobalHook.setGlobalShowSideBarStatus(false);
    

    if(getisSubscription){
     
        GlobalHook.setGlobalLessionSelect({
          selfIndex: index,
          mediaId: item.mediaId,
          mediaType: item.type,
          mediaName: item.title,
          mediaPreview: item.preview,
          sectionName: mainItem.content,
          mediaTime: item.time,
          mediaEtc1: item.etc1,
          mediaEtc2: item.etc2,
          mediaEtc3: item.etc3,
          mediaEtc4: item.etc4,
          mediaEtc5: item.etc5
        });
        GetMediaFreeAction(GlobalHook, item.mediaId);
    GlobalHook.setGlobalStatusCode("resetCounter");
    setStartedQuiz(false);
    GlobalHook.setGlobalUserAnswerSelect(null);

      
    }else{
      if (item.preview) {
        GlobalHook.setGlobalLessionSelect({
          selfIndex: index,
          mediaId: item.mediaId,
          mediaType: item.type,
          mediaName: item.title,
          mediaPreview: item.preview,
          sectionName: mainItem.content,
          mediaTime: item.time,
          mediaEtc1: item.etc1,
          mediaEtc2: item.etc2,
          mediaEtc3: item.etc3,
          mediaEtc4: item.etc4,
          mediaEtc5: item.etc5
        });
        GetMediaFreeAction(GlobalHook, item.mediaId);
    GlobalHook.setGlobalStatusCode("resetCounter");
    setStartedQuiz(false);
    GlobalHook.setGlobalUserAnswerSelect(null);

      } else {
        if (!GlobalHook.getGlobalToken) {
          GlobalHook.setGlobalShowLoginModal(true);
          GlobalHook.setGlobalLoginTab("Signup");
        } else {
          GlobalHook.setGlobalShowCourseFeeAlertModal(true)
        }
      }
    }
    
  }

  function getIsLessionVisitedFn(item) {
    console.log('facheck')
    console.log(item)
    console.log(GlobalHook.getGlobalLessionSelect.mediaType)
    if (GlobalHook.getGlobalUser) {
      if (item.type != "Quiz") {
        if (
          GlobalHook.getGlobalUser.courseSubscription != undefined &&
          GlobalHook.getGlobalUser.courseSubscription[
            GlobalHook.getGlobalUser.courseSubscription
              .map(data => data.courseId)
              .indexOf(GlobalHook.getGlobalcourseId)
          ] != undefined
        ) {
          if (
            GlobalHook.getGlobalUser.courseSubscription[
              GlobalHook.getGlobalUser.courseSubscription
                .map(data => data.courseId)
                .indexOf(GlobalHook.getGlobalcourseId)
            ].courseLog
              .map(data => data.lessionId)
              .indexOf(item.mediaId) == -1
          ) {
            return false;
          } else {
            return true;
          }
        }
      } else {
        console.log('quizzical')
        console.log(GlobalHook.getGlobalUser.courseSubscription)
        var filtration1 = GlobalHook.getGlobalUser.courseSubscription.filter(courseSubscript => courseSubscript.courseId == GlobalHook.getGlobalcourseId)
        console.log('filtration1')
        console.log(filtration1)
        if (filtration1.length > 0) {
          var filtration2 = filtration1[0].quizLog.filter(quizLog => quizLog.lessionId == item.mediaId)
          console.log('filtration2')
          console.log(filtration2)
          var filtration3 = filtration2.filter( quizAttempt => quizAttempt.passResult == true)
          if (filtration3.length > 0) {
            return true
          } else {
            return false
          }
        }
      }
      
    }
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div className="DropClick" onClick={() => setisShow(!getisShow)}>
        {" "}
        <p style={{ color: "rgba(0,0,0,0)" }}>..</p>
      </div>

      <div style={{ display: getisShow ? "none" : "block" }}>
        <Droppable
          droppableId={mainItem.id}
          type={`droppableSubItem`}
          key={mainItem.id}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {subItems.map((item, index) => (
                <div key={index}>
                  <div key={item.id} onClick={() => LessionSelect(item, index)}>
                    <Draggable draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div style={{ display: "relative" }}>
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              item,
                              GlobalHook.getGlobalLessionSelect
                            )}
                          >
                            <div className="flex flex-col w-11/12 mx-auto ">
                              <div className="mb-2 truncate">{item.title}</div>
                              <div className="flex justify-start items-center">
                                <div>
                                  {item.type == "Video" ? (
                                    <FaVideo />
                                  ) : item.type == "Quiz" ? (
                                    <FaPen />
                                  ) : (
                                    <FaFileAlt />
                                  )}
                                </div>
                                <div className="ml-4">{item.time} mins</div>

                                <div className="ml-4">
                                  {" "}
                                  <FaLock
                                    style={{
                                      color: "#778899",
                                      display: !item.preview
                                        ? "inline-block"
                                        : "none"
                                    }}
                                  />
                                </div>

                                <div className="ml-4">
                                  {" "}
                                  <FaCheckCircle
                                    style={{
                                      color: "#96C221",
                                      display: getIsLessionVisitedFn(item)
                                        ? "inline-block"
                                        : "none"
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div
                              style={{ display: "none" }}
                              {...provided.dragHandleProps}
                            />
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  </div>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default SubDragStudio;
