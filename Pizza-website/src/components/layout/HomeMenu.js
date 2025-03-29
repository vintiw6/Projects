"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

async function fetchCategory(menuItem) {
	try {
		const response = await fetch(`/api/categories?id=${menuItem.categoryId}`);
		const category = await response.json();
		return category.name;
	} catch (error) {
		console.error("Error fetching category:", error.message);
		return null;
	}
}

export default function HomeMenu() {
	const [bestSellers, setBestSellers] = useState([]);

	useEffect(() => {
		async function fetchBestSellers() {
			try {
				const res = await fetch("/api/menu-items");
				const menuItems = await res.json();

				const favouriteItems = [];

				for (const item of menuItems) {
					const categoryName = await fetchCategory(item);
					if (categoryName === "All Time Favourite") {
						favouriteItems.push(item);
					}
					if (favouriteItems.length === 3) break;
				}

				setBestSellers(favouriteItems);
			} catch (error) {
				console.error("Error fetching menu items:", error.message);
			}
		}
		fetchBestSellers();
	}, []);

	return (
		<section className="max-w-screen-lg mx-auto px-6 py-12">
			<div className="text-center mb-10">
				<SectionHeaders
					subHeader="WHAT WE SERVE"
					mainHeader="Try Our Best Sellers"
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{bestSellers?.length > 0 &&
					bestSellers.map((item) => (
						<div
							key={item.id}
							className="bg-white shadow-lg rounded-2xl p-6 transition-transform hover:scale-105"
						>
							<MenuItem {...item} />
						</div>
					))}
			</div>
		</section>
	);
}
