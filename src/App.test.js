import React, {useState as useStateMock} from "react";
import renderer from "react-test-renderer";
import App from "./App";
import {shallow} from "enzyme";

jest.mock("./api", () => {
  return {
    getProgressBarData: () => {
      return new Promise((resolve) => {
        resolve(["data"]);
      });
    },
  };
});

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
  useRef: jest.fn(),
}));

const setState = jest.fn();

describe("Test case for App.js", () => {
  let wrapper = null;

  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState]);
    wrapper = shallow(<App />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders App", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("call api", () => {
    const tree = renderer.create(<App />);
    tree.update();
    expect(setState).toHaveBeenCalled();
  });

  it("option does trigger on change", () => {
    wrapper
      .find("select")
      .props()
      .onChange({
        target: {
          value: "1",
        },
      });
    expect(setState).toHaveBeenCalled();
  });
});
