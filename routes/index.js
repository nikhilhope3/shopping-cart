var express = require('express');
var router = express.Router();

var Cart=require('../models/cart');
var Product=require('../models/product');

router.get('/', function(req, res, next) {
   Product.find(function(err,docs)
   	{
   		var productChunk=[];
   		var chunkSize=3;
   		for(var i=0;i< docs.length;i=i+chunkSize)
   		{
   			productChunk.push(docs.slice(i,i+3));
   		}
   		  res.render('shop/index', { title: 'Shopping-cart',products: productChunk });
   	});
});
router.get('/add-to-cart/:id',function(req,res,next)
   {
      var productId=req.params.id;
      var cart=new Cart(req.session.cart ? req.session.cart : {items:{}  });

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
   });
module.exports = router;
