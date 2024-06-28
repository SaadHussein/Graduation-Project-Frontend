import { Input, Typography } from "antd";
import { Button } from "antd";
import { useState } from "react";
import { login } from "../../utils/Login";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/global";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loginUser = async () => {
		const response = await login(email, password);
		console.log(response);

		if (response.message === "Login Success.") {
			dispatch(setToken({ value: response.user.authentication.token }));
			dispatch(setUser({ value: response.user }));
			navigate("/");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center mx-auto -my-20 w-full h-full">
			<h1 className="font-bold text-4xl mb-8">
				Welcome To Our Graduation Project
			</h1>
			<div className="w-[25%] mb-6">
				<Typography.Title level={5}>Email</Typography.Title>
				<Input
					placeholder="User Email"
					type="text"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
			</div>
			<div className="w-[25%]">
				<Typography.Title level={5}>Password</Typography.Title>
				<Input
					placeholder="User Password"
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</div>
			<Button
				type="primary"
				className="w-[5%] mt-10"
				onClick={async () => {
					await loginUser();
				}}
			>
				Login
			</Button>
		</div>
	);
};

export default Login;
