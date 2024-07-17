import { useState } from 'react';
import PropTypes from 'prop-types';

const SidebarItem = ({ open, icon, label }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<li
			className={`${open && 'hover:text-indigo-950 hover:bg-gray-300 text-white cursor-pointer'} text-sm flex items-center gap-x-4 rounded-md mt-2 ml-1 `}>
			<span className='text-2xl p-2 hover:bg-gray-300 hover:text-indigo-950 cursor-pointer rounded-full'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{icon}
			</span>
			<span className={`${!open && 'hidden'} text-base font-medium flex-1`}>{label}</span>
			{!open && isHovered && (
				<span className="bg-gray-600 p-1 text-white rounded-md font-medium flex-1">{label}</span>
			)}
		</li>
	);
};

SidebarItem.propTypes = {
	open: PropTypes.bool.isRequired,
	icon: PropTypes.element.isRequired,
	label: PropTypes.string.isRequired,
};

export default SidebarItem;