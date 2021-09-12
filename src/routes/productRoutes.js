const express = require("express")
const router=express.Router();
const {getProducts,getlimitedTimeOfferProducts,getFeaturedProducts,getBestSellingBySub,getBestSelling,addProduct,editProduct,deleteProduct,getFeaturedProductsBySub,getlimitedTimeOfferProductsBySub} = require("../controllers/product")

router.get(`/getProducts`, getProducts);
router.get(`/getlimitedTimeOfferProducts`, getlimitedTimeOfferProducts);
router.post(`/addProduct`, addProduct);
router.post(`/editProduct`, editProduct);
router.post(`/deleteProduct`, deleteProduct);
router.get(`/getFeaturedProducts`,getFeaturedProducts);
router.get(`/getBestSelling`,getBestSelling);
router.get(`/getlimitedTimeOfferProductsBySub`,getlimitedTimeOfferProductsBySub)
router.get(`/getFeaturedProductsBySub`,getFeaturedProductsBySub)
router.get(`/getBestSellingBySub`,getBestSellingBySub)

module.exports = router