import Sidebar from "../sidebar/Sidebar";
import styles from './SidebarLayout.module.css';
import { Outlet } from 'react-router-dom';

const SidebarLayout = () => {
  return (
    <main className={styles.appContainer}>
      <Sidebar name="Guilherme" />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </main>
  );
};

export default SidebarLayout;
