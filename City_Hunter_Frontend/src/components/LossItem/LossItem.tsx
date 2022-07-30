import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LossItem.scss";
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPostThunk } from "../../redux/post/thunks";
import { IRootState } from "../../redux/state";
import Losslist from "../Losslist/Losslist";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";

export default function LossItem() {
  const dispatch = useDispatch();
  const posts = useSelector((state: IRootState) => state.post?.posts);

  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [districts, setDistricts] = useState("");

  const search = async () => {
    const result = await dispatch(
      getPostThunk({
        status: status,
        price: price,
        districts: districts,
      })
    ).unwrap();
    console.log(result);
  };

  useEffect(() => {
    search();
  }, []);
  return (
    <div className="loss_items">
      <Carousel>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={banner1} alt="First slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="d-block w-100" src={banner2} alt="Second slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner3} alt="Third slide" />
          <Carousel.Caption>
            <h6>We can help to find your lost item</h6>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <br></br>

      <h1>Lost items</h1>

      <br></br>

      <Container fluid>
        <Row>
          <Col>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="warning" size="lg">
                <Link
                  to="/main/createlostpost"
                  style={{
                    display: "inline-block",
                    outline: 0,
                    cursor: "pointer",
                    border: "0",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  *Create Lost Post*
                </Link>
              </Button>{" "}
            </div>
          </Col>
        </Row>
      </Container>

      <br></br>

      <Container fluid>
        <form action="/action_page.php" className="filterbuttons">
          <Row style={{ alignItems: "center", justifyContent: "center" }}>
            <Col md={6} lg={3}>
              <div
                className="status select-button"
                style={{ margin: "1.2rem 0" }}
              >
                <label htmlFor="status">Status: &nbsp;</label>
                {/* <input type="text" onChange={handleSearch}></input> */}
                <select
                  style={{ minWidth: "140px" }}
                  title="status"
                  value={status}
                  name="districts"
                  id="districts"
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value="0">All</option>
                  <option value="1">Lost</option>
                  <option value="2">Found</option>
                </select>
                {/* filteredStatus={filteredStatus} */}
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div
                className="status select-button"
                style={{ margin: "1.2rem 0" }}
              >
                <label htmlFor="status">Price: &nbsp;</label>
                <select
                  title="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  name="price"
                  id="price"
                >
                  <option value="0">All</option>
                  <option value="1">Below HK$500</option>
                  <option value="2">HK$501 to HK$1,000</option>
                  <option value="3">HK$1,001 to HK$3,000</option>
                  <option value="4">Above HK$3,000</option>
                </select>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div
                className="districts select-button"
                style={{ margin: "1.2rem 0" }}
              >
                <label htmlFor="districts">Districts: &nbsp;</label>
                <select
                  name="districts"
                  id="districts"
                  value={districts}
                  onChange={(e) => {
                    setDistricts(e.target.value);
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
              </div>
            </Col>
            <Col md={6} lg={3}>
              <Button
                variant="secondary"
                onClick={search}
                style={{ margin: "1.2rem 0" }}
              >
                Search
              </Button>{" "}
              {/* <div className="create-found-button">Create Found Post</div>
              &nbsp;&nbsp; */}
            </Col>
          </Row>
        </form>
      </Container>
      <br></br>
      <div className="big-box-container">
        {posts.map((post, index) => (
          <Losslist key={index} post={post} />
        ))}
      </div>
    </div>
  );
}
