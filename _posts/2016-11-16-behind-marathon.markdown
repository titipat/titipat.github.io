---
title: เบื้องหลังระบบวิ่งมาราธอน
layout: post
---

ผมได้จับพลัดจับผลูมีส่วนร่วมกับงานวิ่งมาราธอนที่หนึ่ง จากงานที่แค่ deploy ระบบยังไงไม่ให้ล่มกลายเป็นพัฒนาทั้งระบบ มองในแง่ดีก็ถือว่าเป็นประสบการณ์ล่ะนะ

## ระบบมีอะไรบ้าง

งานนี้เป็นเว็บแอปครับ ผมแยกเว็บออกเป็นสองตัวหน้าเว็บสำหรับข้อมูล กับหน้าเว็บลงทะเบียน

- **หน้าข้อมูล** เขียนด้วย nodejs ใช้ express, nunjucks ตัวเว็บมีการทำ i18n แบบง่ายๆ ด้วยการใช้ i18n string substitution แบบดิบๆ
- **หน้าลงทะเบียน** เขียนด้วย php 7.x เนื่องจากเวลาในการพัฒนาค่อนข้างจำกัดมากถึงมากที่สุด ประมาณสัปดาห์เดียว ผมเลือก yii2 framework เพราะว่ามันมี gii ที่เป็น code generator สามารถสร้าง mvc pattern และ form เบื้องต้นได้โดยอ้างอิงจาก data schema แต่จากการใช้งานภายหลังพบว่า active record ของ yii2 ไปเรียก column name ทุกครั้งทำให้เกิดการ read แบบไม่จำเป็นเยอะมาก
- **ส่วนสนับสนุน** มีอีกทีมทำหน้าที่การ support ผ่าน facebook page และอีเมล

## เครื่องมือที่ใช้

* **Cloudflare** เป็น dns, cdn, caching จ่ายเป็น professional plan
* **Heroku** เป็น web worker แล้วใช้ add-ons ในการจัดการ logs, alert ส่วนของการ scaling เป็นแค่ลักษณะ scale up โดยตัวหน้าเปิดไว้ที่ standard 1x หน้าลงทะเบียนเป็น stardard 1x เช่นกัน จะมีวันแรกที่เปิดใช้งานวิ่งอยู่ที่ stardard 2x - performance m ทั้งสองเว็บเปิด automatic deployment จาก github repository อีกที ทำให้ dev สามารถ test และ deploy เองได้
* **AWS RDS** เลือกใช้ mysql 5.7 ขนาด db.t2.micro เป็น database instance 
* **Mailgun** สำหรับการส่งเมลออกและ forward ไปหา helpdesk ณ ขณะที่เขียนยังใช้ free plan แต่อนาคตอาจต้องจ่ายเพราะส่งเมลจำนวนหนึ่งในการยืนยันผล
* **GrooveHQ** เป็น support helpdesk ในการรับเมล support@***marathon.com ตอนนี้ยังใช้ free plan ซึ่งใช้งานได้ 3 agent
* **Github** เป็น code repository และเชื่อมกับ automatic deployment ของ heroku, ใช้ issue ในการพูดคุยของ dev
* **Basecamp** ใช้ในช่วงแรกของโปรเจค แต่ก็ปิดไปเพราะไม่ค่อยมีคนใช้ เสียดายตัง

## Update 2017-01-25

เนื่องจากต้องส่ง conformation mail ให้กับผู้วิ่งแล้ว Mailgun ติด limit ส่งได้แค่ 100 ฉบับต่อวันแบบไม่ทราบสาเหตุ เลยเปลี่ยนมาใช้ [sendgrid.com](sendgrid.com) essentials plan ที่ $9.99 ต่อเดือน ส่งได้ 40,000 ฉบับ บริการมี native php library ให้เรียบร้อย 

ตอนใช้จริงเนื่องจากไม่ได้ทำการ [warm-up ip](https://sendgrid.com/docs/Classroom/Deliver/Delivery_Introduction/warming_up_ips.html) ตามคำแนะนำ ทำให้เมลส่วนใหญ่ยังไม่สามารถส่งถึงผู้รับได้ทันที แต่จะติดสถานะ deffered แต่ทั้งหมด 4,000 ฉบับก็ถูกส่งถึงในเวลาวันกว่าๆ ถือว่าเป็นการแก้ปัญหาเฉพาะหน้าไป

