

export default async function fetchMenuItem(id) {
    try {
      const res = await fetch(`/api/menu-items?id=${id}`);
      const menuItem = await res.json();
      return menuItem;
    } catch (error) {
      console.error('Error fetching menu items:', error.message);
    }
  }