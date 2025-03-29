'use client';
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/form/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import {redirect} from "next/navigation";
import {useState} from "react";

async function createSizes(sizes) {
  const createdSizes = []; 
  const existingSizesMap = new Map(); 

  try {
    const response = await fetch('/api/menu-items/sizes');

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(`Error ${response.status}: ${errorData.message} || Failed to fetch sizes.`)
    }

    const existingSizes = await response.json(); 
    existingSizes.forEach(size => existingSizesMap.set(size.name, size));

  } catch (error) {
    console.error("Error fetching menu item sizes:", error);
    throw new Error(`Error fetching sizes: ${error.message} || Failed to fetch sizes.`);
  }

  for (const size of sizes) {
    if (existingSizesMap.has(size.name)) {
      createdSizes.push(existingSizesMap.get(size.name));
    }

    else {
      try {
        const response = await fetch('/api/menu-items/sizes', {
          method: 'POST',
          body: JSON.stringify(size),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error ${response.status}: ${errorData.message || 'Failed to create size.'}`);
        }

        const createdSize = await response.json();
        createdSizes.push(createdSize);

      } catch (error) {
        console.error("Error creating menu item sizes:", error);
        throw new Error(`Error creating sizes: ${error.message} || Failed to create sizes.`)
      }
    }
  }
  return createdSizes; 
}

async function createSides(sides) {
  const createdSides = []; 
  const existingSidesMap = new Map(); 

  try {
    const response = await fetch('/api/menu-items/sides');

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message || 'Failed to create side.'}`);      
    } 

    const existingSides = await response.json(); 
    existingSides.forEach(side => existingSidesMap.set(side.name, side)); 

  } catch (error) {
    console.error("Error fetching existing menu item sides:", error);
    throw new Error(`Error fetching existing sides: ${error.message} || Failed to fetch existing sides.`)
  }

  for (const side of sides) {
    if (existingSidesMap.has(side.name)) {
      createdSides.push(existingSidesMap.get(side.name));
    }

    else {
      try {
        const response = await fetch('/api/menu-items/sides', {
          method: 'POST', 
          headers: {'Content-Type': 'application/json', },
          body: JSON.stringify(side), 
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error ${response.status}: ${errorData.message || 'Failed to create side.'}`);
        }

        const createdSide = await response.json(); 
        createdSides.push(createdSide);
        
      } catch(error) {
        console.error("Error creating menu item sides:", error);
        throw new Error(`Error creating sides: ${error.message} || Failed to create side.`)
      }
    }
  }
  return createdSides; 
}

async function createMenuItem(menuItem) {
  try {
    const response = await fetch('/api/menu-items', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menuItem), 
    });

    console.log("test", await response.text()); 

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(`Error ${response.status}: ${errorData.message} || 'Failed to create menu item.'}`)
    }

  } catch(error) {
    console.error("Error creating menu item:", error);
    throw new Error(`Error creating menu item: ${error.message} || Failed to fetch menu item.`)
  }
}

export default function NewMenuItemPage() {

  const [redirectToItems, setRedirectToItems] = useState(false);
  const {loading, data} = useProfile();

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();

    let m_sizes = []; 
    let m_sides = []; 

    try {
      m_sizes = await createSizes(data.sizes); 

    } catch(error) {
      console.error("Error creating menu item sizes:", error);
      throw new Error(`Error creating sizes: ${error.message} || Failed to create sizes.`)
    }

    try {
      m_sides = await createSides(data.sides); 

    } catch(error) {
      console.error("Error creating menu item sides:", error);
      throw new Error(`Error creating sides: ${error.message} || Failed to create sides.`)
    }

    console.log("SIZE", m_sizes); 
    console.log("SIDEE", m_sides); 

    try {
      const menuItemData = {
        name: data.name, 
        description: data.description, 
        basePrice: data.basePrice, 
        image: data.image, 
        category: data.category, 
        sizes: m_sizes, 
        sides: m_sides,
      };

      console.log("HHAHAHA", menuItemData); 

      await createMenuItem(menuItemData); 
      

    } catch(error) {
      console.error("Error creating menu item:", error);
      throw new Error(`Error creating menu item: ${error.message} || Failed to create menu item.`)
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
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}