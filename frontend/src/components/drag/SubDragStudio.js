import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  FaCheckCircle,
  FaVideo,
  FaPen,
  FaFileAlt,
  FaLock
} from "react-icons/fa";

import { Modal } from "antd";

import { GlobalContext,NewContext } from "../../hook/GlobalHook";
import { getItemStyle, getListStyle } from "./DragSubStyle";
import { GetMediaFreeAction, ClearCreateQuizFieldAction } from "../../actions";

const SubDragStudio = ({
  mainId,
  parentIndex,
  subItems,
  Dkey,
  sectionName,
  itemsPool
}) => {
  const GlobalHook = useContext(GlobalContext);

 const [getGlobalLessionSelectNew,setGlobalLessionSelectNew] = useContext(NewContext)

  const [getisShow, setisShow] = useState(false);

  const [getUnSaveAlertStatus, setUnSaveAlertStatus] = useState(false);

  const [getSelectedItem, setSelectedItem] = useState();
  const [getSelectedIndex, setSelectedIndex] = useState();
  const [getLessionMediaId,setLessionMediaId] = useState([])
  const [getLessionBank,setLessionBank] = useState([])
  const [getNowLessionIndex,setNowLessionIndex] = useState()

  useEffect(() => {
    if(itemsPool[0]){
      let LessionBank = getLessionBank
      let LessionMediaId = getLessionMediaId
    
      itemsPool.map((data)=>{
        
        data.subItems.map((item)=>{
          if(item.title != "999"){
            LessionBank.push(item)
            setLessionBank(LessionBank)
            LessionMediaId.push(item.mediaId)
            setLessionMediaId(LessionMediaId)
    
          }
        })
     
     })
    }
      }, [itemsPool])
  useEffect(() => {
  
    setNowLessionIndex(getLessionMediaId.indexOf(GlobalHook.getGlobalLessionSelect.mediaId))
   
  }, [getLessionBank,GlobalHook.getGlobalLessionSelect])

  function RenderUnSaveAlert() {
    return (
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
              onClick={() => {
                setUnSaveAlertStatus(false);
                GlobalHook.setMutantStatus(false);

                handleClickAfterLeave(getSelectedItem, getSelectedIndex);

                GlobalHook.setGlobalCourseStructure(
                  JSON.parse(localStorage.getItem("InitStructure"))
                );
                GlobalHook.setGlobalMediaVideo(null);
              }}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
            >
              Leave
            </button>

            <button
              onClick={() => {
                setUnSaveAlertStatus(false);
              }}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
            >
              cancel
            </button>
          </div>
        ]}
      >
        Changes that you made may not be saved.
      </Modal>
    );
  }

  function handleClickAfterLeave(item, index) {
    GlobalHook.setGlobalStudioUploadFile(null);
    GlobalHook.setGlobalMediaVideo(null);
    GlobalHook.setGlobalShowSideBarStatus(false);

    GlobalHook.setGlobalLessionSelect({
      parentIndex: parentIndex,
      selfIndex: index,
      mediaId: item.mediaId,
      mediaType: item.type,
      mediaName: item.title,
      mediaPreview: item.preview,
      sectionName: sectionName,
      mediaTime: item.time,
      mediaEtc1: item.etc1,
      mediaEtc2: item.etc2,
      mediaEtc3: item.etc3,
      mediaEtc4: item.etc4,
      mediaEtc5: item.etc5
    });

    GetMediaFreeAction(GlobalHook, item.mediaId);
    ClearCreateQuizFieldAction(GlobalHook);
  }

  useEffect(() => {
    if(GlobalHook.getPrevNextStatus == "Init"){
      LessionSelect(itemsPool[0].subItems[1],0)
     setTimeout(() => {
       GlobalHook.setPrevNextStatus(null)
     }, 100);
    }else if(GlobalHook.getPrevNextStatus == "NextLession"){
      if(getNowLessionIndex+1 != getLessionBank.length){
        LessionSelect(getLessionBank[getNowLessionIndex+1],getNowLessionIndex+1)
      }
      setTimeout(() => {
        GlobalHook.setPrevNextStatus(null)
      }, 100);

    }else if(GlobalHook.getPrevNextStatus == "PrevLession"){
      if(getNowLessionIndex != 0){
        LessionSelect(getLessionBank[getNowLessionIndex-1],getNowLessionIndex-1)
      }
      setTimeout(() => {
        GlobalHook.setPrevNextStatus(null)
      }, 100);

    }
   }, [GlobalHook.getPrevNextStatus])

  function LessionSelect(item, index) {

    GlobalHook.setGlobalStudioUploadFile(null);
    GlobalHook.setGlobalMediaVideo(null);
    if (GlobalHook.getMutantStatus) {
      setUnSaveAlertStatus(true);
      setSelectedItem(item);
      setSelectedIndex(index);
    } else {
      // window.history.replaceState(null,null,`/#teacher`)

      // window.history.replaceState(null,null,`/#teacher/${GlobalHook.getGlobalCourseName}/${sectionName}/${item.title}`)

      GlobalHook.setGlobalShowSideBarStatus(false);

      GlobalHook.setGlobalLessionSelect({
        parentIndex: parentIndex,
        selfIndex: index,
        mediaId: item.mediaId,
        mediaType: item.type,
        mediaName: item.title,
        mediaPreview: item.preview,
        sectionName: sectionName,
        mediaTime: item.time,
        mediaEtc1: item.etc1,
        mediaEtc2: item.etc2,
        mediaEtc3: item.etc3,
        mediaEtc4: item.etc4,
        mediaEtc5: item.etc5
      });

      setGlobalLessionSelectNew({
        parentIndex: parentIndex,
        selfIndex: index,
        mediaId: item.mediaId,
        mediaType: item.type,
        mediaName: item.title,
        mediaPreview: item.preview,
        sectionName: sectionName,
        mediaTime: item.time,
        mediaEtc1: item.etc1,
        mediaEtc2: item.etc2,
        mediaEtc3: item.etc3,
        mediaEtc4: item.etc4,
        mediaEtc5: item.etc5
      })

      GetMediaFreeAction(GlobalHook, item.mediaId);
      ClearCreateQuizFieldAction(GlobalHook);
    }
  }
  return (
    <>
      {RenderUnSaveAlert()}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div className="DropClick" onClick={() => setisShow(!getisShow)}>
          <p style={{ color: "rgba(0,0,0,0)" }}>..</p>
        </div>
        <div style={{ display: getisShow ? "none" : "block" }}>
          <Droppable droppableId={mainId} type={`droppableSubItem`} key={Dkey}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {subItems.map((item, index) => (
                  <div>
                    <div
                      key={item.id}
                      onClick={() => LessionSelect(item, index)}
                    >
                      <Draggable draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            style={{ display: "relative" }}
                            className="hover:bg-blue-100"
                          >
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                item,
                                GlobalHook.getGlobalLessionSelect
                              )}
                              {...provided.dragHandleProps}
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
                                  <div className="ml-4"> <FaLock
                                  style={{
                                    color: "#a45503",
                                    display: item.preview
                                      ? "inline-block"
                                      : "none"
                                  }}
                                /></div>
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
    </>
  );
};

export default SubDragStudio;
