import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		axios
			.get(`https://musical-friendly-worm.ngrok-free.app/products/${id}`)
			.then((response) => {
				setProduct(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [id]);

	if (!product) {
		return <div>Product not found</div>;
	}

	const increaseQuantity = () => {
		setQuantity((prevQuantity) => prevQuantity + 1);
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity((prevQuantity) => prevQuantity - 1);
		}
	};

	// Ngăn không cho nhập số lượng nhỏ hơn 1
	const handleChange = (e) => {
		const value = parseInt(e.target.value);
		if (value < 1 || isNaN(value)) {
			setQuantity(1);
		} else {
			setQuantity(value);
		}
	};

	const handleBuy = (product) => {
		console.log(`Buying product: ${product.name}`);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-4 border" style={{ width: '20rem', height: '20rem' }}></div>
				<div className="col-md-8">
					<h2>{product.name}</h2>
					<p>{product.description}</p>
					<h3 className="text-primary">₫{parseInt(product.price)}</h3>
					<div className="col-md-2 mt-4 mb-4">
						<div className="input-group">
							<button
								className="btn btn-outline-secondary"
								type="button"
								onClick={decreaseQuantity}
							>
								-
							</button>
							<input
								type="number"
								className="form-control text-center"
								value={quantity}
								min="1"
								onChange={handleChange}
							/>
							<button
								className="btn btn-outline-secondary"
								type="button"
								onClick={increaseQuantity}
							>
								+
							</button>
						</div>
					</div>
					<button className="btn btn-outline-primary" onClick>
						Thêm vào giỏ hàng
					</button>
					<button className="btn btn-primary ms-2" onClick={() => handleBuy(product)}>
						Mua ngay
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
