const {model}  = require("mongoose");

const {PositionSchema} = require("../Schemas/PositionSchema");

const PositionModel = model("position",PositionSchema);

module.exports = {PositionModel}