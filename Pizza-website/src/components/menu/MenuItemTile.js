import AddToCartButton from "@/components/menu/AddToCartButton";
import Image from "next/image";

export default function MenuItemTile({onAddToCart, ...item}) {
  
  const { image, description, name, basePrice, sizes, extraIngredientPrices } = item;
  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;
  
  return (
    <div className="
      bg-accent 
      p-4 rounded-lg text-center group 
      hover:bg-light_accent hover:shadow-md hover:shadow-black/25 transition-all"
    >
      {/* Image - Top Centred */}
      <div className="text-center">
        <img src={image} className="w-90 h-90 object-cover block mx-auto" alt={name}/>
      </div>

      {/* Pizza Name - Left-Aligned */}
      <h4 className="font-semibold text-xl my-3 text-center">{name}</h4>

      {/* Description - Left Aligned */}
      <p className="text-gray-500 text-sm line-clamp-3">
        {description}
      </p>

      {/* Price & Add to Cart */}
      <AddToCartButton
        image={image}
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  );
}