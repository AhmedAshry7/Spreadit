import React, { useEffect, useState } from "react";
import Sidebar from "../components/UI/Sidebar";
import ToolBar from "../components/UI/Toolbar";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <ToolBar />
      <Sidebar />
      <h1>homepage</h1>
    </div>
  );
}
export default Home;
