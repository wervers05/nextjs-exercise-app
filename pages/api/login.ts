import { setCookie } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";
import { sign } from 'jsonwebtoken'

const secretKey = "mysecretkey";

  export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { username } = req.body;
    try {
      const token = sign(
        {
          exp:Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
          username: username,
        },
        secretKey
      );

      setCookie({ res }, 'jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'test',
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      setCookie({ res }, 'LoginStatus', "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'test',
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      res.status(200).end();
    } catch (e) {
      res.status(400).send(e);
    }
  };