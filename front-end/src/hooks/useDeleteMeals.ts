import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MealType } from "./useGetMeals";

const useDeleteMeals = () => {
	const queryClient = useQueryClient();
	const fetchDeleteMeal = async (mealId: string) => {
		await fetch("/meals/delete/" + mealId, { method: "DELETE" });
	};

	return useMutation({
		mutationKey: ["deleteMeal"],
		mutationFn: fetchDeleteMeal,
		onSuccess: (data, variables) => {
			queryClient.setQueryData(["meals"], (oldMeals: MealType[]) => {
				return oldMeals.filter((meal) => meal.id !== variables);
			});
		},
	});
};

export default useDeleteMeals;
