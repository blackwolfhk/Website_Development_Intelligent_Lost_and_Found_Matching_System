import "./lostmap.css";
import { Col, Container, Row } from "react-bootstrap";
import Places from "../Nearby/place";
import { useState, useMemo, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useEffect } from "react";
import Geocode from "react-geocode";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

const containerStyle = {
  width: "550px",
  height: "550px",
};

const center = {
  lat: 22.28656,
  lng: 114.3507769,
};

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

interface LostmapProps {
  updateLocation: (params: { name: string; lat: string; lng: string }) => void;
}
function Lostmap(props: LostmapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: ["places"],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
  });

  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<google.maps.Map>();
  const [center, setCenter] = useState<LatLngLiteral>({ lat: 22.4, lng: 114 });
  const [zoom, setZoom] = useState<number>(17);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [windowShow, setWindowShow] = useState(false);
  const [moveLatLng, setMoveLatLng] = useState<LatLngLiteral>({
    lat: 22.4,
    lng: 114,
  });
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "b181cac70f27f5e6",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  useEffect(() => {
    Geocode.fromLatLng(String(moveLatLng.lat), String(moveLatLng.lng)).then(
      (response: { results: { formatted_address: any }[] }) => {
        const address = response.results[0].formatted_address;
        props.updateLocation({
          name: address,
          lat: String(moveLatLng.lat),
          lng: String(moveLatLng.lng),
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }, [moveLatLng]);

  const getCurrentPosition = () => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY!);
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };
  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      setTimeout(() => setMapLoaded(true), 1000);
      getCurrentPosition();
    },
    [setMapLoaded]
  );
  const houses = useMemo(() => generateHouses(center), [center]);

  const printDefaultMarker = (marker: any, index: number) => {
    console.log("marker = ", marker);
    return (
      <Marker
        icon="add"
        key={index}
        position={{ lat: 22.3873585, lng: 114.148253 }}
        onLoad={() => console.log(`marker loaded`)}
      />
    );
  };
  return (
    <div className="nearby">
      {isLoaded && (
        <Places
          setOffice={(position: google.maps.LatLngLiteral) => {
            setCenter(position);
            setZoom(17);
          }}
        />
      )}
      <Container>
        <Row>
          <Col>
            <div className="map-area">
              <div className="map-container">
                {isLoaded && (
                  <GoogleMap
                    id="marker-example"
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoom}
                    onLoad={onLoad}
                    onCenterChanged={() => {
                      let lat = mapRef.current?.getCenter()?.lat();
                      let lng = mapRef.current?.getCenter()?.lng();
                      if (lat && lng) {
                        console.log(lat);
                        console.log(lng);
                        // setCenter({
                        //   lat,
                        //   lng
                        // })
                        setMoveLatLng({
                          lat,
                          lng,
                        });
                      }
                    }}
                  ></GoogleMap>
                )}
                <div className="map-owner-point">
                  <AccessibilityNewIcon fontSize="large" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};

export default Lostmap;
