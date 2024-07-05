import path from "path";
import { dirName } from "../../utils/global.js";
import Email from "./emailHandler.js";

const verificationEmail = async ({ address, data }) => {
	const { name, token, origin } = data;
	const protocol = origin.get("x-forwarded-proto") || origin.protocol;
	const host = origin.get("x-forwarded-host") || origin.get("host");
	const domain = `${protocol}://${host}`;
	const url = `${domain}/auth/verify-account?token=${token}&email=${address}`;

	await Email.send({
		address,
		subject: "Email Verification",
		body: path.join(dirName(import.meta.url), "../views/emails/email-verification"),
		data: { name, url },
	});
};

export default verificationEmail;
