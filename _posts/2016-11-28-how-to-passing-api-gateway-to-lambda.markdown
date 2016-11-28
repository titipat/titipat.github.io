---
title: Passing path, query params, body from AWS API Gateway to Lambda
layout: post
---

ใครขี้เกียจอ่านข้ามไป [tr;dr](#tldr) ได้เลย

คอมโบ aws api gateway + lambda function + x as a service เริ่มมีให้เห็นกันมากขึ้นภายใต้ชื่อ serverless โดยมีจุดเด่นที่ zero-maintenance เพราะทุกอย่างเป็น managed service จึงไม่ต้องการผู้ดูแลระบบอีกต่อไป จากที่ผมได้ใช้ในงานคร่าวๆ ประมาณสองเดือนผมรู้สึกว่า

**จุดเด่น**

- ไม่ต้องการคนดูแล
- scaling ง่ายแค่มีทุน
- จ่ายแบบ pay as you go ตามเวลาที่รัน ปัดเลขที่ 100ms
- สามารถทำงานร่วมกับ aws sdk อื่นๆ ได้เลยโดยไม่ต้องฝั่ง policy ลงในโค้ด

**จุดด้อย**

- ด้วยความที่ lambda เป็น stateless ที่แยกกันแบบโดดเดี่ยวสุดๆ เวลา deploy ต้องไล่ทำทีละอัน (เอาจริงผมก็เขียนสคลิปครอบ aws cli อยู่ดีแหละ)
- lambda โดนเริ่มต้นยัง build จาก package.json ไม่ได้ ถ้าไม่ใช้ ci ก็ต้อง zip file แล้วอัพโหลด
- เสี่ยงต่อ vendor lock-in เช่น เรื่อง datastore หรือเมื่อระบบโตมากๆ
- single point of failure ทั้งในแง่ถ้า aws api gateway ล่มหรือปัญหาจากตัว lambda code เอง เช่น bug

**หลักคร่าวๆ ของ serverless api endpoint**

เป็นการประยุกต์ใช้บริการ aws api gateway เป็นจุดเริ่มต้นให้ client ส่ง request เข้ามาจากนั้นเรียก trigger ต่างๆ ซึ่งก็คือ lambda function ด้วยการ mapping ระหว่าง http method กับ resource url แต่ความครบถ้วนของ api request ที่มีทั้ง path parameter, query string และ body ก่อนที่จะส่งให้ lambda function ต้องมีการตั้งค่า integration request เพื่อให้แนบไปด้วยเสียก่อน

### tl;dr

- path ให้ตั้งที่ resource เช่น `/students/{id}`
- query, body เปิดใช้ mapping templete ที่ integration request ก่อนจะ trigger lambda function ถ้าไม่คิดมากก็เลือกเป็น method request passthrough ไปเลย

สมมุติว่า endpoint `/students/123/enrollments?field=id,title` ใน nodejs จะอยู่ตัวแปร event มีหน้าตาประมาณนี้

```javascript
{
  "body-json": {},
  params: {
    path: {
      id: '123'
    },
    querystring: {
      field: "id,title"
    }
  }
}
```
