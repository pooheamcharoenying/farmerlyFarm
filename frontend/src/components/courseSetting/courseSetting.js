import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  Tooltip,
  Spin,
  Progress,
  message,
  Icon,
  Switch,
  Tag,
  Popover
} from "antd";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FaTrashAlt } from "react-icons/fa";
import AWS from "aws-sdk";
import { useParams } from "react-router";
import Autocomplete from "@celebryts/react-autocomplete-tags";
import ReactTags from "react-tag-autocomplete";
import TagCom from '../tagCom/TagCom'
import { GlobalContext } from "../../hook/GlobalHook";
import {
  ClearCreateCourseFieldAction,
  SaveCourseSetting,
  GetCourseSettingAction,
  DeleteCourseLessionAction,
  getSubjectCategories,
  getSubjectLevels,
} from "../../actions";

const { TextArea } = Input;
const { Option } = Select;

export default function FabCreateCourse() {
  let { courseSlug } = useParams();

  const GlobalHook = useContext(GlobalContext);

  const [getModalOpenStatus, setModalOpenStatus] = useState(false);
  const [getShowConfirmDel, setShowConfirmDel] = useState(false);
  const [getImageData, setImageData] = useState(null);
  const [getUploadingShow, setUploadingShow] = useState(null);
  const [uploadPercentage, setuploadPercent] = useState();
  const [getImageFileName, setImageFileName] = useState("");
  const [getModalAddNewTagOpenStatus, setModalAddNewTagOpenStatus] = useState(false)



  const [getSuggestionsEnglish, setSuggestionsEnglish] = useState([]);
  const [getSuggestionsThai, setSuggestionsThai] = useState([]);

  const [getAddNewTag, setAddNewTag] = useState("");
  const [getNewTagEnglish, setNewTagEnglish] = useState("");
  const [getNewTagThai, setNewTagThai] = useState("");

  const [getSchoolState, setSchoolState] = useState(false)


  useEffect(() => {
    GetCourseSettingAction(GlobalHook, courseSlug);
  }, []);


  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg, image/gif"
  });


  const [getSubjectMenu, setSubjectMenu] = useState([]);
  const [getSubjects, setSubjects] = useState([]);
  const [getLevels, setLevels] = useState([]);

  useEffect(() => {
    // console.log('getting subjects')

    getSubjectCategories()
      .then(data => {
        // console.log('banobagen')
        // console.log(data)
    
        setSubjects(data)
        GlobalHook.setGlobalCourseSubjectFilter("All Subjects");
      })
      .catch(error => {
        console.log(error)
      })

    getSubjectLevels()
      .then(data => {
        // console.log('show levels')
        // console.log(data)
        for (var x of data) {
          if (x.type == "levelmenu") {
            // console.log('level menu found')
            // console.log(x)
            setLevels(x.menu)
          }
          if (x.type == "subjectmenu") {
            // console.log('subject menu found')
            // console.log(x)
            setSubjectMenu(x.menu)
          }
        }
        GlobalHook.setGlobalCourseLevelFilter("ทั้งหมด");
      })
      .catch(error => {
        console.log(error)
      })


  }, []);

  useEffect(() => {
    if (acceptedFiles[0]) {
      GlobalHook.setGlobalStudioUploadFile(acceptedFiles[0]);
      GlobalHook.setGlobalcourseImageFileName(acceptedFiles[0].name);
      setImageFileName(acceptedFiles[0].name);
      UploadBtnClick(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (GlobalHook.getGlobalUser) {
      if (GlobalHook.getGlobalUser.role == "admin") {
        setSchoolState(true)
      }
      if (GlobalHook.getGlobalUser.role == "school") {
        setSchoolState(true)
      }
    }
  }, [GlobalHook.getGlobalUser]);


  function UploadBtnClick(file) {
    setUploadingShow("initing");
    handleImageTransform(file);
  }
  function handleImageTransform(raw) {
    UploadAction(raw).then(data => {
      setUploadingShow("uploading");
      setImageData(data);

      GlobalHook.setGlobalCourseImage(data);
    });
  }

  const spacesEndpoint = new AWS.Endpoint("sgp1.digitaloceanspaces.com");
  const S3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: "RQCZPP26IBCSMVIKVVDX",
    secretAccessKey: "6MKKW0aMCBtX66laRDLcRkbXGk5tTwPc30mICrxz2/E"
  });

  function UploadAction(file) {
    return new Promise(function (resolve, reject) {
      const params = { Body: file, Bucket: "studysabaiapp", Key: file.name };
      // Sending the file to the Spaces
      S3.putObject(params)
        .on("build", request => {
          request.httpRequest.headers.Host =
            "https://studysabaiapp.sgp1.digitaloceanspaces.com";
          request.httpRequest.headers["Content-Length"] = file.size;
          request.httpRequest.headers["Content-Type"] = file.type;
          request.httpRequest.headers["x-amz-acl"] = "public-read";
        })
        .on("httpUploadProgress", function (progress) {
          setuploadPercent(
            Math.round((progress.loaded / progress.total) * 100)
          );
          console.log(
            Math.round((progress.loaded / progress.total) * 100) + "% done"
          );
        })
        .send((err, data) => {
          if (err) {
            reject(err);
            GlobalHook.setGlobalStudioUploadFile(null);
            setUploadingShow("error");
            message.error("Upload Error Try Again");
            setUploadingShow(false);
          } else {
            setUploadingShow("done");

            resolve(
              `https://studysabaiapp.sgp1.digitaloceanspaces.com/${file.name}`
            );
          }
        });
    });
  }

  function handleDelete(i) {
    const tagsEng = GlobalHook.getGlobalCourseTagEnglish.slice(0);
    const tagsThai = GlobalHook.getGlobalCourseTagThai.slice(0);

    tagsEng.splice(i, 1);
    tagsThai.splice(i, 1);

    GlobalHook.setGlobalCourseTagEnglish(tagsEng);
    GlobalHook.setGlobalCourseTagThai(tagsThai);
  }

  function handleAddition(tag, lang) {
    if (tag.id) {
      const tagsEng = [].concat(
        GlobalHook.getGlobalCourseTagEnglish,
        getSuggestionsEnglish.filter(item => item.id == tag.id)
      );
      const tagsThai = [].concat(
        GlobalHook.getGlobalCourseTagThai,
        getSuggestionsThai.filter(item => item.id == tag.id)
      );

      GlobalHook.setGlobalCourseTagEnglish(tagsEng);
      GlobalHook.setGlobalCourseTagThai(tagsThai);
    } else {

      setModalAddNewTagOpenStatus(true)
      if (lang == "Eng") {
        setNewTagEnglish(tag.name)

      } else {
        setNewTagThai(tag.name)

      }

    }
  }

  function handleInputChange(query) {
    axios
      .post(`/api/tag/gettag/`, { tag: query })
      .then(res => {
        let matchTagSuggestEnglish = [];
        let matchTagSuggestThai = [];

        res.data.map(item => {
          matchTagSuggestEnglish.push({ id: item._id, name: item.english });
          matchTagSuggestThai.push({ id: item._id, name: item.thai });
        });
        setSuggestionsEnglish(matchTagSuggestEnglish);
        setSuggestionsThai(matchTagSuggestThai);
      })
      .catch(err => console.log(err));
  }


  function RenderAddNewTagModal() {
    return (
      <Modal
        visible={getModalAddNewTagOpenStatus}
        title="Add New Tag"
        onOk={() => setModalAddNewTagOpenStatus(false)}
        onCancel={() => {
          setModalAddNewTagOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => setModalAddNewTagOpenStatus(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
            <button
              onClick={() => { setModalAddNewTagOpenStatus(false); SaveNewTagAction() }}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
            >
              Save
            </button>


          </div>
        ]}
      >
        <div className="flex flex-col justify-center items-center mx-auto">
          <div>
            <div>English</div>
            <Input
              placeholder=""
              value={getNewTagEnglish}
              onChange={(e) => setNewTagEnglish(e.target.value)}

            />
          </div>
          <div className="mt-4">
            <div>Thai</div>
            <Input
              placeholder=""
              value={getNewTagThai}
              onChange={(e) => setNewTagThai(e.target.value)}
            />
          </div>



        </div>
      </Modal>
    );
  }

  function SaveNewTagAction() {
    axios
      .post(`/api/tag/addtag/`, { english: getNewTagEnglish, thai: getNewTagThai })
      .then(res => {
        const tagsEng = [].concat(
          GlobalHook.getGlobalCourseTagEnglish,
          [{ id: res.data._id, name: getNewTagEnglish }]
        );
        const tagsThai = [].concat(
          GlobalHook.getGlobalCourseTagThai,
          [{ id: res.data._id, name: getNewTagThai }]
        );

        GlobalHook.setGlobalCourseTagEnglish(tagsEng);
        GlobalHook.setGlobalCourseTagThai(tagsThai);
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }

  function CreateCoursePopUp() {
    return (
      <Modal
        visible={getModalOpenStatus}
        title="Course Setting"
        onOk={() => setModalOpenStatus(false)}
        onCancel={() => {
          setModalOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">

            <Popover
              content={
                <div className="flex w-full justify-center">
                  <div
                    className="text-red-600 hover:text-red-400 mr-4 cursor-pointer"
                    onClick={() => {

                      setShowConfirmDel(false);
                      DeleteCourseLessionAction(GlobalHook, courseSlug);
                    }}
                  >
                    Delete
                  </div>{" "}
                  <div
                    className="text-gray-600 hover:text-gray-500 cursor-pointer"
                    onClick={() => {
                      setShowConfirmDel(false);
                    }}
                  >
                    cancel
                  </div>
                </div>
              }
              title="Are you sure to delete this Course?"
              trigger="click"
              visible={getShowConfirmDel}
              onVisibleChange={() => setShowConfirmDel(!getShowConfirmDel)}
            >
              <div

                className="bg-red-500 text-white p-2 rounded hover:bg-red-400 cursor-pointer mr-4"
              >
                Delete Course
            </div>
            </Popover>


            {/* <button
              onClick={() => {
                DeleteCourseLessionAction(GlobalHook, courseSlug);
              }}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
            >
              Delete Course
            </button> */}
            <button
              onClick={() =>
                SaveCourseSetting(GlobalHook, courseSlug, setModalOpenStatus)
              }
              className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
            >
              Save
            </button>
          </div>
        ]}
      >
        <div
          className="flex flex-col justify-center items-center mx-auto"
          style={{ maxWidth: "300px" }}
          onKeyPress={event => {
            // if (event.key === "Enter") {
            //   SaveCourseSetting(GlobalHook, courseSlug, setModalOpenStatus);
            // }
          }}
        >
          <div className="flex flex-col text-center mb-4">
            <div className="font-bold text mb-2">ชื่อคอร์ส</div>
            <Input
              placeholder=""
              value={GlobalHook.getGlobalCourseName}
              onChange={e => GlobalHook.setGlobalCourseName(e.target.value)}
            />
          </div>

          <div className="flex flex-col text-center mb-4">
            <div className="font-bold text mb-2">วิชาเรียน</div>
            <Select
              defaultValue="Mathematic"
              value={GlobalHook.getGlobalCourseSubject}
              onChange={e => GlobalHook.setGlobalCourseSubject(e)}
              style={{ minWidth: "210px" }}
            >
              {getSubjects.map(subjectItem => (
                <Option value={subjectItem.english}> {subjectItem.thai} </Option>
              ))}

            </Select>
          </div>

          <div className="flex flex-col text-center mb-4">
            <div className="font-bold text mb-2">ระดับชั้น</div>
            <Select
              defaultValue="ประถม"
              onChange={e => GlobalHook.setGlobalCourseLevel(e)}
              value={GlobalHook.getGlobalCourseLevel}
              style={{ minWidth: "210px" }}
            >
              {/* {console.log('moomin')}
              {console.log(getLevels)} */}
              {getLevels.map(subjectItem => (
                <Option value={subjectItem.menuThai}> {subjectItem.menuThai} </Option>
              ))}
              {/* <Option value="ประถม">ประถม</Option>
              <Option value="มัธยมต้น">มัธยมต้น</Option>
              <Option value="มัธยมปลาย">มัธยมปลาย</Option>
              <Option value="มหาวิทยาลัย">มหาวิทยาลัย</Option> */}
            </Select>
          </div>

          <div className="flex flex-col text-center mb-4">
            <div className="font-bold text mb-2">ครูผู้สอน</div>
            <Input
              onChange={e => GlobalHook.setGlobalCourseTeacher(e.target.value)}
              value={GlobalHook.getGlobalCourseTeacher}
            />
          </div>

          <div className="flex flex-col text-center mb-4">
            <div className="font-bold text mb-2">รายละเอียดคอร์ส</div>
            <TextArea
              onChange={e =>
                GlobalHook.setGlobalCourseDescription(e.target.value)
              }
              value={GlobalHook.getGlobalCourseDescription}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </div>

          <div className="flex flex-col text-center mb-6 justify-center w-full items-center">
            <div className="font-bold  mb-2 flex justify-center">
              อัพโหลดรูปหน้าปก
              <FaTrashAlt
                className="text-red-600 ml-4 text-xl cursor-pointer hover:text-red-500"
                onClick={() => {
                  GlobalHook.setGlobalStudioUploadFile(null);
                  setImageData(null);
                  GlobalHook.setGlobalCourseImage(null);
                  setUploadingShow(null);
                  GlobalHook.setGlobalCourseImage(null);
                }}
              />
            </div>
            <div
              className="bg-white flex justify-center items-center flex-col border"
              style={{ minHeight: "200px", width: "100%" }}
            >
              {GlobalHook.getGlobalCourseImage ? (
                <div
                  className="mt-4 flex flex-col"
                  style={{ width: "100%", height: "auto" }}
                >
                  <div className="mb-2">
                    {GlobalHook.getGlobalcourseImageFileName}
                  </div>
                  <img src={GlobalHook.getGlobalCourseImage} />
                </div>
              ) : (
                  <div className="w-full h-full flex flex-col items-center">
                    {!getUploadingShow && (
                      <div
                        style={{ minHeight: "200px" }}
                        className="w-full flex flex-col justify-center items-center cursor-pointer "
                      >
                        {" "}
                        <div
                          {...getRootProps({ className: "dropzone" })}
                          style={{ minHeight: "200px" }}
                          className="w-full flex flex-col justify-center items-center cursor-pointer "
                        >
                          <input {...getInputProps()} />
                          {isDragAccept && <p>All files will be accepted</p>}
                          {isDragReject && <p>Some files will be rejected</p>}
                          {!isDragActive && <p>เลือกไฟล์ที่จะอัพโหลด</p>}
                          {GlobalHook.getGlobalStudioUploadFile && (
                            <p className="mt-4">
                              {GlobalHook.getGlobalStudioUploadFile.name}
                            </p>
                          )}
                        </div>
                        {GlobalHook.getGlobalStudioUploadFile && (
                          <button
                            className="bg-blue-400 text-white p-2 hover:bg-blue-400 rounded my-4"
                            style={{ width: "100px" }}
                            onClick={() => UploadBtnClick()}
                          >
                            Upload
                          </button>
                        )}
                      </div>
                    )}
                    {getUploadingShow == "initing" && (
                      <div>
                        <div className="flex justify-center">
                          <Spin size="large" />
                        </div>
                        <div className="mt-4 text-center">
                          กำลังอัพโหลด โปรดรอสักครู่ .....
                      </div>
                      </div>
                    )}

                    {getUploadingShow == "uploading" && (
                      <div>
                        <div className="flex justify-center">
                          <Progress
                            className="mt-4"
                            type="circle"
                            percent={uploadPercentage}
                            format={percent => `${percent} %`}
                          />
                        </div>
                        <div className="mt-4 text-center">
                          กำลังอัพโหลด โปรดรอสักครู่ .....
                      </div>
                      </div>
                    )}

                    {getUploadingShow == "done" && (
                      <div>
                        <div className="flex justify-center">
                          <Progress
                            type="circle"
                            percent={100}
                            format={() => "Done"}
                          />
                        </div>
                        <div className="mt-4 text-center">อัพโหลดสำเร็จ</div>
                        <div className="mt-4 text-center">
                          กด Save เพื่อบันทึกข้อมูล
                      </div>
                      </div>
                    )}
                  </div>
                )}
            </div>

            <TagCom SubjectCat={getSubjects} InTagThai={GlobalHook.getGlobalCourseTagThai} InTagEnglish={GlobalHook.getGlobalCourseTagEnglish} OutTagThai={GlobalHook.setGlobalCourseTagThai} OutTagEnglish={GlobalHook.setGlobalCourseTagEnglish} />

            <div className="flex flex-col text-center my-4">
              <div className="font-bold text mb-2"> Course Fees</div>

              <div>
                <Switch
                  defaultChecked={GlobalHook.getGlobalCourseFee}
                  checkedChildren="Free"
                  unCheckedChildren="Paid"
                  onClick={e => GlobalHook.setGlobalCourseFee(e)}
                />
                {!GlobalHook.getGlobalCourseFee && (
                  <Input
                    className="self-center ml-4"
                    value={GlobalHook.getGlobalCoursePrice}
                    onChange={e =>
                      GlobalHook.setGlobalCoursePrice(e.target.value)
                    }
                    suffix="บาท"
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </div>
            </div>

            {getSchoolState && <div className="flex flex-col text-center my-4">
              <div className="flex mb-2">
                <div className="font-bold text mr-2">Public Course</div>
                <Switch
                  defaultChecked={GlobalHook.getGlobalPublicCourseStatus}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  onClick={e => GlobalHook.setGlobalPublicCourseStatus(e)}
                />

              </div>

              <div className="flex">
                <div className="font-bold text mr-2">School Course</div>
                <Switch
                  defaultChecked={GlobalHook.getGlobalSchoolCourseStatus}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  onClick={e => GlobalHook.setGlobalSchoolCourseStatus(e)}
                />

              </div>


            </div>}

          </div>
        </div>
      </Modal>
    );
  }
  return (
    <>
      {CreateCoursePopUp()}
      {RenderAddNewTagModal()}
      <Icon
        className="text-bold mr-6 cursor-pointer"
        type="setting"
        onClick={() => setModalOpenStatus(true)}
      />
    </>
  );
}
