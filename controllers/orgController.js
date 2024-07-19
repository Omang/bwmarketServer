const Org = require('../models/orgModel');

const asyncHandler = require('express-async-handler');

const createOrg = asyncHandler(async(req, res)=>{

    const {ownerid, org_name, org_type, license_id,
           cellphone, email, plot_number, nearby_places, org_description, 
          org_image, operation_from, operation_to, working_days } = req.body;

    try{

        const createorg = await Org.create(req.body);

    }catch(error){
        throw  new Error(error);
    }

});
const getOrg = asyncHandler(async(req, res)=>{
    const {id} = req.params;

    try{
        const theorg = await Org.findById(id).populate('org_works');
        res.json(theorg);

    }catch(error){
        throw new Error(error);
    }
});

const updateOrg = asyncHandler(async(req, res)=>{

   // const {id} = req.params;
    
    const {orgid, license_id,
           cellphone, email, plot_number, nearby_places, org_description, 
          org_image, operation_from, operation_to, working_days } = req.body;
    try{

        const updateone = await Org.findByIdAndUpdate(orgid, {license_id:license_id,
           cellphone:cellphone, email:email, plot_number:plot_number, nearby_places:nearby_places, 
           org_description:org_description, 
          org_image:org_image, operation_from:operation_from, operation_to:operation_to, 
          working_days:working_days },{
            new: true
          });

          if (updateone) {
            res.json(updateone).status(200);
          } else {
            res.json({message: 'Something bad happend'}).status(500);
          }


    }catch(error){
        throw new Error(error);

    }

});

const deleteOrg = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    try{
        const deletedorg = await Org.findByIdAndDelete(id);

        res.json(deletedorg)

    }catch(error){
        throw new Error(error);
    }

});
const getallOrgs = asyncHandler(async(req, res)=>{
   try{
     const getallorg = await Org.find();
      
      res.json(getallorg);

     }catch(error){ 
     throw new Error(error);
    }
});

module.exports ={createOrg, getOrg, updateOrg, deleteOrg, getallOrgs};