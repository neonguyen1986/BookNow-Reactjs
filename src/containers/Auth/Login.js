import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { every } from "lodash";

class Login extends Component {
  constructor(props) {
    // khai báo các state ở đây
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
    };
  }

  handleOnChangeInput = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    this.setState({
      [inputName]: inputValue,
    });
    // console.log(`check ${inputName}:`, inputValue);
  };

  handleLogin = () => {
    alert(this.state.username + this.state.password);
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword
    })
  }

  render() {
    let { username, password, isShowPassword } = this.state;
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="login-text col-12">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                name="username"
                onChange={(e) => this.handleOnChangeInput(e)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={isShowPassword === false ? "password" : "text"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  name="password"
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
                <span
                  onClick={() => this.handleShowHidePassword()}
                >
                  <i className={isShowPassword === false ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                </span>
              </div>
            </div>
            <div className="col-12">
              <button className="login-btn" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-2">
              <span className="other-login"> Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g"></i>
              <i className="fab fa-facebook-f"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
