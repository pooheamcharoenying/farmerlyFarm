import React,{useEffect,useState} from 'react'
import ReactQuill from "react-quill";

export default function TextEditor({dataIn,dataOut,readOnly,hindToolBar,noBorder,noMinHeight,noAll}) {
    const [getVal,setVal] = useState("")

    useEffect(() => {
        setVal(dataIn)
       }, [dataIn])

       function handleChange(e) {
        setVal(e)
        dataOut(e)
      }

      var modules = {
        toolbar: [
          [{ font: [] }, { size: [] }],
          [{ align: [] }, "direction"],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "super" }, { script: "sub" }],
          ["blockquote", "code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
          ],
          ["link", "image", "video"],
          ["clean"]
        ]
      };
    
    return (
        <ReactQuill
            value={getVal || ""}
            onChange={handleChange}
            theme="snow"
            className="editor"
            modules={modules}
            readOnly={readOnly}
            className={noAll?"hide-toolbar noBorder noMinHeight":""}
            // className={noBorder?"noBorder":""}
            // className={noMinHeight?"noMinHeight":""}
          />
    )
}
