import React from "react";
import Link from "next/link";
import { ContainerForm, FormContent, FormTitle } from "../formstyles";
import { Typography } from "@mui/material";
import { Container } from "../sharedstyles";

export const UserProfile = ({ users }: any) => {
  console.table(JSON.stringify(users));
  return (
    <>
      <Container>
        <FormTitle>Users</FormTitle>
        <FormContent>
          <Typography>
            {users?.map((user) => (
              <div key={user.id}>
                <Link href={`/profile/${user.id}`}>{user.username}</Link>
              </div>
            ))}
          </Typography>
        </FormContent>
      </Container>
    </>
  );
};
