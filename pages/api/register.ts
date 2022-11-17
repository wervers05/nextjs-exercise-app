import axios from "axios";
import { NextApiRequest, NextApiResponse} from "next";
import { setCookie } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password, confirm, firstName, middleName, lastName, email, phone } =
      req.body;
  
    try {
      const response = await axios.post(
        "https://6371e259025414c637002627.mockapi.io/api/fiddle/users",
        {
          username,
        email,
        firstName,
        middleName,
        lastName,
        password,
        confirm,
        phone,
        isLogin: true,
        }
      );

      // setCookie({ res }, "jwt", "_token", {
      //   httpOnly: true,
      //   maxAge: 30 * 24 * 60 * 60,
      //   path: "/",
      // });
      setCookie({ res }, "jwt", response.data.jwt, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
  
      res.status(200).end();
    } catch (e) {
      res.status(400).send(e);
    }
  };