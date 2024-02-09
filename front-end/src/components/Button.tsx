import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	label?: string;
	icon?: any;
};

const Button = (props: ButtonProps) => {
	const { className, label, icon, ...rest } = props;
	return (
		<button
			className={`flex flex-row gap-1 items-center hover:opacity-80 px-2 py-1 rounded-lg font-bold ${className}`}
			{...rest}
		>
			{icon && <div>{icon}</div>}
			{label && <div>{label}</div>}
		</button>
	);
};

export default Button;
