export const allListing = (req, res) =>{
    res.status(200).json({
        tiltle : "Listing title",
        owner : "Owner of prop",
        type : "PG/Hostel/Rent"
    });
};