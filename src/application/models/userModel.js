import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
	first_name: {
		type: String,
		trim: true,
	},
	last_name: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
		unique: true,
	},
	location: {
		type: String,
		trim: true,
		default: null,
	},
	password: {
		type: String,
	},
});

userSchema.index({ first_name: -1, last_name: -1, email: -1, location: -1 });
userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique value" });

// NOTE: When you run the method from instance class i.e: user.save(), then the pre & post save (the related hooks) would be triggered!
userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.self = function () {
	return {
		id: this._id,
		first_name: this.first_name,
		last_name: this.last_name,
		email: this.email,
		location: this.location,
	};
};

userSchema.methods.checkPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.methods.createToken = function () {
	const { JWT_SECRET_KEY, JWT_LIFETIME } = process.env;
	return jwt.sign(this.self(), JWT_SECRET_KEY, { expiresIn: JWT_LIFETIME });
};

export default mongoose.model("User", userSchema);
