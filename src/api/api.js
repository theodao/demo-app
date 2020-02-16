import querystring from "query-string";

export class HttpException extends Error {
  constructor({message, status, statusText, url, ErrorCode, data} = {}) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.ErrorCode = ErrorCode;
    this.data = data;
  }
}

export default class Api {
  constructor({baseUri, token, useFormData = false}) {
    this.baseUri = baseUri || "";
    this.credentials = token && token.length > 0 ? token : null;
    this.useFormData = useFormData;
    this.headersBuilder = newToken => {
      var token = newToken || this.credentials;
      const headers = {};
      if (!this.useFormData) {
        headers["Content-Type"] = "application/json";
      }
      if (token) {
        headers.Authorization = token;
      }
      return headers;
    };
  }

  callApi({method, path, data, newToken = null}) {
    const newBody = JSON.stringify(data);
    const fetchOption = {
      method: method,
      mode: "cors",
      headers: this.headersBuilder(newToken),
      body: data !== null ? newBody : null,
    };
    return fetch(this.baseUri + path, fetchOption).then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 500) {
        const _err = {
          message: "System Error",
          ErrorCode: response.status,
          status: response.status,
          statusText: `HttpException[${method}]`,
        };
        throw new HttpException({..._err});
      } else if (response.status === 400) {
        const _err = {
          message: "Bad Request",
          ErrorCode: response.status,
          status: response.status,
          statusText: `HttpException[${method}]`,
        };
        throw new HttpException({..._err});
      } else {
        return response.json().then(metaError => {
          throw new HttpException({
            message: metaError.message || metaError.result,
            ErrorCode: response.status,
            status: response.status,
            statusText: `HttpException[${method}]`,
          });
        });
      }
    });
  }

  getData({path, data = {}}) {
    const paramsString = querystring.stringify(data);

    const fullpath = path + (paramsString === "" ? "" : "?" + paramsString);
    return this.callApi({
      method: "GET",
      path: fullpath,
      data: null,
    });
  }

  postData({path, data}) {
    return this.callApi({
      method: "POST",
      path,
      data,
    });
  }

  putData({path, data}) {
    return this.callApi({
      method: "PUT",
      path,
      data,
    });
  }

  deleteData({path, data}) {
    return this.callApi({
      method: "DELETE",
      path,
      data,
    });
  }
}
