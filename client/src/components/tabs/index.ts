export type tabProps = {
	group: string;
	tabIsActive: (tab: string) => string | null;
	onTabChange: (tab: string) => void;
};
export * from "./edit";
export * from "./board";
export * from "./create";
export * from "./onchain";
export * from "./explore";
export * from "./reputation";
