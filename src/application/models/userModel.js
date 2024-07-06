import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRoles = ["admin", "user"];

export const availableUserFields = ["id", "name", "email", "role"];

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			minLength: 3,
			maxLength: 75,
		},
		email: {
			type: String,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			minLength: 6,
		},
		role: {
			type: String,
			enum: userRoles,
			default: userRoles[1],
		},
		verificationToken: {
			type: String,
			default: null,
		},
		verifiedAt: {
			type: Date,
			default: null,
		},
		passwordToken: {
			type: String,
			default: null,
		},
		passwordTokenExpired: {
			type: Date,
			default: null,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			default: null,
		},
		updatedBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			default: null,
		},
	},
	{ timestamps: true }
);

userSchema.index({ name: -1, email: -1 });
userSchema.plugin(uniqueValidator, { message: "{PATH} has been registered" });

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.toJSON = function () {
	const userObject = this.toObject();

	let result = {};
	availableUserFields.forEach((item) => {
		if (item === "id") result[item] = userObject._id;
		else result[item] = userObject[item];
	});

	return result;
};

userSchema.methods.checkPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.methods.createToken = function (refreshToken = null) {
	let payload = { id: this.id, role: this.role };
	if (refreshToken) payload = { ...payload, refreshToken };
	const { JWT_SECRET_KEY } = process.env;
	return jwt.sign(payload, JWT_SECRET_KEY);
};

export default mongoose.model("User", userSchema);
