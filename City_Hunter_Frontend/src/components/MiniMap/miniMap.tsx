import Header from "../Header/Header";
import "./minimap.css";
import maptemplate from "../../assets/map-template.png";
import { Col, Container, Row } from "react-bootstrap";
import Places from "../Nearby/place";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { PostState } from "../../redux/post/state";
import { useParams } from "react-router-dom";

const containerStyle = {
  width: "600px",
  height: "600px",
};

type LatLngLiteral = google.maps.LatLngLiteral;

function Minimap() {
  console.log("Minmap");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: ["places"],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
  });
  console.log("isLoaded: " + isLoaded);

  let { id } = useParams<{ id: string }>();
  const minimapId = id ? parseInt(id) : 0;
  const [post, setPost] = useState<PostState | null>();
  const [center, setCenter] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
  const mapRef = useRef<google.maps.Map>();
  const [zoom, setZoom] = useState<number>(17);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [windowShow, setWindowShow] = useState(false);

  const setTimeourAysnc = async () => {
    return new Promise<void>((resolve, reject) => {
      try {
        setTimeout(async () => {
          const fetchPostItem = async () => {
            const res = await fetch(
              process.env.REACT_APP_API_HOST + `/post/${minimapId}`,
              {}
            );
            const data = await res.json();
            if (res.ok) {
              setPost(data[0]);
              console.log("data[0].latlngs_lat : ", data[0].latlngs_lat);
              console.log("data[0].latlngs_lng : ", data[0].latlngs_lng);

              setCenter({
                lat: parseFloat(data[0].latlngs_lat),
                lng: parseFloat(data[0].latlngs_lng),
              });
              setMapLoaded(true);
            }
            return null;
          };
          await fetchPostItem();
          console.log(3);
          resolve();
        }, 1000);
      } catch (e) {
        reject(e);
      }
    });
  };

  const onLoad = useCallback(
    async (map: google.maps.Map) => {
      console.log(1);
      mapRef.current = map;
      console.log(2);
      await setTimeourAysnc();
      console.log(4);
    },
    [setMapLoaded]
  );

  const genGoogleMap = useMemo(() => {
    return (
      <div>
        <GoogleMap
          id="marker-example"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onCenterChanged={() =>
            console.log(JSON.stringify(mapRef.current?.getCenter()))
          }
        >
          {mapLoaded && (
            <Marker onClick={() => setWindowShow(true)} position={center} />
          )}
          {windowShow && (
            <InfoWindow position={center}>
              <div
                style={{
                  background: `white`,
                  border: `1px solid #ccc`,
                  padding: 10,
                }}
              >
                <div>InfoWindow</div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  }, [post, center, isLoaded]);
  return (
    <div className="nearby">
      {isLoaded && (
        <Container>
          <Row>
            <Col>
              <div className="map-area">{isLoaded && genGoogleMap}</div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
export default Minimap;
