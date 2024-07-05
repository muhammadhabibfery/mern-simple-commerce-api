import nodemailer from "nodemailer";
import Email from "email-templates";
import { nodeMailerConfig } from "../../config/email.js";

let email;

const init = async () => {
	await nodemailer.createTestAccount();
	email = new Email({
		send: true,
		preview: false,
		transport: nodeMailerConfig,
	});
};

const send = async ({ address, subject, body, data }) => {
	await init();

	await email.send({
		template: body,
		message: {
			from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
			to: address,
			subject,
		},
		locals: data,
	});
};

export default { send };
