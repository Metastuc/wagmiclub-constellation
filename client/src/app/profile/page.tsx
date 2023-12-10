import {
	Actions,
	Bio,
	ProfileBadges,
	ProfileMedals,
	TrustScores,
} from "@/components";
import "./page.scss";

const Profile = () => {
	const group = "profile";

	return (
		<section className={`${group}`}>
			<section className={`${group}__wrapper`}>
				<Actions group={`${group}__actions`} />

				<Bio group={`${group}__bio`} />

				<ProfileBadges group={`${group}__badges`} />

				<TrustScores group={`${group}__trustscores`} />

				<ProfileMedals group={`${group}__medals`} />
			</section>
		</section>
	);
};

export default Profile;
