import React, { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '../configs/axiosConfig';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
	// Tính tổng tiền
	const [cartItems, setCartItems] = useState([]);
	const navigate = useNavigate();
	const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await axiosInstance.get('/cartitem');
				setCartItems(response.data);
			} catch (error) {
				console.error('Error fetching cart items:', error);
			}
		};

		fetchCartItems();
	}, []);

	const handleCheckout = () => {
		console.log('before send!');
		axiosInstance
			.post('/order', { returnUrl: 'http://localhost:3000/vnpay-return' })
			.then((response) => {
				console.log('Create order:', response.data);
				window.location.href = response.data.paymentUrl;
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<div className="container mt-5">
			<h2 className="mb-4 text-center">Shopping Cart</h2>
			{cartItems.length === 0 ? (
				<p>Giỏ hàng trống</p>
			) : (
				<table className="table table-bordered">
					<thead>
						<tr>
							<th scope="col">Product</th>
							<th scope="col">Quantity</th>
							<th scope="col">Price</th>
							<th scope="col">Total</th>
						</tr>
					</thead>
					<tbody>
						{cartItems.map((item) => (
							<tr key={item.id}>
								<td>{item.product.name}</td>
								<td>{item.quantity}</td>
								<td>₫{parseInt(item.product.price)}</td>
								<td>₫{parseInt(item.quantity * item.product.price)}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			<div className="my-4">
				<h4>Tổng số tiền: ₫{parseInt(totalPrice)}</h4>
			</div>
			<div className="row d-flex justify-content-center align-items-center">
				<button className="btn btn-outline-primary col-2 me-2" onClick={handleBack}>
					Trở về
				</button>
				<button className="btn btn-primary col-2 ms-2" onClick={() => handleCheckout()}>
					Mua hàng
				</button>
			</div>
		</div>
	);
};

export default CartPage;
