import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Rate,Progress,Input,Avatar } from 'antd';

export default function SubscriptorPlate({item}) {
    const [getdata, setData] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
          setLoading(true);
          const response = await axios.post("/api/user/getuserbyid", {"uid":item.user})
          setLoading(false);
          setData(response.data);
        })();
      }, []);

    if(isLoading) return <div>Loading</div>
    return (
        <div className="flex mt-4 bg-white  rounded-lg p-2 items-center" >
          <div className="mr-4"> <Avatar size={40} className="cursor-pointer" src={getdata.photoURL}/></div>
           <div>{getdata.displayName}</div>
          </div>
    )
}
