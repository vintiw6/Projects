import {CartContext} from "@/components/AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import FlyingButton from "react-flying-item";

async function fetchDetails(sizes, setActualSizes, sides, setActualSides) {
  try {
    // fetching size details 
    const sizesPromise = sizes.map(async (size) => {
      const response = await fetch(`/api/menu-items/sizes?id=${size.extraPriceSizeId}`); 
      return await response.json(); 
    });

    // fetching side details 
    const sidesPromise = sides.map(async (side) => {
      const response = await fetch(`/api/menu-items/sides?id=${side.extraPriceSideId}`); 
      return await response.json(); 
    });

    // wait for both size and side details to be fetched 
    const sizesDetails = await Promise.all(sizesPromise); 
    const sidesDetails = await Promise.all(sidesPromise); 

    setActualSides(sidesDetails); 
    setActualSizes(sizesDetails);  

  } catch(error) {
    console.error('Error fetching details:', error.message); 
  }
}; 

export default function MenuItem(menuItem) {
  const {image,name,description,basePrice,sizes,sides} = menuItem;

  const [actualSizes, setActualSizes] = useState([]);
  const [actualSides, setActualSides] = useState([]);

  useEffect(() => {
    fetchDetails(sizes, setActualSizes, sides, setActualSides); 
  }, []); 

  const [selectedSize, setSelectedSize] = useState(actualSizes?.[0] || null);
  const [selectedSides, setSelectedSides] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const {addToCart} = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    console.log('add to cart');
    
    const hasOptions = actualSizes.length > 0 || actualSides.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedSides);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('hiding popup');
    setShowPopup(false);
  }
  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedSides(prev => [...prev, extraThing]);
    } else {
      setSelectedSides(prev => {
        return prev.filter(e => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = Number(basePrice);
  if (selectedSize) {
    selectedPrice += Number(selectedSize.price);
  }
  if (selectedSides?.length > 0) {
    for (const extra of selectedSides) {
      selectedPrice += Number(extra.price);
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div
            onClick={ev => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md">
            <div
              className="overflow-y-scroll p-2 flex flex-col"
              style={{maxHeight:'calc(100vh - 100px)'}}>
              <Image
                src={image}
                alt={name}
                width={300} height={200}
                className="mx-auto" />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              <div className="flex-grow">
              {actualSizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {actualSizes.map(size => (
                    <label
                      key={size.id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"/>
                      {size.name} ( Total Price: ${Number(basePrice) + Number(size.price)} )
                    </label>
                  ))}
                </div>
              )}
              {actualSides?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {actualSides.map(extraThing => (
                    <label
                      key={extraThing.id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        type="checkbox"
                        onChange={ev => handleExtraThingClick(ev, extraThing)}
                        checked={selectedSides.map(e => e.id).includes(extraThing.id)}
                        name={extraThing.name} />
                      {extraThing.name} ( Price: +${Number(extraThing.price)} )
                    </label>
                  ))}
                </div>
              )}
              </div>
              <div className="sticky bottom-0 bg-white py-2 mt-2">
              <FlyingButton
                targetTop={'5%'}
                targetLeft={'95%'}
                src={image}>
                <div className="primary w-full text-center p-2"
                     onClick={handleAddToCartButtonClick}>
                  Add to cart ${selectedPrice}
                </div>
              </FlyingButton>
              <button
                className="mt-2"
                onClick={() => setShowPopup(false)}>
                Cancel
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile
        onAddToCart={handleAddToCartButtonClick}
        {...menuItem} />
    </>
  );
}