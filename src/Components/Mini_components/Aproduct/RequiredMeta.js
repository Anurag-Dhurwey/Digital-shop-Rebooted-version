import React from "react";
import styled from "styled-components";
import { useGlobleContext } from "../../../Context/Globle_Context";

const RequiredMeta = ({ metaData }) => {
  const { enabled } = useGlobleContext();
  const { meta } = metaData;

  return (
    <>
      <Wrapper>
      <table>
      <tbody>
      {meta.map((item, i) => {
        const { key, value } = item;
        return (
          
            <tr
            key={i}
              className={` ${
                enabled ? "even:bg-zinc-700 odd:bg-zinc-800 text-white" : "even:bg-slate-300 odd:bg-white text-black"
              }`}
            >
              <th>{key}</th>
              <td>{value}</td>
            </tr>
          
        );
      })}
      </tbody>
      </table>
      </Wrapper>
    </>
  );
};

const Wrapper=styled.div`
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 2px;
  }
  
  // tr:nth-child(even) {
  //   background-color: #dddddd;
  // }
`

export default RequiredMeta;
