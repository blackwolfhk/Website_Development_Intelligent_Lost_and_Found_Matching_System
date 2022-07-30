import "./ItemDetailPage.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostThunk } from "../../redux/post/thunks";
import { useParams } from "react-router-dom";
import { IRootState } from "../../redux/state";
import { PostState } from "../../redux/post/state";
import Minimap from "../MiniMap/miniMap";
import { Button, Container } from "react-bootstrap";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id) : 0;
  const posts = useSelector((state: IRootState) => state.post?.posts);

  const DetailInfo = (): undefined | PostState => {
    const data = posts.filter((post) => {
      if (post && post.id === postId) {
        return post;
      }
    });
    return data.length > 0 ? data[0] : undefined;
  };

  const mobile = `https://wa.me/852${DetailInfo()?.mobile_no}`;

  const img =
    process.env.REACT_APP_API_HOST + `/upload/${DetailInfo()?.images_path}`;

  const genMinuMap = useMemo(() => {
    console.log("useMemo: " + postId);
    return <Minimap />;
  }, [postId]);

  return (
    <div className="lostDetailBackground">
      <Container fluid>
        <Row>
          <Col md={12} className="topic">
            Lost Item Detail
          </Col>
        </Row>
        <Row>
          <div className="lostItemBox">
            <Col lg="12" className="lostImage">
              <img className="imgSize" src={img} alt=""></img>
            </Col>

            <Col lg="12" className="lostDetail">
              <div style={{ fontSize: "23px" }}>
                <div>
                  <b>Name : </b>
                  <span style={{ color: "white" }}>{DetailInfo()?.name}</span>
                </div>
                <br></br>
                <div>
                  <b>Description : </b>
                  <span style={{ color: "white" }}>
                    {DetailInfo()?.description}
                  </span>
                </div>
                <br></br>
                <div>
                  <b>Item Color : </b>
                  <span style={{ color: "white" }}>
                    {DetailInfo()?.item_color}
                  </span>
                </div>
                <br></br>
                <div>
                  <b>Lost Address : </b>
                  <span style={{ color: "white" }}>
                    {DetailInfo()?.lost_address}
                  </span>
                </div>
                <br></br>
                <div>
                  <b>Lost Time : </b>
                  <span style={{ color: "white" }}>
                    {DetailInfo()?.lost_time}
                  </span>
                </div>
                <br></br>
                <div>
                  <b>Date : </b>
                  <span style={{ color: "white" }}>{DetailInfo()?.date}</span>
                </div>
                <br></br>
                <div>
                  <b>Price : </b>
                  <span style={{ color: "white" }}>
                    HK$ {DetailInfo()?.price}
                  </span>
                </div>
              </div>
            </Col>
          </div>
        </Row>
        <Button variant="secondary" className="whatsapp">
          <a
            href={mobile}
            target="_blank"
            style={{
              color: "orange",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WhatsAppIcon fontSize="large" />
            Contact By Whatsapp
          </a>
        </Button>{" "}
        <Row>
          <Col className="">{genMinuMap}</Col>
        </Row>
      </Container>
    </div>
  );
}
