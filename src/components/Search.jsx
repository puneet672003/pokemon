import { useState } from "react";
import PropTypes from "prop-types";

import { searchPokemon } from "../../lib/api";
import { Loader } from "./";

const Search = ({ setDetails }) => {
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);

	const handleQueryChange = (e) => {
		// eslint-disable-next-line no-unused-vars
		setQuery((prevValue) => {
			const value = e.target.value;
			if (value === "") setDetails({});

			return value;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (query === "") {
			setDetails({});
			return;
		}

		const controller = new AbortController();
		setLoading(true);

		try {
			const data = await searchPokemon(query, controller.signal);
			setDetails({ found: true, name: query, data });
		} catch {
			console.log("No pokemon found with name: ", query);
			setDetails({ found: false, name: query, data: {} });
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full py-6 flex justify-center items-center bg-primary-200"
		>
			<input
				type="text"
				id="query"
				onChange={handleQueryChange}
				placeholder="Search"
				className="top-0 w-1/2  py-4 px-6 text-2xl text-white focus:outline-none rounded-xl border-b-2 border-primary-100 focus:border-secondary-600 bg-primary-100 focus:border-b-2"
			/>
			{loading ? (
				<Loader />
			) : (
				<button type="submit">
					<img src="/assets/search.png" alt="" className="h-8 mx-4" />
				</button>
			)}
		</form>
	);
};

Search.propTypes = {
	setDetails: PropTypes.func.isRequired,
};

export default Search;
