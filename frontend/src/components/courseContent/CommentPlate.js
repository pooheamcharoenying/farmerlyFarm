import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Rate,Progress,Input,Avatar } from 'antd';

export default function CommentPlate({item}) {
    const [getdata, setData] = useState({});
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
          setLoading(true);
          const response = await axios.post("/api/user/getuserbyid", {"ouid":item.iuser})
          setLoading(false);
          setData(response.data);

        })();
      }, []);

    if(isLoading) return <div>Loading</div>
    return (
        <div className="flex flex-col w-8/12 bg-white items-start p-2 mt-4 rounded-lg">
        <div className="flex items-center"><Avatar size={20} className="cursor-pointer mr-2" src={getdata.photoURL}/><div className="font-medium mr-2">{getdata.displayName}</div>  <Rate disabled defaultValue={item.rating} className="flex-1"/></div>
        <div className="text-left mt-2">{item.comment}</div>
        </div>
    )
}
