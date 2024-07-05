import path from "path";
import { dirName } from "../../utils/global.js";
import Email from "./emailHandler.js";

const resetPassword = async ({ address, data }) => {
	const { token, origin } = data;
	const protocol = origin.get("x-forwarded-proto") || origin.protocol;
	const host = origin.get("x-forwarded-host") || origin.get("host");
	const domain = `${protocol}://${host}`;
	const url = `${domain}/auth/reset-password?token=${token}&email=${address}`;

	await Email.send({
		address,
		subject: "Reset Password",
		body: path.join(dirName(import.meta.url), "../views/emails/reset-password"),
		data: { url },
	});
};

export default resetPassword;
