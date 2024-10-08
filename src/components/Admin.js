import Header from './Header';
import Notification from '../firebase/Notification';

const Admin = () => {
	return (
		<>
			<div className="container-fluid">
				<Header />
				<div className="row">
					<div className="col-8 mx-auto text-center mt-4">
						<h1>Admin Dashboard</h1>
					</div>
				</div>
			</div>
			<Notification />
		</>
	);
};

export default Admin;
