---
layout: post
title: ต่อ USB-Serial (Cisco-Console) อย่างง่ายๆบน OS X
date: 2014-09-26 11:35:14.000000000 +07:00
---
![](https://lh4.googleusercontent.com/-QUm3RNFYaas/VCTpOheWczI/AAAAAAAAJ8Q/-7gS1tJIfJI/w1434-h1076-no/IMG_20140926_110642.jpg)

ขั้นแรกไปหาหัวแปลง USB to Serial (RS232) มาก่อนค่าเสียหายจะอยู่ราวๆ 600-2000 บาทขึ้นกับความหรูหราของอุปกรณ์

หลังจากเสียบเข้ากับ USB Port ของท่านแล้วให้ลองตรวจสอบว่ามี Driver แล้วหรือยังด้วย

	ls /dev/ | grep serial
    
ถ้าเจอ tty ตัวไหนมีชื่อ Serial ก็น่าจะพร้อมใช้แล้วแหละ ใครไม่ขึ้นลองหาโหลดไดรเวอร์จากเว็บของผู้ผลิตดู
    
![](https://lh4.googleusercontent.com/-zg5NTZtLKHA/VCTpbBMENFI/AAAAAAAAJ78/oF5595i3pFk/w1492-h1076-no/Screen%2BShot%2B2014-09-26%2Bat%2B11.09.10.png)

### เริ่มเชื่อมต่อ

การใช้งานใน OS X ง่ายมากไม่จำเป็นต้องลงอะไรเพิ่มแล้วแค่

	screen /dev/<TTY.INTERACENAME> 9600



### Break Sequence

การส่งคำสั่ง Break ทำได้โดยคีบอร์ดตามลำดับนี้

	control+A
    control+B
    
แค่นี้แหละครับง่ายดายมากถ้าเทียบกับ Linux ที่ต้องลง minicom หรือ Windows ที่ต้องลง Hyper Terminal หรือ Putty

![](https://lh4.googleusercontent.com/-zs-JYEvWQsI/VCTpbjMaR8I/AAAAAAAAJ8A/AHzDqbsLUQQ/w1492-h1076-no/Screen%2BShot%2B2014-09-26%2Bat%2B11.10.13.png)
