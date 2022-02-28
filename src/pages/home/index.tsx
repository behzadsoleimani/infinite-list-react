import React from "react";
import { Link } from "react-router-dom";
import "./index.scss"

export default () => {
  

  return (
    <>
      <div className={"link"}>
        <Link className={"link__anchor"} to={"/vendor-list"}>Go To List</Link>
      </div>
    </>
  );
};
