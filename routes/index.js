var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
var Cart=require('../models/cart');
var Product=require('../models/product');
var Order=require('../models/order');
router.get('/checkout',isLoggedIn,function(req,res,next)
   {
      var cart= new Cart(req.session.cart);
      console.log(req.user.email);
      console.log(req.user);
      var order=new Order({
         user:req.user,
         cart:cart
      });
      order.save(function(err,result){

         var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shoppingcart.nikhil@gmail.com',
    pass: 'project123'
  }
});
var temp=req.user.email;

var mailOptions = {
  from: 'shoppingcart.nikhil@gmail.com',
  to:temp ,
  subject: 'order confirmed',
  text: 'order will be delivered in next 5 bussiness days!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


         req.session.cart=null;

         req.flash('success','successfully brought product');
         res.redirect('/');
      });
   
   });

router.get('/', function(req, res, next) {
   var successMsg=req.flash('success')[0];
   Product.find(function(err,docs)   	{
   		var productChunk=[];
   		var chunkSize=3;
   		for(var i=0;i< docs.length;i=i+chunkSize)
	{
   			productChunk.push(docs.slice(i,i+3));
	}
   	 res.render('shop/index', { title: 'Shopping-cart',products: productChunk,successMsg:successMsg ,noMessage: !successMsg });   	});
});
router.get('/add-to-cart/:id',function(req,res,next)
   {
      var productId=req.params.id;
      var cart=new Cart(req.session.cart ? req.session.cart : {});

      Product.findById(productId,function(err,product)
      {
         if(err)
         {
          return   res.redirect('/');
         }
         cart.add(product,product.id);
         req.session.cart=cart;
         console.log(req.session.cart);

         res.redirect('/');
      });
      console.log(cart);
   });

router.get('/shopping-cart',function(req,res,next)
   {
      if(!req.session.cart){
         return res.render('shop/shopping-cart',{product:null});
      }
      var cart=new Cart(req.session.cart);
      res.render('shop/shopping-cart',{product: cart.generateArray(), totalprice:cart.totalPrice});
   });

function isLoggedIn(req,res,next)
{
   if(req.isAuthenticated())
   {
      return next();
   }
   res.redirect('/user/signin');
}

module.exports = router;
