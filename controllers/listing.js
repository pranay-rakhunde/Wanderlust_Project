const Listing = require("../models/listing.js");

// Index
module.exports.index = async(req,res)=>{
    const allListing = await Listing.find({});
    res.render("./listing/index.ejs",{allListing});
};

// New
module.exports.renderNewForm = (req,res) =>{
    res.render("./listing/new.ejs");
};

// Add
module.exports.AddListing = async(req,res) =>{
    let url = req.file.path;
    let filename = req.file.filename;

    let newlisting = new Listing(req.body.Listing);
    newlisting.owner = req.user._id ;
    newlisting.image ={url,filename};
    await newlisting.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};

// Edit
module.exports.renderEditListing = async(req,res) =>{
    let {id} = req.params;
    let data = await Listing.findById(id);
    if(!data){
        req.flash("error","You Requested for Listing Does Not Exits!");
        return res.redirect("/listings");
    }
    let OriginalImageUrl = data.image.url;
    OriginalImageUrl = OriginalImageUrl.replace("/upload","/upload/w_250");
    
    res.render("./listing/edit.ejs",{data , OriginalImageUrl});
};

// Update
module.exports.UpdateListing = async(req,res) =>{
    let {id} = req.params;
    let listing  = await Listing.findByIdAndUpdate(id ,{...req.body.Listing});

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image ={url,filename};
    await listing.save();
    }
    
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// Show
module.exports.ShowListing = async(req,res) =>{
    let {id} = req.params;
    let data = await Listing.findById(id).populate({path:"reviews",populate :{path:"author"},}).populate("owner");
    if(!data){
        req.flash("error","You Requested for Listing Does Not Exits!");
        return res.redirect("/listings");
    }
    res.render("./listing/show.ejs",{data});
};

// Delete
module.exports.DestroyListing = async(req,res) =>{
    let {id} = req.params;
    let deletelist = await Listing.findByIdAndDelete(id);
    console.log(deletelist);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};
