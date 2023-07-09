import SidePanel from "../../components/sidePanel"
import AddButton from "../../components/addButtonInvestments"
import styles from "./Layout.css"

export const metadata = {
  title: 'Investments',
  description: 'Investments by Mickey',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <div className={styles.layout}>
          <SidePanel/>
          <AddButton/>
          <main>{children}</main>
        </div>
        <div className="border"></div>
      </body>
    </html>
  )
}
