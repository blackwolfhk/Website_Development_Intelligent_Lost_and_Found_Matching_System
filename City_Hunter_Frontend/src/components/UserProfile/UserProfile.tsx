import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "./UserProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../MainScreen/MainScreen";
import Stack from "react-bootstrap/Stack";
import { IRootState } from "../../redux/state";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../redux/auth/thunks";
import { useNavigate } from "react-router-dom";

// interface UserProfileProps {
//   profile: any;
// }

interface FormType {
  username: string;
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
  mobileNo: string;
  email: string;
}

export default function UserProfile() {
  const { mobile_no, email, username, displayName } = useSelector(
    (state: IRootState) => state.auth
  );

  const [updateProfileError, setUpdateProfileError] = useState("");

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<FormType>({
    defaultValues: {
      username: username,
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
      mobileNo: mobile_no,
      email: email,
    },
  });
  const navigate = useNavigate();
  const onSubmit = async (data: FormType) => {
    console.log(JSON.stringify(data));
    try {
      await dispatch(updateProfile(data)).unwrap();
      navigate(-1);
    } catch (error: any) {
      console.log(error);
      setUpdateProfileError(error);
    }
  };
  return (
    <MainScreen title="EDIT PROFILE">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="userInformation">
          <h3>User Information</h3>
        </div>
        {/* <Link to={profile}> */}

        <Container>
          <Row>
            <Col sm={5}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                  disabled={true}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Old Password"
                  {...register("oldPassword")}
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New password"
                  {...register("newPassword")}
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Re-New password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-New password"
                  {...register("reNewPassword")}
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email")}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Mobile phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Phone number"
                  {...register("mobileNo")}
                />
              </Form.Group>
            </Col>
            <Col sm={2}></Col>
            <Col sm={5}>
              {/* <div
                className="profile-img-area"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img className="profile-img" src={manimg} alt="" />
              </div>
              <br></br>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="secondary"
                  as="input"
                  type="reset"
                  value="Edit"
                  className="col-md-3 "
                />
              </div> */}
            </Col>
          </Row>
          <div className="error-message">{updateProfileError}</div>
        </Container>
        {/* </Link> */}
        {/* <button>test</button>
        <button type="submit">Save changes</button> */}

        <Stack gap={2} className="col-md-2 mx-auto">
          <Button type="submit" variant="secondary">
            Save changes
          </Button>
          <Button variant="outline-secondary">Cancel</Button>
        </Stack>
      </form>
    </MainScreen>
  );
}
