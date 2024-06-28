import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { checkPermission } from "../../utils/global.js";

export const availableReviewFields = ["title", "comment", "rating"];

const reviewSchema = mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			maxLength: 100,
		},
		comment: {
			type: String,
			trim: true,
			maxLength: 1000,
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		product: {
			type: mongoose.Types.ObjectId,
			ref: "Product",
		},
	},
	{ timestamps: true }
);

reviewSchema.index({ user: 1, product: 1 }, { unique: true });
reviewSchema.plugin(uniqueValidator, { message: "{PATH} has been created" });

reviewSchema.pre(["findOneAndUpdate", "findOneAndDelete"], async function () {
	const doc = await this.model.findOne(this.getQuery());
	if (doc) {
		const currentUser = this.options.additonalData;
		checkPermission(currentUser, doc.user);
	}
});

export default mongoose.model("Review", reviewSchema);
