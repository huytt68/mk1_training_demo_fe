import { jwtDecode } from 'jwt-decode';

const delete_cookie = (name) => {
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const decodeToken = (token) => {
	try {
		const decoded = jwtDecode(token);
		if (decoded.exp * 1000 < Date.now()) {
			delete_cookie('accessToken');
			return null;
		}
		return decoded;
	} catch (error) {
		console.error('Error decoding token:', error);
		return null;
	}
};
