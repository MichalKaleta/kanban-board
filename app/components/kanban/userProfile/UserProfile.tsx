import Images from "../../../../assets/images";
import "./UserProfile.scss";
import Image from "next/image";

export const UserProfile = () => {
	const user = {
		name: "John Doe",
		image: Images.User,
	};

	return (
		<div className="user-profile">
			<Image src={user.image} alt={user.name} />
			<span>{user.name}</span>
		</div>
	);
};
