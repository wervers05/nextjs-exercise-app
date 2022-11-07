import Head from "next/head";
import { RegistrationForm } from "../components/form-fields/RegistrationForm";
import {
  Container,
  Main,
  Title,
  Description,
  CodeTag,
} from "../components/sharedstyles";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Exercise 01</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <RegistrationForm />
      </Main>
    </Container>
  );
}
