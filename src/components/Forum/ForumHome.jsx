import React from "react";
import Topics from "./Topics/Topics";
import { ForumStatsPanel } from "../Panels";

const ForumHome = () => {
  return (
    <>
      <ForumStatsPanel />
      <Topics />
    </>
  );
};

export default ForumHome;
