var buff=new Buffer(30);

var str='你好'
buff.write(str);


var txt=buff.toString('utf8',0,4)

console.log(txt);

console.log(buff.toJSON());