import { ORGANIZATION_MEDALS, MEDALS } from "@/assets/data";
import { MedalDetails } from "@/app/explore/[id]/page";
import { useTabSwitcher } from "@/hooks";
import { Badge } from "@/components";
import "./index.scss";

export const RenderOrgMedals = function ({ group }: { group: string }) {
	return (
		<div className={`${group}__medals`}>
			{ORGANIZATION_MEDALS.map((item: any, index: number) => {
				const { id, value } = item;

				return (
					<div
						key={index | id}
						className={`${group}__medal`}
					>
						<Badge
							group={`${group}__medal`}
							{...value}
						/>
					</div>
				);
			})}
		</div>
	);
};
export const OnChain = ({ group }: { group: string }) => {
	const { activeTab, handleTabClick, tabIsActive } = useTabSwitcher("active");

	return (
		<section className={`${group}`}>
			<div className={`${group}__wrapper`}>
				<div className={`${group}__medals`}>
					{MEDALS.map((item: any, index: number) => {
						const { id, value } = item;

						return (
							<div
								key={index | id}
								className={`${group}__medal-detail`}
							>
								<MedalDetails
									group={`${group}__medal-detail`}
									{...value}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
