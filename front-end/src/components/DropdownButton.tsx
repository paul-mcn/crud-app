import React, { MouseEventHandler } from "react";
import Button from "./Button";

type DropdownButtonProps = {
	label?: string;
	icon?: React.ReactElement;
	className?: string;
	menuItemsClassName?: string;
	menuItemClassName?: string;
	menuItems: Array<{ label: string; onClick: MouseEventHandler }>;
};

const DropdownButton = (props: DropdownButtonProps) => {
	return (
		<div className={`group relative ${props.className}`}>
			<Button
				label={props.label}
				icon={props.icon}
				className="mx-auto h-full"
			/>
			<div
				className={`group-hover:opacity-100 opacity-0 group-hover:flex group-hover:flex-col hidden transition-opacity absolute right-0 ${props.menuItemsClassName}`}
			>
				{props.menuItems.map((menuItem, idx) => (
					<Button
						key={idx}
						label={menuItem.label}
						onClick={menuItem.onClick}
						className={props.menuItemClassName}
					/>
				))}
			</div>
		</div>
	);
};

export default DropdownButton;
