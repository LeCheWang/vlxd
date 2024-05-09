import StorageService from "./storage.service";

const HttpService = {
  getAccessToken: () => {
    const token = StorageService.get("token");
    return token;
  },
  getAccessAccount: () => {
    const account = StorageService.getObject("current_account");
    return account;
  },
};

export default HttpService;
