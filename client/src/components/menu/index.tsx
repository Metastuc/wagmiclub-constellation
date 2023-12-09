"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CloseMenu, Hamburger, Search } from "@/assets/icons";
import { DESKTOP_NAV_LINKS } from "@/assets/data";
import { useToggle } from "@/hooks";
import "./index.scss";

import { logIn } from "@/utils/app.mjs";
import { useRouter } from "next/navigation";

export const Menu = () => {
	const { status: menuActive, toggleStatus } = useToggle();
	const router = useRouter();

	useEffect(() => {
		// Toggle background vertical scroll when menu is active
		const scroll = menuActive ? "hidden" : "visible";
		document.body.style.overflowY = scroll;
	}, [menuActive]);

	/**
	 * Handle menu item click event.
	 */
	async function handleMenuItem(id: number) {
		menuActive && toggleStatus();

		// function to be triggered for the login action
		try {
			id === 3 &&
				router.push((await logIn()) ? "/profile" : "/profile/edit");
		} catch (error) {
			console.warn(error);
		}
	}

	return (
		<section className="menu">
			<div className="menu-wrapper">
				{/* Hamburger menu button */}
				<button onClick={toggleStatus}>
					<Hamburger />
				</button>

				{/* Active menu background */}
				{menuActive && (
					<section className="active-menu-background">
						<div className="menu-content">
							<div className="content-wrapper">
								{/* Close menu button */}
								<div className="close-menu">
									<button onClick={toggleStatus}>
										<CloseMenu />
									</button>
								</div>

								{/* Navigation links */}
								<ul className="navigation">
									{DESKTOP_NAV_LINKS.map((item) => {
										const {
											id,
											value: { title, to },
										} = item;

										return (
											<li
												key={id}
												onClick={() => {
													handleMenuItem(id);
												}}
											>
												<Link href={to}>{title}</Link>
											</li>
										);
									})}
								</ul>

								{/* Search input */}
								<div className="search">
									<input
										type="text"
										placeholder="search"
									/>
									<span>
										<Search />
									</span>
								</div>
							</div>
						</div>
					</section>
				)}
			</div>
		</section>
	);
};
