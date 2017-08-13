---
layout: post
title: วิธีเรียก Entity hidden key มาใช้งานใน Google Datastore
---

### ยาวไปไม่อ่าน

* Google Datastore การ Insert, Update, Delete ต้องทำผ่าน Key
* แต่ Document พูดถึง Key แค่ในขั้นตอน Query ไม่ได้พูดถึงการนำไปใช้ต่อใน Insert, Update, Delete ทำให้มือใหม่เสียเวลาค้นคว้านิดหน่อย
* เรียกได้ผ่าน Key ของแต่ละ Entity ได้โดย `let key = entity[datastore.KEY]`

---

Google Datastore เป็นบริการ Full-managed NoSQL database ที่น่าสนใจตัวหนึ่งด้วยความสามารถ \การทำ Transaction ได้และมี Free tier ให้ทดลองใช้ในปริมาณที่เยอะจนเหลือสำหรับบาง Production

ตัว Datastore เปิดให้เราสามารถ Query ได้เช่นเดียวกับ NoSQL ทั่วไป และมีข้อแม้สำหรับการ Insert (save), Update และ Delete ว่าต้องทำผ่าน Key ของ Entity (ชื่อเรียกของหนึ่ง Data Document) แต่ถึงอย่างนั้นตัว Library Document ของ Nodejs กลับไม่ได้พูดถึงการใช้ Key ในงานลักษณะ Query and delete เลยจะมีแค่ Query เฉยๆ ดังนั้นผมจะขอจดโน้ตไว้ว่ามันสามารถใช้งานในลักษะนี้ได้ด้วย

```javascript
let Datastore = require('@google-cloud/datastore')
let projectId = 'PROJECT_ID'
let datastore = Datastore({projectId})
let kind = 'Company'
let query = datastore.createQuery(kind)

query.select().run().then((data) => {
  let entities = data[0]
  return entities.map((entity) => {
    let key = entity[datastore.KEY]
    return key
  })
}).then((keys) => {
  return datastore.delete(keys)
}).catch((err) => {
  console.error(err)
})
```

PS. เขียน ณ datastore lib 0.7.1 นะครับ