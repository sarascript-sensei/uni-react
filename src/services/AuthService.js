import axios from "axios";

const API_URL = "https://back-for-uni.herokuapp.com";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL+"/user/login", {
        email,
        password
      })
      .then(response => {
        console.log(response.data.jwt)
        localStorage.setItem("user", response.data.jwt);
      });
  }


  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();