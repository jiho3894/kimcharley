import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { gitID } from "../../Recoil/Atom";

type Inputs = {
  Email: string;
  Password: string;
  Password2: string;
  NickName?: string;
};

const Form = styled.form`
  margin: auto 0;
  width: 400px;
  height: 400px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Back = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  &:hover {
    transform: scale(1.05);
    transition: 0.3s;
  }
`;

const LogoBox = styled.div`
  width: 15rem;
  height: 80px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 40px;
    font-weight: 600;
  }
  a {
    color: red;
  }
`;

const InputBox = styled.div`
  width: 90%;
  height: 40px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
`;

const Span = styled.span`
  color: black;
  line-height: 60px;
`;

const Body = styled.div`
  width: 100%;
  height: 100vh;
  word-break: keep-all;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://assets.nflxext.com/ffe/siteui/vlv3/9737377e-a430-4d13-ad6c-874c54837c49/945eec79-6856-4d95-b4c6-83ff5292f33d/KR-ko-20220111-popsignuptwoweeks-perspective_alpha_website_large.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainOpacity = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;

  background: linear-gradient(
    rgba(0, 0, 0, 0.6),
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.6)
  );
`;

const Login = () => {
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();
  const setID = useSetRecoilState(gitID);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.Password !== data.Password2) {
      setError("Password", { message: "not same" }, { shouldFocus: true });
      return;
    }
    alert("로그인 성공");
    setID(data.NickName);
    Navigate("/");
  };
  return (
    <Body>
      <MainContainer>
        <MainOpacity />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Link to="/">
            <Back>
              <ArrowBackIcon />
            </Back>
          </Link>
          <LogoBox>
            <span>
              <a href="https://github.com/jiho3894/kimcharley">Charleyflix</a>
            </span>
          </LogoBox>
          <InputBox>
            <TextField
              label="Email"
              variant="standard"
              placeholder="Email"
              autoFocus
              required
              {...register("Email", {
                pattern: {
                  value: /^[A-Za-z0-9._%+-]/g,
                  message: "email pattern",
                },
              })}
            />
            <Span>{errors?.Email?.message}</Span>
          </InputBox>
          <InputBox>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              variant="standard"
              autoComplete="off"
              {...register("Password", {
                required: true,
                pattern: {
                  value: /^[A-Za-z0-9._%+-]/g,
                  message: "not pattern",
                },
              })}
            />
            <Span>{errors?.Password?.message}</Span>
          </InputBox>
          <InputBox>
            <TextField
              id="standard-password-input"
              label="Try Password"
              type="password"
              variant="standard"
              autoComplete="off"
              {...register("Password2", {
                required: true,
                pattern: {
                  value: /^[A-Za-z0-9._%+-]/g,
                  message: "error",
                },
              })}
            />
            <Span>{errors?.Password2?.message}</Span>
          </InputBox>
          <InputBox>
            <TextField
              id="standard-basic"
              label="Github ID"
              variant="standard"
              required
              {...register("NickName", {
                required: true,
                minLength: {
                  value: 3,
                  message: "minLength 3",
                },
                pattern: {
                  value: /^[A-Za-z0-9._%+-]/g,
                  message: "pattern error",
                },
                validate: (value) =>
                  value?.includes("Jiho3894") ? "allow Jiho" : true,
              })}
            />
            <Span>{errors?.NickName?.message}</Span>
          </InputBox>
          {/* <Button variant="contained">Submit</Button> */}
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Form>
      </MainContainer>
    </Body>
  );
};

export default Login;
