import React, { useContext } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";

const Data = () => {
  const { user, loadingState } = useContext(AUTH_CONTEXT);
  if(loadingState){
    return <div> loading</div>
  }
  console.log(user);
  return <div>this is data page</div>;
};

export default Data;
