export const baseRoute = "/api/v1";

export const operatorFilterRegEx = /\b(>|>=|=|<|<=)\b/g;
export const operatorFilterProperties = {
	">": "$gt",
	">=": "$gte",
	"=": "$eq",
	"<": "$lt",
	"<=": "$lte",
};
