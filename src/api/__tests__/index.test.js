import api from "../index";

describe("testin api", () => {
  it("getProgressBarData does working", () => {
    api.getProgressBarData({}).then(res => {
      expect(res).toBeDefined();
    });
  });
});
