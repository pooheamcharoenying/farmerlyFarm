import React from "react";
import {Menu, Dropdown,Avatar} from "antd";
import AreaChart from './chart/AreaChart'
import RadarChart from './chart/RadarChart'
import RadialBarChart from './chart/RadialBarChart'
export default function StudioDashboardContent() {
  return (
    <div className=" h-full w-full flex flex-col items-center py-4 justify-start">
      <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-8 md:mb-10 bg-orange-500">
        Dashboard
      </div>

<div className="flex flex-row flex-wrap justify-around w-full">
  
  
  
    <div className="bg-gray-200 p-6 rounded-lg mb-6" style={{minHeight:"600px",minWidth:"400px",width:"auto",overflowY:"auto"}}>
    <div className="rounded-lg text-center text-white py-2 text-xl font-bold bg-purple-500 mx-auto" style={{width:"120px",maxHeight:"500px"}}>
        Student
      </div>
      <div className="mt-4 flex flex-col">
     { [{
  "id": 1,
  "first_name": "Garrott",
  "last_name": "Launder",
  "email": "glaunder0@nps.gov",
  "photo": "https://robohash.org/hicnisiasperiores.bmp?size=50x50&set=set1"
}, {
  "id": 2,
  "first_name": "Hermie",
  "last_name": "McCrone",
  "email": "hmccrone1@posterous.com",
  "photo": "https://robohash.org/vellaborecupiditate.bmp?size=50x50&set=set1"
}, {
  "id": 3,
  "first_name": "Delphinia",
  "last_name": "Kahn",
  "email": "dkahn2@360.cn",
  "photo": "https://robohash.org/quasasperiorestempora.png?size=50x50&set=set1"
}, {
  "id": 4,
  "first_name": "Norbert",
  "last_name": "Rolin",
  "email": "nrolin3@upenn.edu",
  "photo": "https://robohash.org/etillumfacilis.jpg?size=50x50&set=set1"
}, {
  "id": 5,
  "first_name": "Brooke",
  "last_name": "Bakes",
  "email": "bbakes4@dell.com",
  "photo": "https://robohash.org/ipsavoluptatibusad.png?size=50x50&set=set1"
}, {
  "id": 6,
  "first_name": "Hailey",
  "last_name": "Vannet",
  "email": "hvannet5@plala.or.jp",
  "photo": "https://robohash.org/evenietcupiditateconsectetur.bmp?size=50x50&set=set1"
}, {
  "id": 7,
  "first_name": "Robina",
  "last_name": "Ellett",
  "email": "rellett6@qq.com",
  "photo": "https://robohash.org/modietut.png?size=50x50&set=set1"
}, {
  "id": 8,
  "first_name": "Karita",
  "last_name": "Langstone",
  "email": "klangstone7@g.co",
  "photo": "https://robohash.org/hicdoloribussunt.png?size=50x50&set=set1"
}, {
  "id": 9,
  "first_name": "Sylvan",
  "last_name": "Schumacher",
  "email": "sschumacher8@npr.org",
  "photo": "https://robohash.org/iurearchitectoquis.png?size=50x50&set=set1"
}, {
  "id": 10,
  "first_name": "Vaughn",
  "last_name": "Gatherer",
  "email": "vgatherer9@ning.com",
  "photo": "https://robohash.org/autminimanulla.bmp?size=50x50&set=set1"
}].map((item,index)=>{

          return(
            <div className="flex mt-4 bg-white  rounded-lg p-2 items-center" key={index}>
            <div className="mr-4"> <Avatar size={40} className="cursor-pointer" src={item.photo}/></div>
            <div>{item.first_name +" "+ item.last_name}</div>
          </div>
          )
      })}

</div>

    </div>


    <div className="bg-gray-200 p-6 rounded-lg" style={{minHeight:"600px",width:"auto",overflowY:"auto"}}>
    <div className="rounded-lg text-center text-white py-2 text-xl font-bold bg-blue-500 mx-auto" style={{width:"120px",maxHeight:"500px"}}>
        Statistic
      </div>
      <div className="mt-4 flex flex-col">
      <AreaChart/>
      <div style={{minHeight:"25px"}}/>
      <RadialBarChart/>

        </div>

    </div>


    </div>
    </div>
  );
}
