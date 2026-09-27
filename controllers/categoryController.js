const Category = require ('../models/categorySchema')

const categoryController = async (req, res)=>{
    const {name} = req.body

    let category = new Category ({
        name : name
    })

    await category.save()
     return res.json({
            success : true ,
            message:" Category Created"
        })
}

let getallCategoryController = async (req , res)=>{
    let data = await Category.find({})

     return res.json({
            success : true ,
            message:"All Category Collected",
            data : data
        })
}



module.exports = {categoryController , getallCategoryController}