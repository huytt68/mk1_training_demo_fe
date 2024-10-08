import React from 'react';
import Login from './components/Login';
import Base from './components/Base';
import Admin from './components/Admin';
import Home from './components/Home';
import Products from './components/Products';
import CartPage from './components/CartPage';
import ProductDetail from './components/ProductDetail';
import PaymentResult from './components/PaymentResult';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';

const App = () => {
	return (
		<>
			<Routes>
				<Route index path="/login" element={<Login />} />
				<Route element={<PrivateRoute allowedRoles="2" />}>
					<Route path="/" element={<Base />}>
						<Route path="" element={<Home />} />
						<Route path="products" element={<Products />} />
						<Route path="products/:id" element={<ProductDetail />} />
						<Route path="/cart" element={<CartPage />} />
						<Route path="/vnpay-return" element={<PaymentResult />} />
					</Route>
				</Route>
				<Route element={<PrivateRoute allowedRoles="1" />}>
					<Route path="/admin" element={<Admin />} />
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
			<ToastContainer />
		</>
	);
};

export default App;
