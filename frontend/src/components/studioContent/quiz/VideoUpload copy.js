import React,{useState,useEffect,useContext} from "react";
import { Input,Button,Upload,Icon,Progress } from 'antd';
import {FaTrashAlt} from 'react-icons/fa'
import tus from "tus-js-client";
import axios from "axios";
import uuid from 'uuid'

import { GlobalContext } from "../../../hook/GlobalHook";

const VideoUpload = ({dataIn,dataOut}) => {
  const accessToken = "d9552622f321fee9e83fd77454b86e5e";

const headerPost = {
  Accept: "application/vnd.vimeo.*+json;version=3.4",
  Authorization: `bearer ${accessToken}`,
  "Content-Type": "application/json"
};

  const GlobalHook = useContext(GlobalContext);

  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState("");
  const [uploadPercentage, setuploadPercent] = useState();
  const [file, setfile] = useState(null);
  const [getUploadingShow, setUploadingShow] = useState("");




 const handleChangeFile = eventObject => {
  const Nfile = eventObject.target.files[0];
  setfile(Nfile);
};
function UploadBtnClick() {
  setUploadingShow("uploading")
  setVideoData("1")
  console.log("UPPPPP");
  axios({
    method: "post",
    url: `https://api.vimeo.com/me/videos`,
    headers: headerPost,
    data: {
      upload: {
        approach: "tus",
        size: file.size.toString()
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
  const upload = new tus.Upload(file, {
    endPoint: "https://api.vimeo.com/me/videos",
    uploadUrl: response.data.upload.upload_link,
    retryDelays: [0, 3000, 5000, 10000, 20000],
    metadata: {
      filename: file.name,
      filetype: file.type
    },
    headers: {},
    onError: function(error) {
      console.log("Failed because: " + error);
    },
    onProgress: function(bytesUploaded, bytesTotal) {
      let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      console.log(bytesUploaded, bytesTotal, percentage + "%");
      setuploadPercent(percentage);
    },
    onSuccess: function() {
      console.log("Download %s from %s", upload.file.name, upload.url);
      setVideoUrl(upload.url);
      setUploadingShow("done")
      console.log(upload);
    }
  });

  // Start the upload
  upload.start();
}

useEffect(() => {
    if(videoData){  
        dataOut(videoData);

    }
  console.log(typeof(videoData))
console.log(videoData)
}, [videoData])

useEffect(() => {
  setVideoData(dataIn);
}, [dataIn]);


    return (
      <div className=" h-full w-full flex flex-col items-center pt-4 overflow-hidden">
     
      <div className="flex flex-col overflow-y-auto  h-full w-full over items-center justify-start py-4">

        <div className="flex flex-col text-center mb-6">
          <div className="font-bold text-lg mb-2 flex justify-center">
          อัพโหลด Video
          <FaTrashAlt className="text-red-600 ml-4 text-xl cursor-pointer hover:text-red-500" onClick={()=>setVideoData(null)}/>

          </div>
          
          <Input type="file"  onChange={handleChangeFile}/>
          
        </div>

        <div style={{ width: "60%"}}>
        <div className="bg-white flex justify-center items-center flex-col" style={{minHeight:"200px"}}>
          
          {getUploadingShow == "uploading"&& 
          <div className="flex flex-col mt-4"> 
          <div className="flex justify-center">
          <Progress className="mt-4" type="circle" percent={uploadPercentage} format={percent => `${percent} %`}/>
            </div>
            <div className="mt-4 text-center">กำลังอัพโหลดวิดีโอ โปรดรอสักครู่ .....</div>
            </div>
          }
          {getUploadingShow == "done"&& 
          <div className="flex flex-col mt-4"> 
          <div className="flex justify-center">
            <Progress type="circle" percent={100} format={() => 'Done'} />
            </div>
            <div className="mt-4 text-center">โปรดรอสักครู่ ระบบกำลังประมวลผลวิดีโอ.....</div>
            </div>
          }
       
       {typeof(videoData) != "string" ?file?<button className="bg-blue-400 text-white p-2 hover:bg-blue-400 rounded" onClick={()=>UploadBtnClick()}>Upload</button>:<div>เลือกไฟล์ที่จะอัพโหลด</div>
: <div className="mt-4" style={{width:"100%",height:"auto"}}> <div style={{padding:"56.25% 0 0 0",position:"relative"}}><iframe src={`https://player.vimeo.com/video/${videoData}?title=0&byline=0&portrait=0`} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}} frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe></div>
</div>}
  
        </div>
        </div>
      </div>
    </div>
    );
}

export default VideoUpload;
