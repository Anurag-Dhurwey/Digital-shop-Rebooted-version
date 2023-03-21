import React from "react";
import styled from "styled-components";
import Carousel from "../Mini_components/Home/Carousel";
import Featured from "../Mini_components/Home/HomeProducts/Featured";
import ProductsTemplate from "../Mini_components/Home/HomeProducts/ProductsTemplate";
const Home = () => {
  return (
    <>
      <Wrapper>
        <div className="container mx-auto  text-center ">
          <Carousel bgBanner={true}>
            <img
              src="https://m.media-amazon.com/images/I/61gpcWo7gzL._SX3000_.jpg"
              alt="placeholder"
            />
            <img
              src="https://m.media-amazon.com/images/I/61iV+-ws85L._SX3000_.jpg"
              alt="placeholder"
            />
            <img
              src="https://m.media-amazon.com/images/I/61fCb-6IOuL._SX3000_.jpg"
              alt="placeholder"
            />
            <img
              src="https://m.media-amazon.com/images/I/61gpcWo7gzL._SX3000_.jpg"
              alt="placeholder"
            />
            <img
              src="https://m.media-amazon.com/images/I/61iV+-ws85L._SX3000_.jpg"
              alt="placeholder"
            />
            <img
              src="https://m.media-amazon.com/images/I/61fCb-6IOuL._SX3000_.jpg"
              alt="placeholder"
            />
          </Carousel>

          <div className="main mt-[80px] md:mt-[150px] lg:mt-[250px]  ">
            <Featured ProductsTemplate={ProductsTemplate} title={'Featured today'}/>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.div`
  margin-bottom: auto;
`;
