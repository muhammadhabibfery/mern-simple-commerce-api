import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import FileHandler from "../../utils/fileHandler.js";
import { dirName } from "../../utils/global.js";

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			minLength: 3,
			maxLength: 100,
		},
		slug: {
			type: String,
			unique: true,
		},
		description: {
			type: String,
			trim: true,
			minLength: 3,
			maxLength: 1000,
		},
		price: {
			type: Number,
			default: 0,
		},
		stock: {
			type: Number,
			default: 0,
		},
		image: {
			type: String,
			default: "default.png",
		},
		colors: {
			type: [String],
			default: null,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		freeShipping: {
			type: Boolean,
			default: false,
		},
		averageRating: {
			type: Number,
			default: 0,
		},
		numberOfReviews: {
			type: Number,
			default: 0,
		},
		category: {
			type: mongoose.Types.ObjectId,
			ref: "Category",
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

productSchema.index({ slug: -1 });
productSchema.plugin(uniqueValidator, { message: "Name has been created" });

productSchema.post("findOneAndDelete", async function (doc) {
	await FileHandler.remove(dirName(import.meta.url), `../../../public/${doc?.image}`);
});

export default mongoose.model("Product", productSchema);
