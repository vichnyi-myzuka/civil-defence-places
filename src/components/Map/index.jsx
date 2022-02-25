import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import Places from "../../places";
import SimplePlaces from "../../simple_places";

export default function Map() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	const [latitude, setLatitude] = useState(48.5132);
	const [longitude, setLongitude] = useState(32.2597);

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
			<Marker position={place.coords} style={{ opacity: 0.5 }}>
				<Popup>
					<h2>{place.title}</h2>
					<p>{place.address}</p>
				</Popup>
			</Marker>
		);
	}

	return (
		<MapContainer center={coords} zoom={14} style={{ height: "100vh" }}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			{Places.map((place) => getPlaceComponent(place))}
			{SimplePlaces.map((place) => getPlaceComponent(place))}
		</MapContainer>
	);
}
