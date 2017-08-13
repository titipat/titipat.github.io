---
layout: post
title: ลง adb กับ fastboot บน OS X
date: 2014-09-27 20:15:45.000000000 +07:00
---
![](https://lh3.googleusercontent.com/-qGASi7ubPMQ/VCa2svJfViI/AAAAAAAAJ_E/OrIXwJqcz7s/w1492-h1076-no/Screen%2BShot%2B2014-09-27%2Bat%2B20.07.41.png)

สำหรับ adb และ fastboot ทั้งสองเป็นเครื่องมือสำหรับการจัดการ bootloader และ rom ของมือถือระบบ Android ที่ขาดไม่ได้เลยสำหรับคนที่ชอบโมมือถือเช่นผม

วิธีการติดตั้งบน OS X (10.9) นั้นแสนง่ายเพราะไม่ต้องลงไดรเวอร์อะไรให้ปวดตับทั้งสิ้น จากที่ผมลองกับ Nexus 5 และ HTC One ทั้งคู่แค่เปิด Debug Mode ก็พร้อมสำหรับการยำเล่นแล้ว

เริ่มจากดาวโหลดไฟล์จาก https://adb-fastboot-install.googlecode.com/files/Androidv4.zip หลังจากแตกไฟล์แล้วให้ก๊อปปี้ adb และ fastboot ในไดเร็กทอรี่ Mac ไปใส่ใน /usr/bin เป็นอันเสร็จ

	sudo cp Mac/* /usr/bin
