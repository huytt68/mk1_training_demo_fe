import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Helper để lấy các query params từ URL
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const PaymentResult = () => {
	const navigate = useNavigate();
	const query = useQuery();

	const handleBackHome = () => {
		navigate('/');
	};
	// "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?
	// vnp_Amount=1000000[object Object]
	// vnp_Command=pay[object Object]
	// vnp_CreateDate=20240926T071705[object Object]
	// vnp_CurrCode=VND[object Object]
	// vnp_IpAddr=127.0.0.1[object Object]
	// vnp_Locale=vn[object Object]
	// vnp_OrderInfo=test[object Object]
	// vnp_OrderType=other[object Object]
	// vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A3000%2F[object Object]
	// vnp_TmnCode=CGXZLS0Z[object Object]
	// vnp_TxnRef=1727335025549[object Object]
	// vnp_Version=2.1.0[object Object]
	// vnp_SecureHash=30609ecf71451cf12e445f4e609e4b7f910be"

	// Lấy các tham số từ URL
	const vnp_TxnRef = query.get('vnp_TxnRef');
	const vnp_Amount = query.get('vnp_Amount');
	const vnp_ResponseCode = query.get('vnp_ResponseCode');
	const vnp_BankCode = query.get('vnp_BankCode');
	const vnp_BankTranNo = query.get('vnp_BankTranNo');
	const vnp_CardType = query.get('vnp_CardType');
	const vnp_OrderInfo = query.get('vnp_OrderInfo');
	const vnp_PayDate = query.get('vnp_PayDate');
	const vnp_TmnCode = query.get('vnp_TmnCode');
	const vnp_TransactionNo = query.get('vnp_TransactionNo');
	const vnp_TransactionStatus = query.get('vnp_TransactionStatus');
	const vnp_SecureHash = query.get('vnp_SecureHash');

	// Kiểm tra mã kết quả thanh toán
	const isSuccess = vnp_ResponseCode === '00';

	return (
		<div className="text-center">
			{isSuccess ? (
				<div>
					<h1>Thanh toán thành công!</h1>
					<p>Mã giao dịch: {vnp_TransactionNo}</p>
					<p>Mã đơn hàng: {vnp_TxnRef}</p>
					<p>Số tiền: {(vnp_Amount / 100).toLocaleString()} VND</p>{' '}
					<p>Thông tin đơn hàng: {vnp_OrderInfo}</p>{' '}
					{/* Giả sử số tiền VNPay trả về có đơn vị là đồng */}
					<button className="btn btn-primary" onClick={handleBackHome}>
						Trở lại
					</button>
				</div>
			) : (
				<div>
					<h1>Thanh toán thất bại!</h1>
					<p>Vui lòng thử lại sau.</p>
				</div>
			)}
		</div>
	);
};

export default PaymentResult;
