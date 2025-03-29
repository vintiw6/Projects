// Technologies involved: 
// - React (JSX) - component-based UI design  
// - NextAuth.js - User Authentication 
// - Prisma - PrismaClient used to interact w database to fetch / update user data 
// - JavaScript - asynchrnous operations 

'use client'; 
import UserForm from "@/components/form/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast"; 

export default function ProfilePage() {
  const {data: session, status } = useSession()

  const [user, setUser] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(null); 
  const [profileFetched, setProfileFetched] = useState(false); 

  if (status === 'unauthenticated') {
    return redirect('/login'); 
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          setUser(data); 
          setIsAdmin(data.userinfo.admin); 
          setProfileFetched(true); 
        })
      }); 
    }
  }, [session, status])

  if (status === 'loading' || !profileFetched) {
    return 'Loading...'; 
  }


  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault(); 

    await toast.promise(
      fetch( 
          '/api/profile', 
          {
              method: 'PUT', 
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data), 
          }
      ).then(
          async (response) => {
              if (!response.ok) {
                throw new Error('Failed to update profile');  
              }
          }
      ), 
      {
          loading: 'Saving...',
          success: 'Profile saved!', 
          error: 'Error, sorry...',
      }
   ); 
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate}/>
      </div>
    </section>
  )






}