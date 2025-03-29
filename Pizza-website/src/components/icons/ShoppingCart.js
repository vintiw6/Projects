
// This is a reusable React component that renders a shopping cart icon using SVG. 
// It accepts a `className` prop to allow styling customization. 

// source: https://heroicons.com/ : shopping-cart 

export default function ShoppingCart({className = "w-6 h-6"}) {
    return (
      // The SVG element represents the shopping cart icon 
      <svg 
        fill="none"           // no fill colour applied inside the shape 
        viewBox="0 0 24 24"   // viewbox: starts at (0,0) top-left to (24,24) bottom-right -> size is 24x24 units  
        strokeWidth={1.5}     // line thickness = 1.5 units 
        stroke="currentColor" // match dark brown text colour  
        className={className} // allows for custom styling 
      >
        {/* Path element defines shape of cart */}
        <path 
          strokeLinecap="round"  // round the line caps 
          strokeLinejoin="round" // round the corner where the lines join 
          // drawing instructions 
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437
          M7.5 14.25a3 3 0 00-3 3h15.75
          m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138
          a60.114 60.114 0 00-16.536-1.84
          M7.5 14.25L5.106 5.272
          M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z
          m12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" 
        />
      </svg>
    );
  }