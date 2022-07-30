import React, { useEffect, useMemo, useState } from "react";
import "./UserHistoricalRecord.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PostState } from "../../redux/post/state";
import MainScreen from "../MainScreen/MainScreen";
import { useNavigate } from "react-router-dom";

export default function UserHistoricalRecord() {
  const dispatch = useDispatch();
  const [deleteResult, setDeleteResult] = useState(null);
  const fortmatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };
  const [posts, setPosts] = useState<PostState[] | null>();

  useEffect(() => {
    const fetchPostItem = async () => {
      // Note: use token to identify the loggedin user, but not user_id!
      const res = await fetch(process.env.REACT_APP_API_HOST + `/user/post`, {
        method: "GET",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data);
      }
      return null;
    };
    fetchPostItem();
  }, []);

  //   console.log(index);

  //   return index
  //   }
  //   useEffect(() => {
  const deletePost = async (index: number) => {
    console.log(posts![index].id);
    const id = posts![index].id;
    if (id) {
      const res = await fetch(`${process.env.REACT_APP_API_HOST}/post/delete`, {
        method: "delete",
        body: JSON.stringify({ id: posts![index].id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        window.location.reload();
        const data = await res.json();
        // navigate("/main/userhistocialrecord");
        console.log(setPosts(data));
      }

      //     const res = await fetch(process.env.REACT_APP_API_HOST + `/post/delete/${index}`, { method: 'DELETE' }).then(() => setStatus('Delete successful'));
      //     return res.status
    }
  };
  const editPost = async (index: number) => {
    console.log(posts![index].id);
    const id = posts![index].id;
    if (id) {
      const res = await fetch(`${process.env.REACT_APP_API_HOST}/post/edit`, {
        method: "PUT",
        body: JSON.stringify({ id: posts![index].id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        window.location.reload();
        const data = await res.json();
        // navigate("/main/userhistocialrecord");
        console.log(setPosts(data));
      }

      //     const res = await fetch(process.env.REACT_APP_API_HOST + `/post/delete/${index}`, { method: 'DELETE' }).then(() => setStatus('Delete successful'));
      //     return res.status
    }
  };
  //   deletePost(index)
  // },[]);
  const getImage = (name: string) => {
    return process.env.REACT_APP_API_HOST + "/upload/" + name;
  };

  return (
    <MainScreen title="HISTORICAL RECORDS">
      <div className="historical-record">
        {posts &&
          posts?.length > 0 &&
          posts?.map((post, index) => (
            <div key={index}>
              <Container>
                <Row>
                  <Col>
                    <div className="historicalImgSize">
                      <img src={getImage(post.images_path)} alt=""></img>
                    </div>
                  </Col>
                  <Col>
                    <div style={{ fontSize: "22px" }}>
                      <div>
                        <b>Name :</b>&nbsp;{post.name}
                      </div>
                      <br></br>
                      <div>
                        <b>Description :</b>&nbsp; {post.description}
                      </div>
                      <br></br>
                      <div>
                        <b>Item Color :</b>&nbsp;{" "}
                        {post.item_color[0].toUpperCase() +
                          post.item_color.substring(1)}
                      </div>
                      <br></br>
                      <div>
                        <b>Lost Address :</b>&nbsp;{post.lost_address}
                      </div>
                      <br></br>
                      <div>
                        <b>Lost Time:</b>&nbsp; {post.lost_time}
                      </div>
                      <br></br>
                      <div>
                        <b>Date:</b>&nbsp; {post.date}
                      </div>
                      <br></br>
                      <div>
                        <b>Price :</b> &nbsp; {post.price}
                      </div>
                      <br></br>
                      <div>
                        <b>Status :</b> &nbsp;{" "}
                        {post.status_name[0].toUpperCase() +
                          post.status_name.substring(1)}
                      </div>
                      <br></br>
                      <Button
                        variant="success"
                        onClick={(e: any) => editPost(index)}
                      >
                        Found
                      </Button>{" "}
                      <Button
                        variant="success"
                        onClick={(e: any) => deletePost(index)}
                      >
                        Delete
                      </Button>{" "}
                      <br></br> <br></br> <br></br> <br></br>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      {/* <Button
                        variant="warning"
                        size="lg"
                        onClick={(e) => deletePost(index)}
                      >
                        Delete
                      </Button>{" "}
                      <Button variant="warning" size="lg">
                        Edit
                      </Button>{" "} */}
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          ))}
      </div>
    </MainScreen>
  );
}
