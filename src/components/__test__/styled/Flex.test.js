import React from "react";
import renderer from "react-test-renderer";
import Flex from "../../styled/Flex";

it("renders Button", () => {
  const tree = renderer.create(<Flex />).toJSON();
  expect(tree).toMatchSnapshot();
});
