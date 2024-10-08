import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { decodeToken } from '../utils/auth';
import { getCookie } from '../utils/getCookie';

const Login = () => {
	const [dataLogin, setDataLogin] = useState({ username: '', password: '' });
	const navigate = useNavigate();

	useEffect(() => {
		const token = getCookie('accessToken');

		if (token) {
			const decodedToken = decodeToken(token);

			// Nếu token hợp lệ và chưa hết hạn, điều hướng dựa trên role
			if (decodedToken && decodedToken.role_id) {
				if (decodedToken.role_id == 1) {
					navigate('/admin');
				} else if (decodedToken.role == 2) {
					navigate('/home');
				}
			}
		}
	}, [navigate]);

	const login = () => {
		axios
			.post('https://musical-friendly-worm.ngrok-free.app/login', dataLogin)
			.then((res) => {
				if (res.data.accessToken) {
					const decodedToken = decodeToken(res.data.accessToken);
					console.log(decodedToken);
					localStorage.setItem('user_id', decodedToken._id);
					localStorage.setItem('role_id', decodedToken.role_id);
					document.cookie = `accessToken=${res.data.accessToken}; path=/; max-age=21600`;
					if (decodedToken.role_id == 1) {
						navigate('/admin');
					} else if (decodedToken.role_id == 2) {
						navigate('/home');
					}
				} else {
					console.log('Token not found in response');
				}
			})
			.catch((e) => {
				alert('Wrong username or password!');
				console.log(e);
			});
	};

	const onChangeUsername = (event) => {
		setDataLogin({ ...dataLogin, username: event.target.value });
	};

	const onChangePassword = (event) => {
		setDataLogin({ ...dataLogin, password: event.target.value });
	};

	return (
		<>
			<div className="container">
				<div className="row d-flex">
					<div className="col-2"></div>
					<div className="col-8 login">
						<h2 className="mb-4 text-center">Login</h2>
						<div className="form-group">
							<label>Username</label>
							<input
								type="text"
								className="form-control"
								value={dataLogin.username}
								onChange={(e) => onChangeUsername(e)}
								placeholder="Username"
							/>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input
								type="password"
								className="form-control"
								value={dataLogin.password}
								onChange={(e) => onChangePassword(e)}
								placeholder="Password"
							/>
						</div>
						<div className="row">
							<div className="col-12">
								<button className="btn btn-primary w-100 mt-2" onClick={login}>
									Login
								</button>
							</div>
						</div>
						<div className="row">
							<div className="col-12 text-center mt-2">
								<Link>Register</Link>
							</div>
						</div>
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		</>
	);
};

export default Login;
