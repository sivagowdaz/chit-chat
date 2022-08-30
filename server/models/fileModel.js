const mongoose = require("mongoose");

const FileSchema = mongoose.Schema(
  {
    fileData: {
        type: String,
        required: true
    }
  }
)

module.exports = mongoose.model("File", FileSchema);