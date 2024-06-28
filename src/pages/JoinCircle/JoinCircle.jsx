import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCircle } from "../../utils/GetCircle";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { joinCircle } from "../../utils/JoinCircle";

const JoinCircle = () => {
	const params = useParams();
	const token = useSelector((state) => state.global.token);
	const [circle, setCircle] = useState({ name: "", members: [] });
	const [isAdded, setIsAdded] = useState("");

	const getCircleDetails = useCallback(async () => {
		const request = await getCircle(params.id, token);
		return request;
	}, [params.id, token]);

	useEffect(() => {
		const getCircleWithId = async () => {
			const result = await getCircleDetails();

			console.log(result);

			if (result.message === "Circle Found.") {
				setCircle(result.circleData);
			}
		};

		getCircleWithId();
	}, [getCircleDetails]);

	const JoinToCircle = async () => {
		const response = await joinCircle(params.id, token);

		console.log(response);

		if (response.status === "success") {
			setIsAdded("success");
		} else {
			setIsAdded("false");
		}
	};

	return (
		<div className="flex items-center justify-center flex-col m-auto w-full h-full">
			<h1 className="font-bold text-2xl">
				Circle Name: {circle.name ? circle.name : "Circle Name"}
			</h1>
			<p className="font-semibold text-lg mt-2">
				Number of Members: {circle.members ? circle.members.length : 0}
			</p>
			<Button
				type="primary"
				className="w-[10%] mt-10"
				onClick={async () => {
					await JoinToCircle();
				}}
			>
				Join Circle
			</Button>
			<p className="text-lg font-semibold mt-4">
				{isAdded === "success"
					? "User Added Successfully"
					: isAdded === "false"
					? "There is an Error"
					: ""}
			</p>
		</div>
	);
};

export default JoinCircle;
