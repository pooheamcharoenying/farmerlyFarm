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

export default function TagCom(props) {
  const GlobalHook = useContext(GlobalContext);
  const [getModalAddNewTagOpenStatus,setModalAddNewTagOpenStatus] = useState(false)

  const [getSuggestionsEnglish, setSuggestionsEnglish] = useState([]);
  const [getSuggestionsThai, setSuggestionsThai] = useState([]);

  const [getNewTagEnglish, setNewTagEnglish] = useState("");
  const [getNewTagThai, setNewTagThai] = useState("");

  function handleDelete(i) {
    const tagsEng = props.InTagEnglish.slice(0);
    const tagsThai = props.InTagThai.slice(0);

    tagsEng.splice(i, 1);
    tagsThai.splice(i, 1);

    props.OutTagEnglish(tagsEng);
    props.OutTagThai(tagsThai);
  }

  function handleAddition(tag, lang) {
    GlobalHook.setMutantStatus(true)
    if (tag.id) {
      const tagsEng = [].concat(
        props.InTagEnglish,
        getSuggestionsEnglish.filter(item => item.id == tag.id)
      );
      const tagsThai = [].concat(
        props.InTagThai,
        getSuggestionsThai.filter(item => item.id == tag.id)
      );

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
        thai: getNewTagThai
      })
      .then(res => {
        const tagsEng = [].concat(props.InTagEnglish, [
          { id: res.data._id, name: getNewTagEnglish }
        ]);
        const tagsThai = [].concat(props.InTagThai, [
          { id: res.data._id, name: getNewTagThai }
        ]);

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
      <div className="font-bold text mb-2 flex justify-around w-full "><div className="mr-2">Tags</div></div>

      <ReactTags
        tags={props.InTagEnglish}
        suggestions={getSuggestionsEnglish}
        handleDelete={e => handleDelete(e)}
        handleAddition={e => handleAddition(e, "Eng")}
        minQueryLength={1}
        handleInputChange={e => handleInputChange(e)}
        placeholder={"Add English Tags"}
        allowNew={true}
      />
      <ReactTags
        tags={props.InTagThai}
        suggestions={getSuggestionsThai}
        handleDelete={e => handleDelete(e)}
        handleAddition={e => handleAddition(e, "Tha")}
        minQueryLength={1}
        handleInputChange={e => handleInputChange(e)}
        placeholder={"Add Thai Tags"}
        allowNew={true}
      />
    </div>
    </>
  );
}
