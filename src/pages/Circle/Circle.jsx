import { Button, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Circle = ({ socket }) => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const token = useSelector((state) => state.global.token);
	const user = useSelector((state) => state.global.user);
	const params = useParams();

	useEffect(() => {
		if (socket !== null) {
			socket.on("messages", ({ messages }) => {
				setMessages([...messages]);
			});
		}
	}, [socket]);
	return (
		<div className="w-full h-full flex items-center justify-center flex-col">
			<div className="flex flex-col items-center justify-center w-[30%]">
				<div className="w-full">
					<Typography.Title level={5}>Send Message</Typography.Title>
					<Input
						placeholder="Message"
						value={message}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
					/>
				</div>
				<Button
					type="primary"
					className="mt-10"
					disabled={message === ""}
					onClick={() => {
						if (socket !== null) {
							socket.emit("message", {
								message,
								token,
								user,
								circleID: params.id,
							});
							setMessage("");
						}
					}}
				>
					Send Message
				</Button>
			</div>
			<div className="flex flex-row flex-wrap items-center justify-center gap-10 w-[75%] mt-10">
				{messages.map((message, index) => (
					<div key={index} className="flex flex-col gap-1">
						<span className="text-gray-400 text-sm">{message.senderName}</span>
						<p className="font-bold text-xl">{message.text}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Circle;
