import { Knex } from "knex";
import fetch from "cross-fetch";
import { EditProfile } from "../controller/userController";

export class UserService {
  constructor(private knex: Knex) { }

  async getUserByUsername(username: string) {
    console.log("username", username);
    let userResult = await this.knex("users").where({ username: String(username) });
    console.log("userResult", userResult);
    let dbUser = userResult[0];
    return dbUser;
  }

  public async getRoleID(role: string) {
    let role_id = await this.knex("roles")
      .select("*")
      .where("name", role)
      .returning("id");
    console.log("id", role_id);
    return role_id[0].id;
  }

  public async register(
    username: string,
    hashedPassword: string | undefined,
    mobileNo: string | null,
    email: string,
    role_id: number
  ) {
    ``
    const result = await this.knex("users")
      .insert({
        username,
        password: hashedPassword || null,
        mobile_no: mobileNo,
        email,
        role_id,
      })
      .returning("*");
    return result;
  }

  public async getUserById(currentUserId: number) {
    let userResult = await this.knex("users").where("id", currentUserId);
    return userResult;
  }

  public async getGoogleLoginInfo(accessToken: string) {
    const fetchRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = await fetchRes.json();
    console.log("google result = ", result);
    return result;
  }

  public async getFacebookLoginInfo(accessToken: string) {
    const fetchResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`);
    const result = await fetchResponse.json();
    console.log("facebook result = ", result);
    return result;
  }

  // To generate a new profile interface without "id"
  public async editProfile(profile: EditProfile) {
    let { id, ...updateProfile } = profile

    console.log(updateProfile)
    await this.knex('users').where({ id }).update(updateProfile)
  }

}


