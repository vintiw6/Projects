'use client'; 

import DeleteButton from "@/components/DeleteButton"; 
import UserTabs from "@/components/layout/UserTabs"; 
import { useEffect, useState } from "react"; 
import { useProfile } from "@/components/UseProfile"; 

async function fetchCategories(setCategories) {
    try {
        const response = await fetch('/api/categories'); 

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(`Error ${response.status}: ${errorData.message || 'Failed to fetch categories.'}`)
        }

        const categories = await response.json(); 
        setCategories(categories); 

    } catch(error) {
        console.error("Error fetching categories:", error); 
    }
}

export default function CategoriesPage() {

    const [categoryName, setCategoryName] = useState(''); 
    const [categories, setCategories] = useState([]); 
    const {loading:profileLoading, data:profileData} = useProfile(); 
    const [editedCategory, setEditedCategory] = useState(null); 

    useEffect(() => {
        fetchCategories(setCategories); 
    }, []); 

    async function handleCategorySubmit(ev) {
        ev.preventDefault(); 

        const data = {
            name: categoryName
        };

        if (editedCategory) {
            data.id = editedCategory.id; 
        }

        try {
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST', 
                body: JSON.stringify(data), 
            });
      
            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.message)
            }

            setCategoryName(''); 
            fetchCategories(setCategories); 
            setEditedCategory(null); 

        } catch(error) {
            console.error("Error creating category:", error.message); 
        }
    }

    async function handleDeleteClick(_id) {
        try {
            const response = await fetch('/api/categories?_id='+_id, {
                method: 'DELETE', 
            });
      
            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(`Error ${response.status}: ${errorData.message || 'Failed to delete category.'}`)
            }

        } catch(error) {
            console.error("Error deleting category:", error.message); 
        }

        fetchCategories(setCategories); 
    }

    if (profileLoading) {
        return 'Loading user info...'; 
    }

    if (!profileData.userinfo.admin) {
        return 'Not an admin'; 
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category' : 'New category name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text"
                               value={categoryName}
                               onChange={ev => setCategoryName(ev.target.value)}
                        />
                    </div>
                    <div className="pb-2 flex gap-2">
                        <button className="border border-primary" type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEditedCategory(null);
                                setCategoryName('');
                            }}>
                                Cancel
                        </button>
                    </div>
                </div>
            </form>
      
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
                {categories?.length > 0 && categories.map(c => (
                    <div
                        key={c.id}
                        className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                        <div className="grow">
                            {c.name}
                        </div>
                        <div className="flex gap-1">
                            <button type="button"
                                onClick={() => {
                                    setEditedCategory(c);
                                    setCategoryName(c.name);
                                }}
                            >
                                Edit
                            </button>
                            <DeleteButton
                                label="Delete"
                                onDelete={() => handleDeleteClick(c.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

