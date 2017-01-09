---
layout: post
title: เมื่อจัดการ http response บน angularjs ไม่รอบคอบ
---

# tl;dr

ใช้ angularjs ในการทำระบบประกาศผลโดยกรอกหมายเลข ถ้าได้รับ status code 200 ถือว่าผ่าน, 404 ไม่เจอถือว่าไม่ผ่าน แต่เมื่อ web worker ที่อยู่หลัง load balance ล่มไปแล้วได้รับ status code 502 ระบบจะแสดงผลว่าไม่ผ่านเสมอ

เรื่องมีอยู่ว่าระบบประกาศผลอันหนึ่ง ใช้ angularjs เป็น frontend และเรียก api จาก backend ตามปกติก็จะใช้ $http ที่ built-in มาอยู่แล้ว หากเรียกใช้แบบล้วกๆ จะมีหน้าตาประมาณนี้

```
$http.get(path).then(function (res) {
  // tell them passed
  console.log(res)
}, function (err) {
  // tell them failed
  console.error(err)
})
```

ซึ่งถ้าผู้ใช้ป้อนหมายเลขที่มีในฐานข้อมูล ควรจะได้ status code 200 กลับมาแบบนี้

![](https://raw.githubusercontent.com/titipat/smth-happen/master/public/ss/200.png)

และเมื่อป้อนหมายเลขที่ไม่มีในฐานข้อมูล ควรจะได้ status code 404 กลับมาแบบนี้

![](https://raw.githubusercontent.com/titipat/smth-happen/master/public/ss/404.png)

ถ้าเราไม่คิดอะไรมาก ก็เพียงแค่เพิ่มข้อความว่าผ่านเมื่อเจอ success และเพิ่มข้อความไม่ผ่านเมื่อเจอ error ก็เรียบร้อยปิดงานกลับบ้าน เฮ้! แต่ในวันจริงมันเกิดสิ่งที่เรียกว่า error status code 5xx ซึ่งหมายถึงปัญหาเกี่ยวกับเซิร์ฟเวอร์ขึ้นมา ซึ่งทำให้ไม่ว่าผู้ใช้จะผ่านหรือไม่ผ่านก็แล้วแต่ ระบบจะแจ้งกลับว่าไม่ผ่านเสมอ

![](https://raw.githubusercontent.com/titipat/smth-happen/master/public/ss/500.png)

เรื่องนี้จึงได้บทเรียนว่า อย่าทำเฉพาะแค่ user's requirements เท่านั้น ควรรวมถึงกรณีเลวร้ายอื่นๆ ที่อาจเกิดขึ้นด้วย เช่น เน็ตหลุดระหว่างทำรายการ ระบบล่ม ช้า อืด ระเบิด พัง และอื่นๆ ด้วย

