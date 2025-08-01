const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/Expresserror.js");
const { ListingSchema, reviewSchema} = require("./schema.js");
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.Url = req.originalUrl;
        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.Url) {
        res.locals.redirectUrl = req.session.Url;
        delete req.session.Url; // optional: clear after use
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error", "You dont have permission to update");
      return res.redirect(`/listings/${id}`);

    }
    next();
};


module.exports.validateListing = (req, res, next) => {
  let {error} = ListingSchema.validate(req.body.listing);
  
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }

};

module.exports.validateReview = (req, res, next) => {
  let {error} = reviewSchema.validate(req.body);
  
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }

};


module.exports.isReviewAuthor = async (req, res, next) => {
    let { reviewId, id } = req.params;
    let review = await Review.findById(reviewId);

    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error", "You dont have permission to update");
      return res.redirect(`/listings/${id}`);

    }
    next();
};