'use client'
import './../componentStyles/SidePanel.css'
import firebase_app from '@/config';
import { useRouter } from 'next/navigation'
import { signOut, getAuth } from "firebase/auth";

const SidePanel = () => {
  let router = useRouter();

  const handleSignOut = () => {
    const auth = getAuth(firebase_app)
    signOut(auth).then(() => router.push('/'))
  }

  return (
    <>
      <div class="sidenav">
        <a href="/Dashboard">Dashboard</a>
        <a href="/Investments">Investments</a>
        <a style={{'cursor': "pointer"}} onClick={handleSignOut}>Sign Out</a>
      </div>
    </>
  );
};

export default SidePanel;
