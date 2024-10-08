// Đăng ký service worker
export function register() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`, { scope: './' })
			.then(function (registration) {
				console.log('Service Worker registered with scope:', registration.scope);
			})
			.catch(function (err) {
				console.error('Service Worker registration failed:', err);
			});
	}
}

// Hủy đăng ký service worker (nếu cần)
export function unregister() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready.then((registration) => {
			registration.unregister();
		});
	}
}
