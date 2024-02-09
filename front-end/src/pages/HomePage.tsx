import { faPlus, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useMemo, useState } from "react";
import Button from "../components/Button";
import DropdownButton from "../components/DropdownButton";
import EditMealForm from "../components/EditMealForm";
import MealCard from "../components/MealCard";
import Modal from "../components/Modal";
import useGetMeals, { MealType } from "../hooks/useGetMeals";
import useSort from "../hooks/useSort";

const HomePage = () => {
	const { data: meals, error } = useGetMeals();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMealId, setSelectedMealId] = useState("");
	const [shouldToggleCreateMeal, setShouldToggleCreateMeal] = useState(false);
	const [sortBy, setSortBy] = useState("");
	const [sortReverse, setSortReverse] = useState(false);
	const [sortedData] = useSort(meals, sortBy, sortReverse);

	const filteredMeals = useMemo((): MealType[] => {
		if (error || sortedData?.length === 0) return [];
		if (searchQuery.length === 0) return sortedData;
		return sortedData.filter((meal: MealType) => {
			const regex = new RegExp(searchQuery, "ig");
			return meal.name.match(regex);
		});
	}, [searchQuery, sortedData, error]);

	const handleSearchQuery = (evt: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(evt.target.value);
	};

	const handleToggleCreateMeal = () => {
		setShouldToggleCreateMeal((prev) => !prev);
	};

	// could be wrapped in useMemo, however, its not computationally expensive enough to do so
	const selectedMeal = filteredMeals?.find(
		(meal) => meal.id === selectedMealId,
	);

	return (
		<div className="flex flex-col gap-10 px-10 py-8 w-4/5 mx-auto relative">
			<h1 className="font-bold text-xl">Welcome!</h1>
			<div className="flex flex-row gap-1 px-1 sticky top-0 bg-white py-4 border-b z-10">
				<input
					type="text"
					className="border rounded-lg pl-2 w-full max-w-lg"
					placeholder="Search..."
					onChange={handleSearchQuery}
					value={searchQuery}
				/>
				<div className="flex ml-auto gap-1">
					<Button
						label="Create"
						icon={<FontAwesomeIcon icon={faPlus} />}
						className="text-green-800 bg-green-200"
						onClick={handleToggleCreateMeal}
					/>
					<DropdownButton
						icon={<FontAwesomeIcon icon={faSort} />}
						className="text-gray-800 bg-gray-100 rounded-md text-sm left-0"
						menuItemsClassName="bg-gray-100 rounded-md gap-1 p-1"
						menuItemClassName="w-40 pl-4 hover:bg-green-200 hover:text-green-800 focus:bg-green-300 "
						menuItems={[
							{
								label: "Price - Low to High",
								onClick: () => {
									setSortBy("price");
									setSortReverse(false);
								},
							},
							{
								label: "Price - High to Low",
								onClick: () => {
									setSortBy("price");
									setSortReverse(true);
								},
							},
							{
								label: "Rating - Low to High",
								onClick: () => {
									setSortBy("rating");
									setSortReverse(false);
								},
							},
							{
								label: "Rating - High to Low",
								onClick: () => {
									setSortBy("rating");
									setSortReverse(true);
								},
							},
						]}
					/>
				</div>
			</div>
			{error && <div>Error: Could not fetch elements</div>}
			{shouldToggleCreateMeal && (
				<Modal
					onClickOutside={handleToggleCreateMeal}
					onClickExit={handleToggleCreateMeal}
				>
					<EditMealForm onSubmit={handleToggleCreateMeal} />
				</Modal>
			)}
			{selectedMeal && (
				<Modal
					onClickOutside={() => setSelectedMealId("")}
					onClickExit={() => setSelectedMealId("")}
				>
					<EditMealForm
						meal={selectedMeal}
						onSubmit={() => setSelectedMealId("")}
					/>
				</Modal>
			)}

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-auto gap-10 p-1">
				{filteredMeals?.length > 0 ? (
					filteredMeals.map((meal) => (
						<MealCard
							key={meal.id}
							meal={meal}
							onClick={() => setSelectedMealId(meal.id)}
						/>
					))
				) : (
					<div className="col-span-4 text-center">
						No meals exist. Please create a new meal
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
