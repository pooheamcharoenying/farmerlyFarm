export const  getItemStyle = (isDragging, draggableStyle, item, getSelectedLession) => ({

  display: item.title == 999 ? "none" : "inline-flex",
  userSelect: "none",

  margin: `0 0px 0px 0`,
  cursor: `pointer`,
  color: "#5A6872",

  width: "100%",
  height: "100%",
  padding: "10px",

 // change background colour if dragging
 background: isDragging ? "#f3f3f3" : "gray",
 background:
 getSelectedLession.mediaId == item.mediaId || false
     ? "rgba(175,221,254,0.9)"
     : "#DFE3E6",
  ...draggableStyle
});

  
  export const  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#f3f3f3" : "gray",
    // padding: "0",
    // margin: "0px 0",
    width: "100%"
  });