import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
	constructor(props) {
		// khai báo các state ở đây
		super(props);
		this.state = {
			username: "",
			password: "",
			isShowPassword: false,
			errMessage: ''
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

	handlePressEnter = (e) => {
		if (e.key === "Enter") {
			this.handleLogin()
		}
	}
	handleLogin = async () => {
		this.state.errMessage = ''//clear mã lỗi
		try {
			let data = await handleLoginApi(this.state.username, this.state.password)
			// console.log('>>>check', data)
			if (data && data.errCode !== 0) {
				this.setState({
					errMessage: data.errMessage,
				})
			}
			if (data && data.errCode === 0) {
				//todo
				// console.log('login successful')
				this.props.userLoginSuccess(data.user)
			}
		} catch (error) {
			console.log(error.response)
			if (error.response.data) {
				this.setState({
					errMessage: error.response.data.message,
				})
			}
		}
		// console.log(this.state.username + this.state.password);
	};

	handleShowHidePassword = () => {
		this.setState({
			isShowPassword: !this.state.isShowPassword
		})
	}

	render() {
		let { username, password, isShowPassword, errMessage } = this.state;
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
									onKeyDown={(e) => this.handlePressEnter(e)}
								/>
								<span
									onClick={() => this.handleShowHidePassword()}
								>
									<i className={isShowPassword === false ? "fas fa-eye-slash" : "fas fa-eye"}></i>
								</span>
							</div>
						</div>
						<div className="col-12 err-code">
							{errMessage}
						</div>
						<div className="col-12">
							<button className="login-btn"
								onClick={() => this.handleLogin()}>
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
		// userLoginFail: () => dispatch(actions.userLoginFail()),
		userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
