import "./index.scss";

export const Actions = ({ group }: { group: string }) => {
	return (
		<section className={`${group}`}>
			<div className={`${group}__wrapper`}>
				<div className={`${group}__left`}>
					<div>
						<img
							src="/defi_pfp.jpg"
							alt="prodile__picture"
						/>
					</div>
				</div>

				<div className={`${group}__right`}>
					<button>Follow</button>
				</div>
			</div>
		</section>
	);
};
