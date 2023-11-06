import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create

router.post("/", verifyAdmin, createHotel );

// update

router.put("/:id",verifyAdmin, updateHotel);

// delete

router.delete("/:id/:hotelid", verifyAdmin, deleteHotel);

// get single hotel

router.get("/find/:id", getHotel);

// get all hotels

router.get("/", getAllHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;