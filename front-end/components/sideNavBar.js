import Link from 'next/link';
import styles from '../componentStyles/SideNavbar.module.css'; // Import CSS module styles


const SideNavbar = () => {
  return (
    <div className={styles.sideNavbar}>
      <ul>
        <li>
          <Link href="/Dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/Investing">Investments</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
