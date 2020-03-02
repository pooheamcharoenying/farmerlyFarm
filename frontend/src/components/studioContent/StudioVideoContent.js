import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Input,
  Button,
  Upload,
  Icon,
  Progress,
  Popover,
  Spin,
  message
} from "antd";
import { useDropzone } from "react-dropzone";
import { FaTrashAlt } from "react-icons/fa";
import tus from "tus-js-client";
import axios from "axios";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import uuid from "uuid";
import { GlobalContext } from "../../hook/GlobalHook";
import { SaveAllAction, CheckMutateAction } from "../../actions";

const accessToken = "dbaa8374efa89cf873fbe48e6fd7be3e";

const headerPost = {
  Accept: "application/vnd.vimeo.*+json;version=3.4",
  Authorization: `bearer ${accessToken}`,
  "Content-Type": "application/json"
};

const headerDelete = {
  Authorization: `bearer ${accessToken}`
};

const StudioVideoContent = () => {
  const GlobalHook = useContext(GlobalContext);

  const [getLessionTime, setLessionTime] = useState("");
  const [getLessionName, setLessionName] = useState("");
  const [getInitStateVideo, setInitStateVideo] = useState("");
  const [getInitStateName, setInitStateName] = useState("");
  const [getInitStateTime, setInitStateTime] = useState("");
  const [getShowConfirmDel, setShowConfirmDel] = useState(false);
  const [getVideoData, setVideoData] = useState(null);
  const [getUploadingShow, setUploadingShow] = useState(null);
  const [uploadPercentage, setuploadPercent] = useState();
  const [getVideoFileName, setVideoFileName] = useState("");

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: ".mp4"
  });

  useEffect(() => {
    if (acceptedFiles[0]) {
      GlobalHook.setGlobalStudioUploadFile(acceptedFiles[0]);
      setVideoFileName(acceptedFiles[0].name);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    setLessionName(GlobalHook.getGlobalLessionSelect.mediaName);
    setInitStateName(GlobalHook.getGlobalLessionSelect.mediaName);

    setLessionTime(GlobalHook.getGlobalLessionSelect.mediaTime);
    setInitStateTime(GlobalHook.getGlobalLessionSelect.mediaTime);
    setVideoFileName(GlobalHook.getGlobalLessionSelect.mediaEtc1);
  }, [GlobalHook.getGlobalLessionSelect]);

  useEffect(() => {
    var oldCourseStructure = GlobalHook.getGlobalCourseStructure;
    const { parentIndex, selfIndex } = GlobalHook.getGlobalLessionSelect;

    if (oldCourseStructure[parentIndex]) {
      oldCourseStructure[parentIndex].subItems[
        selfIndex
      ].title = getLessionName;
      oldCourseStructure[parentIndex].subItems[selfIndex].time = getLessionTime;
      oldCourseStructure[parentIndex].subItems[
        selfIndex
      ].etc1 = getVideoFileName;

      GlobalHook.setGlobalCourseStructure(oldCourseStructure);
    }
  }, [getLessionName, getLessionTime, getVideoFileName]);



  useEffect(() => {
    CheckMutateAction(GlobalHook, getInitStateName, getLessionName);
  }, [getLessionName]);

  useEffect(() => {
    CheckMutateAction(GlobalHook, getInitStateTime, getLessionTime);
  }, [getLessionTime]);

  function handleDeleteLession() {
    let oldCourseStructure = GlobalHook.getGlobalCourseStructure;
    const { parentIndex, selfIndex } = GlobalHook.getGlobalLessionSelect;
    GlobalHook.setGlobalLessionSelect({ mediaType: "CourseOverview" });

    if (oldCourseStructure[parentIndex]) {
      oldCourseStructure[parentIndex].subItems.splice(selfIndex, 1);

      GlobalHook.setGlobalCourseStructure(oldCourseStructure);
      axios({
        method: "DELETE",
        url: `https://api.vimeo.com/videos/${GlobalHook.getGlobalMediaVideo}`,
        headers: headerDelete,
        data: {}
      }).catch(err => console.log(err));
      SaveAllAction(GlobalHook);
    }
  }

  useEffect(() => {
    setVideoData(GlobalHook.getGlobalMediaVideo);
    setInitStateVideo(GlobalHook.getGlobalMediaVideo);
  }, [GlobalHook.getGlobalMediaVideo]);

  useEffect(() => {
    GlobalHook.setGlobalMediaNew(getVideoData);
    CheckMutateAction(GlobalHook, getInitStateVideo, getVideoData);
  }, [getVideoData]);

  function UploadBtnClick() {
    setUploadingShow("initing");

    axios({
      method: "post",
      url: `https://api.vimeo.com/me/videos`,
      headers: headerPost,
      data: {
        upload: {
          approach: "tus",
          size: GlobalHook.getGlobalStudioUploadFile.size.toString()
        },
        name: uuid.v4().toString()
      }
    })
      .then(res => {
        const newVideoCode = res.data.uri.replace("/videos/", "");

        setVideoData(newVideoCode);

        TusUpload(res);
      })
      .catch(err => {
        message.error("Upload Error, Try Again");
        console.log(err);
        setVideoData(null);
        
        setUploadingShow(false);
      });
  }

  function TusUpload(response) {
    // Create a new tus upload
    const upload = new tus.Upload(GlobalHook.getGlobalStudioUploadFile, {
      endPoint: "https://api.vimeo.com/me/videos",
      uploadUrl: response.data.upload.upload_link,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: GlobalHook.getGlobalStudioUploadFile.name,
        filetype: GlobalHook.getGlobalStudioUploadFile.type
      },
      headers: {},
      onError: function(error) {
        console.log("Failed because: " + error);
        setVideoData(null);
        GlobalHook.setGlobalStudioUploadFile(null);
        setUploadingShow("error");
        message.error("Upload Error Try Again");
        setUploadingShow(false);
      },
      onProgress: function(bytesUploaded, bytesTotal) {
        setUploadingShow("uploading");
        let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");
        setuploadPercent(percentage);
      },
      onSuccess: function() {
        console.log("Download %s from %s", upload.file.name, upload.url);
        setUploadingShow("done");
      }
    });

    // Start the upload
    upload.start();
  }

  useEffect(() => {
    if (GlobalHook.getGlobalLessionSelect.new == "new") {
      setUploadingShow(false);
    }
  }, [GlobalHook.getGlobalLessionSelect]);
  return (
    <div className=" h-auto min-h-full w-full flex flex-col items-center py-4 justify-start">
    <div className="w-full flex mb-2  justify-center items-center">
      <FaCaretLeft
        className="hover:text-gray-700 text-gray-900 cursor-pointer"
        style={{ fontSize: "35px" }}
        onClick={() => GlobalHook.setPrevNextStatus("PrevLession")}
      />

      <div className="w-10/12 rounded-lg text-center text-white text-xl md:text-2xl font-bold  bg-blue-500 mx-2 py-2 px-2">
        {GlobalHook.getGlobalLessionSelect.mediaName}
      </div>
      <FaCaretRight
        className="hover:text-gray-700 text-gray-900 cursor-pointer"
        style={{ fontSize: "35px" }}
        onClick={() => GlobalHook.setPrevNextStatus("NextLession")}
      />
    </div>


        <div className="flex flex-col text-center mb-4 mt-8">
          <div className="flex items-baseline justify-center">
            <div className="font-bold text-lg mb-2">ชื่อบทเรียน</div>
            <Popover
              content={
                <div className="flex w-full justify-center">
                  <div
                    className="text-red-600 hover:text-red-400 mr-4 cursor-pointer"
                    onClick={() => {
                      setShowConfirmDel(false);
                      handleDeleteLession();
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
              title="Are you sure to delete this Lession?"
              trigger="click"
              visible={getShowConfirmDel}
              onVisibleChange={() => setShowConfirmDel(!getShowConfirmDel)}
            >
              <FaTrashAlt className="text-red-600 ml-4 text-xl cursor-pointer hover:text-red-500 " />
            </Popover>
          </div>

          <Input
            value={getLessionName}
            onChange={e => setLessionName(e.target.value)}
          />
        </div>

        <div className="flex flex-col text-center mb-6 justify-center">
          <div className="font-bold text-lg mb-2">ระยะเวลาบทเรียน</div>
          <Input
            value={getLessionTime}
            onChange={e => setLessionTime(e.target.value)}
            suffix="นาที"
            style={{ width: "100px" }}
          />
        </div>

        <div className="flex flex-col text-center mb-6 justify-center w-full items-center">
          <div className="font-bold text-lg mb-2 flex justify-center">
            อัพโหลด Video
            <FaTrashAlt
              className="text-red-600 ml-4 text-xl cursor-pointer hover:text-red-500"
              onClick={() => {
                GlobalHook.setGlobalStudioUploadFile(null);
                setVideoData(null);
                GlobalHook.setGlobalMediaVideo(null);
              }}
            />
          </div>
          <div
            className="bg-white flex justify-center items-center flex-col "
            style={{ minHeight: "200px", width: "60%" }}
          >
            {GlobalHook.getGlobalMediaVideo ? (
              <div
                className="mt-4 flex flex-col"
                style={{ width: "100%", height: "auto" }}
              >
                <div className="mb-2">{getVideoFileName}</div>
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    src={`https://player.vimeo.com/video/${GlobalHook.getGlobalMediaVideo}?title=0&byline=0&portrait=0`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%"
                    }}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  ></iframe>
                </div>
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
                      กำลังอัพโหลดวิดีโอ โปรดรอสักครู่ .....
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
                      กำลังอัพโหลดวิดีโอ โปรดรอสักครู่ .....
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
                    <div className="mt-4 text-center">
                      อัพโหลดสำเร็จ โปรดรอสักครู่ (10-20นาที)
                      ระบบกำลังประมวลผลวิดีโอ.....
                    </div>
                    <div className="mt-4 text-center">
                      กด Save เพื่อบันทึกข้อมูล
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div style={{ minHeight: "50px" }} />
      </div>
   
  );
};

export default StudioVideoContent;
