const router=require("express").Router();
const User=require("../models/user")
const {authenticateToken}=require("./userAuth")

//add book to favourite
router.put("/add-book-to-favurite", authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers
        const userData=await User.findById(id)
        const isBookfavourite=userData.favourites.includes(bookid)
        if(isBookfavourite){
            return res.status(200).json({message:"book alreday in favourites"})  
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}})
        return res.status(200).json({message:"book added in favourites"})

    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
    
})

//delete book in favourite
router.put("/remove-book-from-favurite", authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers
        const userData=await User.findById(id)
        const isBookfavourite=userData.favourites.includes(bookid)
        if(isBookfavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}}) 
        }
        return res.status(200).json({message:"book remove from favourites"})

    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
    
})

//get favourite book of a particular user
router.get("/get-favurite-book", authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers
        const userData=await User.findById(id).populate("favourites")
        const favouriteBook=userData.favourites
        return res.status(200).json({
            status:"Success",
            data:favouriteBook,
        })

    }catch(error){
       return res.status(500).json({message:"An error occurred"})
    }
    
})

module.exports=router