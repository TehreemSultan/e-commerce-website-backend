const express = require("express")
const router=express.Router();
const {getCategory,addCategory,editCategory,deleteCategory} = require("../controllers/category")
const {getSubCategory,addSubCategory,editSubCategory,deleteSubCategory} = require("../controllers/subcategory")

router.get(`/getCategory`, getCategory);
router.post(`/addCategory`, addCategory);
router.post(`/editCategory`, editCategory);
router.post(`/deleteCategory`, deleteCategory);


router.get(`/getsubCategory`, getSubCategory);
router.post(`/addsubCategory`, addSubCategory);
router.post(`/editsubCategory`, editSubCategory);
router.post(`/deletesubCategory`, deleteSubCategory);


module.exports = router