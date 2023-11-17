"use client";

import CreateIssue from "@/components/CreateIssue";
import axios from "axios";
import { useEffect, useState } from "react";
import IssueContainer from "@/components/IssueContainer";

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getIssues = async () => {
      const response = await axios.get("/api/issues");
      setIssues(response.data);
    };

    getIssues();
  }, [reload]);

  const handleIssueCreated = () => {
    setReload(!reload);
  };

  const sortIssues = (issues) => {
    const statusValues = { IN_PROGRESS: 1, OPEN: 2, CLOSED: 3 };
    return issues.sort(
      (a, b) => statusValues[a.status] - statusValues[b.status]
    );
  };

  return (
    <div className="flex flex-col space-y-10">
      <CreateIssue onIssueCreated={handleIssueCreated} />
      <div className="flex flex-row flex-wrap">
        {sortIssues(issues).map((issue) => (
          <IssueContainer issue={issue} reload={reload} setReload={setReload} />
        ))}
      </div>
    </div>
  );
};

export default Issues;
