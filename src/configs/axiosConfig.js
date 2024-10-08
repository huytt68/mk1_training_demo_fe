import axios from 'axios';
import { getCookie } from '../utils/getCookie';

// Tạo một instance của Axios
const axiosInstance = axios.create({
	baseURL: 'https://musical-friendly-worm.ngrok-free.app/', // Thay đổi URL thành API của bạn
});

// Thêm interceptor để thêm accessToken vào headers
axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = getCookie('accessToken'); // Lấy accessToken từ cookie
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`; // Thêm Bearer token vào headers
		}
		return config;
	},
	(error) => {
		return Promise.reject(error); // Xử lý lỗi
	}
);

export default axiosInstance;
