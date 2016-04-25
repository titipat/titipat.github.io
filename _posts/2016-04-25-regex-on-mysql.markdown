---
layout: post
title: Regex บน mysql
---

ถ้าใครเขียนโปรแกรมต้องรู้จัก Regex ไม่มากก็น้อย แต่ผมไม่เคยเอามาใช้กับ sql query มาก่อนเลยอยากจะบันทึกไว้สักหน่อย

ผมมีโจทย์ว่า ในการเก็บข้อมูลสินค้าแต่ละอย่างจะมีรหัสประจำ 6 หลัก และในรหัสหลักที่ 4 จะหมายถึงที่มาของสินค้า เช่น 0-6 คือสินค้าภายในประเทศ ส่วนที่เหลือ 7-9 เป็นสินค้านำเขา 

ในส่วนของการเขียน sql จะได้หน้าตาประมาณนี้

```sql
select *
from products
where no regexp '^...[0-6]..$'
```

ดังนั้นการ implement web api บน illuminate database ของผมจึงเป็นตามนี้

```php
<?php

function getProducts($filters)
{
    $products = Capsule::table('products');

    // others filter
    // ...

    // check does source filter has requested
    if (isset($filters['source'])) {
        if ($filters['source'] === 'import') {
            $products->where('no', 'regexp', '^...[7-9]..$');
        } else if ($filters['source'] === 'local') {
            $products->where('no', 'regexp', '^...[0-6]..$');
        }
    }

    return $products->get();
}
```

พอดีงานนี้ไม่ได้ใช้ object-relation mapping (orm) จึงเรียกใช้แค่ query builder เท่านั้น ส่วนท่านใดสนใจลองต่อยอดได้ที่ illuminate/database, eloquent database ได้ครับ