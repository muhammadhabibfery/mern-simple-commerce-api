import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRoles = ["admin", "user"];

const availableUserFields = ["id", "name", "email", "role"];

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

async function hashPassword() {
	const doc =
		this instanceof mongoose.Query
			? await this.model.findOne(this.getQuery())
			: this;

	if (!doc.isModified("password")) return;

	const salt = await bcrypt.genSalt(10);
	doc.password = await bcrypt.hash(doc.password, salt);
}

userSchema.pre("save", hashPassword);
userSchema.pre("findOneAndUpdate", hashPassword);

userSchema.post("find", function (docs) {
	let result = docs.map((doc) => {
		return doc.self();
	});

	return mongoose.overwriteMiddlewareResult(result);
});

userSchema.methods.self = function () {
	let result = {};
	availableUserFields.forEach((item) => {
		if (item === "id") result[item] = this._id;
		else result[item] = this[item];
	});

	return result;
};

userSchema.methods.checkPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.methods.createToken = function () {
	const { JWT_SECRET_KEY, JWT_LIFETIME } = process.env;
	const { id, role } = this.self();
	return jwt.sign({ id, role }, JWT_SECRET_KEY, { expiresIn: JWT_LIFETIME });
};

export default mongoose.model("User", userSchema);
