export const metadata = {
  title: 'Login',
  description: 'Budget Tracker by Mickey',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
