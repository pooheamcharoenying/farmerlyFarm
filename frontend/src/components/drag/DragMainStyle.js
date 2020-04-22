export const  getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  marginLeft: "0%",
  width: "100%",

  borderColor: "#5A6872",
  borderStyle: "solid",
  borderWidth: " 0px",
  color: "white",



  // change background colour if dragging
  background: isDragging ? "#8897A2" : "#8897A2",

  // styles we need to apply on draggables
  ...draggableStyle
});

  
  export const  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "pink" : "pink",
   
    width: "100%",
    marginLeft: "0%"
  });