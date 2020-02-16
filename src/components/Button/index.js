import React from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 4px 12px;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #bbb;
  overflow: visible;
  color: #fff;
  text-shadow: 0 1px 0
  white-space: nowrap;
  border-radius: 5px;
  background-color: #269CE9;
  border-color: #269CE9
 &:hover{
  background-color: #70B9E8;
  color: #555;
}

&:active{
  background: #269CE9;
  position: relative;
  top: 1px;
  text-shadow: none;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
}
`;

export default ({ onClick = () => {}, children }) => {
  return <Button onClick={onClick}>{children}</Button>;
};
