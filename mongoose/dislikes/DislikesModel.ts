/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
import mongoose from "mongoose";
import DislikeSchema from "./DislikesSchema";
const DislikeModel = mongoose.model("DislikeModel", DislikeSchema);
export default DislikeModel;