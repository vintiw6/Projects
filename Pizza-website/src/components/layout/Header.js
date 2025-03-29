"use client";

import { CartContext } from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import ProfileIcon from "../icons/ProfileIcon";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Luckiest_Guy } from "next/font/google";
const luckiestguy = Luckiest_Guy({ subsets: ["latin"], weight: "400" });

function AuthLinks({ status, clearCart }) {
	const router = useRouter();

	if (status === "loading") return <span>Loading...</span>;

	if (status === "authenticated")
		return (
			<button
				onClick={() => {
					clearCart();
					signOut();
					router.push("/");
				}}
				className="logout-btn"
			>
				LOGOUT
			</button>
		);

	return (
		<Link href={"/login"} className="login-btn">
			LOGIN
		</Link>
	);
}

export default function Header() {
	const session = useSession();
	const status = session?.status;
	const { cartProducts, clearCart } = useContext(CartContext);
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="header">
			<div className="container">
				{/* Logo */}
				<Link href={"/"} className={`${luckiestguy.className} logo`}>
					Dough & Co.
				</Link>

				{/* Navigation */}
				<nav className={`nav ${menuOpen ? "open" : ""}`}>
					<Link href={"/"}>HOME</Link>
					<Link href={"/menu"}>MENU</Link>
					<Link href={"/#contact"}>CONTACT</Link>
					<AuthLinks status={status} clearCart={clearCart} />
					<Link href={"/cart"} className="cart-link">
						<ShoppingCart />
						{cartProducts?.length > 0 && (
							<span className="cart-count">{cartProducts.length}</span>
						)}
					</Link>
					{status === "authenticated" && (
						<Link href={"/profile"} className="profile-icon">
							<ProfileIcon className="w-7 h-7 text-gray-800" />
						</Link>
					)}
				</nav>

				{/* Mobile Menu Button */}
				<button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
					{menuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>
		</header>
	);
}
