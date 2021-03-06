import React from "react";
import axios from "axios";
import { message } from "antd";


function FetchQuestionWhenSelectAction(GlobalHook, questionId) {
  GlobalHook.setGlobalLoading(true)

  const pushData = {
    courseName: GlobalHook.getGlobalCourseName,
    questionId: questionId
  };

  axios
    .post("/api/quiz/free", pushData)
    .then(res => {

      GlobalHook.setGloblaQuizQuestionName(res.data.data.questionName);
      GlobalHook.setGloblaQuizQuestionField(res.data.data.questionField)
      GlobalHook.setGloblaQuizAnswerField(res.data.data.answerField);
      GlobalHook.setGloblaQuizAnswerType(res.data.data.answerType);
      GlobalHook.setGloblaQuizAnswerCorrect(res.data.data.answerCorrect);
      GlobalHook.setGloblaQuizExplainType(res.data.data.answerExplainType);
      GlobalHook.setGloblaQuizExplainField(res.data.data.answerExplainField);
      GlobalHook.setGlobalLoading(false)

    })
    .catch(err => {
      console.log(err);
    });
}

function FetchQuestionWhenSelectActionStudio(GlobalHook, questionId) {
  GlobalHook.setGlobalLoading(true)

  const pushData = {

    questionId: questionId.questionId
  };

  axios
    .post("/api/quiz/free", pushData)
    .then(res => {

      console.log('fetchQuizData')
      console.timeLog(res.data.data)


      if (res.data.data != null) {
        GlobalHook.setGloblaQuizQuestionName(res.data.data.questionName);
        GlobalHook.setGloblaQuizQuestionField(res.data.data.questionField)
        GlobalHook.setGloblaQuizAnswerField(res.data.data.answerField);
        GlobalHook.setGloblaQuizAnswerType(res.data.data.answerType);
        GlobalHook.setGloblaQuizAnswerCorrect(res.data.data.answerCorrect);
        GlobalHook.setGloblaQuizExplainType(res.data.data.answerExplainType);
        GlobalHook.setGloblaQuizExplainField(res.data.data.answerExplainField);
        GlobalHook.setGlobalCourseTagThaiQuiz(res.data.data.quizTagThai)
        GlobalHook.setGlobalCourseTagEnglishQuiz(res.data.data.quizTagEnglish)
        GlobalHook.setQuizTagSameAsLessionStatus(res.data.data.quizTagStatus)
      }
      GlobalHook.setGlobalLoading(false)

    })
    .catch(err => {
      console.log(err);
    });
}


function AddNewQuestionAction(GlobalHook) {

  console.log("quincyjones")


  var mediaTagEnglish = [];
  var mediaTagThai = [];
  if (GlobalHook.getQuizTagSameAsLessionStatus) {
    mediaTagEnglish = GlobalHook.getGlobalCourseTagEnglishLession;
    mediaTagThai = GlobalHook.getGlobalCourseTagThaiLession;
  } else {
    mediaTagEnglish = GlobalHook.getGlobalCourseTagEnglishQuiz;
    mediaTagThai = GlobalHook.getGlobalCourseTagThaiQuiz;
  }

  let mockName = " "
  mockName = GlobalHook.getGloblaQuizQuestionName

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
    mediaId: GlobalHook.getGlobalLessionSelect.mediaId,
    courseSlug: GlobalHook.getGlobalCourseSlug,
    quizTagEnglish: mediaTagEnglish,
    quizTagThai: mediaTagThai,
    quizTagStatus: GlobalHook.getQuizTagSameAsLessionStatus

  };

  console.log(pushData)

  axios
    .post("/api/quiz/", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false)

    })
    .catch(err => {
      console.log(err);
    });
}

async function deleteQuestionById(questionData) {
  console.log('actionQuizDeleteQuestion')
  console.log(questionData)
  const pushData = {
    questionId: questionData.questionId
  };
  return await axios
    .post("/api/quiz/deletequestion", pushData)
    .then(res => {
      console.log('delete question success')
      console.log(res.data)
      return (res.data)
    })
    .catch(err => {
      console.log(err);
    });
}

async function FetcthAllQuizInCourse(inputCourseId) {
  const pushData = {
    courseId: inputCourseId
  };

  console.log('pushData')
  console.log(pushData)
  return await axios
    .post("/api/quiz/findquizincourse", pushData)
    .then(res => {
      console.log('fetchedQuizData')
      console.log(res.data)
      return (res.data)
    })
    .catch(err => {
      console.log(err);
    });
}





export { deleteQuestionById, FetchQuestionWhenSelectAction, AddNewQuestionAction, FetchQuestionWhenSelectActionStudio, FetcthAllQuizInCourse }