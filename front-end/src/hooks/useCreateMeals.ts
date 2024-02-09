import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CreateMeal = {
	name: string;
	description: string;
	ingredients: string;
	image: string;
	price: number;
	rating: number;
};

const useCreateMeals = () => {
	const queryClient = useQueryClient();
	const fetchCreateMeal = async (meal: CreateMeal) => {
		const response = await fetch("/meals/create", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "PUT",
			body: JSON.stringify(meal),
		});
		return response.json();
	};

	const mutationKey = ["createMeal"];
	return useMutation({
		mutationKey,
		mutationFn: fetchCreateMeal,
		onSuccess: (data, variables) => {
			queryClient.setQueryData(["meals"], (oldData: any) => {
				return [...oldData, { id: data.createdId, ...variables }];
			});
		},
	});
};

export default useCreateMeals;
