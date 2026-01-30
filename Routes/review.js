const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview ,isloggedin,isAuthor} = require("../middlewares.js")

const ReviewController = require("../controllers/review.js");

// Review (Post Route)
router.post("/",isloggedin,validateReview, wrapAsync( ReviewController.createReview));

// Review Delete Route
router.delete("/:reviewId",isloggedin,isAuthor,wrapAsync(ReviewController.DestroyReview));

module.exports = router;