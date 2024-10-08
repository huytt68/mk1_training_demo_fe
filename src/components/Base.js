import { Outlet } from 'react-router-dom';
import Header from './Header';
import Notification from '../firebase/Notification';

const Base = () => {
	return (
		<>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12 mx-auto mt-4">
						<Outlet />
					</div>
				</div>
			</div>
			<Notification />
		</>
	);
};

export default Base;
