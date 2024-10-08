import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../configs/axiosConfig';

const Header = () => {
	const navigate = useNavigate();

	const delete_cookie = (name) => {
		document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	};

	const handleLogout = async () => {
		const device_token = localStorage.getItem('fcmToken');
		try {
			const response = await axiosInstance.post('/logout', { device_token });
			if (response.status === 200) {
				localStorage.clear();
				delete_cookie('accessToken');
				navigate('/login');
			} else {
				console.error('Logout failed:', response.data);
			}
		} catch (error) {
			console.error('Error during logout:', error.response ? error.response.data : error.message);
		}
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						MyApp
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link" to="/">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/products">
									Products
								</Link>
							</li>
						</ul>
						<div className="d-flex align-items-center">
							{/* Icon giỏ hàng */}
							<div className="nav-item dropdown me-4">
								<Link className="nav-link" to="/cart">
									<i className="bi bi-cart"></i> Cart
								</Link>
							</div>

							{/* Dropdown tên người dùng */}
							<div className="dropdown">
								<button
									className="btn btn-outline-secondary dropdown-toggle"
									type="button"
									id="dropdownMenuButton"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									username
								</button>
								<ul
									className="dropdown-menu dropdown-menu-end"
									aria-labelledby="dropdownMenuButton"
								>
									<li>
										<button className="dropdown-item" onClick={handleLogout}>
											Logout
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
