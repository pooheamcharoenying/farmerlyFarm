import React, { useState, useEffect, useContext, useCallback } from "react";
import { Input, Button, Upload, Icon, Progress, Popover, Spin, message } from "antd";
import { useDropzone } from "react-dropzone";
import { FaTrashAlt } from "react-icons/fa";
import tus from "tus-js-client";
import axios from "axios";
import uuid from "uuid";
import { GlobalContext } from "../../../hook/GlobalHook";
import { SaveAllAction, CheckMutateAction } from "../../../actions";


const accessToken = "4f8f7fafcfec41d45fc069be12c1fbd9";

const headerPost = {
  Accept: "application/vnd.vimeo.*+json;version=3.4",
  Authorization: `bearer ${accessToken}`,
  "Content-Type": "application/json"
};

const StudioVideoContent = () => {

  const GlobalHook = useContext(GlobalContext);

  const [getInitStateVideo, setInitStateVideo] = useState("");

  const [getVideoData, setVideoData] = useState(null)
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
      setVideoFileName(acceptedFiles[0].name)
    }
  }, [acceptedFiles]);


  useEffect(() => {
    setVideoData(GlobalHook.getGloblaQuizExplainField);
    setInitStateVideo(GlobalHook.getGloblaQuizExplainField);
  }, [GlobalHook.getGloblaQuizExplainField]);


  useEffect(() => {
    GlobalHook.setGloblaQuizExplainFieldNew(getVideoData);
    CheckMutateAction(GlobalHook, getInitStateVideo, getVideoData);
  }, [getVideoData]);


  function UploadBtnClick() {
    setUploadingShow("initing");
    console.log("UPPPPP");
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
        console.log(err);
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
      onError: function (error) {
        console.log("Failed because: " + error);
        setVideoData(null)
        GlobalHook.setGlobalStudioUploadFile(null)
        setUploadingShow("error");
        message.error("Upload Error Try Again")
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        setUploadingShow("uploading");
        let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");
        setuploadPercent(percentage);
      },
      onSuccess: function () {
        console.log("Download %s from %s", upload.file.name, upload.url);
        setUploadingShow("done");
        console.log(upload);
      }
    });

    // Start the upload
    upload.start();
  }


  return (
    <div className=" h-full w-full flex flex-col items-center pt-4 overflow-hidden">


      <div className="flex flex-col overflow-y-auto  h-full w-full over items-center justify-start py-4">

        <div className="flex flex-col text-center mb-6 justify-center w-full items-center">
          <div className="font-bold text-lg mb-2 flex justify-center">
            อัพโหลด Video
            <FaTrashAlt
              className="text-red-600 ml-4 text-xl cursor-pointer hover:text-red-500"
              onClick={() => {
                GlobalHook.setGlobalStudioUploadFile(null);
                setVideoData(null);
                GlobalHook.setGloblaQuizExplainField(null);
              }}
            />
          </div>
          <div className="bg-white flex justify-center items-center flex-col "
            style={{ minHeight: "200px", width: "60%" }}>
            {GlobalHook.getGloblaQuizExplainField ?
              <div className="mt-4 flex flex-col" style={{ width: "100%", height: "auto" }}>
                <div className="mb-2">{getVideoFileName}</div>
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    src={`https://player.vimeo.com/video/${GlobalHook.getGloblaQuizExplainField}?title=0&byline=0&portrait=0`}
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
              :
              <div className="w-full h-full flex flex-col items-center">

                {!getUploadingShow && (<div style={{ minHeight: "200px" }} className="w-full flex flex-col justify-center items-center cursor-pointer "> <div {...getRootProps({ className: "dropzone" })} style={{ minHeight: "200px" }} className="w-full flex flex-col justify-center items-center cursor-pointer ">
                  <input {...getInputProps()} />
                  {isDragAccept && <p>All files will be accepted</p>}
                  {isDragReject && <p>Some files will be rejected</p>}
                  {!isDragActive && <p>เลือกไฟล์ที่จะอัพโหลด</p>}
                  {GlobalHook.getGlobalStudioUploadFile && <p className="mt-4">{GlobalHook.getGlobalStudioUploadFile.name}</p>}
                </div>

                  {GlobalHook.getGlobalStudioUploadFile && <button className="bg-blue-400 text-white p-2 hover:bg-blue-400 rounded my-4" style={{ width: "100px" }} onClick={() => UploadBtnClick()}>Upload</button>}</div>)
                }
                {getUploadingShow == "initing" && <div>
                  <div className="flex justify-center">
                    <Spin size="large" />
                  </div>
                  <div className="mt-4 text-center">กำลังอัพโหลดวิดีโอ โปรดรอสักครู่ .....</div>


                </div>

                }

                {getUploadingShow == "uploading" && <div>
                  <div className="flex justify-center">
                    <Progress className="mt-4" type="circle" percent={uploadPercentage} format={percent => `${percent} %`} />
                  </div>
                  <div className="mt-4 text-center">กำลังอัพโหลดวิดีโอ โปรดรอสักครู่ .....</div>


                </div>

                }

                {getUploadingShow == "done" && <div>
                  <div className="flex justify-center">
                    <Progress type="circle" percent={100} format={() => 'Done'} />
                  </div>
                  <div className="mt-4 text-center">โปรดรอสักครู่ ระบบกำลังประมวลผลวิดีโอ.....</div>
                  <div className="mt-4 text-center">กด Save เพื่อบันทึกข้อมูล</div>
                </div>

                }

              </div>


            }
          </div>
        </div>




      </div>

    </div>
  );
}

export default StudioVideoContent;
