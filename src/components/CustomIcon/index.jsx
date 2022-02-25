import { Marker, Popup } from "react-leaflet";
import { useState, useRef, useEffect } from "react";

const CustomMarker = ({ isActive, position, map, children }) => {
	const [refReady, setRefReady] = useState(false);
	let popupRef = useRef();

	useEffect(() => {
		console.log(1);
		if (refReady && isActive) {
			popupRef.openOn(map);
		}
	}, [isActive, refReady, map]);

	return (
		<Marker position={position}>
			<Popup
				ref={(r) => {
					popupRef = r;
					setRefReady(true);
				}}
			>
				{children}
			</Popup>
		</Marker>
	);
};

export default CustomMarker;
