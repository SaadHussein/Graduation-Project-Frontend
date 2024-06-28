import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/LoginPage/Login";
import { useSelector } from "react-redux";
import MainPage from "./pages/MainPage/MainPage";

function App() {
	const token = useSelector((state) => state.global.token);
	return (
		<div className="w-full h-full">
			<Routes>
				<Route
					path="/"
					element={
						token !== "" ? <MainPage /> : <Navigate to="/login" replace />
					}
				>
					<Route path="/" element={<MainPage />} />
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
