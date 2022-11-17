import axios from "axios";
import { useRouter } from "next/router";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie, destroyCookie } from "nookies";

const updateIsLogin = async (e: boolean) => {
  await axios.put("https://6371e259025414c637002627.mockapi.io/api/fiddle/users", {
    isLogin: e,
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {

  updateIsLogin(false);

  destroyCookie({ res }, "jwt", {
    path: "/api/login",
  });
  // setCookie({ res }, 'LoginStatus', "false", {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== 'development',
  //   maxAge: 30 * 24 * 60 * 60,
  //   path: '/',
  // });
  res.status(200).end();
};
