import React, {useState, useEffect} from "react";
import api from "./api";
import styled from "styled-components";
import ProgressBar from "./components/ProgressBar";
import Flex from "./components/styled/Flex";
import Button from "./components/Button";
import Container from "./components/Container";

const Headline = styled.h1``;

function App() {
  let [buttonValues, setButtonValues] = useState([]);
  let [barValues, setBarValues] = useState([]);
  let [loading, setLoading] = useState(false);
  let [limit, setLimit] = useState(0);
  let [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    api
      .getProgressBarData()
      .then(response => {
        const {buttons, bars, limit} = response;
        setButtonValues(buttons);
        setBarValues(bars);
        setLoading(false);
        setLimit(limit);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleButtonClick = num => {
    setBarValues(
      barValues.map((item, index) => {
        if (index === currentIndex) {
          if (num + item > limit) {
            return limit;
          } else if (num + item < 0) {
            return 0;
          } else {
            return num + item;
          }
        } else {
          return item;
        }
      }),
    );
  };

  return (
    <Container loading={loading}>
      <Flex justifyContent="center" alignItems="center" style={{height: "100vh"}}>
        <div>
          <Headline>Progress Bars Demo</Headline>
          {/* Should not set key as index here */}
          <Flex>
            {barValues.map((barValue, index) => {
              return <ProgressBar percentage={barValue} color="#6497b1" limit={limit} key={index} />;
            })}
          </Flex>
          <Flex flexDirection="row" justifyContent="space-between">
            {buttonValues.map((buttonValue, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    handleButtonClick(buttonValue);
                  }}>
                  {buttonValue}
                </Button>
              );
            })}
          </Flex>
          <div style={{margin: "10px"}}></div>
          <select value={currentIndex} onChange={e => setCurrentIndex(Number(e.target.value))}>
            {barValues.map((barValue, index) => {
              return <option key={index} value={index}>{`Progress bar #${index + 1}`}</option>;
            })}
          </select>
        </div>
      </Flex>
    </Container>
  );
}

export default App;
