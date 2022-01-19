import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../../Api/api";

const Body = styled.div`
  min-width: 1400px;
  max-height: 100vh;
  word-break: keep-all;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://assets.nflxext.com/ffe/siteui/vlv3/9737377e-a430-4d13-ad6c-874c54837c49/945eec79-6856-4d95-b4c6-83ff5292f33d/KR-ko-20220111-popsignuptwoweeks-perspective_alpha_website_large.jpg");
`;

const MainOpacity = styled.div`
  background: linear-gradient(
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.8)
  );
`;

const MainHeader = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  display: flex;
  z-index: 10;
`;

const HeaderWrapper = styled.header`
  width: 98%;
  height: 100px;
  position: absolute;
  display: flex;
  justify-content: space-between;
`;

const LogoBox = styled.div`
  width: 15rem;
  height: 80px;
  margin: 5px;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 40px;
    font-weight: 600;
  }
`;

const LoginBtnBox = styled.div`
  width: 5rem;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.div`
  width: 120px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    cursor: pointer;
    width: 100px;
    height: 40px;
    font-size: 18px;
    border-radius: 5px;
    border: 0;
    background-color: red;
    color: white;
  }
`;

const SectionWrapper = styled.div`
  width: 100%;
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 8px solid #222;
  position: relative;
  z-index: 3000;
`;

const SectionContainer = styled.div`
  min-width: 700px;
  height: 40vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  h1 {
    font-size: 68px;
    font-weight: 600;
    text-align: center;
  }
  h4 {
    text-align: center;
    font-size: 23px;
  }
`;

const SectionBtnContainer = styled.div`
  width: 300px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionBtnBox = styled(Link)`
  width: 80%;
  height: 80%;
  font-size: 35px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
`;

const SectionBtn = styled.span``;

const PlayContainer = styled.div`
  width: 100%;
  height: 50vh;
  border-bottom: 8px solid #222;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayBox = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  min-width: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 68px;
    font-weight: 600;
    padding-bottom: 20px;
  }
  h4 {
    font-size: 23px;
  }
`;

const VideoContainer = styled.div`
  min-width: 400px;
  max-height: 100%;
  position: relative;
  overflow: hidden;
`;

const VideoImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border: 0;
  position: relative;
  z-index: 2;
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 73%;
  max-height: 54%;
  position: absolute;
  top: 46%;
  left: 48%;
  transform: translate(-50%, -50%);
`;

const Customer = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>("start", getMovies);
  localStorage.setItem("movieId", String(data?.results[0].id));
  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <Body>
          <MainContainer>
            <MainOpacity>
              <MainHeader>
                <HeaderWrapper>
                  <LogoBox>
                    <span>Charleyfilx</span>
                  </LogoBox>
                  <LoginBtnBox>
                    <LoginBox>
                      <a href="https://www.netflix.com/kr/login">
                        <button>로그인</button>
                      </a>
                    </LoginBox>
                  </LoginBtnBox>
                </HeaderWrapper>
              </MainHeader>
              <SectionWrapper>
                <SectionContainer>
                  <h1>
                    영화와 시리즈를 <br /> 무제한으로.
                  </h1>
                  <h4>
                    다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.
                  </h4>
                  <SectionBtnContainer>
                    <SectionBtnBox to="/movies">
                      <SectionBtn>시작하기 &#62;</SectionBtn>
                    </SectionBtnBox>
                  </SectionBtnContainer>
                </SectionContainer>
              </SectionWrapper>
            </MainOpacity>
          </MainContainer>
          <PlayContainer>
            <PlayBox>
              <TextContainer>
                <div>
                  <h1>TV로 즐기세요.</h1>
                  <h4>
                    스마트 TV, PlayStation, Xbox, Chromecast,
                    <br /> Apple TV, 블루레이 플레이어 등 다양한
                    <br /> 디바이스에서 시청하세요.
                  </h4>
                </div>
              </TextContainer>
              <VideoContainer>
                <VideoImg
                  alt=""
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                  data-uia="our-story-card-img"
                />
                <VideoWrapper>
                  <video autoPlay playsInline muted loop>
                    <source
                      src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                      type="video/mp4"
                    />
                  </video>
                </VideoWrapper>
              </VideoContainer>
            </PlayBox>
          </PlayContainer>
          <PlayContainer>
            <PlayBox>
              <VideoContainer>
                <img
                  alt=""
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
                  data-uia="our-story-card-img"
                />
              </VideoContainer>
              <TextContainer>
                <div>
                  <h1>
                    즐겨 보는 콘텐츠를
                    <br /> 저장해 오프라인으로 <br />
                    시청하세요.
                  </h1>
                  <h4>간편하게 저장하고 빈틈없이 즐겨보세요.</h4>
                </div>
              </TextContainer>
            </PlayBox>
          </PlayContainer>
        </Body>
      )}
    </>
  );
};
export default Customer;
