import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/LoginPage/Login";
import { useSelector } from "react-redux";
import MainPage from "./pages/MainPage/MainPage";
import JoinCircle from "./pages/JoinCircle/JoinCircle";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Circle from "./pages/Circle/Circle";

function App() {
	const token = useSelector((state) => state.global.token);
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		// setSocket(io("https://graduation-project-frontend-three.vercel.app/"));
		setSocket(io("/"));
	}, []);

	return (
		<div className="w-full h-full">
			<Routes>
				<Route
					path="/"
					element={token !== "" ? "" : <Navigate to="/login" replace />}
				>
					<Route path="/" element={<MainPage />} />
					<Route path="/join-circle/:id" element={<JoinCircle />} />
					<Route path="/circle/:id" element={<Circle socket={socket} />} />
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
