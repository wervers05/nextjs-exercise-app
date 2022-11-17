import { NextApiRequest, NextApiResponse } from "next";
import { setCookie, destroyCookie } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  destroyCookie({ res }, 'jwt', {
    path: '/',
  });

  setCookie({ res }, 'LoginStatus', "false", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'test',
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });

  res.status(200).end();
};
