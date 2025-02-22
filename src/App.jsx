import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header, MobileNavBar } from "./components";
import { Outlet } from "react-router-dom";

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
	) : <p>loading...</p>;
}

export default App;
