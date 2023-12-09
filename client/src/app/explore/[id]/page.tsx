import { FC } from "react";
import "./page.scss";

interface props {
	id?: number;
	title: string;
	host: string;
	hostImage: string;
	medalImage: string;
	metrics: string;
	image: string;
	description: string;
	time: {
		start: Date;
		end: Date;
	};
	quantity: {
		total: number;
		remaining: number;
	};
	participants: string[];
	claimed: boolean;
}

export const MedalDetails: FC<props> = ({
	id,
	title,
	image,
	description,
	host,
	hostImage,
	medalImage,
	metrics,
	participants,
	claimed,
	time: { start, end },
	quantity: { total, remaining },
}) => {
	// const styleClass = `${group}`;

	const group = "medal-details";

	return (
		<section className={group}>
			<div className={`${group}__wrapper`}>
				<div className={`${group}__image`}>
					<img
						src={medalImage}
						alt={title}
					/>
				</div>
				<div className={`${group}__description`}>
					<div className={`${group}__row`}>
						<span className={`${group}__ends`}>Ends in x days</span>
						<span>
							{remaining}/{total}
						</span>
					</div>

					<div className={`${group}__host`}>
						<span>
							<img src={hostImage} />
						</span>
						<span>{host}</span>
					</div>

					<div className={`${group}__row`}>
						<h3>{title}</h3>
						<p>{description}</p>
					</div>

					<div className={`${group}__row`}>
						<span>Winning Metrics</span>
						<span>{metrics}</span>
					</div>

					<div className={`${group}__row`}>
						<span>Participants</span>
						<div>
							{participants.map((participant) => (
								<span
									key={participant}
									className={`${group}__participant`}
								>
									{participant}
								</span>
							))}
						</div>
					</div>

					<div className={`${group}__row`}>
						<button>{claimed ? "Minted" : "Participate"}</button>
					</div>
				</div>
			</div>
		</section>
	);
};
