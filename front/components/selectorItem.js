import React from 'react';

const SelectorItem = ({iconURL, projectName, projectID}) => {
    return (
        <span className="flex items-center gap-2">
              <img
                  className="size-10 rounded-full"
                  src={iconURL}
                  alt="Paul Smith"
                  width={40}
                  height={40}
              />
              <span className={"justify-items-start"}>
                <span className="block font-medium">{`${projectName}`}</span>
                <span className="mt-0.5 text-xs text-muted-foreground">{`@${projectID}`}</span>
              </span>
        </span>
    );
};

export default SelectorItem;