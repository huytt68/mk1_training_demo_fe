import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ product, handleBuy }) => {
	const navigate = useNavigate();

	const handleNavigateToDetail = () => {
		navigate(`/products/${product.id}`);
	};

	const handleBuyNow = (e) => {
		e.stopPropagation(); // Ngăn việc click card xảy ra
		handleBuy(product);
	};

	return (
		<div className="card mb-3" style={{ minwidth: '15rem' }}>
			<div className="card-body" onClick={handleNavigateToDetail}>
				<h5 className="card-title">{product.name}</h5>
				<p className="card-text">{product.description}</p>
				<p className="card-text">Giá: {parseInt(product.price)} VND</p>
				<button className="btn btn-primary" onClick={handleBuyNow}>
					Thêm vào giỏ hàng
				</button>
			</div>
		</div>
	);
};

export default Product;
