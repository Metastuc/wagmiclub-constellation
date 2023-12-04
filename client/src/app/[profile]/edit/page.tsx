"use client";

import { useScrollReset, useTabSwitcher } from "@/hooks";
import { FormField as EditForms } from "@/views";
import { EditTabs } from "@/components/";
import { useEffect } from "react";
import "./page.scss";

const Edit = () => {
	useScrollReset();

	useEffect(() => {
		const nav = document.querySelector("nav");
		nav?.setAttribute("style", "display: none;");
	}, []);

	const { activeTab, handleTabClick, tabIsActive } =
		useTabSwitcher("personal");

	return (
		<>
			<section className="edit">
				<div className="edit__title-bar">
					<span>edit profile</span>
					<span>
						<img
							src="/defi_pfp.jpg"
							alt="profile_pic"
						/>
					</span>
				</div>

				<EditTabs
					group="edit"
					onTabChange={handleTabClick}
					tabIsActive={tabIsActive}
				/>

				<EditForms activeTab={activeTab} />
			</section>
		</>
	);
};

export default Edit;
