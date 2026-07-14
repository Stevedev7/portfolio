const API_URL = process.env.API_URL ?? "http://localhost:3001";

export const fetchFromApi = async <T>(path: string): Promise<T> => {
	const response = await fetch(`${API_URL}${path}`, {
		next: { revalidate: 60 },
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch ${path}: ${response.status}`);
	}

	const json = await response.json();
	return json.data as T;
};
