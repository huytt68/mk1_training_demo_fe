import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getCookie } from '../utils/getCookie';

const firebaseConfig = {
	apiKey: 'AIzaSyDsp51glgEIFR5nWqnCOEPavMyeNShrGtA',
	authDomain: 'nodejs-api-6b198.firebaseapp.com',
	projectId: 'nodejs-api-6b198',
	storageBucket: 'nodejs-api-6b198.appspot.com',
	messagingSenderId: '456140001292',
	appId: '1:456140001292:web:ef007f0af69ea0451cde29',
	measurementId: 'G-074W5D0FHV',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
	const accessToken = getCookie('accessToken');
	// Kiểm tra xem đã yêu cầu token chưa
	const tokenRequested = localStorage.getItem('tokenRequested');
	if (tokenRequested) {
		return; // Khong tao token moi
	}
	try {
		const token = await getToken(messaging, {
			vapidKey:
				'BGdec85uIi800fJ9GBWCLMaLX_Akun6nvBNyeLUytxTlf3u5k1Yo7Iutj0QMoDHD9AVw-Jk8BF-vhai3P2KH9dQ',
		});
		if (token) {
			localStorage.setItem('fcmToken', token);
			// Gửi token lên server
			fetch('https://musical-friendly-worm.ngrok-free.app/register-token', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Token sent to server:', data);
					localStorage.setItem('tokenRequested', 'true');
				})
				.catch((error) => {
					console.error('Error sending token:', error);
				});
		} else {
			console.error('No registration token available.');
		}
	} catch (error) {
		console.error('Error getting token:', error);
	}
};

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});
