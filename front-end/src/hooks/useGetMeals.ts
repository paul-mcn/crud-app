import { useQuery } from "@tanstack/react-query";

export type MealType = {
	id: string;
	name: string;
	description: string;
	ingredients: string;
	image: string;
	price: number;
	rating: number;
};

const useGetMeals = () => {
	const fetchMeals = async (): Promise<MealType[]> => {
		const response = await fetch("/meals");
		return await response.json();
	};

	return useQuery({
		queryKey: ["meals"],
		queryFn: fetchMeals,
	});
};

export default useGetMeals;
