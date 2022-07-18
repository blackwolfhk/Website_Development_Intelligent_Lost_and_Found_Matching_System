import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LossItem.scss";
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import background from "../../assets/background.jpeg";
import { Link, Route, Routes } from "react-router-dom";
import { getPostThunk } from "../../redux/post/thunks";
import { IRootState } from "../../redux/state";
import { IPostState } from "../../redux/post/state";
import Losslist from "../Losslist/Losslist";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";

export default function LossItem() {
  const dispatch = useDispatch();
  // const[lostItem , setLostItem] = useState('')
  const name = useSelector((state: IRootState) => state.post?.posts[0]?.name);
  const location = useSelector(
    (state: IRootState) => state.post?.posts[0]?.lost_address
  );
  const date = useSelector((state: IRootState) => state.post?.posts[0]?.date);
  const posts = useSelector((state: IRootState) => state.post?.posts);

  // const loopPosts:any()=>{
  // const posts = useSelector((state:IRootState)=> state.post?.posts);
  // console.log("posts1",posts)
  // for(let post of posts){
  //   console.log(post)

  // }
  //   useEffect(()=>{
  //     dispatch(getPostThunk("123"))

  //   }, [])
  // }
  // const posts = useSelector((state:IRootState)=> state.post?.posts);
  // console.log("posts",posts)
  // for(let post of posts){
  //   console.log(post)

  // }

  useEffect(() => {
    console.log("useEffect");
    dispatch(getPostThunk("123"));
    //   const getPost = async () => {
    //     await dispatch(
    //       getPost({

    //       })
    //     )
    //   }
  }, []);
  return (
    <div className="loss_items">
      <Carousel>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={banner1} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="d-block w-100" src={banner2} alt="Second slide" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner3} alt="Third slide" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <h1>Lost items</h1>
      <form action="/action_page.php" className="filterbuttons">
        <span className="status select-button">
          <label htmlFor="status">Status: &nbsp;</label>
          <select name="districts" id="districts">
            <option value="All">All</option>
            <option value="LostItems">Lost</option>
            <option value="FoundItems">Found</option>
          </select>
        </span>
        <span className="districts select-button">
          <label htmlFor="districts">Districts: &nbsp;</label>
          <select name="districts" id="districts">
            <option value="All">All</option>
            <option value="Islands">Islands</option>
            <option value="KwaiTsing">Kwai Tsing</option>
            <option value="North">North</option>
            <option value="SaiKung">Sai Kung</option>
            <option value="ShaTin">Sha Tin</option>
            <option value="TaiPo">Tai Po</option>
            <option value="TsuenWan">Tsuen Wan</option>
            <option value="TuenMun">Tuen Mun</option>
            <option value="YuenLong">Yuen Long</option>
            <option value="KowloonCity">Kowloon City</option>
            <option value="KwunTong">Kwun Tong</option>
            <option value="ShamShuiPo">Sham Shui Po</option>
            <option value="WongTaiSin">Wong Tai Sin</option>
            <option value="YauTsimMong">Yau Tsim Mong</option>
            <option value="CentralandWestern">Central and Western</option>
            <option value="Eastern">Eastern</option>
            <option value="Southern">Southern</option>
            <option value="WanChai">Wan Chai</option>
          </select>
        </span>
        &nbsp;&nbsp;
        <div className="create-lost-button">
          <Link to="/main/createlostpost">Create Lost Post</Link>
        </div>
        &nbsp;&nbsp;
        <div className="create-found-button">Create Found Post</div>
      </form>

      <br></br>
      <div className="big-box-container">
        {/* <Container> */}
        {posts.map((post) => (
          <Losslist post={post} />
        ))}

        {/* </Container> */}
      </div>
      {/* <Container>
      <Row className="box-container">
        <Col md={3} className="box itemdetailbox">
          <Link to="/main/ItemDetailPage" className="">
            <div className="top-label">Item 1</div>
            <img
              src="https://www.lostings.com/wp-content/uploads/2022/07/lost_starbucks_coffee_tumblr_collectors_items_starbucks_coffee_tumblr_692.jpg"
              alt="Lost Starbucks Coffee Tumblr"
            ></img>

            <div className="itemdetailcontext">
              <b>Lost item:</b>{name}
            </div>
            <div className="itemdetailcontext">
              <b>Location:</b> {location}
            </div>
            <div className="itemdetailcontext">
              <b>Lost date:</b> {date}
            </div>
          </Link>
        </Col>

        <Col md={1}></Col>
        <Col md={3} className="box">
          Item 2
        </Col>
        <Col md={1}></Col>
        <Col md={3} className="box">
          Item 3
        </Col>
      </Row>
      <br></br>
      <br></br>
      <Row className="box-container">
        <Col md={3} className="box">
          Item 4
        </Col>
        <Col md={1}></Col>
        <Col md={3} className="box">
          Item 5
        </Col>
        <Col md={1}></Col>
        <Col md={3} className="box">
          Item 6
        </Col>
      </Row>
      <br></br>
      <br></br>
      <Row className="box-container">
        <Col md={3} className="box">
          Item 7
        </Col>
        <Col md={1}></Col>
        <Col md={3} className="box">
          Item 8
        </Col>
        <Col md={1}></Col>
        <Col md={3} className="box">
          Item 9
        </Col>
      </Row>
      <br></br>
      <br></br> */}
      {/*
    </Container> */}
    </div>
  );
}
