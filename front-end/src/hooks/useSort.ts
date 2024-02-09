import { useState, useMemo, useEffect } from "react";

const useSort = (initialData: any, sortKey: string, reverse = false) => {
	const [data, setData] = useState(initialData);

	useEffect(() => {
		setData(initialData);
	}, [initialData]);

	const sortedData = useMemo(() => {
		if (!data) {
			return [];
		}

		if (sortKey?.length == 0) {
			return data;
		}

		const sorted = [...data].sort((a, b) => {
			const valueA = a[sortKey];
			const valueB = b[sortKey];

			if (valueA < valueB) {
				return reverse ? 1 : -1;
			}
			if (valueA > valueB) {
				return reverse ? -1 : 1;
			}
			return 0;
		});

		return sorted;
	}, [data, sortKey, reverse]);

	return [sortedData, setData];
};

export default useSort;
