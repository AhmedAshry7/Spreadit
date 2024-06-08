import React, { useMemo } from "react";
import Bar from "../components/UI/Bar";
import Sidebar from "../components/UI/Sidebar";
import ToolBar from "../components/UI/Toolbar";
import styles from "./SettingsLayout.module.css";

const Layout = ({ index }) => {
  const layout = useMemo(
    () => (
      <>
        <ToolBar loggedin={true} page={"Spreadit"} />
        <div className={styles.title}>User settings</div>
        <Bar selected={index} />
      </>
    ),
    [index],
  );

  return layout;
};

export default Layout;
