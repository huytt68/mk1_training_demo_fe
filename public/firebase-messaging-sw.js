importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
	apiKey: 'AIzaSyDsp51glgEIFR5nWqnCOEPavMyeNShrGtA',
	authDomain: 'nodejs-api-6b198.firebaseapp.com',
	projectId: 'nodejs-api-6b198',
	storageBucket: 'nodejs-api-6b198.appspot.com',
	messagingSenderId: '456140001292',
	appId: '1:456140001292:web:ef007f0af69ea0451cde29',
	measurementId: 'G-074W5D0FHV',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message ', payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
