import React from "react";
import axios from "axios";
import nookies from "nookies";
import NavBar from "../../components/navigation/NavBar";
import { UserTable } from "../../components/form-fields/UserTable";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// export default async function handler(req, res) {
//   const params = req.query.
//   console.log(params);
//   res.status(200).json(params);
// }

interface Inputs {
  details: {
    id: string;
    username: string;
    password: string;
    confirm: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export default function Users(props: Inputs, id) {
  const { details } = props;
  return (
    <>
      <NavBar />
      <UserTable details={details} uid={id} />
    </>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const cookies = nookies.get(ctx);
  const { params } = ctx;
  const { id } = params;
  let details = null;
  if (cookies?.UserJWT) {
    try {
      const { data } = await axios.get(
        `https://6371e259025414c637002627.mockapi.io/api/fiddle/users?id=${id}`
      );
      details = data;
      //console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  if (cookies?.loginStatus === "false" || !cookies?.UserJWT) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: { details, id },
  };
};
