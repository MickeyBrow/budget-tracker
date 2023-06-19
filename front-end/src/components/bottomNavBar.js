'use client'
import './../componentStyles/bottomNavBar.css'
import { usePathname, useRouter } from 'next/navigation';

const BottomNavBar = () => {
  const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] 
  let pathname = usePathname().split('/')
  let router = useRouter()

  const bottomNav = (month) => {
    if (month == pathname[pathname.length-1]) return <a className="active" onClick={() => router.push(`/Dashboard/Months/${month}`)}>{month}</a>
    else return <a onClick={() => router.push(`/Dashboard/Months/${month}`)}>{month}</a>
  };

  return (
    <div className="bottomnav">
      {pathname[pathname.length-1] == "Dashboard" ?
        <a href="/Dashboard" className="active">Summary</a>
      :
        <a href="/Dashboard">Summary</a>
      }
      {monthList.map((month) => bottomNav(month))}
    </div>
  );
};

export default BottomNavBar;