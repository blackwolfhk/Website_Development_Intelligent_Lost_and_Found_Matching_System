import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Losslist.scss";
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import background from "../../assets/background.jpeg";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { getPostThunk } from "../../redux/post/thunks";
import { IRootState } from "../../redux/state";
import { IPostState } from "../../redux/post/state";
// import * as All from "../assets/upload/";

interface LosslistProps {
  post: any;
}
export default function Losslist(props: LosslistProps) {
  const dispatch = useDispatch();
  const name = useSelector((state: IRootState) => state.post?.posts[0]?.name);
  // const posts = useSelector((state:IRootState)=> state.post?.posts);

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

  const itemsToRender = [];

  const a = "/main/ItemDetailPage?id=" + props.post.id;
  //   console.log(props.post.status_name);
  return (
    <div className="box-container">
      <div className="box itemdetailbox">
        <Link to={a}>
          <div className="top-label">{props.post.status_name}</div>
          <img
            src="https://www.lostings.com/wp-content/uploads/2022/07/lost_starbucks_coffee_tumblr_collectors_items_starbucks_coffee_tumblr_692.jpg"
            alt="Lost Starbucks Coffee Tumblr"
          ></img>

          <div className="itemdetailcontext">
            <b>Lost item:</b>
            {props.post.name}
          </div>
          <div className="itemdetailcontext">
            <b>Location:</b> {props.post.lost_address}
          </div>
          <div className="itemdetailcontext">
            <b>Lost date:</b> {props.post.date}
          </div>
        </Link>
      </div>
    </div>
  );
}
