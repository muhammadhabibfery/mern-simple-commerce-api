import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export const availableCategoryFields = ["name", "slug"];

const categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
		},
		slug: {
			type: String,
			unique: true,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		updatedBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			default: null,
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

categorySchema.index({ name: -1, slug: -1 });
categorySchema.plugin(uniqueValidator, {
	message: "Name has been registered",
});

categorySchema.virtual("products", {
	ref: "Product",
	localField: "_id",
	foreignField: "category",
});

export default mongoose.model("Category", categorySchema);
