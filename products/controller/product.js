const multiparty = require('multiparty')
const {Product} = require('../model/products')
const {Order,validate} = require('../model/order')
const Cart = require('./cart')


const getProducts = async(req,res,next) =>{
    const list = await Product.find().exec()
    res.render('product',{
        products:list
    })

}
const getNewProduct = async(req,res,next) =>{
    res.render('newProduct')
}
const destination = "./public/uploads"
const newProduct = async(req,res,next) =>{
let form = new multiparty.Form({uploadDir:destination})
form.parse(req,async(err,fields,files)=>{
    let success = []
    let errors = [];
    let productname = fields.productname[0]
    let description = fields.description[0]
    let type = fields.type[0]
    let price = fields.price[0]


    if(err){
        errors.push({msg:"Product not added,Please try again"})
        console.log(err.message)
        res.render('newProduct',{
            errors
        })
    }

    const imagepath = files.productimage[0].path
    const imageFileName = imagepath.slice(imagepath.lastIndexOf("\\")+1)
    let product = await new Product({
        productname:productname,
        description:description,
        type:type,
        price:price,
        productimage:imageFileName
    })
    product = await product.save()
    res.render('newProduct')
})
}
const getProductslist = async(req,res,next) =>{
    const list = await Product.find().exec()
    res.render('productlist',{
        products:list
    })

}
const getUpdateProductView = async(req,res,next) =>{
    try{
        const id = req.params.id;
        const oneProduct = await Product.findById(id).exec();
        res.render('updateProduct',{
            product:oneProduct
        })
}catch(err){
    res.status(400).send(err.message);
}
}
const updateProduct = async(req,res,next) =>{
    let form = new multiparty.Form({uploadDir:destination})
form.parse(req,async(err,fields,files)=>{
    let success = []
    let errors = [];
    const id = req.params.id
    let productname = fields.productname[0]
    let description = fields.description[0]
    let type = fields.type[0]
    let price = fields.price[0]


    if(err){
        errors.push({msg:"Product not added,Please try again"})
        console.log(err.message)
        res.render('newProduct',{
            errors
        })
    }

    const imagepath = files.productimage[0].path
    const imageFileName = imagepath.slice(imagepath.lastIndexOf("\\")+1)
    let product = await Product.findByIdAndUpdate(id,{
        productname:productname,
        description:description,
        type:type,
        price:price,
        productimage:imageFileName
    },{new:true})
    product = await product.save()
    if(!product) return res.status(404).send("Product with the given id is not found")

    res.redirect('/productlist')
})
}
const getDeleteProductView = async(req,res,next) =>{
    try{
        const id = req.params.id;
        const oneProduct = await Product.findById(id).exec();
        res.render('deleteProduct',{
            product:oneProduct
        })
}catch(err){
    res.status(400).send(err.message);
}
}
const deleteProduct = async(req,res,next) =>{
    try{
        const id = req.params.id
        const product = await Product.findByIdAndRemove(id);
        if(!product) return res.status(404).send("Product with the given id is not found")
        res.redirect('/productlist')
    
    }catch(err){
        res.status(400).send(err.message);
    
    }
    }
    const getSearchView = async(req,res,next)=>{
        res.render('search')
    }
    const getProductDashboard = async(req,res,next) =>{
        try{
            var list = await Product.find().exec()
            res.render('productDashboard',{
                products:list,
                cart:Cart.getCart()
                
            })
        }catch(err){
            console.log(err.message)
        }
    
    }
    let addtocart = async(req,res,next) =>{
        let success = []
        const ProductId = req.body.id
        await Product.findById(ProductId).then(
            user =>{
                let success = []
                let selectedProduct = user
                Cart.save(selectedProduct)
                
            }
            
        )
        const list = await Product.find().exec()
            success.push({msg:'Product Added Succesfully'}),
            res.render('productDashboard',{
                success,
                products:list
            })

        }
        let getCartPage = (req,res,next) =>{
            let cartLength = Cart.getCart().products.length
            //console.log(Cart.getCart())
            res.render('cart',{
                cart:Cart.getCart(),
                pageTitle:'Shopping Cart',
                path:'/cart',
                name:"Rollins",
            cartLength})
            
        }
        let deleteCart = (req,res) =>{
            const cartPrice = Cart.getCart().products[0].price
            //console.log("total price of items in the cart"+ cartPrice)
            Cart.delete(req.body.prodId,cartPrice)
            res.redirect('/cart')
        }
        const OrderPageView = async(req,res,next) =>{
            res.render('order',{
                cart:Cart.getCart()
            })
        }
        function getImage(cart){
            for(let i = 0; i< cart.length; i++){
                console.log("function     ---" + cart[i].productimage)
                return cart[i].productimage
            }
        }
        const OrderPage = async(req,res,next) =>{
            //console.log(req.body)
            let cart = Cart.getCart().products
            console.log("blaa   "+getImage(cart))
            let success = []
            let order = new Order({
                productimage:getImage(cart),
                mobile: req.body.mobile,
                county: req.body.county,
                estate: req.body.estate,
                address: req.body.address,
                payment:req.body.payment,
                mpesaNumber:req.body.mpesaNumber,
                amount: req.body.amount[0],
                mastercardName: req.body.mastercardName,
                mastercardNumber: req.body.mastercardNumber
            })
            order = order.save()
            const list = await Product.find().exec()
            success.push({msg:"Product Order was Successfull"})
            res.render('productDashboard',{
                success,
                products:list
            })
        }
        const getOrderslist = async(req,res,next) =>{
            
            const list = await Order.find().exec()
            res.render('orderlist',{
                orders:list,
                cart:Cart.getCart()
            })
        
        }
        const getDeleteOrderView = async(req,res,next) =>{
            try{
                const id = req.params.id;
                const oneOrder = await Order.findById(id).exec();
                res.render('deleteOrder',{
                    order:oneOrder
                })
        }catch(err){
            res.status(400).send(err.message);
        }
        }
        const deleteOrder = async(req,res,next) =>{
            try{
                const id = req.params.id
                const order = await Order.findByIdAndRemove(id);
                if(!order) return res.status(404).send("Order with the given id is not found")
                res.redirect('/orderlist')
            
            }catch(err){
                res.status(400).send(err.message);
            
            }
            }
module.exports = {
    getProducts,
    getNewProduct,
    newProduct,
    getProductslist,
    getUpdateProductView,
    updateProduct,
    getDeleteProductView,
    deleteProduct,
    getSearchView,
    getProductDashboard,
    addtocart,
    getCartPage,
    deleteCart,
    OrderPageView,
    OrderPage,
    getOrderslist,
    deleteOrder,
    getDeleteOrderView
}