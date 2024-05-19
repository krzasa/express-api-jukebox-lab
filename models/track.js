const  mongoose  = require("mongoose");

const trackSchema = mongoose.Schema({
    title:String,
    artist:String,
})

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;