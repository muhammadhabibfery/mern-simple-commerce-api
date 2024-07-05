import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
	{
		refreshToken: {
			type: String,
		},
		ip: {
			type: String,
			default: null,
		},
		userAgent: {
			type: String,
			default: null,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Token", tokenSchema);
