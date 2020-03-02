import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  Tooltip,
  Spin,
  Progress,
  message
} from "antd";
import { useDropzone } from "react-dropzone";
import { FaTrashAlt } from "react-icons/fa";
import AWS from "aws-sdk";

import { GlobalContext } from "../../hook/GlobalHook";
import {
  ClearCreateCourseFieldAction,
  CreateCourseAction
} from "../../actions";

const { TextArea } = Input;
const { Option } = Select;

export default function FabCreateCourse() {
  const GlobalHook = useContext(GlobalContext);

  const [getModalOpenStatus, setModalOpenStatus] = useState(false);
  const [getShowConfirmDel, setShowConfirmDel] = useState(false);
  const [getImageData, setImageData] = useState(null);
  const [getUploadingShow, setUploadingShow] = useState(null);
  const [uploadPercentage, setuploadPercent] = useState();
  const [getImageFileName, setImageFileName] = useState("");

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
  useEffect(() => {
    if (acceptedFiles[0]) {
      GlobalHook.setGlobalStudioUploadFile(acceptedFiles[0]);
      setImageFileName(acceptedFiles[0].name);
      UploadBtnClick(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

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
    return new Promise(function(resolve, reject) {
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
        .on("httpUploadProgress", function(progress) {
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

  function CreateCoursePopUp() {
    return (
      <Modal
        visible={getModalOpenStatus}
        title="Create Course"
        onOk={() => setModalOpenStatus(false)}
        onCancel={() => {
          setModalOpenStatus(false);
          ClearCreateCourseFieldAction(GlobalHook);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => CreateCourseAction(GlobalHook, setModalOpenStatus)}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
            >
              Create
            </button>
          </div>
        ]}
      >
        <div
          className="flex flex-col justify-center items-center mx-auto"
          style={{ maxWidth: "300px" }}
          onKeyPress={event => {
            if (event.key === "Enter") {
              CreateCourseAction(GlobalHook, setModalOpenStatus);
            }
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
              <Option value="Mathematic">Mathematic</Option>
              <Option value="Physics">Physics</Option>
              <Option value="Robotics">Robotics</Option>
              <Option value="Coding">Coding</Option>
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
              <Option value="ประถม">ประถม</Option>
              <Option value="มัธยมต้น">มัธยมต้น</Option>
              <Option value="มัธยมปลาย">มัธยมปลาย</Option>
              <Option value="มหาวิทยาลัย">มหาวิทยาลัย</Option>
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
                  <div className="mb-2">{getImageFileName}</div>
                  <img src={getImageData} />
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
                        กด Create เพื่อบันทึกข้อมูล
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col text-center my-4">
            <div className="font-bold text mb-2">Tags</div>
            <TextArea
              onChange={e =>
                GlobalHook.setGlobalCourseTag(e.target.value)
              }
              value={GlobalHook.getGlobalCourseTag}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </div>
          </div>

        </div>
      </Modal>
    );
  }
  return (
    <>
      {CreateCoursePopUp()}
      <Tooltip title="Create Course">
        <button
          onClick={() => {
            setModalOpenStatus(true);
            GlobalHook.setGlobalCourseSubject("Mathematic")
      GlobalHook.setGlobalCourseLevel("ประถม")
      GlobalHook.setGlobalCourseTeacher("")
      GlobalHook.setGlobalCourseDescription("")
      GlobalHook.setGlobalCourseImage("")
      GlobalHook.setGlobalcourseImageFileName("")
      GlobalHook.setGlobalCourseTag("")

          }}
          className="bg-orange-600  text-white rounded-full flex justify-center items-center hover:bg-orange-500 "
          style={{ width: "60px", height: "60px", fontSize: "40px" }}
        >
          +
        </button>
      </Tooltip>
    </>
  );
}
