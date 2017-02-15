---
title: ทดลอง load balancer ของ digitalocean
layout: post
---

[digitalocean](https://www.digitalocean.com/) หรือที่เรียกกันย่อว่า do ผู้ให้บริการ vps ในราคาย่อมเยาด้วยแนวคิดใช้ง่ายได้เปิดตัวอีกหนึ่ง produce ในส่วน networking นั้นคือ [load balancer](https://www.digitalocean.com/products/load-balancer/) (ต่อไปขอเรียกว่า lb) ในราคาเหมาจ่ายเดือนละ $20 หรือชั่วโมงละ $0.03 หลังจากทดลองใช้คร่าวๆ ผมสรุปได้ว่า

### ข้อดี

- สร้างง่าย กดคลิกภายในหน้าเดียว ระดับ web developer ก็ใช้เป็นเมื่อเทียบกับเจ้าอื่น
- สามารถใช้ tag ในการเลือก worker ได้ เช่น เราอาจจะมี droplet (ชื่อที่ do ใช้เรียก vm instance) หลักร้อยตัวมานั่งเพิ่มทีละตัวคงไม่ไหว ดังนั้นใส่จาก tag เลยจะง่ายกว่า ส่วนถ้าต้องการเพิ่มเข้าออกแบบเยอะๆ แนะนำเรียกใช้ [api](https://developers.digitalocean.com/documentation/v2/#load-balancers) จะดีกว่า
- รองรับการทำ http health check โดยเลือก path ได้
- ทำ http to https redirect ได้ในตัวแต่กดคลิก ใครเคยเจอปัญหาเสียเวลากับ https rewrite บ้างยกมือหน่อย (ฮา)
- ทำ stick session ได้ในตัวแค่กดคลิก มันคือการเจาะจงว่าผู้ใช้มาครั้งแรกได้ worker ตัวไหนก็จะผูกไว้กับตัวนั้นเลยด้วย session ทำให้บางแอปที่ยังไม่เป็น fully stateless สามารถใช้ประโยคจาก lb ได้บ้าง

### ข้อด้อย

- ด้าน https ยังต้องอัพโหลด certificate และ key ของตัวเองอยู่ สามารถทำผ่าน [api](https://developers.digitalocean.com/documentation/v2/#certificates) ได้หรือจะใช้ตัวเดียวกันที่ทำ storage encryption ก็ได้ ได้ยินว่า do จะทำ let's encrypt มาให้ใช้กันอยู่ แต่คงอีกนาน
- ส่วน http lb หรือ application load balancer ยังไม่รอบรับการใส่ path-based rule
- รองรับแค่ tcp, http ยังไม่มี udp ให้ใช้ ใครต้องการใช้ udp ก็คงต้องอยู่ nginx หรือ haproxy ต่อไป
- dispatch algorithm ยังมีแค่สองตัวพื้นฐานคือ round-robin และ least connection ยังไม่สามารถเล่นถ้าท่าอื่นได้

ปล. ทั้งหมดเป็นการทดลอง ณ วันที่ 2017-02-15 หรือ first day launch นะครับ
