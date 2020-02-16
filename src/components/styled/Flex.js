import React from "react";
import styled from "styled-components";
import {flex, flexDirection, flexbox, flexBasis, flexWrap, justifyContent, alignItems} from "styled-system";

const Wrap = styled.div(
  {display: "flex", flexDirection: "column"},
  flex,
  flexDirection,
  flexbox,
  flexBasis,
  flexWrap,
  justifyContent,
  alignItems,
);

const Flex = ({children, ...props}) => <Wrap {...props}>                                     {children}</Wrap>;

export default Flex;
