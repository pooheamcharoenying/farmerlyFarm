import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GlobalContext } from "../../hook/GlobalHook";
import { getItemStyle, getListStyle } from "./DragMainStyle";
import SubDragStudio from "./SubDragCourse";
export default function MainDragStudio() {
  const GlobalHook = useContext(GlobalContext);
  const [items, setitems] = useState([]);
  useEffect(() => {
    if (GlobalHook.getGlobalCourseStructure) {
      setitems(GlobalHook.getGlobalCourseStructure);
      
    }
  }, [GlobalHook.getGlobalCourseStructure]);


  



  var sectionCounter = 1;


  function onDragEnd(result) {
    if (!result.destination) {return;}
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

  return (
    <div className="w-full h-auto px-2 min-h-screen relative" >
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
                      <div className="relative">
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          
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
                                fontWeight: "normal",
                               
                              }}
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

                          <SubDragStudio
                       
                            subItems={item.subItems}
                          
                            parentIndex={index}
                       
                            itemsPool={items}
                            mainItem={item}        
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
    
       
      </DragDropContext>
    </div>
  );
}
