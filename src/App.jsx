import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header, MobileNavBar } from "./components";
import { Outlet } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

function App() {
	const [loading, setLoading] = useState(true);
	const [isSideBar, setIsSideBar] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.finally(() => setLoading(false));
	}, []);

	return !loading ? (
			<div className="min-h-screen flex flex-col justify-between bg-slate-700">
				<div className="w-full block">
				
					<Header />
					<main className="grow">
						<li className="block tablet:hidden">
							<button onClick={() => setIsSideBar((prev) => !prev)} className=' text-2xl text-white absolute top-3 right-3'>
								&#9776;
							</button>
						</li>
						<MobileNavBar isSideBar={isSideBar} />
						<Outlet />
					</main>
				</div>
        			<Footer />
			</div>
	) : 
	<div className="flex justify-center">
		<ColorRing
			visible={true}
			height="200"
			width="200"
			ariaLabel="color-ring-loading"
			wrapperStyle={{}}
			wrapperClass="color-ring-wrapper"
			colors={['#1e293b', '#334155']}
		/>
	</div>;
}

export default App;
