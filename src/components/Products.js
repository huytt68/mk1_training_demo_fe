import React, { useState, useEffect } from 'react';
import axiosInstance from '../configs/axiosConfig';
import Product from './Product';
import axios from 'axios';
import { toast } from 'react-toastify';

const Products = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get('https://musical-friendly-worm.ngrok-free.app/products')
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleAddToCart = (product) => {
		toast.info('Sản phẩm đã được thêm vào giỏ hàng!', {
			position: 'bottom-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
		});
		axiosInstance
			.post('/cart/add', {
				product_id: product.id,
				quantity: 1,
			})
			.then((response) => {
				console.log('Add product to cart:', response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return (
		<div className="container">
			<div className="row text-center">
				<h2 className="mb-4">Danh sách sản phẩm</h2>
				{products.map((product) => (
					<div className="col-md-4 col-sm-4" key={product.id}>
						<Product product={product} handleBuy={() => handleAddToCart(product)} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Products;
