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
	const group = "medal-details";
	const [startDate, endDate] = [new Date(start), new Date(end)];
	const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
	const daysDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));

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
						<span>
							<i
								style={{
									backgroundColor: claimed
										? "#e5f77a"
										: "#64FFA2",
								}}
							></i>
						</span>
						<span className={`${group}__ends`}>
							{claimed
								? "Ended"
								: `Ends in ${daysDiff} ${
										daysDiff === 1 ? "day" : "days"
								  }`}
						</span>
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
						<span>{claimed ? "Minted by" : "Participants"}</span>
						<div>
							{participants.map((participant, index) => (
								<span
									key={index}
									className={`${group}__participant`}
								>
									<img
										src={participant}
										alt=""
									/>
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
