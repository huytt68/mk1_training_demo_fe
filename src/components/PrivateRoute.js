import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { decodeToken } from '../utils/auth';
import { getCookie } from '../utils/getCookie';

const PrivateRoute = ({ allowedRoles }) => {
	// Thay đổi allowedRoles thành props
	const token = getCookie('accessToken');

	if (!token) {
		return <Navigate to="/login" />;
	}

	const decodedToken = decodeToken(token);

	// Kiểm tra quyền
	if (decodedToken && allowedRoles.includes(decodedToken.role_id)) {
		// Sửa lại điều kiện kiểm tra quyền
		return <Outlet />;
	} else {
		// Điều hướng theo vai trò
		if (decodedToken.role_id === '1') {
			return <Navigate to="/admin" />;
		} else if (decodedToken.role_id === '2') {
			return <Navigate to="/" />;
		} else {
			return <Navigate to="/login" />;
		}
	}
};

export default PrivateRoute;
