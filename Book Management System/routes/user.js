const express =require("express");
const {users}=require("../Data/user.json");
const router=express.Router();
/*
Route:/user
Method:GET
Description:Get the user
Access:public
Paramenter:none
*/
router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:users,
    });
});

/*
Route:/user/id
Method:GET
Description:Get the user
Access:public
Paramenter:id
*/
router.get("/:id",(req,res)=>{
    const {id}=req.params;
    // console.log(id);
    const user = users.find((each)=>each.id=== id);

    if (!user){
        res.status(404).json({
            success:false,
            message:"User Not Found",
        });  
    }else {
      res.status(200).json({
            success:true,
            data:user,
        });

    }
});



module.exports=router;