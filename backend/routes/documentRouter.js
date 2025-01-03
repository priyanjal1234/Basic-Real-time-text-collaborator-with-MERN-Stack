const express = require('express')
const router = express.Router()
const { isLoggedin } = require('../middlewares/isLoggedin')
const { createDocument, getAllDocuments, updateDocument, deleteDocument } = require('../controllers/documentController')

router.post("/create-document",isLoggedin,createDocument)

router.get("/all-documents",isLoggedin,getAllDocuments)

router.put("/update/document/:id",isLoggedin,updateDocument)

router.delete("/delete/document/:docId",isLoggedin,deleteDocument)

module.exports = router