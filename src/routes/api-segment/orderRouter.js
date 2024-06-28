import express from "express";
import userRoleAuthorizationHandler from "../../application/middlewares/userRoleAuthorizationHandler.js";
import OrderController from "../../application/controllers/orderController.js";

export const adminOrderRouter = express.Router();
export const orderRouter = express.Router();

adminOrderRouter.get("/admin", userRoleAuthorizationHandler("admin"), OrderController.getAllOrders);

orderRouter.route("/").get(OrderController.getUserOrders).post(OrderController.create);
orderRouter.route("/:id").put(OrderController.update).delete(OrderController.remove);
