const documentModel = require("../models/document-model");
const userModel = require("../models/user-model");

module.exports.createDocument = async function (req, res) {
  try {
    let { title } = req.body;
    let user = await userModel.findOne({ email: req.user.email });
    let document = await documentModel.create({
      user: user._id,
      title,
    });
    user.documents.push(document._id);
    await user.save();
    return res
      .status(201)
      .json({ message: "Document Created Successfully", id: document?._id });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getAllDocuments = async function (req, res) {
  try {
    let allDocuments = await documentModel.find();
    return res.status(200).json(allDocuments);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.updateDocument = async function (req, res) {
  try {
    let { id } = req.params;
    let { content } = req.body;
    let document = await documentModel.findOne({ _id: id });
    if (!document)
      return res
        .status(404)
        .json({ message: "Document with this id not found" });
    document.content = content;
    await document.save();
    return res.status(200).json({ message: "Changes Saved" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
