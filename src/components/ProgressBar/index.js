import React from "react";
import styled from "styled-components";

const Border = styled.div`
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const Innerdiv = styled(Border)`
  background-color: ${props =>
    props.percentage > 100 ? "#ff2e63" : props.color};
  width: ${props =>
    props.percentage > 100
      ? 100
      : props.percentage < 0
      ? 0
      : props.percentage}%;
  height: 20px;
  left: 0;
  top: 0;
`;

const Textdiv = styled(Border)`
  width: 100%;
  height: 20px;
  top: 0;
  left: 0;
  position: absolute;
`;

const ProgressBar = styled(Border)`
  position: relative;
  height: 20px;
  text-align: center;
  width: 300px;
  margin: 16px 0;
`;

export default ({ percentage, color, limit }) => {
  return (
    <ProgressBar>
      <Innerdiv color={color} percentage={percentage} />
      <Textdiv>
        {percentage > limit ? limit : percentage < 0 ? 0 : percentage}%
      </Textdiv>
    </ProgressBar>
  );
};
