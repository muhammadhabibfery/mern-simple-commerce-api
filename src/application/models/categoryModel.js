import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

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
	{ timestamps: true }
);

categorySchema.index({ name: -1, slug: -1 });
categorySchema.plugin(uniqueValidator, {
	message: "Name has been registered",
});

export default mongoose.model("Category", categorySchema);
