import React from "react";
import axios from "axios";
import { message } from "antd";


function FetchQuestionWhenSelectAction (GlobalHook,item) {
  GlobalHook.setGlobalLoading(true)

    const pushData = {
      courseName: GlobalHook.getGlobalCourseName,
      questionId: item.questionId
    };

    axios
      .post("/api/quiz/free", pushData)
      .then(res => {

       GlobalHook.setGloblaQuizQuestionName(res.data.data.questionName);
       GlobalHook.setGloblaQuizQuestionField(res.data.data.questionField)
       GlobalHook.setGloblaQuizAnswerField(res.data.data.answerField);
       GlobalHook.setGloblaQuizAnswerType(res.data.data.answerType);
       GlobalHook.setGloblaQuizAnswerCorrect(res.data.data.answerCorrect);
       GlobalHook.setGloblaQuizExplainType( res.data.data.answerExplainType );
       GlobalHook.setGloblaQuizExplainField(res.data.data.answerExplainField );
 GlobalHook.setGlobalLoading(false)
 console.log(res)

      })
      .catch(err => {
        console.log(err);
      });
  }


  function AddNewQuestionAction (GlobalHook) {

    const pushData = {
            questionId: GlobalHook.getGloblaQuizQuestionSelect.questionId,
            questionName: GlobalHook.getGloblaQuizQuestionName,
            questionField: GlobalHook.getGloblaQuizQuestionField,
            answerType: GlobalHook.getGloblaQuizAnswerType,
            answerField: GlobalHook.getGloblaQuizAnswerFieldNew,
            answerCorrect: GlobalHook.getGloblaQuizAnswerCorrect,
            answerExplainType: GlobalHook.getGloblaQuizExplainType,
            answerExplainField: GlobalHook.getGloblaQuizExplainFieldNew,
            courseName: GlobalHook.getGlobalCourseName,
            sectionName: GlobalHook.getGlobalLessionSelect.sectionName,
            lessionName: GlobalHook.getGlobalLessionSelect.mediaName,
            mediaId:GlobalHook.getGlobalLessionSelect.mediaId,
           
    };

    axios
      .post("/api/quiz/", pushData)
      .then(res => {
        GlobalHook.setGlobalLoading(false)

      })
      .catch(err => {
        console.log(err);
      });
  }

  function handlequizpool() {
    // const pushLogData = {
    //   courseName: GlobalHook.getglobalCourseName,
    //   lessionId: GlobalHook.getglobalCourseLessionSelect.mediaId,
    //   QID: getMainQuizID.QuestionId,
    //   userAns: getUserAns,
    //   logTime: getLocalLessionTime,
    //   userAnsStatus:getUserAnsStatus
    // };

    // axios
    //   .post("/api/user/quizpool", pushLogData)
    //   .then(res => {

    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    
  }

  export {FetchQuestionWhenSelectAction,AddNewQuestionAction}