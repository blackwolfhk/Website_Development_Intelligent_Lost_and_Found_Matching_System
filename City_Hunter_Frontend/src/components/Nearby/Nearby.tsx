import Header from "../Header/Header";
import "./Nearby.css";
import maptemplate from "../../assets/map-template.png";
import { Col, Container, Row } from "react-bootstrap";
import { useState, useMemo, useCallback, useRef } from "react";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import Man from "./Man.png";
import ReactTimeAgo from "react-time-ago";

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
import Places from "./place";
import { House } from "@mui/icons-material";
import { getPostThunk } from "../../redux/post/thunks";
import { IRootState } from "../../redux/state";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "800px",
  height: "800px",
};

const center = {
  lat: 22.28656,
  lng: 114.3507769,
};

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

function Nearby() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state: IRootState) => state.post?.posts);
  // const [post, setPost] = useState<PostState | null>();
  // console.log("posts = ", posts);
  useEffect(() => {
    dispatch(getPostThunk(""));
  }, []);

  //
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: ["places"],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
  });

  // const [office, setOffice] = useState<LatLngLiteral>();
  // const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<google.maps.Map>();
  const [center, setCenter] = useState<LatLngLiteral>({ lat: 22.4, lng: 114 });
  const [zoom, setZoom] = useState<number>(13);
  const [mapLoaded, setMapLoaded] = useState(false);
  // const [windowShow, setWindowShow] = useState(false);
  const [showedPoints, setShowedPoints] = useState<number[]>([]);
  const [count, setCount] = useState(0);
  const getPostPoint = useCallback(() => {
    let makers = posts.map((post, index) => {
      const lat = post.latlngs_lat;
      const lng = post.latlngs_lng;
      if (post.status_name === "lost") {
        let result = {
          lat: Number(lat),
          lng: Number(lng),
          isShow: showedPoints.includes(index),
        };
        return result;
      }
    });
    return makers;
  }, [posts, showedPoints]);

  // console.log(getMultiplePoint())

  // const options = useMemo<MapOptions>(
  //   () => ({
  //     mapId: "b181cac70f27f5e6",
  //     disableDefaultUI: true,
  //     clickableIcons: false,
  //   }),
  //   []
  // );

  const getCurrentPosition = () => {
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
  // const houses = useMemo(() => generateHouses(center), [center]);
  const printDefaultMarker = (marker: any, index: number) => {
    console.log("marker = ", marker);
    return (
      <Marker
        // icon ="https://www.oxxostudio.tw/img/articles/201801/google-maps-3-marker-icon.png"
        key={index}
        position={{ lat: 22.3873585, lng: 114.148253 }}
        onLoad={() => console.log(`marker loaded`)}
      />
    );
  };

  const onMarkerClick = (index: number) => {
    console.log("onMarkerClick: " + index);

    if (!showedPoints.includes(index)) {
      let newShowedPoints: number[] = [...showedPoints];
      newShowedPoints.push(index);
      setShowedPoints(newShowedPoints);
      console.log("open: ");
    }
  };
  const onCloseClick = (index: number) => {
    let newShowedPoints: number[] = [...showedPoints];

    const a = newShowedPoints.filter((value, index2) => {
      return value !== index;
    });
    setShowedPoints(a);
    console.log("close: ");
  };
  const getImage = (name: string) => {
    return process.env.REACT_APP_API_HOST + "/upload/" + name;
  };

  const getAgo = (value: string): Date => {
    return new Date(value);
  };

  return (
    <div className="nearby">
      <h1>Nearby</h1>
      <br></br>
      {isLoaded && (
        <Places
          setOffice={(position: google.maps.LatLngLiteral) => {
            setCenter(position);
            setZoom(16);
          }}
        />
      )}
      <Container>
        <Row>
          <Col>
            <div className="map-area">
              {isLoaded && (
                <GoogleMap
                  id="marker-example"
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={zoom}
                  onLoad={onLoad}
                  onCenterChanged={() =>
                    console.log(
                      "Center",
                      JSON.stringify(mapRef.current?.getCenter())
                    )
                  }
                >
                  {mapLoaded && (
                    <>
                      <Marker
                        // onClick={ }
                        icon={Man}
                        position={center}
                        animation={google.maps.Animation.DROP}
                        onLoad={() => console.log("")}
                      />
                      {getPostPoint().map((marker, index) => {
                        return (
                          <>
                            {marker && (
                              <div>
                                <Marker
                                  // icon = {('https://www.oxxostudio.tw/img/articles/201801/google-maps-3-marker-icon.png')}
                                  key={index}
                                  position={{
                                    lat: marker.lat,
                                    lng: marker.lng,
                                  }}
                                  onLoad={() => console.log(`marker loaded`)}
                                  animation={google.maps.Animation.DROP}
                                  onClick={() => onMarkerClick(index)}
                                />
                                {marker.isShow && (
                                  <InfoWindow
                                    onCloseClick={() => onCloseClick(index)}
                                    position={{
                                      lat: marker.lat,
                                      lng: marker.lng,
                                    }}
                                  >
                                    <div
                                      style={{
                                        background: `white`,
                                        border: `1px solid #ccc`,
                                        padding: 15,
                                        width: "160px",
                                        height: "160px",
                                      }}
                                    >
                                      <h1>
                                        <span
                                          onClick={() => {
                                            navigate(
                                              "/main/ItemDetailPage/" +
                                                posts[index].id
                                            );
                                          }}
                                        >
                                          <img
                                            className="mapImage"
                                            style={{
                                              width: "100px",
                                              height: "100px",
                                            }}
                                            src={getImage(
                                              posts[index].images_path
                                            )}
                                          />
                                          <div className="priceSize">
                                            {posts[index].name}
                                          </div>
                                          <div className="priceSize">
                                            HK$
                                            {posts[index].price}
                                          </div>

                                          <div className="priceSize">
                                            (
                                            {posts[index].date && (
                                              <ReactTimeAgo
                                                date={getAgo(posts[index].date)}
                                                locale="en-US"
                                              />
                                            )}
                                            )
                                          </div>
                                        </span>
                                      </h1>
                                    </div>
                                  </InfoWindow>
                                )}
                              </div>
                            )}
                          </>
                        );
                      })}
                    </>
                  )}
                  {/* {windowShow && (
                    <InfoWindow position={center}>
                      <div
                        style={{
                          background: `white`,
                          border: `1px solid #ccc`,
                          padding: 15,
                        }}
                      >
                        <h1>InfoWindow</h1>
                      </div>
                    </InfoWindow>
                  )} */}
                </GoogleMap>
              )}
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

// const generaetHouses = (position: LatLngLiteral) => {
//   const _houses: Array<LatLngLiteral> = [];
//   for (let i = 0; i < 100; i++) {
//     const direction = Math.random() < 0.5 ? -2 : 2;
//     _houses.push({
//       lat: position.lat + Math.random() / direction,
//       lng: position.lng + Math.random() / direction,
//     });
//   }
//   return _houses;
// };

export default Nearby;
