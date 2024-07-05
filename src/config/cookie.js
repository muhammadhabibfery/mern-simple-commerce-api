export const setCookie = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "development" ? false : true,
	signed: true,
};

export const clearCookie = {
	httpOnly: true,
	expires: new Date(Date.now()),
	secure: process.env.NODE_ENV === "development" ? false : true,
	signed: true,
};
