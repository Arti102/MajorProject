const express = require("express");
const router  = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/Expresserror.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");





//reviews
router.post("/", 
    isLoggedIn, 
    wrapAsync (reviewController.CreateReview));

//delete review route
router.delete("/:reviewId",
    isLoggedIn, 
    isReviewAuthor, 
    wrapAsync (reviewController.DestroyReview));

module.exports = router;