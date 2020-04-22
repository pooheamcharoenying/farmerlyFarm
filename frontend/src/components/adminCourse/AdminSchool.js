import React, { useState, useContext, useEffect } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Switch, Modal, Input, Select, Tooltip, Button, InputNumber, message, Spin, Progress } from 'antd'
import { GlobalContext } from '../../hook/GlobalHook'

import { FaEdit, FaTrashAlt } from "react-icons/fa"

import CourseCard from '../courseCard/CourseCard'
import SchoolCard from "../courseCard/SchoolCard";

import { UpdataCourseStatusAction, UpdateCourseTag, getSubjectCategories, getSchoolPoolAction, EditSchoolAction } from '../../actions'
import axios from "axios";

import AWS from "aws-sdk";
import { useDropzone } from "react-dropzone";


export default function AdminSchool() {

      const GlobalHook = useContext(GlobalContext)

      const [getcourseMatchPool, setcourseMatchPool] = useState([])

      const [getSubjects, setSubjects] = useState([])
      const [getApprovedTags, setApprovedTags] = useState([])
      const [getUnapprovedTags, setUnapprovedTags] = useState([])
      const [getTagModalStatus, setTagModalStatus] = useState(false)


      // Tag Editing States
      const [getSelectedTag, setSelectedTag] = useState([])

      const [getSelectedTagId, setSelectedTagId] = useState("")
      const [getSelectedTagEnglish, setSelectedTagEnglish] = useState("")
      const [getTagDisableEnglish, setTagDisableEnglish] = useState(true)
      const [getSelectedTagThai, setSelectedTagThai] = useState("")
      const [getTagDisableThai, setTagDisableThai] = useState(true)
      const [getSelectedTagSubject, setSelectedTagSubject] = useState("")
      const [getTagDisableSubject, setTagDisableSubject] = useState(true)
      const [getSelectedTagApproval, setSelectedTagApproval] = useState(false)

      // Login to Admin Page States
      const [getUserEnteredPassword, setUserEnteredPassword] = useState("")
      const [getUserEnteredPasswordDisplay, setUserEnteredPasswordDisplay] = useState("")

      const [getLoginStatus, setLoginStatus] = useState(false)

      // School Management States
      const [getEditSchoolModal, setEditSchoolModal] = useState(false)
      const [getEditSchoolSelected, setEditSchoolSelected] = useState(false)
      const [getEditSchoolSelectedName, setEditSchoolSelectedName] = useState(false)
      const [getEditSchoolSelectedMaxQuota, setEditSchoolSelectedMaxQuota] = useState(0)
      const [getEditSchoolSelectedImage, setEditSchoolSelectedImage] = useState(0)
      const [getEditSchoolSelectedAdminEmail, setEditSchoolSelectedAdminEmail] = useState(0)
      const [getResetPage, setResetPage] = useState(true)

      // School cover Image upload states

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

      const [getUploadingShow, setUploadingShow] = useState(null);
      const [uploadPercentage, setuploadPercent] = useState();
      const [getImageData, setImageData] = useState(null);
      const [getStudioUploadFile, setStudioUploadFile] = useState(true)
      

      useEffect(() => {
            console.log('pageRest')
            getSchoolPoolAction(GlobalHook);
      }, [getResetPage])



      useEffect(() => {
            console.log('migamaagro')
            if (getEditSchoolSelected.schoolImage) {
                  setEditSchoolSelectedName(getEditSchoolSelected.schoolName)
                  setEditSchoolSelectedMaxQuota(getEditSchoolSelected.schoolMaxQuota)

                  if (getEditSchoolSelected.schoolAdminEmail) {
                        setEditSchoolSelectedAdminEmail( getEditSchoolSelected.schoolAdminEmail )
                  } else {
                        setEditSchoolSelectedAdminEmail("")
                  }

                  if (getEditSchoolSelected.schoolImage.length > 0) {
                        setEditSchoolSelectedImage(getEditSchoolSelected.schoolImage)
                  } else {
                        setEditSchoolSelectedImage("");
                  }
            }


      }, [getEditSchoolModal])

      // useEffect trigger when receives accepted file upload
      useEffect(() => {
            if (acceptedFiles[0]) {
                  //   GlobalHook.setGlobalStudioUploadFile(acceptedFiles[0]);
                  //   setImageFileName(acceptedFiles[0].name);
                  //   setEditSchoolSelectedImage(acceptedFiles[0].name)    
                  UploadBtnClick(acceptedFiles[0]);
            }
      }, [acceptedFiles]);

      function UploadBtnClick(file) {
            console.log('uploadBtnClick')
            setUploadingShow("initing");
            handleImageTransform(file);
      }
      function handleImageTransform(raw) {
            UploadAction(raw).then(data => {
                  setUploadingShow("uploading");
                  setImageData(data);
                  setEditSchoolSelectedImage(data)
                  // GlobalHook.setGlobalCourseImage(data);
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
                                    setStudioUploadFile(true)
                                    // GlobalHook.setGlobalStudioUploadFile(null);
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

      return (
            <div className="bg-pink-300 flex flex-col py-10 items-center" style={{ minHeight: "100vh" }}>

                  <div className="bg-blue-400 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-6" >All School</div>

                  <Tooltip title="Create School">
                        <button
                              // onClick={() => {
                              //     setModalOpenStatus(true);
                              //     GlobalHook.setGlobalCourseSubject("Mathematic");
                              //     GlobalHook.setGlobalCourseLevel("ประถม");
                              //     GlobalHook.setGlobalCourseTeacher("");
                              //     GlobalHook.setGlobalCourseDescription("");
                              //     GlobalHook.setGlobalCourseImage("");
                              //     GlobalHook.setGlobalcourseImageFileName("");
                              //     GlobalHook.setGlobalCourseTag("");
                              // }}
                              className="bg-orange-600  text-white rounded-full flex justify-center items-center hover:bg-orange-500 "
                              style={{ width: "60px", height: "60px", fontSize: "40px" }}
                        >
                              +
    </button>
                  </Tooltip>

                  {console.log('mangoloid')}
                  {console.log(getEditSchoolSelected)}

                  <Modal
                        visible={getEditSchoolModal}
                        title={"Title: " + getEditSchoolSelected._id}
                        // onOk={this.handleOk}
                        onCancel={() => setEditSchoolModal(!getEditSchoolModal)}
                        footer={[
                              <Button key="back"  onClick={() => setEditSchoolModal(!getEditSchoolModal)}>
                                    Return
                              </Button>,
                              <Button key="submit" type="primary"
                                    onClick={() => {
                                          console.log('clickSubmitEditSchoolData')
                                          console.log(getEditSchoolSelectedImage)
                                          const schoolUpdateData = {
                                                schoolName: getEditSchoolSelectedName,
                                                schoolSlug: getEditSchoolSelectedName.replace(/ /g, "-"),
                                                schoolAdminEmail: getEditSchoolSelectedAdminEmail,
                                                schoolImage: getEditSchoolSelectedImage,
                                                schoolMaxQuota: getEditSchoolSelectedMaxQuota,
                                          }
                                          EditSchoolAction(GlobalHook, getEditSchoolSelected._id, schoolUpdateData);
                                          setResetPage(!getResetPage)
                                          setEditSchoolModal(!getEditSchoolModal)
                                    }}>
                                    Submit
                              </Button>,
                        ]}
                  >
                        {/* {console.log('modalling')}
                        {console.log(getEditSchoolSelected)} */}

                        <div className="font-bold text mb-2">ชื่อคอร์ส</div>
                        <Input
                              className="self-center ml-4"
                              value={getEditSchoolSelectedName}
                              onChange={e => {
                                    setEditSchoolSelectedName(e.target.value)
                              }}
                              suffix=""
                              style={{ maxWidth: "100px" }}
                        />

                        <div className="font-bold text mb-2">School Admin Email</div>
                        <Input
                              className="self-center ml-4"
                              value={getEditSchoolSelectedAdminEmail}
                              onChange={e => {
                                    setEditSchoolSelectedAdminEmail(e.target.value)
                              }}
                              suffix=""
                              style={{ maxWidth: "100px" }}
                        />


                        <div className="font-bold text mb-2"> Student Quota </div>
                        <InputNumber
                              className="self-center ml-4"
                              min={1} max={10000}
                              defaultValue={getEditSchoolSelectedMaxQuota}
                              onChange={value => {
                                    setEditSchoolSelectedMaxQuota(value)
                              }}
                              suffix=""
                              formatter={Number}
                              style={{ maxWidth: "100px" }}
                        />

                        <div className="font-bold text mb-2"> Remaining Quota </div>
                        <InputNumber
                              className="self-center ml-4"
                              min={1} max={10000}
                              defaultValue={getEditSchoolSelected.schoolRemainingStudentQuota}
                              disabled={true}
                              suffix=""
                              formatter={Number}
                              style={{ maxWidth: "100px" }}
                        />


                        {/* Upload School Cover Image */}
                        <div className="font-bold  mb-2 flex justify-center">
                              อัพโหลดรูปหน้าปก
                              <FaTrashAlt
                                    className="text-red-600 ml-4 text-xl cursor-pointer hover:text-red-500"
                                    onClick={() => {
                                          setStudioUploadFile(null)
                                          // GlobalHook.setGlobalStudioUploadFile(null);
                                          // setImageData(null);
                                          // GlobalHook.setGlobalCourseImage(null);
                                          // setUploadingShow(null);
                                          setEditSchoolSelectedImage("")
                                    }}
                              />
                        </div>


                        <div
                              className="bg-white flex justify-center items-center flex-col border"
                              style={{ minHeight: "200px", width: "100%" }}
                        >
                              {getEditSchoolSelectedImage ? (
                                    <div
                                          className="mt-4 flex flex-col"
                                          style={{ width: "100%", height: "auto" }}
                                    >
                                          {console.log('uploadingmode0')}
                                          <div className="mb-2">{getEditSchoolSelectedImage}</div>
                                          <img src={getEditSchoolSelectedImage} />
                                    </div>
                              ) : (
                                          <div className="w-full h-full flex flex-col items-center">
                                                {console.log('uploadingmode1')}
                                                {!getUploadingShow && (
                                                      <div
                                                            style={{ minHeight: "200px" }}
                                                            className="w-full flex flex-col justify-center items-center cursor-pointer "
                                                      >
                                                            {console.log('uploadingmode2')}
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
                                                            {/* {getStudioUploadFile && (
                                                                  <button
                                                                        className="bg-blue-400 text-white p-2 hover:bg-blue-400 rounded my-4"
                                                                        style={{ width: "100px" }}
                                                                        onClick={() => UploadBtnClick()}
                                                                  >
                                                                        {console.log('uploadingmode3')}
                                                                        Upload
                                                                  </button>
                                                            )} */}
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

                  </Modal>


                  <ScrollContainer hideScrollbars={false} vertical={false} className="flex-row overflow-x-auto flex md:flex-wrap md:overflow-hidden mt-10 w-4/5" >
                        {GlobalHook.getGlobalSchoolPool.map((schoolData, i) => <div key={i} className=" mb-4 mr-2 md:mr-0 hover:text-black curser-pointer no-underline md:w-1/3  lg:w-1/4 xl:w-1/4 flex justify-center flex-col" >
                              <div className="bg-white flex justify-center rounded-lg py-4 -mb-2" style={{ width: "200px" }} > <Button defaultChecked={false} checkedChildren="Yes" unCheckedChildren="No" onClick={() => { setEditSchoolSelected(schoolData); setEditSchoolModal(true); console.log('clicked') }} > Edit </Button> </div>
                              <div onClick={() => window.location.href = `/school/${schoolData.schoolSlug}`} >
                                    <SchoolCard schoolData={schoolData} />
                              </div>
                        </div>)}
                  </ScrollContainer>
            </div>

      )
}
