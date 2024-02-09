import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MealType } from "./useGetMeals";

const useUpdateMeal = () => {
	const queryClient = useQueryClient();
	const fetchUpdateMeal = async (meal: MealType) => {
		await fetch("/meals/update", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "PUT",
			body: JSON.stringify(meal),
		});
	};

	return useMutation({
		mutationKey: ["createMeal"],
		mutationFn: fetchUpdateMeal,
		onSuccess: (data, variables) => {
			queryClient.setQueryData(["meals"], (oldMeals: MealType[]) => {
				return oldMeals.map((meal) => {
					return meal.id === variables.id ? variables : meal;
				});
			});
		},
	});
};

export default useUpdateMeal;
