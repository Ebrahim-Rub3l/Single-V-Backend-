const Product = require ('../models/productSchema')

const CreateProductController = async (req, res) => {
    try {
        const {
            tittle,
            description,
            price,
            discountPrice,
            category,
            stock,
            tags
        } = req.body;

        if (!tittle || !price) {
            return res.json({
                success: false,
                message: "Can Not Be Empty Price || Tittle Field"
            });
        }

       
        const slug = tittle.toLowerCase().split(" ").join("-");
        console.log(slug)
        // Check slug already exists
        const existingSlug = await Product.findOne({ slug });
        
        if (existingSlug) {
            return res.json({
                success: false,
                message: "Slug Already Exists"
            });
         }

        // Create product
        const product = new Product({
            tittle,
            description,
            price,
            discountPrice,
            category,
            stock,
            tags,
            images,
            slug
        });

        await product.save();

        return res.json({
            success: true,
            message: "Product Created",
            data: product
        });

    } catch (error) {
        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};

const getProductByIdController = async (req , res) => {
    const { id} = req.params

    let data = await Product.findById({_id:id})
    if(!data){
        return res.json({
            success : false ,
            message:" No Product Found"
        })
    }

    return res.json({
            success : true ,
            data
        })
}

const getAllProductController = async (req , res) => {

    let data = await Product.find({ })
    if(!data){
        return res.json({
            success : false ,
            message:" No Product Found"
        })
    }

    return res.json({
            success : true ,
            data
        })
}

const getProductUpdateController = async (req , res) => {
    const { id } = req.params

    let data = await Product.findByIdAndUpdate({_id:id}, req.body , {new : true})
    if(!data){
        return res.json({
            success : false ,
            message:" No Product Found"
        })
    }

    return res.json({
            success : true ,
            message : "Product Update Successfully",
            data
        })
}

const getAllPenddingProductController = async (req , res) => {

    let data = await Product.find({status:'pendding' })
    if(!data){
        return res.json({
            success : false ,
            message:" No Product Found"
        })
    }

    return res.json({
            success : true ,
            message:" Here All Pendding Product",
            data
        })
}

const getAllActiveProductController = async (req , res) => {

    let data = await Product.find({status:'active' })
    if(!data){
        return res.json({
            success : false ,
            message:" No Product Found"
        })
    }

    return res.json({
            success : true ,
            message:" Here All Active Product",
            data
        })
}

const getAllInactiveProductController = async (req , res) => {

    let data = await Product.find({status:'inactive' })
    if(!data){
        return res.json({
            success : false ,
            message:" No Product Found"
        })
    }

    return res.json({
            success : true ,
            message:" Here All Inactive Product",
            data
        })
}

const DontgetEditInactiveProductController = async (req , res) => {
    const { id} = req.params

    let pro = await Product.findById({_id:id})
    if(pro.status === 'inactive'){
        return res.json({
            success : false ,
            message:" Inactive Product Can Not Be Edited/Updated"
        })
    }

    return res.json({
            success : true ,
            data
        })
}

const getWithoutInactiveProductController = async (req , res) => {
    const { id} = req.params

    let data = await Product.find({status: {$ne : 'inactive'}})
    if(!data){
        return res.json({
            success : false ,
            message:" No Product Found"
        })
    }

    return res.json({
            success : true ,
            message:" All Product Here Without Inactive Product",
            data
        })
}

const DeleteProductController = async (req , res) => {
    const { id} = req.params

    let data = await Product.findByIdAndDelete({_id:id})
    if(!data){
        return res.json({
            success : false ,
            message:" No Product Found"
        })
    }

    return res.json({
            success : true ,
            message:" Deleted Product Successfully",
            data
        })
}

module.exports = {CreateProductController , getProductByIdController , getAllProductController , getProductUpdateController , getAllPenddingProductController , getAllActiveProductController , getAllInactiveProductController ,DontgetEditInactiveProductController , getWithoutInactiveProductController , DeleteProductController }