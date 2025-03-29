"use client";

import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
	const [categories, setCategories] = useState([]);
	const [menuItems, setMenuItems] = useState([]);

	useEffect(() => {
		fetch("/api/categories")
			.then((res) => res.json())
			.then((categories) => setCategories(categories));

		fetch("/api/menu-items")
			.then((res) => res.json())
			.then((menuItems) => setMenuItems(menuItems));
	}, []);

	return (
		<section className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-12">
			{categories?.length > 0 &&
				categories.map((c) => (
					<div key={c.id} className="mb-16">
						<div className="text-center">
							<SectionHeaders mainHeader={c.name} />
						</div>

						{/* Menu Items Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
							{menuItems
								.filter((item) => item.categoryId === c.id)
								.map((item) => (
									<div
										key={item.id}
										className="bg-white shadow-lg rounded-2xl p-6 transform transition-transform duration-300 hover:scale-105"
									>
										<MenuItem {...item} />
									</div>
								))}
						</div>
					</div>
				))}
		</section>
	);
}
