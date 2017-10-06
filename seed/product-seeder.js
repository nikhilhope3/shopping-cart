var Product=require('../models/product');

var mongoose=require('mongoose');

mongoose.connect('localhost:27017/shopping');


var products=[
new Product({
imagePath:'https://images-na.ssl-images-amazon.com/images/I/817nrKNTQQL._SL1500_.jpg',
title:'Morder',
description:'awesome movie',
price:1000 
}),
new Product({
imagePath:'https://images-na.ssl-images-amazon.com/images/I/817nrKNTQQL._SL1500_.jpg',
title:'Morder',
description:'awesome movie',
price:1000 
}),
new Product({
imagePath:'https://images-na.ssl-images-amazon.com/images/I/817nrKNTQQL._SL1500_.jpg',
title:'Morder',
description:'awesome movie',
price:1000 
}),
new Product({
imagePath:'https://images-na.ssl-images-amazon.com/images/I/817nrKNTQQL._SL1500_.jpg',
title:'Morder',
description:'awesome movie',
price:1000 
})
]
var done=0;
for(var i=0;i<products.length;i++)
{
	products[i].save(function(err,result)
		{

done++;
if(done===products.length)
{
	exit();
}


});
}

function exit()
{
mongoose.disconnect();
}