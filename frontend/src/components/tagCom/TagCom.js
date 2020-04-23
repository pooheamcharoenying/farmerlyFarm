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
  Tag
} from "antd";
import axios from "axios";
import ReactTags from "react-tag-autocomplete";
import { GlobalContext } from "../../hook/GlobalHook";
import { getSubjectCategories } from "../../actions";

export default function TagCom(props) {
  const GlobalHook = useContext(GlobalContext);
  const [getModalAddNewTagOpenStatus, setModalAddNewTagOpenStatus] = useState(
    false
  );

  const [getSuggestionsEnglish, setSuggestionsEnglish] = useState([]);
  const [getSuggestionsThai, setSuggestionsThai] = useState([]);

  const [getNewTagEnglish, setNewTagEnglish] = useState("");
  const [getNewTagThai, setNewTagThai] = useState("");

  const [getSubjectPool, setSubjectPool] = useState([]);

  const [getSelectedSubject, setSelectedSubject] = useState("Mathematic");



  const [getApprovedTagsEng, setApprovedTagsEng] = useState("");
  const [getUnapprovedTagsEng, setUnapprovedTagsEng] = useState("");

  const [getApprovedTagsThai, setApprovedTagsThai] = useState([]);
  const [getUnapprovedTagsThai, setUnapprovedTagsThai] = useState([]);


  const [getAllTags, setAllTags] = useState([])
  const [getListedTags, setListedTags] = useState([])

  const [getSubjects, setSubjects] = useState([])

  useEffect(() => {
    console.log("startComTag")
    console.log(props.InTagEnglish)
    // console.log(props.InTagEnglish[0].id )

    setApprovedTagsEng([])
    setUnapprovedTagsEng([])

    setApprovedTagsThai([])
    setUnapprovedTagsThai([])

    getSubjectCategories()
      .then(allsubjects => {
        console.log('allsubjects')
        console.log(allsubjects)

        setSubjects(allsubjects)
        GlobalHook.setGlobalCourseSubjectFilter("All Subjects");


        if (props.InTagEnglish) {
          console.log('comTag2')
          if (props.InTagEnglish.length > 0) {
            axios
              .post(`/api/tag/gettagbyid/`, { tagList: props.InTagEnglish })
              .then(fetchedTags => {



                console.log('fetchy')

                setListedTags(fetchedTags.data);

                console.log(fetchedTags.data)


                var tagsEng = [];
                var tagsThai = [];
                console.log('dinda')
                console.log(props.InTagEnglish)
                if (fetchedTags.data.length != 0) {
                  tagsEng = props.InTagEnglish;
                  tagsThai = props.InTagThai;

                  console.log('dindy')
                  // Overwrite input items with data from TAG DB
                  for (var index in tagsEng) {
                    var filterRes = fetchedTags.data.filter(list => list._id == tagsEng[index].id)
                    console.log('filter result')
                    console.log(filterRes)
                    console.log(tagsEng[index])

                    // Handle tags that are missing from TAG DB in else case. Tag is missing because it was delted from admin server.
                    if (filterRes.length != 0) {
                      tagsEng[index].name = filterRes[0].subject + ": " + filterRes[0].english;
                      tagsEng[index].subject = filterRes[0].subject;
                      tagsEng[index].approval = filterRes[0].approval;

                      var filterSubject = allsubjects.filter(subject => subject.english == filterRes[0].subject)
                      // props.SubjectCat.filter( subject => )

                      console.log('filterSubject')
                      console.log(allsubjects)
                      console.log(filterRes[0])
                      console.log(filterSubject)


                      tagsThai[index].name = filterSubject[0].thai + ": " + filterRes[0].thai;
                      tagsThai[index].subject = filterRes[0].subject;
                      tagsThai[index].approval = filterRes[0].approval;
                    } else {
                      console.log('no match')
                      tagsEng.splice(index, 1)
                      tagsThai.splice(index, 1)
                    }


                  }

                  console.log("endComTag")
                  console.log(tagsEng)

                  var approvedTagsListEng = [];
                  var unapprovedTagsListEng = [];
                  for (var item of tagsEng) {
                    if (item.approval) {
                      approvedTagsListEng.push(item)
                    } else {
                      unapprovedTagsListEng.push(item)
                    }
                  }

                  var approvedTagsListThai = [];
                  var unapprovedTagsListThai = [];
                  for (item of tagsThai) {
                    if (item.approval) {
                      approvedTagsListThai.push(item)
                    } else {
                      unapprovedTagsListThai.push(item)
                    }
                  }

                  setApprovedTagsEng(approvedTagsListEng)
                  setUnapprovedTagsEng(unapprovedTagsListEng)

                  console.log('------------------------')
                  console.log(approvedTagsListEng)
                  console.log(unapprovedTagsListEng)
                  console.log(props.SubjectCat)

                  setApprovedTagsThai(approvedTagsListThai)
                  setUnapprovedTagsThai(unapprovedTagsListThai)
                }

                console.log('dindus')
                console.log(tagsEng)

                props.OutTagEnglish(tagsEng);
                props.OutTagThai(tagsThai);






              })
              .catch(err => console.log(err));


          }

        }
      })
      .catch(error => {
        console.log(error)
      })


  }, []);


  function handleDelete(i, type) {
    console.log('deleto')
    console.log(type)
    console.log(i)


    const tagsApprovedEng = getApprovedTagsEng;
    const tagsApprovedThai = getApprovedTagsThai;
    const tagsUnapprovedEng = getUnapprovedTagsEng;
    const tagsUnapprovedThai = getUnapprovedTagsThai;

    if (type == "unapproved") {
      tagsUnapprovedEng.splice(i, 1)
      tagsUnapprovedThai.splice(i, 1)
    }
    else if (type == "approved") {
      tagsApprovedEng.splice(i, 1)
      tagsApprovedThai.splice(i, 1)
    }

    const tagsEng = [].concat(tagsApprovedEng, tagsUnapprovedEng);
    const tagsThai = [].concat(tagsApprovedThai, tagsUnapprovedThai);
    // const tagsEng = props.InTagEnglish.slice(0);
    // const tagsThai = props.InTagThai.slice(0);

    // tagsEng.splice(i, 1);
    // tagsThai.splice(i, 1);

    props.OutTagEnglish(tagsEng);
    props.OutTagThai(tagsThai);
  }

  function handleAddition(tag, lang) {
    const tagTemp = tag;

    GlobalHook.setMutantStatus(true);
    if (tag.id) {
      let flittedSuggestEnglish = getSuggestionsEnglish.filter(
        item => item.id == tagTemp.id
      );
      flittedSuggestEnglish[0].name = `${flittedSuggestEnglish[0].subject}: ${flittedSuggestEnglish[0].name}`;

      let flittedSuggestThai = getSuggestionsThai.filter(
        item => item.id == tagTemp.id
      );

      console.log("mofonity")
      console.log(props.SubjectCat)
      console.log(flittedSuggestEnglish)


      var thaiSubject = flittedSuggestThai[0].subject;
      for (var item of getSubjects) {
        if (item.english == flittedSuggestThai[0].subject) {
          thaiSubject = item.thai;
        }
      }

      flittedSuggestThai[0].name = `${thaiSubject}: ${flittedSuggestThai[0].name}`;
      const tagsEng = [].concat(props.InTagEnglish, flittedSuggestEnglish);
      const tagsThai = [].concat(props.InTagThai, flittedSuggestThai);


      // var displayThai = `${flittedSuggestThai[0].name}`;
      // var displayEng = `${flittedSuggestEnglish[0].name}`;
      // console.log("displayThai")
      // console.log(displayThai)
      // console.log("displayThai")
      // console.log(displayEng)
      // const tagsEng = [].concat(props.InTagEnglish, displayThai);
      // const tagsThai = [].concat(props.InTagThai, displayEng);




      var approvedTagsListEng = [];
      var unapprovedTagsListEng = [];
      for (var item of tagsEng) {
        if (item.approval) {
          approvedTagsListEng.push(item)
        } else {
          unapprovedTagsListEng.push(item)
        }
      }

      var approvedTagsListThai = [];
      var unapprovedTagsListThai = [];
      for (item of tagsThai) {
        if (item.approval) {
          approvedTagsListThai.push(item)
        } else {
          unapprovedTagsListThai.push(item)
        }
      }

      setApprovedTagsEng(approvedTagsListEng)
      setUnapprovedTagsEng(unapprovedTagsListEng)

      setApprovedTagsThai(approvedTagsListThai)
      setUnapprovedTagsThai(unapprovedTagsListThai)




      props.OutTagEnglish(tagsEng);
      props.OutTagThai(tagsThai);
    } else {
      setModalAddNewTagOpenStatus(true);
      if (lang == "Eng") {
        setNewTagEnglish(tag.name);
      } else {
        setNewTagThai(tag.name);
      }
    }
  }

  function handleInputChange(query) {

    axios
      .post(`/api/tag/gettagbyname/`, { tag: query })
      .then(res => {
        console.log(res.data);
        let matchTagSuggestEnglish = [];
        let matchTagSuggestThai = [];

        res.data.map(item => {
          console.log(item.subject);
          console.log(item.english);

          matchTagSuggestEnglish.push({
            id: item._id,
            name: item.english,
            subject: item.subject,
            approval: item.approval
          });
          matchTagSuggestThai.push({
            id: item._id,
            name: item.thai,
            subject: item.subject,
            approval: item.approval
          });
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
              onClick={() => {
                setModalAddNewTagOpenStatus(false);
                SaveNewTagAction();
              }}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
            >
              Save
            </button>
          </div>
        ]}
      >
        <div className="flex flex-col justify-center items-center mx-auto">
          <div className="flex mb-4">
            <label for="subject" className="font-semibold mr-4">
              Choose Subject :
              </label>
            {console.log('selectedSubjects')}
            {console.log(getSubjects)}
            <select
              // id="subject"
              value={getSelectedSubject}
              onChange={e => { setSelectedSubject(e.target.value); console.log('clicked'); console.log(e.target.value); console.log(getSelectedSubject) }}
            >
              {getSubjects.map(item => {
                return <option value={item.english}>{item.thai}</option>;
              })}
            </select>
          </div>



          <div>
            <div>English</div>
            <Input
              placeholder=""
              value={getNewTagEnglish}
              onChange={e => setNewTagEnglish(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <div>Thai</div>
            <Input
              placeholder=""
              value={getNewTagThai}
              onChange={e => setNewTagThai(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    );
  }

  function SaveNewTagAction() {
    axios
      .post(`/api/tag/addtag/`, {
        english: getNewTagEnglish,
        thai: getNewTagThai,
        subject: getSelectedSubject,
        approval: false,
      })
      .then(res => {
        const tagsEng = [].concat(props.InTagEnglish, [
          {
            id: res.data._id,
            name: `${getSelectedSubject}: ${getNewTagEnglish}`,
            subject: getSelectedSubject,
            approval: false,
          }
        ]);

        var thaiSubject;
        for (var item of props.SubjectCat) {
          if (item.english == getSelectedSubject) {
            thaiSubject = item.thai;
          }
        }


        const tagsThai = [].concat(props.InTagThai, [
          {
            id: res.data._id,
            name: `${thaiSubject}: ${getNewTagThai}`,
            subject: getSelectedSubject,
            approval: false,
          }
        ]);




        var approvedTagsListEng = [];
        var unapprovedTagsListEng = [];
        for (var item of tagsEng) {
          if (item.approval) {
            approvedTagsListEng.push(item)
          } else {
            unapprovedTagsListEng.push(item)
          }
        }

        var approvedTagsListThai = [];
        var unapprovedTagsListThai = [];
        for (item of tagsThai) {
          if (item.approval) {
            approvedTagsListThai.push(item)
          } else {
            unapprovedTagsListThai.push(item)
          }
        }

        setApprovedTagsEng(approvedTagsListEng)
        setUnapprovedTagsEng(unapprovedTagsListEng)

        setApprovedTagsThai(approvedTagsListThai)
        setUnapprovedTagsThai(unapprovedTagsListThai)

        props.OutTagEnglish(tagsEng);
        props.OutTagThai(tagsThai);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      {RenderAddNewTagModal()}
      <div className="flex flex-col text-center my-4 bg-white">
        <div className="font-bold text mb-2 flex justify-around w-full ">
          <div className="mr-2 mt-2">Tags</div>
        </div>

        {console.log("cassanova")}
        {console.log(getApprovedTagsEng)}


        <div style={{ backgroundColor: "gray" }}>



          <div style={{ backgroundColor: "#CDEEC8", width: "50%", float: "left" }}>

            <div className="font-bold text mb-2 flex justify-around w-full ">
              <div className="mr-2 mt-2"> Approved Tags</div>
            </div>

            {(getApprovedTagsEng) ?
              <ReactTags
                tags={getApprovedTagsEng}
                suggestions={getSuggestionsEnglish}
                handleDelete={e => handleDelete(e, "approved")}
                handleAddition={e => handleAddition(e, "Eng")}
                minQueryLength={1}
                handleInputChange={e => handleInputChange(e)}
                placeholder={"Add English Tags"}
                allowNew={true}
              /> : <></>}

            {(getApprovedTagsThai) ?
              <ReactTags
                tags={getApprovedTagsThai}
                suggestions={getSuggestionsEnglish}
                handleDelete={e => handleDelete(e, "approved")}
                handleAddition={e => handleAddition(e, "Eng")}
                minQueryLength={1}
                handleInputChange={e => handleInputChange(e)}
                placeholder={"Add Thai Tags"}
                allowNew={true}
              /> : <></>}
          </div>

          <div style={{ backgroundColor: "#EEC8C8", width: "50%", float: "left" }}>

            <div className="font-bold text mb-2 flex justify-around w-full ">
              <div className="mr-2 mt-2"> Waiting for Approval </div>
            </div>

            {(getUnapprovedTagsEng) ?
              <ReactTags
                tags={getUnapprovedTagsEng}
                suggestions={getSuggestionsEnglish}
                handleDelete={e => handleDelete(e, "unapproved")}
                handleAddition={e => handleAddition(e, "Eng")}
                minQueryLength={1}
                handleInputChange={e => handleInputChange(e)}
                placeholder={"Add English Tags"}
                allowNew={true}
              /> : <></>}

            {(getUnapprovedTagsThai) ?
              <ReactTags
                tags={getUnapprovedTagsThai}
                suggestions={getSuggestionsEnglish}
                handleDelete={e => handleDelete(e, "unapproved")}
                handleAddition={e => handleAddition(e, "Eng")}
                minQueryLength={1}
                handleInputChange={e => handleInputChange(e)}
                placeholder={"Add Thai Tags"}
                allowNew={true}
              /> : <></>}
          </div>

        </div>



      </div>
    </>
  );
}
