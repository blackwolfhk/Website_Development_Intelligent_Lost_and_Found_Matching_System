import "./CreateLossPost.scss";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import MainScreen from "../MainScreen/MainScreen";
import Stack from "react-bootstrap/Stack";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import Lostmap from "../LostMap/Lostmap";
import ImgCutControl from "../CreateLosspost/ImgCutControl";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactTimeAgo from "react-time-ago";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

interface FormType {
  name: string;
  description: string;
  item_color: string;
  lost_address: string;
  date: string;
  lost_time: string;
  price: string;
  images_path: string;
  district_id: string;
  lat: string;
  lng: string;
}

export default function CreateLossPost() {
  const [startDate, setStartDate] = useState<string>(formatDate(new Date()));

  // Note: useNavigate hook returns a function that lets you navigate programmatically
  let navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState("");
  const [districts, setDistricts] = useState("");
  const [successMsg, setMessage] = useState("");
  const [previewBlob, setPreviewBlob] = useState<any>();
  const [error, setError] = useState("error");
  // Note: useRef() hook to create persisted mutable values (also known as references or refs), as well as access DOM elements
  const fileInput = useRef<any>();

  const { register, handleSubmit, setValue, getValues } = useForm<FormType>({
    defaultValues: {
      name: "",
      description: "",
      item_color: "",
      lost_address: "",
      district_id: "",
      date: formatDate(new Date()),
      lost_time: "",
      price: "",
      lat: "",
      lng: "",
    },
  });

  const updateLocation = (params: {
    name: string;
    lat: string;
    lng: string;
    // district_id: string;
  }) => {
    setValue("lost_address", params.name);
    setValue("lat", params.lat);
    setValue("lng", params.lng);
    // setValue("district_id", params.district_id);
  };

  const genMiniMap = useMemo(() => {
    return <Lostmap updateLocation={updateLocation} />;
  }, []);

  const onSubmit = async (data: any) => {
    // console.log(data);
    const fd = new FormData();
    for (let key in data) {
      let value: string = data[key];
      if (!value) {
        setError(`${key} field is required.`);
        // console.log("data[key]: " + data[key]);
        return;
      }
      // if (key === "date") {
      //   value = startDate;
      // }
      // Note: formdata doesn't take objects;
      // append() method appends an element to the end of the list
      fd.append(key, value);
    }
    if (fileInput.current != null) {
      var previewFile = new File([previewBlob], "image.jpg", {
        type: "image/jpg",
        lastModified: new Date().getTime(),
      });
      fd.append("image", previewFile);
    }
    const res = await fetch(process.env.REACT_APP_API_HOST + "/post", {
      method: "POST",
      body: fd,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    const dt = await res.json();
    const msg = dt.message;
    setMessage(msg);
    if (res.ok) {
      // Returns the context for the child route at this level of the route
      navigate("/main/lossitem");
    }
  };

  const [crop, setCrop] = useState<Crop | undefined>({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      if (reader) {
        reader.addEventListener("load", () =>
          setImgSrc(reader.result!.toString() || "")
        );
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  }

  function toBlob(canvas: HTMLCanvasElement): any {
    return new Promise((resolve) => {
      canvas.toBlob(resolve);
    });
  }

  const onPreviewUpdate = async (previewRef: any) => {
    console.log("previewRef = ", previewRef);
    const blob = await toBlob(previewRef);
    // let previewUrl = URL.createObjectURL(blob)
    setPreviewBlob(blob);
  };

  function formatDate(date: Date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const changeLossDate = (date: Date) => {
    let value: string = formatDate(date);
    setValue("date", value);
    setStartDate(value);
    console.log(getValues("date"));
  };
  return (
    <MainScreen title="CREATE LOST POST">
      <div className="outer-container">
        <div>
          {/* <div className="error">{error}</div> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="userInformation">
              <h3>Put fill in the following form</h3>
            </div>

            <Container>
              <Row>
                <Col sm={20}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      {...register("name")}
                      type="text"
                      placeholder=""
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      {...register("description")}
                      type="text"
                      placeholder=""
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Item Color</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=" "
                      {...register("item_color")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Lost Place</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      {...register("lost_address")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="">
                    Districts: &nbsp;
                    <select
                      {...register("district_id")}
                      onChange={(e) => {
                        setDistricts(e.target.value);
                        console.log(e.target.value);
                      }}
                    >
                      <option value="0">All</option>
                      <option value="1">Islands</option>
                      <option value="2">Kwai Tsing</option>
                      <option value="3">North</option>
                      <option value="4">Sai Kung</option>
                      <option value="5">Sha Tin</option>
                      <option value="6">Tai Po</option>
                      <option value="7">Tsuen Wan</option>
                      <option value="8">Tuen Mun</option>
                      <option value="9">Yuen Long</option>
                      <option value="10">Kowloon City</option>
                      <option value="11">Kwun Tong</option>
                      <option value="12">Sham Shui Po</option>
                      <option value="13">Wong Tai Sin</option>
                      <option value="14">Yau Tsim Mong</option>
                      <option value="15">Central and Western</option>
                      <option value="16">Eastern</option>
                      <option value="17">Southern</option>
                      <option value="18">Wan Chai</option>
                    </select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Lost Date (YYYY-MM-DD)
                      {/* <DatePickerComponent
                        id="datepicker"
                        value={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        format="yyyy-MM-dd"
                        placeholder="Enter date"
                      /> */}
                      {/* {getValues("date")} */}
                      <DatePicker
                        dateFormat="yyyy-MM-dd"
                        selected={new Date(getValues("date"))}
                        onChange={(date: Date) => changeLossDate(date)}
                      />
                    </Form.Label>

                    {/* <Form.Control
                      className="dateCalendar"
                      type="datetime"
                      placeholder=""
                      {...register("date")}
                    ></Form.Control> */}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Lost Time (HH:MM)</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder=""
                      {...register("lost_time")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      {...register("price")}
                    />
                  </Form.Group>

                  {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                    <div>
                      Last seen: <ReactTimeAgo date={date} locale="en-US" />
                    </div>
                  </Form.Group> */}

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <ImgCutControl
                      fileInput={fileInput}
                      onPreviewUpdate={onPreviewUpdate}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
            <div className="success">
              <h5>{successMsg}</h5>
            </div>

            <Stack gap={2} className="col-md-5 mx-auto">
              <Button type="submit" variant="danger" size="lg">
                Submit
              </Button>
              <Button variant="outline-dark" size="lg">
                <Link to="/main/lossitem">Cancel</Link>
              </Button>
            </Stack>
          </form>
        </div>
        <div className="lostmap">{genMiniMap}</div>
      </div>
    </MainScreen>
  );
}
