import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import { useState } from "react";

export default function MenuItemPriceProps({
	name,
	addLabel,
	props,
	setProps,
}) {
	const [isOpen, setIsOpen] = useState(false);

	function addProp() {
		setProps((oldProps) => [...oldProps, { name: "", price: 0 }]);
	}

	function editProp(ev, index, prop) {
		const inputValue = ev.target.value;
		setProps((prevSizes) => {
			const newSizes = [...prevSizes];
			newSizes[index][prop] = inputValue;
			return newSizes;
		});
	}

	function removeProp(indexToRemove) {
		setProps((prev) => prev.filter((_, index) => index !== indexToRemove));
	}

	return (
		<div className="bg-white shadow-md p-4 rounded-lg mb-4">
			{/* Toggle Button */}
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex items-center justify-between w-full text-gray-900 font-semibold text-lg"
				type="button"
			>
				<div className="flex items-center gap-2">
					{isOpen ? <ChevronUp /> : <ChevronDown />}
					<span>
						{name} ({props?.length})
					</span>
				</div>
			</button>

			{/* Options List */}
			<div className={`${isOpen ? "block" : "hidden"} mt-4`}>
				{props?.length > 0 &&
					props.map((size, index) => (
						<div key={index} className="flex items-center gap-4 mb-3">
							{/* Name Input */}
							<div className="flex-1">
								<label className="text-gray-700 text-sm font-medium">
									Name
								</label>
								<input
									type="text"
									placeholder="Size name"
									value={size.name}
									onChange={(ev) => editProp(ev, index, "name")}
									className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-primary focus:outline-none"
								/>
							</div>

							{/* Extra Price Input */}
							<div className="flex-1">
								<label className="text-gray-700 text-sm font-medium">
									Extra price
								</label>
								<input
									type="text"
									placeholder="Extra price"
									value={size.price}
									onChange={(ev) => editProp(ev, index, "price")}
									className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-primary focus:outline-none"
								/>
							</div>

							{/* Remove Button */}
							<button
								type="button"
								onClick={() => removeProp(index)}
								className="bg-red-500 text-white p-2 rounded-md transition hover:bg-red-700"
							>
								<Trash className="w-4 h-4" />
							</button>
						</div>
					))}

				{/* Add New Option Button */}
				<button
					type="button"
					onClick={addProp}
					className="flex items-center gap-2 bg-primary text-white font-bold px-4 py-2 rounded-md transition hover:bg-orange-800"
				>
					<Plus className="w-4 h-4" />
					<span>{addLabel}</span>
				</button>
			</div>
		</div>
	);
}
