export const baseRoute = "/api/v1";
export const passwordTokenExpiration = 1000 * 60 * 15; // 15 Minutes
export const operatorFilterRegEx = /\b(>|>=|=|<|<=)\b/g;
export const operatorFilterProperties = {
	">": "$gt",
	">=": "$gte",
	"=": "$eq",
	"<": "$lt",
	"<=": "$lte",
};
