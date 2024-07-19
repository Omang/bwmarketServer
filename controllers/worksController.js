const Animal = require('../models/animalModel');
const Org  = require('../models/orgModel');
const Work = require('../models/workModel');

const asyncHandler = require('express-async-handler');

const addproduct = asyncHandler(async(req, res)=>{
    const {org_id, product_name, product_size,
    product_description,
    product_image} = req.body;

    try{

        const addone = await Work.create({
            org_id: org_id,
            product_name: product_name,
            product_size: product_size,
            product_description: product_description,
            product_image: product_image

        });

        if(addone){

        const addtoorg = await Org.findByIdAndUpdate(org_id,{
            $push:{
                org_works: addone._id.toString()
            }
        });

            if (addtoorg) {
                res.json(addone).status(200);
            } else {

            }

        }else{
            res.json({message: 'not added'});
        }

    }catch(error){
        throw new Error(error);
    }
});

const updateProduct = asyncHandler(async(req, res)=>{

    const {product_id, product_name, product_size,
    product_description,
    product_image} = req.body;
  try{
      

          const animal = await Product.findByIdAndUpdate(product_id,{
            product_name: product_name,
            product_size: product_size,
            product_description: product_description,
            product_image: product_image

        }, {new: true});

             res.json(animal);


  }catch(error){

      throw new Error(error);

  }


});


const deleteProduct = asyncHandler(async(req, res)=>{

    const {org_id, product_id} = req.body;
    try{

       const deleteanimal = await Product.findByIdAndDelete(product_id);
        if (deleteanimal) {
            const deleteorg = await Org.findByIdAndUpdate(org_id, {
                $pull: {
                    org_works: product_id
                }
            });
            res.json(deleteanimal).status(200);
        } else {
            res.json({message: 'Something wrong happend'});
        }

    }catch(error){
        throw new Error(error);
    }

});
const getProduct = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    
    try{

        const animal = await Product.findById(id);
        res.json(animal);

    }catch(error){
       throw new Error(error)
    }
});
const orgsworks = asyncHandler(async(req, res)=>{

    const {id} = req.params;

    try{

        allanimals = await Product.find({org_id:id});
        res.json(allanimals);

    }catch(error){
        throw new Error(error);
    }

});



module.exports ={addProduct, updateProduct, getProduct, orgsworks, 
                deleteProduct};