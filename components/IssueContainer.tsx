import React from "react";
import axios from "axios";

const IssueContainer = ({ issue, reload, setReload }) => {
  const statusColors = {
    OPEN: "text-red-500",
    CLOSED: "text-green-500",
    IN_PROGRESS: "text-yellow-500",
  };

  const handleUpdate = async (id) => {
    const newStatus = (currentStatus) => {
      switch (currentStatus) {
        case "OPEN":
          return "IN_PROGRESS";
        case "IN_PROGRESS":
          return "CLOSED";
        case "CLOSED":
          return "OPEN";
        default:
          return "OPEN";
      }
    };

    const response = await axios.patch("api/issues", {
      id: id,
      status: newStatus(issue.status),
    });

    setReload(!reload);
  };

  return (
    <div
      className="flex flex-col m-3 container_main hover:scale-110 ease-in-out duration-500 rounded-3xl p-10"
      key={issue.id}
    >
      <p className="text-white font-bold">{issue.title}</p>
      <p className="mt-2 text-slate-400">{issue.description}</p>
      <p
        className={`mt-4 cursor-pointer rounded-full px-4 py-2 hover:font-bold hover:bg-white ease-in-out duration-500 ${
          statusColors[issue.status]
        }`}
        onClick={() => {
          handleUpdate(issue.id);
        }}
      >
        {issue.status}
      </p>
    </div>
  );
};

export default IssueContainer;
