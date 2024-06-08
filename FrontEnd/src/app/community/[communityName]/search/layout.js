"use client";
import styles from "@/app/profile/Profile.module.css";
import Sidebar from "@/app/components/UI/Sidebar";
import ToolBar from "@/app/components/UI/Toolbar";

export default function SearchLayout({ children }) {
  return (
    <div className={styles.profile_container}>
      <ToolBar route={"/community"} page={"Spreadit"} loggedin={true} />

      <div className={styles.main_container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>

        <div className={styles.no_grid}>
          <div style={{ margin: "60px 0 0 0" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
