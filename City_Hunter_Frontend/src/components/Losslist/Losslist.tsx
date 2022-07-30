import { useDispatch } from "react-redux";
import "./Losslist.scss";
import "bootstrap/dist/css/bootstrap.css";
import { Link, Route, Routes, useParams } from "react-router-dom";
import React from "react";
import ReactTimeAgo from "react-time-ago";

interface LosslistProps {
  post: any;
}

export default function Losslist(props: LosslistProps) {
  const dispatch = useDispatch();

  const a = "/main/ItemDetailPage/" + props.post.id;
  const img =
    process.env.REACT_APP_API_HOST + `/upload/${props.post.images_path}`;
  // console.log(img);

  const getAgo = (value: string): Date => {
    return new Date(value);
  };
  return (
    <div className="box-container">
      <div className="box itemdetailbox">
        <Link to={a}>
          <div className="top-label">
            {props.post.status_name[0].toUpperCase() +
              props.post.status_name.substring(1)}
          </div>
          <img src={img} alt=""></img>

          <div className="itemdetailcontext">
            <b>Lost item :</b>&nbsp;
            {props.post.name}
          </div>
          <div className="itemdetailcontext">
            <b>Districts :</b>&nbsp; {props.post.districts_name}
          </div>
          <div className="itemdetailcontext">
            <b>Lost date :</b>&nbsp; {props.post.date}
          </div>
          <div className="itemdetailcontext">
            <b>Price :</b>&nbsp; HK$ {props.post.price}
          </div>
          <div style={{ fontSize: "17px" }}>
            {props.post.date && (
              <ReactTimeAgo date={getAgo(props.post.date)} locale="en-US" />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
