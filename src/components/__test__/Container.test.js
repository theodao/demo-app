import React from "react";
import renderer from "react-test-renderer";
import Container from "../Container";

it("renders Button", () => {
  const tree = renderer.create(<Container />).toJSON();
  expect(tree).toMatchSnapshot();
});
