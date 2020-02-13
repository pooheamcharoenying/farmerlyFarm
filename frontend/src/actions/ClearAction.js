import React from "react";
import uuid from 'uuid'

  function ClearCreateCourseFieldAction(GlobalHook){
    GlobalHook.setGlobalCourseName("")
    GlobalHook.setGlobalCourseSubject("Mathematic")
    GlobalHook.setGlobalCourseLevel("ประถม")
    GlobalHook.setGlobalCourseTeacher("")
    GlobalHook.setGlobalCourseDescription("")
    GlobalHook.setGlobalCourseImage("")

    
}
function ClearCreateLessionAction(GlobalHook){
  console.log("wwww")
  ClearCreateQuizFieldAction(GlobalHook)
  GlobalHook.setGlobalMediaVideo("")
  GlobalHook.setGlobalMediaDocument("")
  GlobalHook.setGlobalMediaQuiz("")
}
function ClearCreateQuizFieldAction(GlobalHook){
 GlobalHook.setGloblaQuizQuestionName("");
 GlobalHook.setGloblaQuizQuestionField("");
  GlobalHook.setGloblaQuizAnswerType("MultipleChoice");
  GlobalHook.setGloblaQuizAnswerField([{
    id:9999,
    content: "",
    questionId: 99999,
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
  }])
 GlobalHook.setGloblaQuizAnswerCorrect()
  GlobalHook.setGloblaQuizExplainType("Text")
 GlobalHook.setGloblaQuizExplainField()
 GlobalHook.setGloblaQuizQuestionSelect({});
}

  export { ClearCreateCourseFieldAction,ClearCreateQuizFieldAction,ClearCreateLessionAction};
