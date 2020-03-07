export const getItemStyle = (isDragging, draggableStyle, item, isSelect) => ({
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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderColor: "gray",
  ...draggableStyle
});

  
  export const  getListStyle = isDraggingOver => ({
    background:"white",
  
    minHeight:"100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    overflowX: "scroll",
    margin:"auto"
    
  });