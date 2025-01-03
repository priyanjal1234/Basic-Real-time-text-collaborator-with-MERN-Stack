import api from "./api";

class UserService {
  constructor() {
    this.api = api;
    this.baseUrl = "https://basic-real-time-text-collaborator-with.onrender.com/api/users";
  }

  async createAccount({ name, email, password }) {
    try {
      return await this.api.post(
        `${this.baseUrl}/register`,
        { name, email, password },
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async loginAccount({ email, password }) {
    try {
      return await this.api.post(
        `${this.baseUrl}/login`,
        { email, password },
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async logoutAccount() {
    try {
      return await this.api.get(`${this.baseUrl}/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async getLoggedinUser() {
    try {
      return await this.api.get(`${this.baseUrl}/profile`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

let userService = new UserService();

export default userService;
