const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
   ownerid:{type: String},
   org_name:{type: String}, 
   org_type:{type: String}, 
   license_id:{type: String},
           cellphone:{type: String}, 
           email:{type: String}, 
           plot_number:{type: String}, nearby_places:{type: String}, 
           org_description:{type: String}, 
          org_image:{type: String}, 
          operation_from:{type: String},
           operation_to:{type: String}, 
           working_days:{type: String},
    org_works:[{type:mongoose.Schema.Types.ObjectId, ref: "Works"}]
}, {timestamps: true});

module.exports = mongoose.model('Org', orgSchema);