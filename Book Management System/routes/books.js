const express=require("express");
const { books } =require("../Data/books.json");
const {users}=require("../Data/user.json");
const router=express.Router();


/*
Route:/books
Method:GET
Description:Get the user
Access:public
Paramenter:none
*/
router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    });
});

/*
Route:/books/issued
Method:GET
Description:Get the user
Access:public
Paramenter:id
*/
router.get("/issued",(req,res)=>{
    const userWithBookIssued=users.filter((each)=>{
        if(each.issued) return each;
    });

    const issuedBook=[];

    userWithBookIssued.forEach((each)=>{
        const book = books.find((book)=>book.id===each.issued);
        book.issuedBy=each.name;
        book.issuedCost=each.balance;
        book.issuedCompany=each.company;

        issuedBook.push(book);
    });

    if(issuedBook.length===0){
        return res.status(404).json({
            sucess:false,
            message:"No Books issued"
        })
    }
    else{
        return res.status(200).json({
            success:true,
            data:issuedBook,
        })
    }

});




/*
Route:/books
Method:GET
Description:Get the user
Access:public
Paramenter:id
*/
router.get("/:id",(req,res)=>{
    const {id}=req.params;
    // console.log(id);
    const book = books.find((each)=>each.id=== id);

    if (!book){
        res.status(404).json({
            success:false,
            message:"Book Not Found",
        });  
    }else {
      res.status(200).json({
            success:true,
            data:book,
        });

    }
});




/*
Route:/books
Method:POST
Description:Create a new user
Access:public
Paramenter:none
*/
router.post("/",(req,res)=>{
    const {id,author,country,pages,year}=req.body;
    const book=books.find((each)=>each.id===id);
    if(book){
       return res.status(404).json({
            sucess:false,
            message:"Book Alread Exists"
        });
    }
        books.push({
            id,
            author,
            country,
            pages,
            year,
        });

       return res.status(201).json({
            success:true,
            data:books,
        });
    }
);

/*
Route:/books/:id
Method:PUT
Description:Update a new user
Access:public
Paramenter:id
*/

router.put("/:id",(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const book=books.find((each)=>each.id===id)
    if(!book){
        return res.status(404).json({
            success:true,
            message:"Book not Found"
        });
    }

    const updateUser=books.map((each)=>{
        if(each.id===id){
            return{
                ...each,
                ...data,
            };
        }
        return each;
    });
    return res.status(200).json({
        success:true,
        data:updateUser,
    });
});
/*
Route:/books/:id
Method:DELETE
Description:Deleting User By id
Access:public
Paramenter:id
*/

router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const book=books.find((each)=>each.id=== id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book Not Found",
        })
    }

    const index=books.indexOf(book);
    books.splice(index,1)
    return res.status(200).json({
        success:true,
        data:books,
    })
})

module.exports=router;
