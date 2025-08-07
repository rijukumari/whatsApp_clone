import User from "../models/user.model.js";

export const addUser = async(req,res)=>{
    try{
        let exist = await User.findOne({sub: req.body.sub});
        

        if(exist){
          return  res.status(200).json({
                message:'user already exist'
            })
        }
        const newUser = new User(req.body);
        await newUser.save();
        return res.status(200).json({message:'Add user successfuly',newUser})

    }catch(error){
        console.log('Error' , error.message)
        return res.status(500).json(error.message);

    }
}

export const getUser = async(req,res)=>{
    try{
        const users = await User.find({});
        return res.status(200).json(users)

    }catch(error){
         console.log('Error' , error.message)
        return res.status(500).json(error.message);

    }

}