import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  position: absolute;
  z-index: 9999;
  display: none;
  @media screen and (max-width: 768px) {
    display: block !important;
  }
`;

const Mobile = () => {
  return <Container></Container>;
};

export default Mobile;
