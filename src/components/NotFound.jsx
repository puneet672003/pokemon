import PropTypes from "prop-types";

const NotFound = ({ name }) => {
	return (
		<div className="w-[70%] h-[300px] py-2 px-4 flex flex-col gap-2 justify-center items-center bg-primary-100 rounded-3xl border-2 border-red-900 text-red-400">
			<span className="text-3xl text-red-600">NOT FOUND!</span>
			<span className="text-lg ">
				Cannot find any pokemon with name: {"  "}
				<span className="text-white">{name}</span>
			</span>
		</div>
	);
};

NotFound.propTypes = {
	name: PropTypes.string.isRequired,
};

export default NotFound;
