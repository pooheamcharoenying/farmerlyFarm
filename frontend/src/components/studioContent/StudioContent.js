import React, { useContext } from "react";
import { FaSave } from "react-icons/fa";
import { Tooltip } from "antd";
import { GlobalContext } from "../../hook/GlobalHook";
import StudioVideoContent from "./StudioVideoContent";
import StudioDocumentContent from "./StudioDocumentContent";
import StudioQuizContent from "./StudioQuizContent";
import StudioOverviewContent from "./StudioOverviewContent";
import {SaveAllAction} from '../../actions'
export default function StudioContent() {
  const GlobalHook = useContext(GlobalContext);
  function RenderStudioContentSwitch() {
    switch (GlobalHook.getGlobalLessionSelect.mediaType) {
      case "Video":
        return <StudioVideoContent />;
        break;
      case "Document":
        return <StudioDocumentContent />;
        break;
      case "Quiz":
        return <StudioQuizContent />;
        break;
     
      default:
        return <StudioOverviewContent />;
        break;
    }
  }
  return (
    <div className="w-full h-full max-h-full max-w-full bg-gray-100 relative">
      {RenderStudioContentSwitch()}
      {GlobalHook.getGlobalShowSideBarStatus? <div className="absolute inset-0 min-h-screen min-w-full bg-black opacity-50 z-20"/>:<div/>}

      <Tooltip title="Save">
        <button
          onClick={() => {SaveAllAction(GlobalHook)}}
          className="bg-green-600 fixed right-0 bottom-0 m-4 text-white rounded-full flex justify-center items-center hover:bg-green-500 z-10"
          style={{ width: "60px", height: "60px", fontSize: "40px" }}
        >
          <FaSave />
        </button>
      </Tooltip>
    </div>
  );
}
