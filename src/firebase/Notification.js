import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from './firebase';

const Notification = () => {
	const [notification, setNotification] = useState({ title: '', body: '' });
	const notify = () => toast(<ToastDisplay />);
	function ToastDisplay() {
		return (
			<div>
				<p>
					<b>{notification?.title}</b>
				</p>
				<p>{notification?.body}</p>
			</div>
		);
	}

	useEffect(() => {
		requestForToken(); // Chỉ gọi một lần khi component được mount

		const messageHandler = async () => {
			try {
				const payload = await onMessageListener();
				setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
			} catch (err) {
				console.log('failed: ', err);
			}
		};

		messageHandler();
	}, []);

	useEffect(() => {
		if (notification?.title) {
			notify();
		}
	}, [notification]);

	return <Toaster />;
};

export default Notification;
