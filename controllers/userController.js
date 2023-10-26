import usersModel from "../models/usersModel.js";

export const updateUser = async (req, res, next) => {

    try {
        const updatedUser = await usersModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new : true }
        );
        res.status(200).json(updatedUser);
    } catch (error){
        next(error);
    }
};

export const deleteUser= async (req, res, next) => {
      
    try{
        await usersModel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("User has been deleted");
    }
    catch (error){
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    
    try{
        const user = await usersModel.findById(
           req.params.id
        );
        res.status(200).json(user);
    } catch (error){
        next(error);
    }
};

export const getAllUser = async (req, res, next) => {

    try{
        const users =await usersModel.find();
        res.status(200).json(users);
      } catch (error){
       next(error)
      }
}