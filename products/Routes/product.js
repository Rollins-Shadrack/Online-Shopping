const express = require('express')
const { getCart } = require('../controller/cart')
const router = express.Router()
const {getProducts, getNewProduct, newProduct,getProductslist,getUpdateProductView, updateProduct,
    getDeleteProductView,
    deleteProduct,
    getSearchView,
    getProductDashboard,addtocart, getCartPage, deleteCart, OrderPageView, OrderPage, getOrderslist, getDeleteOrderView, deleteOrder} = require('../controller/product')

router.get('/',getProducts)

router.get('/newProduct', getNewProduct)

router.post('/newProduct',newProduct)

router.get('/productlist',getProductslist)

router.get('/updateProduct/:id', getUpdateProductView)

router.post('/updateProduct/:id',updateProduct)

router.get('/deleteProduct/:id',getDeleteProductView)

router.post('/deleteProduct/:id',deleteProduct)

router.get('/search',getSearchView)

router.get('/customerDashboard',getProductDashboard)

router.post('/add-to-cart', addtocart)

router.get('/cart',getCartPage)

router.post('/delete-cart',deleteCart)

router.get('/order',OrderPageView)

router.post('/order',OrderPage)

router.get('/orderlist',getOrderslist)

router.get('/deleteOrder/:id',getDeleteOrderView)

router.post('/deleteOrder/:id',deleteOrder)

module.exports = router