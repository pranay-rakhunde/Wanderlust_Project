const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isloggedin ,isOwner ,validatelisting} = require("../middlewares.js");
const multer  = require('multer');
const {storage } = require("../cloudConfig.js");
const upload = multer({ storage });


const ListingController = require("../controllers/listing.js");

router.route("/")
.get (wrapAsync(ListingController.index))
.post(isloggedin,validatelisting ,upload.single("Listing[image]"),wrapAsync( ListingController.AddListing));

// New Route
router.get("/new",isloggedin,ListingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(ListingController.ShowListing))
.put(isloggedin,isOwner ,upload.single("Listing[image]"),validatelisting, wrapAsync(ListingController.UpdateListing))
.put(isloggedin,isOwner, validatelisting , wrapAsync(ListingController.DestroyListing));

// Edit Route
router.get("/:id/edit",isloggedin,isOwner, wrapAsync(ListingController.renderEditListing));

module.exports = router;