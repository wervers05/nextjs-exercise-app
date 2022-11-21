import axios from "axios";
import Head from "next/head";
import React from "react";
import nookies from "nookies";
import { LoginForm } from "../components/form-fields/LoginForm";
import { GetServerSideProps } from "next/types";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login - Development Exercise</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginForm />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  let users = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get(
        "https://6371e259025414c637002627.mockapi.io/api/fiddle/users"
      );
      users = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (cookies?.jwt && cookies?.LoginStatus) {
    return {
      redirect: {
        permanent: false,
        destination: "/profile",
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
