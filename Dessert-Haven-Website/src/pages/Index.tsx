import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { getMenuItems } from "@/lib/db";
import MenuItemCard from "@/components/menu/MenuItemCard";

const Index = () => {
	const menuItems = getMenuItems();
	const featuredItems = menuItems.filter((item) => item.featured);

	return (
		<Layout>
			{/* Hero Section */}
			<section className="relative">
				<div className="absolute inset-0 bg-gradient-to-r from-cafe-chai/90 to-cafe-chai/60 z-10" />
				<div
					className="relative h-[75vh] bg-cover bg-center"
					style={{
						backgroundImage:
							"url(https://www.istockphoto.com/photo/gajar-ka-halwa-gm1208754471-349503280?searchscope=image%2Cfilm)",
					}}
				>
					<div className="cafe-container relative h-full flex items-center z-20">
						<div className="max-w-xl text-white animate-fade-in">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
								Experience Authentic Indian Sweets & Snacks
							</h1>
							<p className="text-lg md:text-xl mb-8">
								Handcrafted with traditional recipes and the finest ingredients.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									asChild
									size="lg"
									className="bg-cafe-spice hover:bg-cafe-spice/90"
								>
									<Link to="/menu">Explore Menu</Link>
								</Button>
								<Button
									asChild
									variant="outline"
									size="lg"
									className="border-white text-cafe-chai  hover:bg-cafe-spice/90"
								>
									<Link to="/contact">Contact Us</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Items Section */}
			<section className="py-16 bg-cafe-cream">
				<div className="cafe-container">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-cafe-chai mb-4">
							Our Featured Delights
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Discover our most beloved treats that have been delighting
							customers for generations.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{featuredItems.map((item) => (
							<MenuItemCard key={item.id} item={item} />
						))}
					</div>

					<div className="text-center mt-12">
						<Button
							asChild
							size="lg"
							className="bg-cafe-chai hover:bg-cafe-chai/90"
						>
							<Link to="/menu">View Full Menu</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* About Section (Teaser) */}
			<section className="py-16 bg-white">
				<div className="cafe-container">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold text-cafe-chai mb-4">
								Our Story
							</h2>
							<p className="text-lg text-gray-600 mb-6">
								Founded with a passion for authentic Indian cuisine, Dessert
								Haven brings the rich traditions and flavors of India to your
								neighborhood.
							</p>
							<p className="text-lg text-gray-600 mb-6">
								Every dish we serve carries with it decades of culinary
								heritage, carefully prepared to delight your taste buds and
								transport you to the vibrant streets of India.
							</p>
							<Button
								asChild
								variant="outline"
								className="border-cafe-spice text-cafe-spice hover:bg-cafe-spice hover:text-white"
							>
								<Link to="/about">Learn More About Us</Link>
							</Button>
						</div>
						<div className="rounded-lg overflow-hidden shadow-xl">
							<img
								src="https://images.unsplash.com/photo-1638725127387-9974c76769a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWElMjBjYWZlfGVufDB8fDB8fHww"
								alt="Our cafe interior"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-16 bg-cafe-chai text-white">
				<div className="cafe-container text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Ready to Order?
					</h2>
					<p className="text-lg mb-8 max-w-2xl mx-auto">
						Order online for pickup or delivery and enjoy our authentic Indian
						desserts and snacks from the comfort of your home.
					</p>
					<Button
						asChild
						size="lg"
						className="bg-cafe-spice hover:bg-cafe-spice/90"
					>
						<Link to="/menu">Order Now</Link>
					</Button>
				</div>
			</section>
		</Layout>
	);
};

export default Index;
