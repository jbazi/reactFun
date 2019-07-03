import React from "react";

//Input: liked: boolean
//Output: onclick

//sfc short-cut for state-less functional component. We create this if there's no state
//note when SFC is used, since there's no state always remove 'this' reference then pass 'props' as a parameter
//to the SFC function
const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
