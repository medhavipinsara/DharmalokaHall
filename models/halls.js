const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  maxCount: { type: Number, required: true },
  phoneNumber: { type: Number, required: true },
  description: { type: String, required: true },
  imageURLs: { type: [String], default: [] }, // array of image URLs for slideshow
  hourlyCost: { type: Number, required: true },
  bookingCalendar: { type: [Date], default: [] } // array of booked dates
});

const hallmodel = mongoose.model('halls', hallSchema);
module.exports=hallmodel
