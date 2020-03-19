import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Spin } from "antd";
import axios from "axios";
import Firebase from "./firebase";

export const GlobalContext = React.createContext("GlobalContext");
export const FirebaseContext = React.createContext();
export const NewContext = React.createContext("NewContext");
export const CourseQuizContext = React.createContext("CourseQuizContext");

const Store = props => {
  const [getGlobalCurrentUser, setGlobalCurrentUser] = useState(null);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(setGlobalCurrentUser);
  }, []);

 

  //User
  const [getGlobalToken, setGlobalToken] = useState(null);
  const [getGlobalUser, setGlobalUser] = useState(null);

  //Common
  const [getGlobalShowSideBarStatus, setGlobalShowSideBarStatus] = useState(
    false
  );
  const [getGlobalLoading, setGlobalLoading] = useState(false);
  const [getGlobalLoginTab, setGlobalLoginTab] = useState("Login");

  //Modal
  const [getGlobalShowSearch, setGlobalShowSearch] = useState(false);
  const [getGlobalShowLoginModal, setGlobalShowLoginModal] = useState(false);
  const [getGlobalShowMobileSearchBar, setGlobalShowMobileSearchBar] = useState(
    false
  );

  //Course

  const [getGlobalCoursePool, setGlobalCoursePool] = useState([]);
  const [getGlobalCourseContent, setGlobalCourseContent] = useState([]);
  const [getGlobalCourseSearch, setGlobalCourseSearch] = useState([]);
  const [getGlobalCourseSlug, setGlobalCourseSlug] = useState("");
  const [getGlobalcourseId, setGlobalcourseId] = useState("");
  const [getGlobalCourseTag, setGlobalCourseTag] = useState("");

  const [getGlobalCourseTagThai, setGlobalCourseTagThai] = useState([]);
  const [getGlobalCourseTagEnglish, setGlobalCourseTagEnglish] = useState([]);


  const [getGlobalCourseTagThaiLession, setGlobalCourseTagThaiLession] = useState([]);
  const [getGlobalCourseTagEnglishLession, setGlobalCourseTagEnglishLession] = useState([]);


  const [getGlobalCourseTagThaiQuiz, setGlobalCourseTagThaiQuiz] = useState([]);
  const [getGlobalCourseTagEnglishQuiz, setGlobalCourseTagEnglishQuiz] = useState([]);

  const [getLessionTagSameAsCourseStatus,setLessionTagSameAsCourseStatus] = useState(true)



  const [getGlobalLessionSelect, setGlobalLessionSelect] = useState({});

  const [getGlobalLessionSelectNew, setGlobalLessionSelectNew] = useState({});

  const [getGlobalCourseStructure, setGlobalCourseStructure] = useState([]);
  const [getGlobalCourseStructureNew, setGlobalCourseStructureNew] = useState(
    []
  );
  const [getGlobalNotFirstLoadStatus, setGlobalNotFirstLoadStatus] = useState(
    false
  );

  const [getGlobalStatusCode, setGlobalStatusCode] = useState("");
  const [getGlobalStatusCodeQ, setGlobalStatusCodeQ] = useState("");

  //Filter
  const [getGlobalCourseSubjectFilter, setGlobalCourseSubjectFilter] = useState(
    "ทั้งหมด"
  );
  const [getGlobalCourseLevelFilter, setGlobalCourseLevelFilter] = useState(
    "ทั้งหมด"
  );

  //Studio
  const [getGlobalCourseName, setGlobalCourseName] = useState("");
  const [getGlobalCourseSubject, setGlobalCourseSubject] = useState(
    "Mathematic"
  );
  const [getGlobalCourseLevel, setGlobalCourseLevel] = useState("ประถม");
  const [getGlobalCourseTeacher, setGlobalCourseTeacher] = useState("");
  const [getGlobalCourseDescription, setGlobalCourseDescription] = useState("");
  const [getGlobalCourseImage, setGlobalCourseImage] = useState("");

  const [getGlobalcourseImageFileName, setGlobalcourseImageFileName] = useState(
    ""
  );

  //Quiz
  const [getGloblaQuizQuestionSelect, setGloblaQuizQuestionSelect] = useState(
    {}
  );
  const [getGloblaQuizQuestionName, setGloblaQuizQuestionName] = useState("");
  const [getGloblaQuizQuestionField, setGloblaQuizQuestionField] = useState("");
  const [getGloblaQuizAnswerType, setGloblaQuizAnswerType] = useState(
    "MultipleChoice"
  );
  const [getGloblaQuizAnswerField, setGloblaQuizAnswerField] = useState([]);
  const [getGloblaQuizAnswerCorrect, setGloblaQuizAnswerCorrect] = useState();
  const [getGloblaQuizExplainType, setGloblaQuizExplainType] = useState("Text");
  const [getGloblaQuizExplainField, setGloblaQuizExplainField] = useState();
  const [
    getGloblaQuizExplainFieldNew,
    setGloblaQuizExplainFieldNew
  ] = useState();

  const [
    getGloblaQuizQuestionSelectNew,
    setGloblaQuizQuestionSelectNew
  ] = useState({});

  const [getGlobalUserAnsSelectNew, setGlobalUserAnsSelectNew] = useState("");

  const [getGloblaQuizAnswerFieldNew, setGloblaQuizAnswerFieldNew] = useState();

  const [getGlobalUserAnswerPool, setGlobalUserAnswerPool] = useState({});
  const [getGlobalUserAnswerSelect, setGlobalUserAnswerSelect] = useState("");

  const [getGlobalUserAnswerPoolNew, setGlobalUserAnswerPoolNew] = useState({});

  const [getGlobalQuizFinishStatus, setGlobalQuizFinishStatus] = useState(
    false
  );

  //Media
  const [getGlobalMediaVideo, setGlobalMediaVideo] = useState(null);
  const [getGlobalMediaDocument, setGlobalMediaDocument] = useState("");
  const [getGlobalMediaQuiz, setGlobalMediaQuiz] = useState();

  //NewMedia
  const [getGlobalMediaNew, setGlobalMediaNew] = useState();

  const [getGlobalCourseInfoOverview, setGlobalCourseInfoOverview] = useState(
    ""
  );
  const [getGlobalCourseInfoStudent, setGlobalCourseInfoStudent] = useState("");
  const [getGlobalCourseInfoTeacher, setGlobalCourseInfoTeacher] = useState("");

  const [getGlobalMessage,setGlobalMessage] = useState(null)

  const [
    getGlobalCourseInfoOverviewNew,
    setGlobalCourseInfoOverviewNew
  ] = useState("");
  const [
    getGlobalCourseInfoStudentNew,
    setGlobalCourseInfoStudentNew
  ] = useState("");
  const [
    getGlobalCourseInfoTeacherNew,
    setGlobalCourseInfoTeacherNew
  ] = useState("");

  const [getGlobalCourseReviewPool, setGlobalCourseReviewPool] = useState([]);


  const [getGlobalStudioUploadFile, setGlobalStudioUploadFile] = useState(null);

  //Utility

  const [getPrevNextStatus, setPrevNextStatus] = useState(null);

  //MutateStatus

  const [getMutantStatus, setMutantStatus] = useState(false);

  //PopUp
  const [
    getGlobalShowUnSaveAlertStatus,
    setGlobalShowUnSaveAlertStatus
  ] = useState(false);

  const [getStartedQuiz, setStartedQuiz] = useState(false);

  const [getGlobalCourseFee,setGlobalCourseFee] = useState(true)
  const [getGlobalCoursePrice,setGlobalCoursePrice] = useState(null)
  
  const [getGlobalShowCourseFeeAlertModal,setGlobalShowCourseFeeAlertModal] = useState(false)
  const [getQuizTagSameAsLessionStatus,setQuizTagSameAsLessionStatus] = useState(true)


  const [getGlobalVimeoId, setGlobalVimeoId] = useState("")

  ///Generate GlobalHook///
  const GlobalHook = {
    getGlobalToken,
    setGlobalToken,

    getGlobalUser,
    setGlobalUser,

    getMutantStatus,
    setMutantStatus,

    getGlobalShowSideBarStatus,
    setGlobalShowSideBarStatus,

    getGlobalShowSearch,
    setGlobalShowSearch,

    getGlobalShowLoginModal,
    setGlobalShowLoginModal,

    getGlobalCoursePool,
    setGlobalCoursePool,

    getGlobalCourseSearch,
    setGlobalCourseSearch,

    getGlobalLoading,
    setGlobalLoading,

    getGlobalCourseContent,
    setGlobalCourseContent,

    getGlobalLessionSelect,
    setGlobalLessionSelect,

    getGlobalCourseName,
    setGlobalCourseName,

    getGlobalCourseSubject,
    setGlobalCourseSubject,

    getGlobalCourseLevel,
    setGlobalCourseLevel,

    getGlobalCourseTeacher,
    setGlobalCourseTeacher,

    getGlobalCourseDescription,
    setGlobalCourseDescription,

    getGlobalCourseImage,
    setGlobalCourseImage,

    getGlobalShowMobileSearchBar,
    setGlobalShowMobileSearchBar,

    getGlobalLoginTab,
    setGlobalLoginTab,

    getGlobalMediaVideo,
    setGlobalMediaVideo,

    getGlobalMediaDocument,
    setGlobalMediaDocument,

    getGlobalMediaQuiz,
    setGlobalMediaQuiz,

    getGlobalMediaNew,
    setGlobalMediaNew,

    getGlobalCourseInfoOverview,
    setGlobalCourseInfoOverview,

    getGlobalCourseInfoStudent,
    setGlobalCourseInfoStudent,

    getGlobalCourseInfoTeacher,
    setGlobalCourseInfoTeacher,

    getGlobalCourseInfoOverviewNew,
    setGlobalCourseInfoOverviewNew,

    getGlobalCourseInfoStudentNew,
    setGlobalCourseInfoStudentNew,

    getGlobalCourseInfoTeacherNew,
    setGlobalCourseInfoTeacherNew,

    getGlobalCourseStructure,
    setGlobalCourseStructure,

    getGlobalCourseStructureNew,
    setGlobalCourseStructureNew,

    getGloblaQuizQuestionSelect,
    setGloblaQuizQuestionSelect,

    getGloblaQuizQuestionName,
    setGloblaQuizQuestionName,

    getGloblaQuizQuestionField,
    setGloblaQuizQuestionField,

    getGloblaQuizAnswerType,
    setGloblaQuizAnswerType,

    getGloblaQuizAnswerField,
    setGloblaQuizAnswerField,

    getGloblaQuizAnswerCorrect,
    setGloblaQuizAnswerCorrect,

    getGloblaQuizExplainType,
    setGloblaQuizExplainType,

    getGloblaQuizExplainField,
    setGloblaQuizExplainField,

    getGloblaQuizExplainFieldNew,
    setGloblaQuizExplainFieldNew,

    getGloblaQuizAnswerFieldNew,
    setGloblaQuizAnswerFieldNew,

    getPrevNextStatus,
    setPrevNextStatus,

    getGlobalCourseSubjectFilter,
    setGlobalCourseSubjectFilter,

    getGlobalCourseLevelFilter,
    setGlobalCourseLevelFilter,

    getGlobalUserAnswerPool,
    setGlobalUserAnswerPool,

    getGlobalUserAnswerSelect,
    setGlobalUserAnswerSelect,

    getGlobalQuizFinishStatus,
    setGlobalQuizFinishStatus,

    getGlobalNotFirstLoadStatus,
    setGlobalNotFirstLoadStatus,

    getGlobalShowUnSaveAlertStatus,
    setGlobalShowUnSaveAlertStatus,

    getGlobalStudioUploadFile,
    setGlobalStudioUploadFile,

    getGlobalCurrentUser,
    setGlobalCurrentUser,

    getGlobalCourseSlug,
    setGlobalCourseSlug,

    getGlobalcourseId,
    setGlobalcourseId,

    getGlobalStatusCode,
    setGlobalStatusCode,

    getGlobalStatusCodeQ,
    setGlobalStatusCodeQ,

    getGlobalcourseImageFileName,
    setGlobalcourseImageFileName,

    getGlobalCourseTag,
    setGlobalCourseTag,

    getGlobalCourseTagThai,
    setGlobalCourseTagThai,

    getGlobalCourseTagEnglish,
    setGlobalCourseTagEnglish,

    getGlobalLessionSelectNew,
    setGlobalLessionSelectNew,

    getGlobalCourseReviewPool,
    setGlobalCourseReviewPool,

    getGlobalCourseFee,
    setGlobalCourseFee,

    getGlobalCoursePrice,
    setGlobalCoursePrice,

    getGlobalMessage,
    setGlobalMessage,

    getGlobalVimeoId,
    setGlobalVimeoId,

    getGlobalShowCourseFeeAlertModal,
    setGlobalShowCourseFeeAlertModal,

    getGlobalCourseTagThaiLession,
    setGlobalCourseTagThaiLession,

    getGlobalCourseTagEnglishLession,
    setGlobalCourseTagEnglishLession,

    getGlobalCourseTagThaiQuiz,
    setGlobalCourseTagThaiQuiz,

    getGlobalCourseTagEnglishQuiz,
    setGlobalCourseTagEnglishQuiz,

    getLessionTagSameAsCourseStatus,
    setLessionTagSameAsCourseStatus,

    getQuizTagSameAsLessionStatus,
    setQuizTagSameAsLessionStatus


  };

  ////Data Wrap////
  // useEffect( () => {

  //   (  async () =>{
  //     const  getToken = await Cookies.get('globalToken');
  //     setGlobalToken(getToken)

  //     axios.defaults.headers.common['Authorization'] = getToken;

  //     const  getUser =  localStorage.getItem("globalUser");

  //     setGlobalUser(JSON.parse(getUser));

  //     })()

  //   }, [])

  useEffect(() => {
    setGlobalLoading(true);
    const uid = localStorage.getItem("uid");
if(uid){
    axios
      .post("/api/user/getToken", { uid })
      .then(res => {
        setGlobalToken(res.data.token);
        Cookies.set("globalToken", res.data.token, { expires: 7 });

        setGlobalUser(res.data.user);
        localStorage.setItem("globalUser", JSON.stringify(res.data.user));

        axios.defaults.headers.common["Authorization"] = res.data.token;

        setGlobalLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, []);

  return (
    <GlobalContext.Provider value={GlobalHook}>
      <NewContext.Provider
        value={[getGlobalLessionSelectNew, setGlobalLessionSelectNew]}
      >
        <CourseQuizContext.Provider
          value={[
            getStartedQuiz,
            setStartedQuiz,
            getGlobalUserAnsSelectNew,
            setGlobalUserAnsSelectNew,
            getGlobalUserAnswerPoolNew,
            setGlobalUserAnswerPoolNew,
            getGloblaQuizQuestionSelectNew,
            setGloblaQuizQuestionSelectNew
          ]}
        >
          <Spin tip="Loading..." spinning={getGlobalLoading}>
            {props.children}
          </Spin>
        </CourseQuizContext.Provider>
      </NewContext.Provider>
    </GlobalContext.Provider>
  );
};

export default Store;
