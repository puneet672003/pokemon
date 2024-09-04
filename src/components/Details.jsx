import PropTypes from "prop-types";

const Details = ({ name, data }) => {
	return (
		<div className="w-[320px] h-[300px] flex flex-col py-2 px-4 justify-center items-center bg-primary-100 rounded-3xl border-2 border-secondary-300 hover:shadow-glow hover:border-4 hover:cursor-pointer">
			<div className="w-full max-h-[70%] flex items-center justify-center">
				<img
					src={data.sprites.other["official-artwork"].front_default}
					alt={`${name}-artwork`}
					className="object-contain w-full h-full"
				/>
			</div>
			<span className="grow flex items-center text-secondary-50 text-xl py-2">
				{name}
			</span>
		</div>
	);
};

Details.propTypes = {
	name: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
};

export default Details;
