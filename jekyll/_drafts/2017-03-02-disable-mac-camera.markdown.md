---
layout: post
title: ปิดกล้องบน Mac (Sierra)
---

เรื่องความกังวลกับความเป็นส่วนตัว (Privacy concern) กับนโยบายการสอดส่อง (Surveillance policy) เป็นประเด็นเริ่มพูดกันมากขึ้นตั้งแต่การออกมาแฉของอดีตเจ้าหน้าที่ NSA หนุ่ม Edward Snowden ทำให้หลายคนเอาสติ๊กเกอร์มาติดหน้ากล้องและไมค์โครโฟนรวมทั้ง Ceo Facebook ([Mark Zuckerberg tapes over his webcam. Should you?](https://www.theguardian.com/technology/2016/jun/22/mark-zuckerberg-tape-webcam-microphone-facebook))

วันนี้ผมเจออีกหนึ่งวิธีที่จะ Disable interface camera ของ Mac OS ออกไปเลย จึงนำมาบอกต่อครับ วิธีนี้ใช้หลักการว่าไม่ให้สิทธิ์ใช้งานกล้องกับใครทั้งนั้น วิธีการคือ

1. ปิด SIP (Disable System Integrity Protection) เสียก่อน เจ้าตัวนี้ทำงานเป็นพี่ใหญ่ในการ Lockdown `/System`, `/sbin` และ `/usr` เพื่อความปลอดภัยของ OS เราเลยไม่สามารถแก้ไขอะไรในนั้นได้ เว้นแต่จะทำใน Recovery mode โดยการ Reboot เครื่องก่อน เมื่อได้ยืนเสียงเปิดเครื่องให้กด `Command + R` แช่ไว้เพื่อเข้า Recovery mode จากนั้นเรียก Terminal จาก Utils > Terminal แล้วพิมพ์

```shell
csrutil disable; reboot
```

2. แก้ไขสิทธิ์ในการเข้าถึง Camera interface โดย `a-r` จะมีความหมายว่าลบ Read permission ออกทั้งหมด

```shell
sudo chmod a-r /System/Library/Frameworks/CoreMediaIO.framework/Versions/A/Resources/VDC.plugin/Contents/MacOS/VDC
sudo chmod a-r /System/Library/PrivateFrameworks/CoreMediaIOServicesPrivate.framework/Versions/A/Resources/AVC.plugin/Contents/MacOS/AVC
sudo chmod a-r /System/Library/QuickTime/QuickTimeUSBVDCDigitizer.component/Contents/MacOS/QuickTimeUSBVDCDigitizer
sudo chmod a-r /Library/CoreMediaIO/Plug-Ins/DAL/AppleCamera.plugin/Contents/MacOS/AppleCamera
sudo chmod a-r /Library/CoreMediaIO/Plug-Ins/FCP-DAL/AppleCamera.plugin/Contents/MacOS/AppleCamera
```

3. จากนั้นให้ Reboot แล้วเข้า Recovery mode เหมือนข้อแรกเพื่อเปิด SIP ด้วยคำสั่ง

```shell
csrutil enable; reboot
```


เมื่อเปิดเครื่องขึ้นมาใหม่ ถ้าลองเปิดแอปที่ต้องใช้กล้อง เช่น Photo Booth จะเห็นข้อความว่า There is no connected camera ขึ้นมาแล้ว

หากต้องการเปิด Camera interface ก็ให้ปิด SIP แล้วทำเหมือนด้านบนแต่เปลี่ยน Permission เป็น `a+r` แทนครับ

Reference: [How to Disable Webcam / FaceTime Camera on Mac Completely](http://osxdaily.com/2017/03/01/disable-mac-camera-completely/)