const File = require("../models/fileModel")

module.exports.uploadFile = async (req, res, next) => {

  console.log("inside the upload file function")
  try {
    const data = await File.create({
      fileData: req.body.file_data
    });
    if (data) return res.json({ msg:data })
    else return res.json({msg: "Failed to add msg to database"})
  } catch (ex) {
    next(ex)
  }
}