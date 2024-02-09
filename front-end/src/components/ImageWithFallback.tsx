import React from "react";
import fallbackImage from "../assets/default-fallback-image.jpg";

const ImageWithFallback = ({
	src,
	className,
	...rest
}: React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>) => {
	return (
		<img
			src={src}
			className={className}
			onError={({ currentTarget }) => {
				currentTarget.src = fallbackImage;
			}}
			{...rest}
		/>
	);
};

export default ImageWithFallback;
