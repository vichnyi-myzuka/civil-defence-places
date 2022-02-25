import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useRef, useState } from "react";
import Places from "../../places";
import L from "leaflet";
import SimplePlaces from "../../simple_places";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import CustomMarker from "../CustomIcon";

export default function Map() {
	const [map, setMap] = useState();
	let i = 0;
	let options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	const [latitude, setLatitude] = useState(48.5132);
	const [longitude, setLongitude] = useState(32.2597);

	let DefaultIcon = L.icon({
		iconUrl: icon,
		shadowUrl: iconShadow,
	});

	L.Marker.prototype.options.icon = DefaultIcon;
	const [coords, setCoords] = useState([latitude, longitude]);
	function success(pos) {
		let { latitude, longitude, accuracy } = pos.coords;

		setLatitude(latitude);
		setLongitude(longitude);
		setCoords(latitude, longitude);
	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	useState(() => {
		navigator.geolocation.getCurrentPosition(success, error, options);
	}, []);

	function getPlaceComponent(place) {
		return (
			<CustomMarker map={map} key={i++} position={place.coords}>
				<h2>{place.title}</h2>
				<p>{place.address}</p>
			</CustomMarker>
		);
	}

	return (
		<MapContainer
			whenCreated={setMap}
			doubleClickZoom
			center={coords}
			tap={false}
			zoom={14}
			style={{ height: "100vh" }}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			{Places.map((place) => getPlaceComponent(place))}
			{SimplePlaces.map((place) => getPlaceComponent(place))}
		</MapContainer>
	);
}
