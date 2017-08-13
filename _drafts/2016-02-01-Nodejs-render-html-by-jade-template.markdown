---
layout: default
title: สร้าง static file ด้วย jade template renderer
---

Static site generator เป็นอีกหนึ่งรูปแบบเว็บที่เริ่มมาแรงในช่วงหลังนี้ ด้วยความเรียบง่ายจาก html และ javascript ทำให้ไม่ต้องจัดการ service side environment ให้ปวดหัวด้วย ด้วยจุดเด่นนี้ผมเลยจะนำมาประยุกต์กับงานของผม

เรื่องมีอยู่ว่าที่ทำงานผมต้องทำการประกาศผลบางอย่างซึ่งจะทำให้ช่วงเวลานั้นมีผู้เข้ามาใช้งานเว็บจำนวนมหาศาล การใช้งานไม่ได้กิน resource มากมายแต่ด้วยปริมาณของ request ที่เยอะกลับทำให้ network มักบินไปเสียก่อน เลยเกิดเป็นความคิดที่จะทำ static file แล้วทำ caching เอาไว้ แล้วไหนๆ จะใช้ static file แล้วก็ลองใช้การ render ผ่าน template engine ดูเลยละกัน

เริ่มจากเขียน template ไฟล์ ผมเลือกใช้ jade engine นะครับ

```
h1 #{product.title}

table
  tr
    th price
    th description
  tr
    td #{product.price}
    td #{product.description}
```

แล้วก็ทำการเรียกข้อมูลมา render ด้วย template ที่เราเตรียมไว้

```javascript
var jade = require('jade');
var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'foo',
  password: 'bar',
  database: 'buzz'
});

connection.connect();

connection.query('SELECT * FROM products', function(err, products) {
  products.forEach(function(product, index, array) {
    // assume
    // var product = {
    // id: 1234,
    // title: Notebook,
    // price: '50',
    // description: 'A simple notebook'
    // };

    // Initiate renderer
    var fn = jade.complieFile('templates/products.jade');
    // Do rendering
    var html = fn({
      product: product,
      // ...
    });
    // Finally, write rendered files
    fs.writeFile('output/products/' + product.id + '.html', html);
  });
});
```

สุดท้ายเราจะได้ไฟล์ html หน้าตาราวๆ นี้ครับ

```html
<h1>Notebook</h1>

<table>
  <tr>
    <th>price</th>
    <th>description</th>
  </tr>
  <tr>
    <td>50</td>
    <td>A simple notebook</td>
  </tr>
</table>
```

ref [http://jade-lang.com/api/](http://jade-lang.com/api/)
