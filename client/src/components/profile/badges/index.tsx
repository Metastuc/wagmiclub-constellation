import Link from "next/link";
import { QUESTER_BADGE } from "@/assets/data";
import { Badge, Verified } from "@/assets/icons";
import "./index.scss";

const Badges = ({ userBadge }) => {
	const group = "profile";
	return (
		<section className={`${group}`}>
			<div className={`${group}__wrapper`}>
				<h4>Badges</h4>
							<Link
								// href={`/organizations/${id}`}
								href={``}
								key={userBadge.id }
								className={`${group}__badge`}
							>
								<i>
									<Badge />
								</i>

								<img
									key={userBadge.id}
									src={userBadge.image}
									alt={userBadge.name}
								/>

								<span>
									{userBadge.name}
									{userBadge.verified && (
										<i>
											<Verified />
										</i>
									)}
								</span>
							</Link>
					
				</div>
		</section>
	);
};

export { Badges as ProfileBadges };
