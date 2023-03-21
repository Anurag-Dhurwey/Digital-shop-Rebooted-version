import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Carousel = (props) => {
  const { children,bgBanner } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  // ...
  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };
  // ...

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
  }, [children]);
  // ...

  return (
    <>
      <Wrapper className="carousel-container">
        <div className=" flex w-[100%] relative">
          {/* You can alwas change the content of the button to other things */}
          {currentIndex > 0 && (
            <button onClick={prev} className="left-arrow left-[24px] top-[35px] md:top-[65px] lg:top-[100px] bg-green-700">
              &lt;
            </button>
          )}
          <div className={`${bgBanner?'absolute z-[-1]':''}`}>
          <div className="overflow-hidden w[100%] h-[100%] ">
            <div
              className="carousel-content"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {children}
            </div>
          </div>
          </div>
          {/* You can alwas change the content of the button to other things */}
          {currentIndex < length - 1 && (
            <button onClick={next} className="right-arrow right-[24px] top-[35px] md:top-[65px] lg:top-[100px] bg-green-700">
              &gt;
            </button>
          )}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  


  .carousel-content {
    display: flex;
    transition: all 250ms linear;
    -ms-overflow-style: none; /* hide scrollbar in IE and Edge */
    scrollbar-width: none; /* hide scrollbar in Firefox */
  }

  /* hide scrollbar in webkit browser */
  .carousel-content::-webkit-scrollbar,
  .carousel-content::-webkit-scrollbar {
    display: none;
  }

  .carousel-content > * {
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1;
  }

  .left-arrow,
  .right-arrow {
    position: absolute;
    z-index: 5;
    // background-color: green;
    transform: translateY(-50%);
    width: 28px;
    height: 28px;
    border-radius: 24px;
    // background-color: white;
    border: 1px solid #ddd;
  }

  
  
`;

export default Carousel;
