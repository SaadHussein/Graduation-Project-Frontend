import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/LoginPage/Login";
import { useSelector } from "react-redux";
import MainPage from "./pages/MainPage/MainPage";
import JoinCircle from "./pages/JoinCircle/JoinCircle";

function App() {
	const token = useSelector((state) => state.global.token);
	return (
		<div className="w-full h-full">
			<Routes>
				<Route
					path="/"
					element={token !== "" ? "" : <Navigate to="/login" replace />}
				>
					<Route path="/" element={<MainPage />} />
					<Route path="/join-circle/:id" element={<JoinCircle />} />
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
