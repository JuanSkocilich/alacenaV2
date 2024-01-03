import React from "react";

export const TabContent = ({ productArray, icon, title }) => {
  return (
    <div className="tab-title">
      <span className="tab-icon">{icon}</span>
      {title} <span>{productArray?.length}</span>
    </div>
  );
};
