import hotelsModel from "../models/hotelsModel.js";

export const createHotel = async (req, res, next) => {

    const newHotel = new hotelsModel(req.body);

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }
    catch (error){
        next(error);
    }
};

export const updateHotel = async (req, res, next) => {

    try {
        const updatedHotel = await hotelsModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new : true }
        );
        res.status(200).json(updatedHotel);
    } catch (error){
        next(error);
    }
};

export const deleteHotel = async (req, res, next) => {
      
    try{
        await hotelsModel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Hotel has been deleted");
    }
    catch (error){
        next(error);
    }
};

export const getHotel = async (req, res, next) => {

    try{
        const hotel = await hotelsModel.findById(
           req.params.id
        );
        res.status(200).json(hotel);
    } catch (error){
        next(error);
    }
};

export const getAllHotel = async (req, res, next) => {

    try{
        const hotels =await hotelsModel.find();
        res.status(200).json(hotels);
      } catch (error){
       next(error)
      }
};