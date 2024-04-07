import axios from "axios";

const apiRequest = async (apiDetails, reqPayload) => {
  const { urlEndpoint, requestMethod } = apiDetails;
  const baseUrl = "https://task-tracking-backend.onrender.com/api";
  let axiosPayload = {
    baseUrl: "https://task-tracking-backend.onrender.com/api",
    url: `${baseUrl}${urlEndpoint}`,
    method: requestMethod,
    responseType: "json",
    timeout: 60 * 3 * 1000,
    data: reqPayload,
    //data bhanne key mai basnuparyo hai ta requestdatapayload cause it is what it is, axios ma estai garnnuparcha
  };

  let apiResponse = await axios.request(axiosPayload);

  return apiResponse;
};

export default apiRequest;
