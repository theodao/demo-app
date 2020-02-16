import Api, {HttpException} from "../api";

describe("Test HttpException", () => {
  it("HttpException", () => {
    let error = () => {
      throw new HttpException({
        message: "mess",
        status: "status",
        statusText: "status text",
        url: "url",
        ErrorCode: 400,
        data: "data",
      });
    };
    expect(error).toThrow(HttpException);
  });
});
describe("Test api", () => {
  it("Api", () => {
    const _Api = new Api({baseUri: "adb", token: "111"});
    _Api.putData({path: "daf", data: "dafd"});
    _Api.getData({path: "daf"});
    _Api.postData({path: "daf", data: "dafd"});
    _Api.deleteData({path: "daf", data: "dafd"});

    jest.fn().mockReturnValueOnce(JSON.stringify({data: "1234"}));
    _Api
      .callApi({
        method: "GET",
        path: "abc",
        data: "data",
        newToken: "token",
      })
      .then(res => {
        expect(res.ok).toEqual(true);
      });
    expect(_Api).toBeDefined();
  });
  it("Api define", () => {
    const _Api = new Api({baseUri: "adb", token: ""});
    expect(_Api).toBeDefined();
  });
});
