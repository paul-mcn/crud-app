import { ChangeEvent, SyntheticEvent, useReducer } from "react";
import { MealType } from "../hooks/useGetMeals";
import useCreateMeals, { CreateMeal } from "../hooks/useCreateMeals";
import useUpdateMeals from "../hooks/useUpdateMeals";
import useDeleteMeals from "../hooks/useDeleteMeals";
import Button from "./Button";

type EditMealFormProps = {
	meal?: MealType;
	onSubmit?: Function;
};

type ReducerState = Partial<MealType>;

type ReducerAction = {
	type: string;
	payload: { field: string; value: string | number };
};

const reducer = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case "CHANGE_INPUT":
			return { ...state, [action.payload.field]: action.payload.value };
		default:
			return state;
	}
};

const initialProps = {
	id: "",
	name: "",
	description: "",
	ingredients: "",
	image: "",
	price: 0,
	rating: 0,
};

const EditMealForm = (props: EditMealFormProps) => {
	const [state, dispatch] = useReducer(reducer, props.meal || initialProps);
	const createMealMutation = useCreateMeals();
	const updateMealMutation = useUpdateMeals();
	const deleteMealMutation = useDeleteMeals();
	const handleUpdateField = (
		evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		dispatch({
			type: "CHANGE_INPUT",
			payload: { field: evt.target.name, value: evt.target.value },
		});
	};

	const handleCreateMeal = async (evt: SyntheticEvent) => {
		evt.preventDefault();
		const meal = {
			name: state.name,
			ingredients: state.ingredients,
			description: state.description,
			image: state.image,
			price: state.price,
			rating: state.rating,
		};
		await createMealMutation.mutateAsync(meal as CreateMeal);
		props.onSubmit && props.onSubmit();
	};

	const handleUpdateMeal = async (evt: SyntheticEvent) => {
		evt.preventDefault();
		const meal = {
			id: state.id,
			name: state.name,
			ingredients: state.ingredients,
			description: state.description,
			image: state.image,
			price: state.price,
			rating: state.rating,
		};
		await updateMealMutation.mutateAsync(meal as MealType);
		props.onSubmit && props.onSubmit();
	};

	const handleDeleteMeal = async () => {
		await deleteMealMutation.mutateAsync(props?.meal?.id as string);
		props.onSubmit && props.onSubmit();
	};

	return (
		<div>
			<div className="border-b pb-2 pt-8 px-7 text-xl font-bold">
				{props.meal ? "Edit Meal" : "Create Meal"}
			</div>
			<form
				className=""
				onSubmit={props.meal ? handleUpdateMeal : handleCreateMeal}
			>
				<div className="flex flex-col w-96 gap-2 max-h-[60vh] overflow-y-auto px-7 py-2">
					<label className="mt-2 w-full">
						<div className=" text-sm font-bold text-gray-600">Name</div>
						<input
							className="pl-2 border rounded-md py-1 w-full"
							name="name"
							placeholder="e.g. Spaghetti"
							onChange={handleUpdateField}
							value={state.name}
							required
						/>
					</label>
					<label className="w-full">
						<div className="text-sm font-bold text-gray-600">Ingredients</div>
						<input
							className="pl-2 border rounded-md py-1 w-full"
							name="ingredients"
							placeholder="e.g. mince beef, carrot, ..."
							onChange={handleUpdateField}
							value={state.ingredients}
							required
						/>
					</label>
					<label className="w-full">
						<div className="text-sm font-bold text-gray-600">Description</div>
						<textarea
							className="pl-2 border rounded-md py-1 w-full"
							name="description"
							placeholder="Describe the meal..."
							onChange={handleUpdateField}
							value={state.description}
							required
						/>
					</label>
					<div>
						<div className="text-sm font-bold text-gray-600">Image</div>
						<input
							className="pl-2 border rounded-md py-1 w-full"
							name="image"
							placeholder="e.g. https://website.com/my-cool-image.jpg"
							onChange={handleUpdateField}
							value={state.image}
							required
						/>
					</div>
					<div className="flex gap-4 w-full">
						<label className="w-full">
							<div className="text-sm font-bold text-gray-600">Rating</div>
							<input
								className="pl-2 border rounded-md py-1 w-full"
								name="rating"
								min="0"
								max="5"
								step={0.1}
								type="number"
								onChange={handleUpdateField}
								value={state.rating}
								required
							/>
						</label>
						<label className="w-full">
							<div className="text-sm font-bold text-gray-600">Price</div>
							<input
								className="pl-2 border rounded-md py-1 w-full"
								name="price"
								type="number"
								placeholder="Price"
								onChange={handleUpdateField}
								value={state.price}
								min="0"
								step={0.01}
								required
							/>
						</label>
					</div>
				</div>
				<div className="flex items-center mt-2 border-t pt-4 px-7 pb-5">
					{props.meal && (
						<Button
							label="Delete"
							className="bg-red-200 text-red-800"
							type="button"
							onClick={handleDeleteMeal}
						/>
					)}
					<Button
						label={props.meal ? "Save" : "Create meal"}
						className="bg-green-200 text-green-800 ml-auto"
						type="submit"
					/>
				</div>
			</form>
		</div>
	);
};

export default EditMealForm;
