//#region node_modules/.nitro/vite/services/ssr/assets/data-DPG1hT0f.js
var EXAMPLE_CLAIM = "Electric vehicles produce more emissions than petrol cars.";
var STAGES = [
	{
		n: "01",
		t: "Claim",
		d: "A statement is isolated, parsed and broken into checkable assertions — who, what, when, how much."
	},
	{
		n: "02",
		t: "Retrieve",
		d: "Primary research, official datasets and reputable reporting are gathered from across the record."
	},
	{
		n: "03",
		t: "Compare",
		d: "Sources are weighed against each other. Agreement, contradiction and context are mapped."
	},
	{
		n: "04",
		t: "Verify",
		d: "Evidence quality, recency and independence are scored to reach a calibrated judgement."
	},
	{
		n: "05",
		t: "Explain",
		d: "A plain-language verdict, with every source visible. Nothing hidden behind a number."
	}
];
var STEPS = [
	"Analyzing claim",
	"Retrieving evidence",
	"Comparing sources",
	"Assessing evidence",
	"Generating verdict"
];
var SOURCES = [
	{
		name: "Nature Climate Change",
		date: "2024",
		relevance: "High",
		supports: false,
		title: "Lifecycle emissions of electric vehicles",
		note: "Lifecycle studies generally find lower total emissions for electric vehicles than petrol cars across most electricity grids."
	},
	{
		name: "International Energy Agency",
		date: "2024",
		relevance: "High",
		supports: false,
		title: "Battery production and lifetime emissions",
		note: "Electric vehicles begin with higher manufacturing emissions, but lower emissions during driving can offset that difference."
	},
	{
		name: "ICCT Lifecycle Report",
		date: "2023",
		relevance: "High",
		supports: false,
		title: "Comparing vehicle emissions across a full lifetime",
		note: "The supplied example describes substantially lower lifetime emissions for electric vehicles registered in Europe."
	},
	{
		name: "Coal-grid regional study",
		date: "2022",
		relevance: "Medium",
		supports: true,
		title: "The effect of coal-dependent electricity grids",
		note: "On coal-dominant grids, early-life emissions can exceed petrol vehicles. This is a limited case, not a general conclusion."
	}
];
function isSampleClaim(claim) {
	return claim.trim().toLowerCase().replace(/[.!?]+$/, "") === EXAMPLE_CLAIM.toLowerCase().replace(/[.!?]+$/, "");
}
//#endregion
export { isSampleClaim as a, STEPS as i, SOURCES as n, STAGES as r, EXAMPLE_CLAIM as t };
