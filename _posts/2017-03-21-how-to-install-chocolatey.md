---
layout: post
title: ติดตั้ง Package manager Chocolatey บน Windows 10
---

Chocolatey เป็นอีกหนึ่ง Windows Package manager ที่คล้ายกับ apt-get ใน Ubuntu/Debian, yum ใน CentOS/RHEL, หรือ homebrew ใน macOS ที่ผมใช้มาสักระยะหนึ่งแล้วคิดว่าดีมากจึงนำมาแนะนำให้ลองกัน

### ติดตั้ง

เปิด Powershell ขึ้นมาแบบ Administrator แล้วตั้งค่า ExecutionPolicy เป็น RemoteSigned เพื่อให้เราสามารถเรียกใช้สคริปจากภายนอกที่ได้รับการรับรองได้

```powershell
Set-ExecutionPolicy RemoteSigned
```

ยังคงอยู่ที่ Powershell ตัวเดิม ลงพระเอกของเรา Chocolatey ขั้นตอนนี้ใครที่ยังไม่มี NuGet ที่เป็น Package manager อีกตัวหนึ่งให้ตอบตกลง

```powershell
iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex
```

แค่นี้ก็พร้อมใช้งาน ทดลองเบื้องต้นได้โดยใช้คำสั่งว่า choco เช่น

```powershell
choco upgrade chocolatey
```

ในอนาคตหากจำเป็นต้องลง Package ที่ไม่ได้รับรองจริงๆ สามารถเปลี่ยนเป็น ExecutionPolicy Unrestricted ได้นะแต่ต้องเพิ่มความระมัดระวังหรือตั้งแล้วเปลี่ยนกลับทันทีเมื่อลงเสร็จ

---

References:

- [Chocolatey](https://chocolatey.org/)
- [ExecutionPolicy](https://ss64.com/ps/set-executionpolicy.html)