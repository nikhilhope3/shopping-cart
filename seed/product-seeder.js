var Product=require('../models/product');

var mongoose=require('mongoose');

mongoose.connect('localhost:27017/shopping');


var products=[
new Product({
imagePath:'https://images-na.ssl-images-amazon.com/images/I/817nrKNTQQL._SL1500_.jpg',
title:'Lord of the rings',
description:'awesome movie',
price:900 
}),
new Product({
imagePath:'http://media.moddb.com/images/members/1/123/122021/profile/c9lzmv4d3mgzpnyntz7s.jpg',
title:'Game of thrones',
description:'Winter is comming',
price:5000 
}),
new Product({
imagePath:'http://www.moddingway.com/images/news/g328.jpg',
title:'FIFA 15',
description:'football is love',
price:400 
}),
new Product({
imagePath:'https://i.pinimg.com/736x/b9/10/e4/b910e4c9b9e3a34d0a949213995b5acb--peaky-blinders-tv-series-peaky-blinders-season.jpg',
title:'Peaky Blinders',
description:'Classic British Gangster drama',
price:9000 
}),
new Product({
imagePath:'https://ctd-thechristianpost.netdna-ssl.com/en/full/36859/narcos.jpg',
title:'Narcos',
description:'When you get too close too the sun your dreams melt away',
price:9000 
}),
new Product({
imagePath:'https://howla.com/wp-content/uploads/2017/06/mortalkombatx.jpg',
title:'Mortal Kombat X',
description:'Awesome game, sweet timepass',
price:700 
}),
new Product({
imagePath:'https://i.pinimg.com/originals/24/df/7c/24df7c453d74b7fbf8facb05d4439924.jpg',
title:'Prince Of Persia',
description:'Relive your Childhood',
price:800 
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