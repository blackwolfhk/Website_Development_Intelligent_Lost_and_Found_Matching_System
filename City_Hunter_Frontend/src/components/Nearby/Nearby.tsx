import Header from "../Header/Header";
import "./Nearby.css";
import maptemplate from "../../assets/map-template.png";
import { Col, Container, Row } from "react-bootstrap";
import Places from './place'
import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  DirectionsService,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Distance from "./distance";
import { House } from "@mui/icons-material";
import { getPostThunk } from "../../redux/post/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";


//

//

const containerStyle = {
  width: '800px',
  height: '800px'
};

const center = {
  lat: 22.28656,
  lng: 114.3507769
};

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;


function Nearby() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    libraries: ['places'],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!
  })

  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<google.maps.Map>();
  const [center, setCenter] = useState<LatLngLiteral>({ lat: 22.4, lng: 114.3 })
  const [zoom, setZoom] = useState<number>(10)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [windowShow, setWindowShow] = useState(false)

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "b181cac70f27f5e6",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map: google.maps.Map) => { mapRef.current = map; setTimeout(() => setMapLoaded(true), 0) }, [setMapLoaded]);
  const houses = useMemo(() => generateHouses(center), [center]);

  // const fetchDirections = (house: LatLngLiteral) => {
  //   if (!office) return;

  //   const service = new DirectionsService();
  //   service.route(
  //     {
  //       origin: house,
  //       destination: office,
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       if (status === "OK" && result) {
  //         setDirections(result);
  //       }
  //     }
  //   );
  // };

  return (
    <div className="nearby">
      <h1>Nearby</h1>
      {isLoaded && <Places setOffice={(position: google.maps.LatLngLiteral) => {
        setCenter(position)
        setZoom(17)
      }} />}
      <Container>
        <Row>
          <Col>
            <div className="map-area">
              {
                isLoaded && <GoogleMap
                  id="marker-example"
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={zoom}
                  onLoad={onLoad}
                  onCenterChanged={() => console.log(JSON.stringify(mapRef.current?.getCenter()))}
                // onUnmount={onUnmount}
                >
                  {mapLoaded && <Marker onClick={() => setWindowShow(true)} position={center} onLoad={() => console.log('noooopoooo')} />}
                  {windowShow && <InfoWindow position={center}>
                    <div style={{
                      background: `white`,
                      border: `1px solid #ccc`,
                      padding: 15
                    }}>
                      <h1>InfoWindow</h1>
                    </div>
                  </InfoWindow>}
                </GoogleMap>
              }
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



export default Nearby;
