'use client';

import DeleteButton from "@/components/DeleteButton";
import Left from "@/components/icons/Left";
import DeleteMenuItemForm from "@/components/form/DeleteMenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import {redirect, useParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function EditMenuItemPage() {
    const {id} = useParams();
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    useEffect(() => {
      fetch('/api/menu-items?id='+id)
      .then(res => res.json()) 
      .then((menuItem) => {
        setMenuItem(menuItem);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error.message); 
      });
    }, [id]);

    async function handleDeleteClick(id) {
      try {
        const response = await fetch('/api/menu-items?_id='+id, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message); 
        }
      } catch(error) {
        console.error('Failed to delete menu item', error.message); 
      }

      setRedirectToItems(true);
    }
    

  if (redirectToItems) {
    return redirect('/menu-items');
  }

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.userinfo.admin) {
    return 'Not an admin.';
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <DeleteMenuItemForm menuItem={menuItem} />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton
            label="Delete this menu item"
            onDelete={() => handleDeleteClick(id)}
          />
        </div>
      </div>
    </section>
  );
}