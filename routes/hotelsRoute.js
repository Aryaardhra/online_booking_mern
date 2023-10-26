import express from "express";
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create

router.post("/", verifyAdmin, createHotel );

// update

router.put("/:id",verifyAdmin, updateHotel);

// delete

router.delete("/:id/:hotelid", verifyAdmin, deleteHotel);

// get single hotel

router.get("/:id", getHotel);

// get all hotels

router.get("/", getAllHotel);

export default router;