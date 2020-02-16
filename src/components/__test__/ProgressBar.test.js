import React from "react";
import renderer from "react-test-renderer";
import ProgressBar from "../ProgressBar";

it("renders Button", () => {
  const tree = renderer.create(<ProgressBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
