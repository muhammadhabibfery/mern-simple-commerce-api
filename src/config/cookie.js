export const setCookie = {
	httpOnly: true,
	expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // one day
	secure: process.env.NODE_ENV === "dev" ? true : false,
	signed: true,
};

export const clearCookie = {
	httpOnly: true,
	expires: new Date(Date.now()),
	secure: process.env.NODE_ENV === "dev" ? true : false,
	signed: true,
};
