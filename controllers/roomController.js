import hotelsModel from "../models/hotelsModel.js";
import roomsModel from "../models/roomsModel.js";

export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid;
    const newRoom = new roomsModel(req.body);

    try{

        const savedRoom = await newRoom.save();
         try{
            await hotelsModel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            });

         } catch (error) {
           next(error);
         }
         res.status(200).json(savedRoom);
    } catch (error) {
      next(error);
    }
};

export const updateRoom = async (req, res, next) => {

    try {
        const updatedRoom = await roomsModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new : true }
        );
        res.status(200).json(updatedRoom);
    } catch (error){
        next(error);
    }
};

export const updateRoomAvailability = async (req, res, next) => {

    try {
      await roomsModel.updateOne(
        { "roomNumbers._id": req.params.id },
        {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        }
      );
        res.status(200).json(" Room status has been updated.");
    } catch (error){
        next(error);
    }
};

export const deleteRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid;
    
    try{
        await roomsModel.findByIdAndDelete(
            req.params.id
        );
        try{
            await hotelsModel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });

         } catch (error) {
           next(error);
         }
        res.status(200).json("Room has been deleted");
    }
    catch (error){
        next(error);
    }
};

export const getRoom = async (req, res, next) => {
    try{
        const room = await roomsModel.findById(
           req.params.id
        );
        res.status(200).json(room);
    } catch (error){
        next(error);
    }
};

export const getAllRoom = async (req, res, next) => {

    try{
        const rooms =await roomsModel.find();
        res.status(200).json(rooms);
      } catch (error){
       next(error)
      }
};