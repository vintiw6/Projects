"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/form/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useProfile } from "@/components/UseProfile";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
	const { cartProducts, removeCartProduct } = useContext(CartContext);
	const [address, setAddress] = useState({});
	const { data: profileData } = useProfile();

	useEffect(() => {
		if (
			typeof window !== "undefined" &&
			window.location.href.includes("canceled=1")
		) {
			toast.error("Payment failed 😔");
		}
	}, []);

	useEffect(() => {
		if (profileData?.city) {
			const { phone, streetAddress, city, postalCode, country } = profileData;
			setAddress({ phone, streetAddress, city, postalCode, country });
		}
	}, [profileData]);

	let subtotal = cartProducts.reduce(
		(total, p) => total + Number(cartProductPrice(p)),
		0
	);

	function handleAddressChange(propName, value) {
		setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
	}

	async function proceedToCheckout(ev) {
		ev.preventDefault();
		const response = await fetch("/api/checkout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ address, cartProducts }),
		});
		await toast.promise(response, {
			loading: "Preparing your order...",
			success: "Redirecting to payment...",
			error: "Something went wrong... Please try again later",
		});
	}

	if (cartProducts.length === 0) {
		return (
			<section className="mt-8 text-center">
				<SectionHeaders mainHeader="Your Cart" />
				<p className="mt-4 text-lg text-gray-600">
					Your shopping cart is empty 😔
				</p>
			</section>
		);
	}

	return (
		<section className="max-w-screen-lg mx-auto px-6 py-12">
			<div className="text-center mb-8">
				<SectionHeaders mainHeader="Your Cart" />
			</div>
			<div className="grid gap-10 md:grid-cols-2">
				{/* Cart Items */}
				<div className="bg-white shadow-lg rounded-2xl p-6">
					{cartProducts.map((product, index) => (
						<CartProduct
							key={index}
							product={product}
							onRemove={() => removeCartProduct(index)}
						/>
					))}
					<div className="border-t pt-4 mt-4 flex justify-between text-lg font-semibold">
						<span>Subtotal:</span>
						<span>${subtotal.toFixed(2)}</span>
					</div>
					<div className="flex justify-between text-gray-600">
						<span>Delivery Fee:</span>
						<span>$5.00</span>
					</div>
					<div className="border-t pt-4 mt-2 flex justify-between text-xl font-bold">
						<span>Total:</span>
						<span>${(subtotal + 5).toFixed(2)}</span>
					</div>
				</div>

				{/* Checkout Form */}
				<div className="bg-gray-100 p-6 rounded-2xl shadow-md">
					<h2 className="text-2xl font-bold mb-4">Checkout</h2>
					<form onSubmit={proceedToCheckout} className="space-y-4">
						<AddressInputs
							addressProps={address}
							setAddressProp={handleAddressChange}
						/>
						<button
							type="submit"
							className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all"
						>
							Pay ${(subtotal + 5).toFixed(2)}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
