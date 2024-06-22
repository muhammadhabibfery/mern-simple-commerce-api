import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { convertToSlug } from "../../utils/global.js";

const productSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	slug: {
		type: String,
		trim: true,
		unique: true,
	},
	price: {
		type: Number,
		trim: true,
	},
	image: {
		type: String,
		trim: true,
	},
});

productSchema.index({ name: -1, slug: -1 });
productSchema.plugin(uniqueValidator, {
	message: "{PATH} must be unique value",
});

productSchema.pre("save", function () {
	this.slug = convertToSlug(this.name);
});

export default mongoose.model("Product", productSchema);
