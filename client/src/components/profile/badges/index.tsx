import Link from "next/link";
import { QUESTER_BADGE } from "@/assets/data";
import { Badge, Verified } from "@/assets/icons";
import "./index.scss";

const Badges = ({ userBadge }: { userBadge: any } ) => {
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
									src={userBadge.value.image}
									alt={userBadge.value.name}
								/>

								<span>
									{userBadge.value.name}
									{userBadge.value.verified && (
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
