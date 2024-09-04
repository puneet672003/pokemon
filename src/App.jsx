import { Card } from "./components";
import { useEffect, useState, useRef, useCallback } from "react";

import { getPokemons } from "../lib/api";
import { Search, NotFound, Details } from "./components";

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currUrl, setCurrUrl] = useState("");
	const [nextUrl, setNextUrl] = useState("");
	const [details, setDetails] = useState({});

	const lastPokemonRef = useRef();

	const handleObserver = useCallback(
		(entries) => {
			const [entry] = entries;
			if (entry.isIntersecting) {
				setCurrUrl(nextUrl);
			}
		},
		[nextUrl]
	);

	const getPokemonList = useCallback(async () => {
		const controller = new AbortController();

		try {
			const pokemonList = await getPokemons(currUrl, controller.signal);
			setPokemons((prevList) => [...prevList, ...pokemonList.results]);
			setNextUrl(pokemonList.next);
		} catch {
			console.log("Cannot fetch Pokémon list.");
		} finally {
			setLoading(false);
		}
	}, [currUrl]);

	useEffect(() => {
		getPokemonList();
	}, [getPokemonList]);

	useEffect(() => {
		const currentRef = lastPokemonRef.current;
		const observer = new IntersectionObserver(handleObserver, {
			root: null,
			rootMargin: "0px",
			threshold: 0.1,
		});

		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [handleObserver]);

	return (
		<div className="min-h-screen lg:px-[80px] bg-primary-200 flex flex-col justify-start items-center">
			<div className="sticky top-0 w-full  flex flex-col">
				<Search setDetails={setDetails} />
				<div className="h-10 w-full bg-search-gradient"></div>
			</div>

			{Object.keys(details).length === 0 ? (
				<div
					style={{
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					}}
					className="container max-w-[1200px] justify-center flex flex-row flex-wrap gap-y-8 gap-x-12"
				>
					{!loading &&
						pokemons.map((pokeMonData, index) => {
							const isLast = index === pokemons.length - 1;
							if (isLast)
								return (
									<Card
										key={index}
										name={pokeMonData.name}
										url={pokeMonData.url}
										ref={lastPokemonRef}
									/>
								);
							else
								return (
									<Card
										key={index}
										name={pokeMonData.name}
										url={pokeMonData.url}
									/>
								);
						})}
				</div>
			) : details.found ? (
				<Details name={details.name} data={details.data} />
			) : (
				<NotFound name={details.name} />
			)}
		</div>
	);
}

export default App;
