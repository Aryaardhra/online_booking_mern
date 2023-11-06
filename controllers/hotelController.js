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
        const { limit, min, max, ...filters } = req.query;

        const hotels = await hotelsModel.find({
            ...filters,
        cheapestPrice: { $gt: min |1, $lt: max || 999 },
        }).limit(limit);
        res.status(200).json(hotels);
      } catch (error){
       next(error)
      }
};

export const countByCity = async (req, res, next) => {

    const cities = req.query.cities?.split(",")
    try{
        const list = await Promise.all(cities?.map ((city) => {
            return hotelsModel.countDocuments({ city:city})
        }))
        res.status(200).json(list);
    } catch (error) {
        next (error);
    }
};

export const countByType = async (req, res, next) => {

 try{

    const hotelCount = await hotelsModel.countDocuments({ type: "hotel"});
    const apartmentCount = await hotelsModel.countDocuments({ type: "apartment"});
    const resortCount = await hotelsModel.countDocuments({ type: "resort"});
    const villaCount = await hotelsModel.countDocuments({ type: "villa"});
    const cabinCount = await hotelsModel.countDocuments({ type: "cabin"});

    res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count:resortCount },
        { type: "villas", count:villaCount },
        { type: "cabins", count:cabinCount},
    ]);
 } catch (error) {
    next (error);
 }
};