// "use client";
// import { useState } from "react";
// import { Menu, X, Search, ShoppingCart } from "lucide-react";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="w-full border-b bg-white">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

//         {/* Logo */}
//         <h1 className="text-2xl font-bold">SwiftMart</h1>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex gap-8 text-sm font-medium">
//           <li>Shop</li>
//           <li>On Sale</li>
//           <li>New Arrivals</li>
//           <li>Brands</li>
//         </ul>

//         {/* Search + Cart */}
//         <div className="hidden md:flex items-center gap-4">
//           <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
//             <Search size={16} />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="bg-transparent outline-none ml-2 text-sm"
//             />
//           </div>
//           <ShoppingCart size={20} />
//         </div>

//         {/* Mobile Menu Icon */}
//         <button
//           className="md:hidden"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <X /> : <Menu />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium">
//           <p>Shop</p>
//           <p>On Sale</p>
//           <p>New Arrivals</p>
//           <p>Brands</p>
//         </div>
//       )}
//     </nav>
//   );
// }


"use client";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-2xl font-bold tracking-tight">
            SwiftMart
          </h1>

          <ul className="hidden md:flex gap-6 text-sm font-medium">
            <li className="cursor-pointer">Shop</li>
            <li className="cursor-pointer">On Sale</li>
            <li className="cursor-pointer">New Arrivals</li>
            <li className="cursor-pointer">Brands</li>
          </ul>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Search Desktop */}
          <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full w-[400px]">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent outline-none ml-2 text-sm w-full"
            />
          </div>

          {/* Icons */}
          <Search className="md:hidden" size={20} />
          <ShoppingCart size={20} />
          <User size={20} />
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium">
          <p>Shop</p>
          <p>On Sale</p>
          <p>New Arrivals</p>
          <p>Brands</p>
        </div>
      )}
    </nav>
  );
}
