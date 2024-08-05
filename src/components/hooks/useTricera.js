import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useTricera = () => {
  const [configs, setConfigs] = useState([]);
  
  useEffect(() => {
    if (!localStorage.getItem("tricera-uuid")) {
      localStorage.setItem("tricera-uuid", uuidv4());
    }
    // if(!sessionStorage.getItem("tricera-configs")){
    //   localStorage.removeItem("tricera-uuid");
    // }
  }); 
  
  useEffect(() => {
    if (sessionStorage.getItem("tricera-configs")) {
      setConfigs(JSON.parse(sessionStorage.getItem("tricera-configs")))
     }
     
  },[]); 

  const setConfigSession=(config)=>{
    setConfigs(config)
  
    sessionStorage.setItem("tricera-configs", JSON.stringify(config));
  }

  const getUUID = () => {
    const uuid = localStorage.getItem("tricera-uuid");
    if (uuid) {
      return uuid;
    } else {
      const uuid = uuidv4();
      localStorage.setItem("tricera-uuid", uuid);
      return uuid;
    }
  };
  return {
    getUUID,
    setConfigs,
    configs,
    setConfigSession
  };
};
export default useTricera;
