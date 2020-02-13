
import React, { useContext,useState,useEffect } from "react";
import { Input,Icon} from "antd";
import { GlobalContext } from "../../hook/GlobalHook";
import { courseSearchKeywordAction } from "../../actions";

  

const MobileSearchBar = () => {
    const GlobalHook = useContext(GlobalContext);

    const [getSearchValue, setSearchValue] = useState("");

    const { Search } = Input;

    useEffect(() => {
        if(getSearchValue !== ""){
      courseSearchKeywordAction(GlobalHook, getSearchValue);
        }else{
            GlobalHook.setGlobalShowSearch(false)

        }
    }, [getSearchValue]);

    useEffect(() => {
    if(!GlobalHook.getGlobalShowSearch){
        setSearchValue("")
    }
    }, [GlobalHook.getGlobalShowSearch])

    if(GlobalHook.getGlobalShowMobileSearchBar){
    return (
        <div className="md:hidden">
            <Search
            placeholder="ค้นหา คอร์ส ....."
            addonAfter={<Icon type="close" onClick={()=>{GlobalHook.setGlobalShowMobileSearchBar(false);GlobalHook.setGlobalShowSearch(false);setSearchValue("");}} />} 
            placeholder="ค้นหา คอร์ส"
            onChange={value => setSearchValue(value.target.value)}
            value={getSearchValue}
            loading={getSearchValue != ""}
            /> 
        </div>
    );
    }
    return(<div/>)
}

export default MobileSearchBar;
