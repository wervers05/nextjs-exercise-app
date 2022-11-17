import React from "react";
import { ContainerForm, FormContent, FormTitle } from "../formstyles";

export const UserTable = ({ details, uid }: any) => {
  console.log(JSON.stringify(details));
  return (
    <>
      <ContainerForm>
        <FormTitle>{details.id}</FormTitle>
        <FormContent>
          {details?.map(
            (details = (
              <div key={details.id}>
                <h3>Username: {details.username}</h3>
                <p>Password: {details.password}</p>
                <p>Confirm: {details.confirm}</p>
                <p>First Name: {details.firstName}</p>
                <p>Last Name: {details.middleName || ""}</p>
                <p>Last Name: {details.lastName}</p>
                <p>Email Add: {details.email}</p>
                <p>Phone: {details.phone}</p>
              </div>
            ))
          )}
        </FormContent>
      </ContainerForm>
    </>
  );
};
