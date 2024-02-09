import {
	faDollarSign,
	faPencil,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";
import { MealType } from "../hooks/useGetMeals";
import ImageWithFallback from "./ImageWithFallback";

type MealCardProps = {
	meal: MealType;
	onClick: MouseEventHandler;
};

const MealCard = (props: MealCardProps) => {
	const { meal, onClick } = props;
	return (
		<div
			className="shadow p-4 rounded-xl hover:opacity-80 cursor-pointer group relative"
			onClick={onClick}
		>
			<div className="group-hover:opacity-100 opacity-0 absolute top-1 right-1 transition-opacity">
				<FontAwesomeIcon
					icon={faPencil}
					className="text-gray-800 bg-white p-1 rounded-lg"
				/>
			</div>
			<div>
				<ImageWithFallback
					src={meal.image}
					className="rounded-lg w-full h-32 object-cover"
					alt="important things about meal image for SEO"
				/>
			</div>
			<div title={meal.name} className="text-lg font-bold truncate">
				{meal.name}
			</div>
			<div className="text-xs font-bold text-slate-400 flex gap-0.5">
				<div className="flex items-center justify-center ">
					<FontAwesomeIcon icon={faStar} className="pb-0.5" />
					<div>{meal.rating}</div>
				</div>
				<div>•</div>
				<div className="flex items-center gap-0.5">
					<FontAwesomeIcon icon={faDollarSign} className="" />
					{meal.price}
				</div>
			</div>
			<div
				title={meal.ingredients}
				className="text-sm text-slate-400 line-clamp-2"
			>
				{meal.ingredients}
			</div>
			<div title={meal.description} className="text-sm line-clamp-3">
				{meal.description}
			</div>
		</div>
	);
};

export default MealCard;
