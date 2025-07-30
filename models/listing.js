const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: String
  },
  
  price: {
    type: Number,
    required: true,
    min: [1, 'Price must be at least 1']
  },

  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findoneAndDelete", async (listing) => {
  if(listing){
      await Review.deleteMany({reviews : {$in: listing.reviews}});

  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;