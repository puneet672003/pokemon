import axios from "axios";
const api = axios.create({
	baseURL: "https://pokeapi.co/api/v2/",
});

export const getPokemons = async (endpointUrl, abortSignal) => {
	try {
		let response;
		if (endpointUrl.length) {
			response = await api.get(endpointUrl, { signal: abortSignal });
		} else {
			response = await api.get("/pokemon");
		}

		return response.data;
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log("Request canceled");
		} else {
			console.error("Failed to fetch Pokemon list: ", error);
		}
		throw new Error("Cannot fetch Pokémon list. Please try again later.");
	}
};

export const getArtwork = async (pokemonUrl, abortSignal) => {
	try {
		const response = await api.get(pokemonUrl, { signal: abortSignal });
		return response.data.sprites.other["official-artwork"].front_default;
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log("Request canceled");
		} else {
			console.error("Failed to fetch Pokemon artwork: ", error);
		}
		throw new Error("Cannot fetch Pokémon artwork. Please try again later.");
	}
};

export const searchPokemon = async (name, abortSignal) => {
	try {
		const response = await api.get(`pokemon/${name.toLowerCase()}`, {
			abortSignal,
		});
		return response.data;
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log("Request cancelled");
		} else {
			console.error("Failed to fetch Pokemon: ", error);
		}
		throw new Error("Cannot fetch Pokémon. Please try again later.");
	}
};
