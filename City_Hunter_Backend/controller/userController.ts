import { UserService } from "../service/userService";
import { Request, Response } from "express";
import { hashPassword, checkPassword } from "../utils/hash";
import express from "express";
import jwtSimple from "jwt-simple";
import jwt from "../auth/jwt";

export default class UserController {
  protect(arg: string, protect: any, updateUserProfile: any) {
    throw new Error("Method not implemented.");
  }
  constructor(private userService: UserService) { }

  register = async (req: Request, res: Response) => {
    let { username, password, mobileNo, email } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await this.userService.getUserByUsername(username);
    const role_id = Number(await this.userService.getRoleID('user'));
    console.log("role_id : ", role_id)

    if (username.length < 5) {
      res.status(400).json({ message: "username must be a least 5 characters" })
      return
    }

    if (password.length < 8) {
      res.status(400).json({ message: "password must be a least 8 characters" })
      return
    }

    if (!user) {
      await this.userService.register(
        username,
        hashedPassword,
        mobileNo,
        email,
        role_id
      );
      res.json({
        message: `${username} is create! `,
      });
      let dbUser = await this.userService.getUserByUsername(username);
      const token = this.genJwt(dbUser)
      return res.json({ token })




    }
    res.status(400).json({
      message: `${username} is already existing! `,
    });
    return

  };


  login = async (req: Request, res: Response) => {
    let { username, password } = req.body;

    if (!username) {
      res.status(400).json({ error: "missing username" });
      return;
    }
    if (!password) {
      res.status(400).json({ error: "missing password" });
      return;
    }
    console.log({ username, password });
    let dbUser = await this.userService.getUserByUsername(username);
    if (!dbUser) {
      res.status(401).json({ error: "user not found" });
      return;
    }
    let isMatched = await checkPassword(password, dbUser.password);
    console.log(isMatched);
    if (!isMatched) {
      res.status(401).json({ error: "wrong password" });
      return;
    }
    delete dbUser.password;

    const token = this.genJwt(dbUser)
    return res.json({ token })
  };


  getMe = async (req: express.Request, res: express.Response) => {
    // console.log("session id", req.session.id);
    if (!req.session["user"]) {
      console.log("NO LOGIN");
      res.status(400).json({
        message: "Login Not Yet",
      });
      return;
    }

    let id = req.session["user"].id;
    let currentUserId = Number(id);
    let currentUserData = await this.userService.getUserById(currentUserId);
    res.json(currentUserData);
  };


  logout = (req: express.Request, res: express.Response) => {
    let username = req.session["username"];
    console.log(`${username} want to logout`);
    req.session.destroy((error) => {
      if (error) {
        console.error("failed to destroy session:", error);
      }

      res.redirect(`/index.html?user=${username}`);
    });
  };


  googleLogin = async (req: Request, res: Response) => {
    try {
      // const accessToken = req.session?.["grant"].response.access_token;

      const { accessToken } = req.body
      const googleLoginInfo = await this.userService.getGoogleLoginInfo(
        accessToken
      );
      console.log(" googleLoginInfo = ", googleLoginInfo);

      let user = await this.userService.getUserByUsername(
        googleLoginInfo.email
      );
      console.log("hi");
      console.log(user);

      if (!user) {
        const role = "user";
        const role_id = Number(await this.userService.getRoleID(role));
        user = await this.userService.register(
          googleLoginInfo.email,
          undefined,
          null,
          googleLoginInfo.email,
          role_id
        );
      }
      // if (req.session) {
      //   req.session["user"] = user;
      // }

      const token = this.genJwt(user)
      res.json({ token })
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Google login fail",
      });
    }
  };


  fbLogin = async (req: Request, res: Response) => {
    // An AJAX request is made to the Server side with the access token from facebook
    const fbToken = req.body.fbToken

    // Server validate the validity of the token by send the token to the API
    const data = await this.userService.getFacebookLoginInfo(fbToken)
    console.log('data = ', data)
    if (!data) {
      return res.status(401).json({ msg: "Login Fail With Facebook" })
    }

    // Facebook returns the user info. Server may or may not create a new user if the email does not exist in the database.
    const email = data.email
    let user = await this.userService.getUserByUsername(email)
    if (!user) {
      // const insertId = (await knex.table('users').insert({ username: email, role: 'client' }).returning('id'))[0].id
      const roleId = await this.userService.getRoleID('user')

      user = await this.userService.register(email, undefined, null, email, roleId)
      console.log(user)
    }
    const token = this.genJwt(user)

    // Server generates a new JSON Web Token and responds the generated JWT
    return res.json({ token })
  }


  // To create a JWT function for the uses of other login methods
  private genJwt = (user: any): string => {
    const payload = {
      userId: user.id,
      role: user.role,
      username: user.username,
      icon: user.icon,
      email: user.email,
      mobile_no: user.mobile_no,
    };

    const token = jwtSimple.encode(payload, jwt.jwtSecret);
    console.log(token)
    return token
  }


  // Update user profile handling:
  updateUserProfile = async (req: Request, res: Response) => {
    let body: EditProfile = req.body
    let {
      username,
      password,
      email,
      mobile,
    } = body
    const userId = req.users?.userId
    console.log(userId)

    try {
      if (!userId) {
        res.status(400).json({ message: "Invalid user id" })
        return
      }
      const user: any = await this.userService.getUserById(userId);
      if (!user) {
        res.status(400).json({ message: "User not found" })
        return
      }

      await this.userService.editProfile(
        {
          username,
          password,
          email,
          mobile,
          id: userId
        }
      )
      return res.json({ msg: "successful" })
    } catch (e) {
      return res.status(400).json({ msg: e.message })
    }

    //   if (user) {
    //     user.name = req.body.name || user.name;
    //     user.email = req.body.email || user.email;
    //     user.mobile = req.body.mobile || user.mobile;
    //     user.pic = req.body.pic || user.pic;

    //     if (req.body.password) {
    //       user.password = req.body.password;
    //     }
    //     const updateUser = await user.save()
    //     res.json({
    //       _id: updateUser._id,
    //       name: updateUser.name,
    //       email: updateUser.email,
    //       mobile: updateUser.mobile,
    //       pic: updateUser._id
    //       // token: generateToken(updateUser._id)
    //     });


    //   }
    //   else {
    //     res.status(404);
    //     throw new Error("User not found!")
    //   }
  }

}

export interface EditProfile {
  username: string
  password: string
  email: string
  mobile: string
  id: number
}
