'use client'
import React, { useState, useEffect } from 'react';
import {
	Actions,
	Bio,
	ProfileBadges,
	ProfileMedals,
	TrustScores,
} from "@/components";
import "./page.scss";

import { getProfile } from "@/utils/app.mjs";

const Profile = () => {
	const group = "profile";

	const [isLoading, setIsLoading] = useState(false);
	const [bio, setBio] = useState([]);
	const [badges, setBadges] = useState([]);
	const [medals, setMedals] = useState([]);

	const fetchData = async() => {

		setIsLoading(true);
		try {
			const _userProfile = await getProfile();
			setBio(_userProfile.bio);
			const _badges = 
			setBadges(_userProfile.badegs);
			setMedals(_userProfile.medals);
			console.log(_userProfile);
		} catch (error) {
			console.log(error);
		}
		finally {
			setIsLoading(false);
		}
	}

	useEffect( () => {
		fetchData();
	}, []);

	if (isLoading) {
		return (
			<section className={`${group}`}>
			<section className={`${group}__wrapper`}>
				<Actions group={`${group}__actions`} />

				<Bio group={`${group}__bio`} userBio={bio} />
			</section>
		</section>
		)
	}

	return (
		<section className={`${group}`}>
			<section className={`${group}__wrapper`}>
				<Actions group={`${group}__actions`} />

				<Bio group={`${group}__bio`} userBio={bio}/>

				{badges && badges.map((badge, index) => (
					<ProfileBadges key={index} userBadge={badge} />
				))}

				<TrustScores group={`${group}__trustscores`} />

				<ProfileMedals group={`${group}__medals`} />
			</section>
		</section>
	);
};

export default Profile;
