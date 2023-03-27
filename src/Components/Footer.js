import React from "react";
import styled from "styled-components";
import { BsFacebook, BsGithub, BsLinkedin, BsPinterest } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillCodepenCircle } from "react-icons/ai";
import { useGlobleContext } from "../Context/Globle_Context";

const Footer = () => {
  const { enabled } = useGlobleContext();
  return (
    <>
      <Wrapper className={`${enabled ? "bg-gray-800 " : "bg-slate-300"} py-10 z-[2]`}>
        <div className="flex justify-center align-middle gap-x-5">
          <BsFacebook className="Icon text-[#4267B2]" />
          <a
            href="https://www.instagram.com/anurag__dhurwey/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagramSquare className="Icon text-[#C13584] cursor-pointer" />
          </a>
          <a
            href="https://github.com/Anurag-Dhurwey?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub className="Icon text-[#000000] cursor-pointer" />
          </a>
          <a
            href="https://www.linkedin.com/in/anurag-dhurwey-03732024b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin className="Icon text-[#0e76a8] cursor-pointer" />
          </a>

          <BsPinterest className="Icon text-[#E60023]" />
          <AiFillCodepenCircle className="Icon text-white text-lg" />
        </div>
        <div
          className={`${
            enabled ? "text-white" : "text-black"
          } text-center mt-3`}
        >
          <h5>© 2023 Copyright: Digital Shop</h5>
        </div>
      </Wrapper>
    </>
  );
};

export default Footer;

const Wrapper = styled.div`
  .Icon {
    font-size: 30px;
  }
`;
