import React from "react";
import { useGlobleContext } from "../../Context/Globle_Context";
// import connecting from "../../connecting";
import styled from "styled-components";

const ConnectingToServer = () => {
  const { state,enabled } = useGlobleContext();
  const { products } = state;
  return (
    <>
      {products.length < 1 && (
        <div className="h-min flex justify-center items-center">
          <h2 className={`text-[15px] ${enabled?'text-white':'text-black'}`}>Connecting to Database....</h2>

         <Wrapper className="h-[25px]">
         <div className="loadingio-spinner-pulse-didw0j0ramu">
            <div className="ldio-epfdn7pjviq">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
         </Wrapper>
         <Wrapper className="h-[25px]">
         <div className="loadingio-spinner-pulse-didw0j0ramu">
            <div className="ldio-epfdn7pjviq">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
         </Wrapper>
         <Wrapper className="h-[25px]">
         <div className="loadingio-spinner-pulse-didw0j0ramu">
            <div className="ldio-epfdn7pjviq">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
         </Wrapper>
        </div>
      )}
    </>
  );
};

export default ConnectingToServer;

const Wrapper = styled.div`
  @keyframes ldio-epfdn7pjviq-1 {
    0% {
      top: 5px;
      height: 16px;
    }
    50% {
      top: 7px;
      height: 10px;
    }
    100% {
      top: 7px;
      height: 10px;
    }
  }
  @keyframes ldio-epfdn7pjviq-2 {
    0% {
      top: 5.99999999999999px;
      height: 15.00000000000001px;
    }
    50% {
      top: 7px;
      height: 10px;
    }
    100% {
      top:7px;
      height: 10px;
    }
  }
  @keyframes ldio-epfdn7pjviq-3 {
    0% {
      top: 6px;
      height: 13px;
    }
    50% {
      top: 7px;
      height: 10px;
    }
    100% {
      top: 7px;
      height: 10px;
    }
  }
  .ldio-epfdn7pjviq div {
    position: absolute;
    width: 4px;
  }
  .ldio-epfdn7pjviq div:nth-child(1) {
    left: 5px;
    background: #e15b64;
    animation: ldio-epfdn7pjviq-1 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation-delay: -0.2s;
  }
  .ldio-epfdn7pjviq div:nth-child(2) {
    left: 10px;
    background: #f8b26a;
    animation: ldio-epfdn7pjviq-2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation-delay: -0.1s;
  }
  .ldio-epfdn7pjviq div:nth-child(3) {
    left: 16px;
    background: #abbd81;
    animation: ldio-epfdn7pjviq-3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation-delay: undefineds;
  }

  .loadingio-spinner-pulse-didw0j0ramu {
    width: 25px;
    height: 25px;
    display: inline-block;
    overflow: hidden;
    background: none;
  }
  .ldio-epfdn7pjviq {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-epfdn7pjviq div {
    box-sizing: content-box;
  }
`;

