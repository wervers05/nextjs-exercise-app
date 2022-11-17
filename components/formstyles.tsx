import styled from "styled-components";

const Container = styled.div`
  max-width: 450px;
  margin: 4rem auto 6rem;
  padding: 2rem;
  background: #fff;
  border-radius: 15px;
  box-shadow: rgba(0, 34, 54, 0.671) 0px 1px 17px;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Link = styled.a`
  cursor: pointer;
  margin: 1rem 0 0;
  color: gray;
  &:hover {
    color: #333;
  }
`;

export {
  Container as ContainerForm,
  Title as FormTitle,
  Content as FormContent,
  Link as FormLink,
};
