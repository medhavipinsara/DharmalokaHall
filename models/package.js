const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  description: { type: String, required: true },
  includes: { type: String, required: true },
  features: { type: String, required: true },
  requirements: { type: String, required: true },
  type : { type: String, required: true},
  imageurls:  [],
  currentbookings : []
} , {
  timestamps: true
}
);

const packagemodel = mongoose.model('packages', packageSchema);

module.exports = packagemodel
