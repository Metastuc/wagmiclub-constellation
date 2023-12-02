import Link from "next/link";
import "./index.scss";

const Profile = ({ onClose }: { onClose: () => void }) => {
	const group = "profileModal";

	const links = [
		{
			name: "Profile",
			href: "/profile",
		},
		{
			name: "Edit profile",
			href: "/profile/edit",
		},
		{
			name: "Sign out",
			href: "/signout",
		},
	];

	function RenderList() {
		return (
			<ul className={`${group}__list`}>
				{links.map((link, index) => {
					const { name, href } = link;

					return (
						<li
							key={index}
							className={`${group}__item`}
							onClick={onClose}
						>
							<Link href={href}>{name}</Link>
						</li>
					);
				})}
			</ul>
		);
	}

	return (
		<section className={`${group}`}>
			<div className={`${group}__wrapper`}>
				<div className={`${group}__header`}>
					<span className={`${group}__image`}>
						<img
							src="/defi_pfp.jpg"
							alt="profile__picture"
						/>
					</span>
					<div className={`${group}__displayNames`}>
						<span>Sabinus</span>
						<span>Investor</span>
					</div>
				</div>

				<hr />

				<RenderList />
			</div>
		</section>
	);
};

export { Profile as ProfileModal };
