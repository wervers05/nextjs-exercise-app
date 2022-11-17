import axios from "axios";
import { setCookie } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";


interface Input {
    username: string;
    password: string;
}

const secretKey = process.env.SECRET;
const updateIsLogin = async (e: boolean) => {
  await axios.put("https://6371e259025414c637002627.mockapi.io/api/fiddle/users", {
    isLogin: e,
  });
};

  export default async (req: NextApiRequest, res: NextApiResponse) => {

    updateIsLogin(true);
    const { password, username } = await req.body;
    try {
      const getRes = await axios.get(
        "https://6371e259025414c637002627.mockapi.io/api/fiddle/users"
      );
      const users = getRes.data;
      users.filter((user: Input) => {
        if (user.username === username && user.password === password) {
          return user;
        }
      });
  
      setCookie({ res }, "jwt", "_token", {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
  
      res.status(200).end();
  
    } catch (e) {
      res.status(400).send(e);
    }
  };