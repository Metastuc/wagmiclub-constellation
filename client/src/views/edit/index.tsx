"use client";

import { useEffect } from "react";
import { useFormik } from "formik";
import { Details, Socials } from "@/components";
import { EDIT_SCHEMA } from "@/assets/data";
import { signUp } from "@/utils/app.mjs";

import "./index.scss";

interface FormValues {
	account: string;
	bio: string;
	discord: string;
	name: string;
	occupation: string;
	telegram: string;
	username: string;
	xDotCom: string;
	youtube: string;
}

export const FormField = ({ activeTab }: { activeTab: string }) => {
	const initialValues = {
		account: activeTab,
		bio: "",
		discord: "",
		name: "",
		occupation: "",
		telegram: "",
		username: "",
		xDotCom: "",
		website: "",
		youtube: "",
	};

	const {
		errors,
		values,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		setFieldValue,
	} = useFormik({
		validationSchema: EDIT_SCHEMA, // Form validation schema
		initialValues, // Initial form values
		onSubmit: async(values) => {
			console.log("Formik data:", values);
			// Handle form submission logic here (e.g., API call)
			try {
				await signUp(values);
			} catch (error) {
				console.log(error);
			}
		},
	});

	useEffect(() => {
		setFieldValue("account", activeTab);
	}, [activeTab]);

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit}
			className="form"
		>
			{/* User details form section */}
			<Details
				errors={errors}
				touched={touched}
				formData={values}
				activeTab={activeTab}
				handleBlur={handleBlur}
				setFieldValue={setFieldValue}
				handleFormChange={handleChange}
			/>

			{/* User socials form section */}
			<Socials
				errors={errors}
				touched={touched}
				formData={values}
				handleBlur={handleBlur}
				setFieldValue={setFieldValue}
				handleFormChange={handleChange}
			/>

			{/* Form submission button */}
			<div className="form__button">
				<button
					type="submit"
					className="form__button-wrapper"
				>
					<span className="form__button-label">Save</span>
				</button>
			</div>
		</form>
	);
};
