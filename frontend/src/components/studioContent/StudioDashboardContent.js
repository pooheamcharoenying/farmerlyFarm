import React, { useEffect, useState, useContext } from "react";
import { Menu, Dropdown, Avatar, Select, Action, Radio } from "antd";
import moment from "moment";


import { GlobalContext } from "../../hook/GlobalHook";

import SubscriptorPlate from './SubscriptorPlate'
import AreaChart from './chart/AreaChart'
import RadarChart from './chart/RadarChart'
import RadialBarChart from './chart/RadialBarChart'

import { getUsersInCourse, GetUserByIdAction, GetManyUsersFromFirebase, FetcthAllQuizInCourse } from "../../actions"

const { Option } = Select;

export default function StudioDashboardContent() {
  const GlobalHook = useContext(GlobalContext);


  const [getReviewPool, setReviewPool] = useState([])

  const [getUserIdPool, setUserIdPool] = useState([])
  const [getUserDataPool, setUserDataPool] = useState([])
  const [getUserDisplay, setUserDisplay] = useState([])

  const [getDataVisual, setDataVisual] = useState(["ความคืบหน้า"])
  const [getDataVisualSubset, setDataVisualSubset] = useState(["คะแนนทั้งหมด"])
  const [getDataVisualFormat, setDataVisualFormat] = useState(["Total"])
  const [getDataVisualTagSubset, setDataVisualTagSubset] = useState(["All Tags"])

  const [getChartData, setChartData] = useState([])
  const [getChartDataKeyList, setChartDataKeyList] = useState([])

  const [getChartKey1, setChartKey1] = useState([{ dataKey: 'correct', fill: '#68E456' }])
  const [getChartKey2, setChartKey2] = useState([{ dataKey: 'wrong', fill: '#FD6253' }])
  const [getChartKey3, setChartKey3] = useState([{ dataKey: '', fill: '' }])


  const [getSelectedStudent, setSelectedStudent] = useState(null)
  const [getSelectedStudentIndex, setSelectedStudentIndex] = useState([-2])

  const [getCourseQuizQuestionData, setCourseQuizQuestionData] = useState([])
  const [getCourseQuizTagData, setCourseQuizTagData] = useState([])

  const [getQuizAttemptListSorted, setQuizAttemptListSorted] = useState([])
  const [getQuizList, setQuizList] = useState([])
  const [getQuizFilter, setQuizFilter] = useState(["All Quiz"])

  var userIdArray = []

  useEffect(() => {
    GlobalHook.setGlobalLoading(true);
    console.log('course Id')
    console.log(GlobalHook.getGlobalcourseId)
    // console.log('start')

    FetcthAllQuizInCourse(GlobalHook.getGlobalcourseId)
      .then(courseQuizData => {
        // console.log('quizNowInFrontEnd')
        // console.log(courseQuizData)

        var courseQuizTagData = []

        for (var item of courseQuizData) {
          // console.log(item.quizTagEnglish)

          if (item.quizTagEnglish.length > 0) {
            for (var tag of item.quizTagEnglish) {
              var quizTagData = new Object()
              // console.log('tagId')
              // console.log(tag.id)
              // console.log(courseQuizTagData)
              if (courseQuizTagData.length == 0) {
                // console.log('first tag found!')
                quizTagData.tagId = tag.id;
                quizTagData.tagName = tag.name;
                // console.log(quizTagData)
                courseQuizTagData.push(quizTagData)
              } else {

                var newTag = true;
                for (var recordedTag of courseQuizTagData) {
                  if (recordedTag.tagId == tag.id) {
                    // console.log(quizTagData)
                    newTag = false;
                  }
                }

                if (newTag) {
                  // console.log('new tag found!')
                  quizTagData.tagId = tag.id;
                  quizTagData.tagName = tag.name;
                  // console.log(quizTagData)
                  courseQuizTagData.push(quizTagData)
                } else {
                  // console.log('old tag found!')
                }
              }
            }
          }
        }

        // console.log('courseQuizData')
        // console.log(courseQuizData)

        // console.log('courseQuizTagData')
        // console.log(courseQuizTagData)

        setCourseQuizQuestionData(courseQuizData)
        setCourseQuizTagData(courseQuizTagData)
      })

    getUsersInCourse(GlobalHook)
      .then(data => {
        console.log('tajmahal')
        console.log(data)
        setUserDataPool(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    GetManyUsersFromFirebase(getUserDataPool)
      .then(data => {
        // console.log('yeah')
        // console.log(data)
        setUserIdPool(data)
        GlobalHook.setGlobalLoading(false);
      })
      .catch(error => {
        console.log(error)
      })
  }, [getUserDataPool])

  useEffect(() => {
    var courseContentStructure = GlobalHook.getGlobalCourseContent.courseData[0].contentStructure

    var courseQuizData = [];
    var courseQuizSection = [];
    var i = 0;
    for (var courseSection of courseContentStructure) {
      i++;
      courseQuizData.push(courseSection.subItems.filter(subItem => subItem.type == "Quiz"))
      courseQuizSection.push("Section " + i)
    }

    var quizList = [];
    for (var section of courseQuizData) {
      for (var quiz of section) {
        quizList.push(quiz)
      }
    }

    setQuizList(quizList)

  }, [setCourseQuizTagData])



  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalCourseReviewPool) {
      setReviewPool(GlobalHook.getGlobalCourseReviewPool)
    }
  }, [GlobalHook.getGlobalCourseReviewPool])


  useEffect(() => {
    console.log('yoga')
    console.log(getSelectedStudent)
    console.log(getQuizFilter)

    
    if (getSelectedStudentIndex == -1) {
      if (getDataVisual == "ความคืบหน้า") {
        chooseAllStudent('All', -1, "Completed Lessons")
      }
      else if (getDataVisual == "ผลแบบฝึกหัด") {
        if (getDataVisualFormat == "Completed Lessons") {
          chooseAllStudent('All', -1, "Total")
        } else {
          chooseAllStudent('All', -1, getDataVisualFormat)          
        }
      }
    }
    else if (getSelectedStudent != null) {
      if (getDataVisual == "ความคืบหน้า") {
        chooseAllStudent(getSelectedStudent, getSelectedStudentIndex, "Completed Lessons")
      }
      else if (getDataVisual == "ผลแบบฝึกหัด") {
        if (getDataVisualFormat == "Completed Lessons") {
          chooseStudentFunc(getSelectedStudent, getSelectedStudentIndex, "Total")
        } else {
          chooseStudentFunc(getSelectedStudent, getSelectedStudentIndex, getDataVisualFormat)        
        }
      }
    }


  }, [getDataVisual, getDataVisualSubset, getDataVisualFormat, getQuizFilter, getSelectedStudent])



  function processAllStudentQuiz(user, userDataPoolList, format) {
    // console.log('formod')
    // console.log(getDataVisualFormat)
    for (user of userDataPoolList) {
      user.thisQuizResults = []
      user.thisCourseQuizList = []
    }

    // add user quiz attempts to userDataPoolList
    var userCourseQuizDataList = []
    for (user of userDataPoolList) {
      // console.log("user")
      var userCourseQuizData = user.courseSubscription.filter(course => course.courseId == GlobalHook.getGlobalcourseId)
      user.thisQuizResults.push(userCourseQuizData[0].quizLog)
    }

    // make a ranked list of quizzes in whole course
    for (var section of GlobalHook.getGlobalCourseContent.courseData[0].contentStructure) {
      // console.log('section')
      // console.log(section)
      for (var subItem of section.subItems) {
        // subItem.userAttempts=[];
        if (subItem.type == "Quiz") {
          for (user of userDataPoolList) {
            var tempItem = new Object();
            tempItem.title = subItem.title;
            tempItem.mediaId = subItem.mediaId;
            tempItem.type = subItem.type;
            tempItem.data = subItem.date;
            tempItem.userAttempts = []
            user.thisCourseQuizList.push(tempItem)
          }
        }
      }
    }

    // add user attempts to course quiz list
    for (user of userDataPoolList) {
      for (var quiz of user.thisCourseQuizList) {
        var filtered = user.thisQuizResults[0].filter((item) => item.lessionId == quiz.mediaId)
        // console.log(filtered)
        for (var item of filtered) {
          quiz.userAttempts.push(item)
        }
      }
    }

    // Prepare user & quiz data: question correct / wrong info
    var correct = 0;
    var wrong = 0;
    var correctTotal = 0;
    var wrongTotal = 0;

    for (user of userDataPoolList) {
      correctTotal = 0;
      wrongTotal = 0;
      for (quiz of user.thisCourseQuizList) {
        correct = 0;
        wrong = 0;
        for (var attempt of quiz.userAttempts) {
          for (var key in attempt.quizData) {
            if (attempt.quizData.hasOwnProperty(key)) {
              // console.log(attempt.quizData[key].result)
              if (attempt.quizData[key].result) {
                correctTotal = correctTotal + 1;
                correct = correct + 1;
              } else {
                wrongTotal = wrongTotal + 1;
                wrong = wrong + 1;
              }
            }
          }
        }
        quiz.Qcorrect = correct;
        quiz.Qwrong = wrong;
      }
      user.totalQcorrect = correctTotal;
      user.totalQwrong = wrongTotal;
      user.totalQattempts = quiz.userAttempts.length;
    }

    // prepare chart data
    var chartData = [];
    if (getDataVisual == "ผลแบบฝึกหัด") {
      if (getQuizFilter != "All Quiz") {
        // console.log('quizFilter')
        // console.log(getQuizList)

        var selectedQuiz = getQuizList.filter((item) => item.mediaId == getQuizFilter)[0]

        for (user of userDataPoolList) {
          for (quiz of user.thisCourseQuizList) {

            if (quiz.mediaId == getQuizFilter) {

              if (getDataVisualFormat == "Total") {
                chartData.push(
                  {
                    name: user.userName + " " + user.userEmail, correct: quiz.Qcorrect, wrong: quiz.Qwrong,
                  })
              }
              else if (getDataVisualFormat == "Percentage") {
                chartData.push(
                  {
                    name: user.userName + " " + user.userEmail, correct: 100 * quiz.Qcorrect / (quiz.Qcorrect + quiz.Qwrong), wrong: 100 * quiz.Qwrong / (quiz.Qcorrect + quiz.Qwrong),
                  })
              }
            }
          }

        }

      }
      else {
        if ((getDataVisualSubset == "คะแนนทั้งหมด") || (getDataVisualSubset == "คะแนนตํ่าสุด") || (getDataVisualSubset == "คะแนนสูงสุด")) {
          for (user of userDataPoolList) {
            correct = 0;
            wrong = 0;
            for (quiz of user.thisCourseQuizList) {

            }
            if (getDataVisualFormat == "Total") {
              chartData.push(
                {
                  name: user.userName + " " + user.userEmail, correct: user.totalQcorrect, wrong: user.totalQwrong,
                })
            } else if (getDataVisualFormat == "Percentage") {
              chartData.push(
                {
                  name: user.userName + " " + user.userEmail, correct: 100 * user.totalQcorrect / (user.totalQcorrect + user.totalQwrong), wrong: 100 * user.totalQwrong / (user.totalQcorrect + user.totalQwrong),
                })
            }
          }
        }
        else if (getDataVisualSubset == "คะแนนเฉลี่ย") {
          for (user of userDataPoolList) {
            if (getDataVisualFormat == "Total") {
              chartData.push(
                {
                  name: user.userName + " " + user.userEmail, correct: user.totalQcorrect / (user.totalQcorrect + user.totalQwrong), wrong: user.totalQwrong / (user.totalQcorrect + user.totalQwrong),
                })
            } else if (getDataVisualFormat == "Percentage") {
              chartData.push(
                {
                  name: user.userName + " " + user.userEmail, correct: 100 * user.totalQcorrect / (user.totalQcorrect + user.totalQwrong), wrong: 100 * user.totalQwrong / (user.totalQcorrect + user.totalQwrong),
                })
            }
          }
        }
      }
    }

    setChartKey1([{ dataKey: 'correct', fill: '#68E456' }])
    setChartKey2([{ dataKey: 'wrong', fill: '#FD6253' }])


    setChartData(chartData)
  }

  function chooseAllStudent(chosenStudent, index, format) {

    setDataVisualFormat( format )

    var userDataPoolList = []
    for (var user of getUserIdPool) {
      var userDataPool = getUserDataPool.filter(item => item.uid == user.uid);
      userDataPool[0].userName = user.displayName;
      userDataPool[0].userEmail = user.email;
      userDataPoolList.push(userDataPool[0])
    }

    if (getDataVisual == "ผลแบบฝึกหัด") {
      processAllStudentQuiz(user, userDataPoolList, format)
    }
    else if (getDataVisual == "ความคืบหน้า") {

      for (user of userDataPoolList) {
        user.courseLog = []
        user.quizLog = []
        user.lessonList = []
      }

      // add user quiz attempts to userDataPoolList
      var userCourseQuizDataList = []
      for (user of userDataPoolList) {
        // console.log("user")
        var userCourseQuizData = user.courseSubscription.filter(course => course.courseId == GlobalHook.getGlobalcourseId)
        user.courseLog.push(userCourseQuizData[0].courseLog)
        user.quizLog.push(userCourseQuizData[0].quizLog)
      }

      var lessonList = []
      for (user of userDataPoolList) {
        for (var section of GlobalHook.getGlobalCourseContent.courseData[0].contentStructure) {
          for (var lesson of section.subItems) {
            if ((lesson.type == "Video") || (lesson.type == "Quiz") || (lesson.type == "Doc")) {
              var tempLesson = new Object()
              tempLesson.id = lesson.id;
              tempLesson.title = lesson.title;
              tempLesson.type = lesson.type;
              tempLesson.mediaId = lesson.mediaId;
              tempLesson.preview = lesson.preview;
              tempLesson.date = lesson.date;
              tempLesson.etc1 = lesson.etc1
              tempLesson.etc2 = lesson.etc2
              tempLesson.etc3 = lesson.etc3
              tempLesson.etc4 = lesson.etc4
              tempLesson.etc5 = lesson.etc5
              tempLesson.userLog = [];

              user.lessonList.push(tempLesson)
            }
          }
        }
      }

      for (user of userDataPoolList) {
        for (var lesson of user.lessonList) {
          var lessonLearnt = user.courseLog[0].filter(log => log.lessionId == lesson.mediaId)
          if (lessonLearnt.length > 0) {
            lesson.userLog = lessonLearnt;
          }
        }
      }

      if (chosenStudent == "All") {
        var chartData = [];
        var numberOfLessons = 0;
        console.log('powerranger')
        console.log(userDataPoolList)
        if (userDataPoolList.length>0) {
          numberOfLessons = userDataPoolList[0].lessonList.length;
        }
        var lessonsCompleted = 0;
        for (user of userDataPoolList) {
          lessonsCompleted = 0;
          for (var lesson of user.lessonList) {
            if (lesson.userLog.length > 0) {
              lessonsCompleted++;
            }
          }

          var shortendedUserName = ""
          var q = 0;
          var firstName = "";
          for (var letter of user.userName) {
            if (q < 8) {
              shortendedUserName = shortendedUserName + letter;
            }
            q++;
          }

          if (shortendedUserName.length < user.userName.length) {
            shortendedUserName = shortendedUserName + "..."
          }    


          if (user.userName.length == 0) {
            q = 0;
            for (var letter of user.userEmail) {
              if (q < 8) {
                if (letter == "@") {
                  break;
                }
                shortendedUserName = shortendedUserName + letter;
              }
              q++;
            }  
            if (shortendedUserName.length < user.userEmail) {
              shortendedUserName = shortendedUserName + "..."
            }          
          }

          if (format == "Completed Lessons") {
            chartData.push(
              {
                name: shortendedUserName , completed: lessonsCompleted, remaining: numberOfLessons - lessonsCompleted,
              })
          }
        }
      } else {
        user = userDataPoolList.filter(user => user.uid == chosenStudent.uid)

        var completed = 0;
        var remaining = 0;
        var chartData = []
        for (lesson of user[0].lessonList) {
          if (lesson.userLog.length > 0) {
            completed = 1;
            remaining = 0;
          } else {
            completed = 0;
            remaining = 1;
          }
          // if (getDataVisualFormat == "Completed Lessons") {
          chartData.push(
            {
              name: lesson.title, completed: completed, remaining: remaining,
            })
          // }          
        }
      }

      setChartData(chartData)

      setChartKey1([{ dataKey: 'completed', fill: '#68E456' }])
      setChartKey2([{ dataKey: 'remaining', fill: '#FD6253' }])

      
    }
  }


  function chooseStudentFunc(item, index, format) {
    // setSelectedStudent(item)
    // setSelectedStudentIndex(index)
    setDataVisualFormat(format)

    if (getDataVisual == "ผลแบบฝึกหัด") {

      var selectedUserData = getUserDataPool.filter(getUserDataPool => getUserDataPool.uid == item.uid);
      selectedUserData = selectedUserData[0]

      var userQuizData = selectedUserData.courseSubscription;
      userQuizData = userQuizData.filter(userCourse => userCourse.courseId == GlobalHook.getGlobalcourseId)
      userQuizData = userQuizData[0].quizLog


      const quizAttemptList = []
      for (var quizAttempt of userQuizData) {
        quizAttempt.Qcorrect = 0;
        quizAttempt.Qwrong = 0;
        for (var questionKey in quizAttempt.quizData) {
          if (quizAttempt.quizData[questionKey].result) {
            quizAttempt.Qcorrect++;
          } else {
            quizAttempt.Qwrong++;
          }
        }
        quizAttemptList.push(quizAttempt)
      }

      var quizList = getQuizList;

      var i = 0;
      var quizAttemptListSorted = []
      for (var quiz of quizList) {
        quizAttemptListSorted[i] = quizAttemptList.filter(quizAttempt => quizAttempt.lessionId == quiz.mediaId)
        i++;
      }

      var total_correct;
      var total_wrong;
      var high_score;
      var low_score;
      var number_of_questions;

      i = 0;
      for (var quizQuestion of quizAttemptListSorted) {
        j = 0
        total_correct = 0;
        total_wrong = 0;
        high_score = 0;
        low_score = 999;
        number_of_questions = 0;
        for (var attempts of quizQuestion) {
          total_correct = attempts.Qcorrect + total_correct;
          total_wrong = attempts.Qwrong + total_wrong;

          if (attempts.Qcorrect > high_score) {
            high_score = attempts.Qcorrect
          }
          if (attempts.Qcorrect < low_score) {
            low_score = attempts.Qcorrect
          }
          j++;
          number_of_questions = Object.keys(attempts.quizData).length;
        }
        if (low_score == "999") {
          low_score = 0;
        }

        quizQuestion.numberOfQuestions = number_of_questions;
        quizQuestion.highScore = high_score;
        quizQuestion.lowScore = low_score;
        quizQuestion.totalCorrect = total_correct;
        quizQuestion.totalWrong = total_wrong;
        quizQuestion.avgQcorrect = total_correct / j;
        quizQuestion.avgQwrong = total_wrong / j;
        quizQuestion.mediaId = getQuizList[i].mediaId;
        i++
      }

      // prepare chart data array
      const chartData = [];
      var correct = 0;
      var wrong = 0;

      if (getQuizFilter != "All Quiz") {

        // preprocessing Data for Chosen Quiz (not for all Quizzes!)
        quizList = getQuizList.filter((item) => item.mediaId == getQuizFilter)

        var quizQuestionsList = getCourseQuizQuestionData.filter((item) => item.mediaId == quizList[0].mediaId)

        var userAttempts = quizAttemptListSorted.filter((item) => item.mediaId == quizList[0].mediaId)

        var userAttemptedQuestionList = []


        for (var quizAttempt of userAttempts[0]) {
          for (var key in quizAttempt.quizData) {
            if (quizAttempt.quizData.hasOwnProperty(key)) {
              quizAttempt.quizData[key].questionId = key;
              userAttemptedQuestionList.push(quizAttempt.quizData[key])
            }
          }
        }


        for (question of quizQuestionsList) {
          var attemptsAtQuestion = userAttemptedQuestionList.filter((item) => item.questionId == question.questionId)

          i = 0;
          correct = 0;
          wrong = 0;
          question.attemptList = []
          for (var attempt of attemptsAtQuestion) {
            question.attemptList.push(attempt)
            if (attempt.result) {
              correct = correct + 1;
            } else {
              wrong = wrong + 1;
            }
            i++;
          }
          if (correct > 0) {
            question.highScore = 1
            if (wrong == 0) {
              question.lowScore = 1;
            }
          }
          if (wrong > 0) {
            question.lowScore = 0
            if (correct == 0) {
              question.highScore = 0;
            }
          }
          question.Qcorrect = correct;
          question.Qwrong = wrong;
          question.QcorrectAvg = correct / i;
          question.QwrongAvg = wrong / i;
          question.numberOfAttempts = i;
        }


        if (getDataVisualSubset == "คะแนนทั้งหมด") {
          quizList = quizList.filter((item) => item.mediaId == getQuizFilter)
          var quizQuestionsList = getCourseQuizQuestionData.filter((item) => item.mediaId == quizList[0].mediaId)
          var userAttempts = quizAttemptListSorted.filter((item) => item.mediaId == quizList[0].mediaId)
          i = 1;
          for (var quizAttempt of userAttempts[0]) {
            j = 1;
            for (var key in quizAttempt.quizData) {
              if (quizAttempt.quizData.hasOwnProperty(key)) {
                if (quizAttempt.quizData[key].result) {
                  correct = 1;
                  wrong = 0;
                } else {
                  wrong = 1;
                  correct = 0;
                }
                if (format == "Total") {
                  chartData.push(
                    {
                      name: "Q" + j + ": " + "Attempt " + i, correct: correct, wrong: wrong,
                    })
                } else if (format == "Percentage") {
                  chartData.push(
                    {
                      name: "Q" + j + ": " + "Attempt " + i, correct: correct * 100, wrong: wrong * 100,
                    })
                }
              }
              j++;
            }
            i++;
          }
        }
        else if (getDataVisualSubset == "คะแนนเฉลี่ย") {
          for (question of quizQuestionsList) {
            if (format == "Total") {
              chartData.push(
                {
                  name: question.questionName, correct: question.QcorrectAvg, wrong: question.QwrongAvg,
                })
            }
            else if (format == "Percentage") {
              chartData.push(
                {
                  name: question.questionName, correct: question.QcorrectAvg * 100, wrong: question.QwrongAvg * 100,
                })
            }
          }
        }
        else if (getDataVisualSubset == "คะแนนสูงสุด") {
          for (question of quizQuestionsList) {
            if (format == "Total") {
              chartData.push(
                {
                  name: question.questionName, correct: question.highScore, wrong: 1 - question.highScore,
                })
            }
            else if (format == "Percentage") {
              chartData.push(
                {
                  name: question.questionName, correct: 100 * question.highScore , wrong: 100* (1 - question.highScore),
                })
            }
          }
        }
        else if (getDataVisualSubset == "คะแนนตํ่าสุด") {
          for (question of quizQuestionsList) {
            if (format == "Total") {
              chartData.push(
                {
                  name: question.questionName, correct: question.lowScore, wrong: 1 - question.lowScore,
                })
            }
            else if (format == "Percentage") {
              chartData.push(
                {
                  name: question.questionName, correct: 100* question.lowScore, wrong: 100* ( 1 - question.lowScore ),
                })
            }
          }
        }
        else if (getDataVisualSubset == "คะแนน Tag") {
          for (tag of getCourseQuizTagData) {
            tag.Qcorrect = 0;
            tag.Qwrong = 0;
            for (question of quizQuestionsList) {
              if (question.quizTagEnglish.length > 0) {
                for (var tag2 of question.quizTagEnglish) {
                  if (tag2.id == tag.tagId) {
                    tag.Qcorrect = question.Qcorrect + tag.Qcorrect;
                    tag.Qwrong = question.Qwrong + tag.Qwrong;
                  }
                }
              }
            }
          }

          for (item of getCourseQuizTagData) {
            if (format == "Percentage") {
              chartData.push(
                {
                  name: item.tagName, correct: 100 * item.Qcorrect / (item.Qcorrect + item.Qwrong), wrong: 100 * item.Qwrong / (item.Qcorrect + item.Qwrong),
                })
            }
            else if (format == "Total") {
              chartData.push(
                {
                  name: item.tagName, correct: item.Qcorrect, wrong: item.Qwrong,
                })
            }
          }
        }
      }
      else {
        if (getDataVisualSubset == "คะแนนทั้งหมด") {
          for (var quizSet of getQuizList) {
            var quizQuestionsList = getCourseQuizQuestionData.filter((item) => item.mediaId == quizSet.mediaId)
            var userAttempts = quizAttemptListSorted.filter((item) => item.mediaId == quizSet.mediaId)

            i = 1;
            for (var quizAttempt of userAttempts[0]) {
              j = 1;
              for (var key in quizAttempt.quizData) {
                if (quizAttempt.quizData.hasOwnProperty(key)) {

                  if (quizAttempt.quizData[key].result) {
                    correct = 1;
                    wrong = 0;
                  } else {
                    wrong = 1;
                    correct = 0;
                  }

                  if (getDataVisualFormat == "Total") {
                    chartData.push(
                      {
                        name: quizSet.title + " Q" + j + ": " + "Attempt " + i, correct: correct, wrong: wrong,
                      })
                  }
                  else if (getDataVisualFormat == "Percentage") {
                    chartData.push(
                      {
                        name: quizSet.title + " Q" + j + ": " + "Attempt " + i, correct: 100*correct/(correct+wrong), wrong: 100*wrong/(correct+wrong),
                      })
                  }

                }
                j++;
              }
              i++;
            }
          }
        }
        else if (getDataVisualSubset == "คะแนนเฉลี่ย") {
          for (i in quizList) {
            if (getDataVisualFormat == "Total") {
              chartData.push(
                {
                  name: quizList[i].title, correct: quizAttemptListSorted[i].avgQcorrect, wrong: quizAttemptListSorted[i].avgQwrong,
                })
            }
            else if (getDataVisualFormat == "Percentage") {
              chartData.push(
                {
                  name: quizList[i].title, correct: 100 * quizAttemptListSorted[i].avgQcorrect / quizAttemptListSorted[i].numberOfQuestions, wrong: 0,
                })
            }
          }
        }
        else if (getDataVisualSubset == "คะแนนสูงสุด") {
          for (i in quizList) {
            if (getDataVisualFormat == "Total") {
              chartData.push(
                {
                  name: quizList[i].title, correct: quizAttemptListSorted[i].highScore, wrong: quizAttemptListSorted[i].numberOfQuestions - quizAttemptListSorted[i].highScore,
                })
            }
            else if (getDataVisualFormat == "Percentage") {
              chartData.push(
                {
                  name: quizList[i].title, correct: 100 * quizAttemptListSorted[i].highScore / quizAttemptListSorted[i].numberOfQuestions, wrong: 100 * (quizAttemptListSorted[i].numberOfQuestions - quizAttemptListSorted[i].highScore) / quizAttemptListSorted[i].numberOfQuestions,
                })
            }
          }
        }
        else if (getDataVisualSubset == "คะแนนตํ่าสุด") {
          for (i in quizList) {
            if (getDataVisualFormat == "Total") {
              chartData.push(
                {
                  name: quizList[i].title, correct: quizAttemptListSorted[i].lowScore, wrong: quizAttemptListSorted[i].numberOfQuestions - quizAttemptListSorted[i].lowScore,
                })
            }
            else if (getDataVisualFormat == "Percentage") {
              chartData.push(
                {
                  name: quizList[i].title, correct: 100 * quizAttemptListSorted[i].lowScore / quizAttemptListSorted[i].numberOfQuestions, wrong: 100 * (quizAttemptListSorted[i].numberOfQuestions - quizAttemptListSorted[i].lowScore) / quizAttemptListSorted[i].numberOfQuestions,
                })
            }
          }
        }
        else if (getDataVisualSubset == "คะแนน Tag") {
          var tempCourseQuizData = getCourseQuizQuestionData
          var questionAttemptList = []

          var tempCourseQuizTagData = getCourseQuizTagData

          for (item of tempCourseQuizData) {
            item.questionAttempts = []
          }

          for (item of tempCourseQuizTagData) {
            item.Qcorrect = 0;
            item.Qwrong = 0;
          }
          for (index in quizAttemptListSorted) {

            for (var quizAttempt of quizAttemptListSorted[index]) {
              // console.log(quizAttempt.quizData)
              for (var key in quizAttempt.quizData) {
                if (quizAttempt.quizData.hasOwnProperty(key)) {
                  console.log(quizAttempt.quizData[key]);

                  var filtration = getCourseQuizQuestionData.findIndex((item) => item.questionId == key)
                  if (filtration > -1) {
                    tempCourseQuizData[filtration].questionAttempts.push(quizAttempt.quizData[key])
                  }
                }
              }
            }
          }

          i = 0;
          var j = 0;
          // loop to get each question
          for (item of tempCourseQuizData) {
            if (item.quizTagEnglish.length > 0) {
              item.Qcorrect = 0;
              item.Qwrong = 0;

              // loop to get each tag in question, for each tag push data
              for (var tag of item.quizTagEnglish) {
                // console.log(item.questionAttempts)

                var tagIndex = tempCourseQuizTagData.findIndex((list) => list.tagId == tag.id)

                if (tagIndex > -1) {

                  for (var question of item.questionAttempts) {
                    if (question.result) {
                      // item.Qcorrect = item.Qcorrect + 1;
                      tempCourseQuizTagData[tagIndex].Qcorrect = tempCourseQuizTagData[tagIndex].Qcorrect + 1;
                    } else {
                      tempCourseQuizTagData[tagIndex].Qwrong = tempCourseQuizTagData[tagIndex].Qwrong + 1;
                      // item.Qwrong = item.Qwrong + 1;
                    }

                  }
                }
              }
            }
            i++;
          }


          for (item of tempCourseQuizTagData) {
            chartData.push(
              {
                name: item.tagName, correct: item.Qcorrect, wrong: item.Qwrong,
              })
          }
        }
      }

      for (item of chartData) {
        if (isNaN(item.correct)) {
          item.correct = 0;
        }
        if (isNaN(item.wrong)) {
          item.wrong = 0;
        }
      }

      setChartKey1([{ dataKey: 'correct', fill: '#68E456' }])
      setChartKey2([{ dataKey: 'wrong', fill: '#FD6253' }])
        
      setChartData(chartData)
    }
  }




  return (

    <div className=" h-full w-full flex flex-col items-center py-4 justify-start">
      <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-8 md:mb-10 bg-orange-500">
        Dashboard
      </div>


      <div className="flex flex-row flex-wrap justify-around w-full">



        <div className="bg-gray-200 p-6 rounded-lg mb-6" style={{ height: "600px", minWidth: "400px", width: "200px", overflowY: "auto" }}>
          <div className="rounded-lg text-center text-white py-2 text-xl font-bold bg-purple-500 mx-auto" style={{ width: "120px", maxHeight: "500px" }}>
            Student
          </div>
          <div className="mt-4 flex flex-col">

            <div
              onClick={() => { setSelectedStudent("All"); setSelectedStudentIndex(-1) }}
              className="flex mt-4 bg-white  rounded-lg p-2 items-center"
              style={{ backgroundColor: (getSelectedStudentIndex == -1 ) ? "lightgray" : "white" }} >
              <div className="mr-4"> </div>
              <p> All Students</p>
            </div>

            {getUserIdPool.map((item, index) => {
              return (
                <div
                  onClick={() => { setSelectedStudent(item); setSelectedStudentIndex(index) }}
                  className="flex mt-4 bg-white  rounded-lg p-2 items-center"
                  key={index} style={{ backgroundColor: (getSelectedStudentIndex == index) ? "lightgray" : "white" }}>
                  <div className="mr-4"> </div>
                  <p>{(item.displayName) ? item.displayName : "undefined"} - {item.email} + {item.uid}</p>
                </div>
              )
            })}


          </div>
        </div>


        <div className="bg-gray-200 p-6 rounded-lg" style={{ height: "600px", width: "500px" }}>
          <div className="rounded-lg text-center text-white py-2 text-xl font-bold bg-blue-500 mx-auto" style={{ width: "120px", maxHeight: "300px" }}>
            Statistic
          </div>


          <div style={{ width: "100%", marginTop: "2vh", overflow: "hidden" }}>
            <div style={{ width: "50%", float: "left" }}>
              <div className="font-bold text mb-2"> เลือกการวิเคราะห์ผล </div>
              <Select
                defaultValue="ความคืบหน้า"
                onChange={e => setDataVisual(e)}
                value={getDataVisual}
                style={{ minWidth: "210px" }}
              >
                <Option value="ความคืบหน้า">ความคืบหน้า</Option>
                <Option value="ผลแบบฝึกหัด">ผลแบบฝึกหัด</Option>
              </Select>
            </div>

          </div>



          {(getDataVisual == "ผลแบบฝึกหัด") ?
            <div style={{ marginTop: "2vh" }}>
              <Radio.Group onChange={(e) => setDataVisualFormat(e.target.value)} value={getDataVisualFormat}>
                <Radio value={"Total"}> Total </Radio>
                <Radio value={"Percentage"}> Percentage </Radio>

              </Radio.Group>



              <select
                defaultValue="คะแนนทั้งหมด"
                onChange={e => setDataVisualSubset(e.target.value)}
                value={getDataVisualSubset}
                style={{ maxWidth: "100px", marginRight: "10px" }}
              >
                <option value="คะแนนทั้งหมด">คะแนนทั้งหมด</option>
                { ( (getSelectedStudentIndex != -1) )?
                  <>
                  <option value="คะแนนเฉลี่ย">คะแนนเฉลี่ย</option>
                  <option value="คะแนนสูงสุด">คะแนนสูงสุด</option>
                  <option value="คะแนนตํ่าสุด">คะแนนตํ่าสุด</option>
                  <option value="คะแนน Tag">คะแนน Tag</option> 
                  </>
                  : <></>}
                

              </select>


              <select
                defaultValue="All Quiz"
                onChange={e => setQuizFilter(e.target.value)}
                value={getQuizFilter}
                style={{ maxWidth: "100px", marginRight: "10px" }}
              >
                <option value={"All Quiz"}> All Quiz </option>;
                {getQuizList.map(item => {
                  return <option value={item.mediaId}> {item.title} </option>;
                })}
              </select>

            </div>
            : <> </>}


          <div className="mt-4 flex flex-col" style={{ clear: "both", marginTop: "2vh", width: "100%", overflow: "auto" }}>

            <AreaChart type={getDataVisualFormat} chartData={getChartData} chartDataKeyList={getChartDataKeyList} key1={getChartKey1} key2={getChartKey2} key3={getChartKey3} />
          </div>

        </div>


      </div>
    </div>
  );
}
