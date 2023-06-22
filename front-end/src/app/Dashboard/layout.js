import SideNavbar from "../../components/sideNavBar"
import SidePanel from "../../components/sidePanel"
import BottomNavBar from "../../components/bottomNavBar"
import AddButton from "@/components/addButton"
import styles from "./Layout.module.css"

export const metadata = {
  title: 'Budget Tracker',
  description: 'Budget Tracker by Mickey',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <div className={styles.layout}>
          <SidePanel/>
          <AddButton/>
          <main>{children}</main>
          <BottomNavBar/>
        </div>
        <div className="border"></div>
      </body>
    </html>
  )
}
