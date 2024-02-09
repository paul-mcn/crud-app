import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
	return (
		<div className="h-[10vh] bg-green-400 flex flex-row justify-center items-center">
			<div className="text-green-800 font-extrabold flex gap-1 items-center">
				<FontAwesomeIcon icon={faBurger} />
				<div>Meal CRUD App</div>
			</div>
		</div>
	);
}

export default Header;
