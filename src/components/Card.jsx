import { useState, useEffect, useCallback, forwardRef } from "react";
import PropTypes from "prop-types";

import { getArtwork } from "../../lib/api";

const Card = forwardRef(function Card({ url, name }, ref) {
	const [imageUrl, setImageUrl] = useState("");

	const getImageUrl = useCallback(async () => {
		const controller = new AbortController();

		try {
			const artwork = await getArtwork(url, controller.signal);
			setImageUrl(artwork);
		} catch {
			console.log("cannot fetch pokemon artwork.");
		}
	}, [url]);

	useEffect(() => {
		getImageUrl();
	}, [getImageUrl]);

	return (
		<div
			ref={ref}
			className="w-[320px] h-[300px] flex flex-col py-2 px-4 justify-center items-center bg-primary-100 rounded-3xl border-2 border-secondary-300 hover:shadow-glow hover:border-4 hover:cursor-pointer"
		>
			<div className="w-full max-h-[70%] flex items-center justify-center">
				<img
					src={imageUrl}
					alt={`${name}-artwork`}
					className="object-contain w-full h-full"
				/>
			</div>
			<span className="grow flex items-center text-secondary-50 text-xl py-2">
				{name}
			</span>
		</div>
	);
});

Card.propTypes = {
	url: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default Card;
