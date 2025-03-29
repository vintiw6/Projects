import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import {useEffect, useState} from "react";


async function fetchDetails(menuItem, setSizes, setSides, setCategory) {
  try {
    // fetching size details 
    const sizesPromise = menuItem.sizes.map(async (size) => {
      const response = await fetch(`/api/menu-items/sizes?id=${size.extraPriceSizeId}`); 
      return await response.json(); 
    });

    // fetching side details 
    const sidesPromise = menuItem.sides.map(async (side) => {
      const response = await fetch(`/api/menu-items/sides?id=${side.extraPriceSideId}`); 
      return await response.json(); 
    });

    // wait for both size and side details to be fetched 
    const sizesDetails = await Promise.all(sizesPromise); 
    const sidesDetails = await Promise.all(sidesPromise); 

    // update state with fetched details
    setSizes(sizesDetails); 
    setSides(sidesDetails); 

    // fetching category details 
    const response = await fetch(`/api/categories?id=${menuItem.categoryId}`); 
    setCategory(await response.json()); 

  } catch(error) {
    console.error('Error fetching details:', error.message); 
  }
}; 


export default function MenuItemForm({onSubmit,menuItem}) {
  console.log(menuItem); 
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || 0.0);
  const [sides, setSides] = useState(menuItem?.sides || []);
  const [sizes, setSizes] = useState(menuItem?.sizes || []); 
  const [category, setCategory] = useState(menuItem?.category || null);

  useEffect(() => {
    // Call fetchDetails on initial load
    fetchDetails(menuItem, setSizes, setSides, setCategory);
  }, []);

  console.log("UPDATED FINAL SIDES", sides); 
  console.log("UPDATED FINAL SIZES", sizes); 
  console.log("UPDATED FINAL CATEGORY", category); 

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("Fetching categories..."); 
    fetch('/api/categories')
      .then(res => res.json())
      .then(categories => {
        console.log("Fetched Categories:", categories); 
        setCategories(categories); 
      })
      .catch(error => {
        console.error("Error fetching categories:", error); 
      })
  }, []);

  return (
    <form
      onSubmit={ev =>
        onSubmit(ev, {
          image,name,description,basePrice,sizes,sides,category
        })
      }
      className="mt-8 max-w-2xl mx-auto">
      <div
        className="md:grid items-start gap-4"
        style={{gridTemplateColumns:'.3fr .7fr'}}>
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={ev => {
              console.log("Selected Name Value:", ev.target.value);
              setName(ev.target.value)
            }}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={ev => {
              console.log("Selected Description Value:", ev.target.value);
              setDescription(ev.target.value)
            }}
          />
          <label>Category</label>
          <select 
            value={category?.id || ''} 
            onChange={ev => {
              console.log("Selected Category ID Value:", ev.target.value); 
              const selectedCategory = categories.find(c => c.id === Number(ev.target.value));          
              console.log("Selected Category Name:", selectedCategory.name); 
              setCategory(selectedCategory);
            }}>
            {categories?.length > 0 && categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={ev => {
              console.log("Selected Base Price Value:", ev.target.value); 
              setBasePrice(ev.target.value)
            }}
          />
          <MenuItemPriceProps name={'Sizes'}
                              addLabel={'Add item size'}
                              props={sizes}
                              setProps={setSizes} />
          <MenuItemPriceProps name={'Extra ingredients'}
                              addLabel={'Add ingredients prices'}
                              props={sides}
                              setProps={setSides}/>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}