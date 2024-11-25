import React from "react";

const SelectorItem = ({ projectName, projectID }) => {
  return (
    <div className="flex flex-col py-1">
      <span className="font-medium">{projectName}</span>
      <span className="text-xs text-muted-foreground">{`Managed by ${projectID}`}</span>
    </div>
  );
};

export default SelectorItem;
