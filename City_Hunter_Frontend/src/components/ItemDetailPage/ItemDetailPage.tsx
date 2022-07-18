import React from "react";
import "./ItemDetailPage.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostThunk } from "../../redux/post/thunks"
import {useNavigate, useParams } from "react-router-dom";
import { IRootState } from "../../redux/state";
import { PostState } from "../../redux/post/state"
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
import Nearby from "../../components/Nearby/Nearby"
interface DetailProps {
  post: any
  }

export default function ItemDetailPage() {
  const {id} = useParams<{id:string}>();
  const postId = id? parseInt(id):0
  // console.log(postId);
  
  // if (id ){
  //   const postIdNumber = id
  //   const postId = parseInt(postIdNumber.slice(4))
  //   console.log("PostIdPostIdPostIdPostIdPostIdPostIdPostId",postId)
  // }
  
  const dispatch = useDispatch();
  const posts = useSelector((state: IRootState) => state.post?.posts);
  // const[lostItem , setLostItem] = useState('')
  // const path = useSelector((state: IRootState) => state.post?.image?.name);
  
  useEffect(() => {
    console.log("useEffect");
    dispatch(getPostThunk("123"))
    //   const getPost = async () => {
    //     await dispatch(
    //       getPost({

    //       })
    //     )
    //   }
  }, []);
//   console.log(posts);
  const DetailInfo = (): undefined | PostState  =>{
    const data =  posts.map((post)=>{
      if(post.id == postId ){
        
        return post
      }
    })
    console.log("datadatadatadatadatadata",data);
    return data.length > 0 ? data[postId-1] : undefined
    
  }
  // const post = posts.map((post)=>console.log(post))

  return (
    <div className="lostDetailBackground">
    
   
    <Container>
    <Row>
      <Col md={12} className="topic">Lost Item Detail</Col>
    </Row>
    <Row>
      <div className="lostItemBox"></div>
      <Col lg="1" md="12"className="lostImage"></Col>
      
      <Col  className="lostDetail">
      <br></br>
      <div>
        <div>Name:{DetailInfo()?.name}</div>
        <br></br>
        <div>description: {DetailInfo()?.description}</div>
        <br></br>
        <div>Item Color: {DetailInfo()?.item_color}</div>
        <br></br>
        <div>Lost Address:{DetailInfo()?.lost_address}</div>
        <br></br>
        <div>Lost Time: {DetailInfo()?.lost_time.slice(1,-1)}</div>
        <br></br>
        <div>Date: {DetailInfo()?.date.slice(1,-1)}</div>
        <br></br>
        <div>Price: {DetailInfo()?.price}</div>
      </div>
      </Col>
    </Row>
    <Row>
      <Col className=""><Nearby /></Col>
    </Row>
    
    {/* <Row className="chatroom">
      <Col>
    Chatroom</Col>
            
      <Col className="chatroomContent">Input:</Col>
    </Row>
     */}

    </Container>
    </div>
  )
}