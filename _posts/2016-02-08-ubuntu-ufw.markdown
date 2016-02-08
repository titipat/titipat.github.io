---
layout: default
title: ใช้งาน firewall บน ubuntu แบบง่ายๆ ด้วย ufw
---

ufw  นั้นย่อมาจาก uncomplicated firewall หรือ firewall ที่ไม่ยุ่งยากนั้นเอง จากประสบการณ์การใช้งาน linux ของผมคิดว่าตัวนี้ใช้ง่ายที่สุดแล้วล่ะ ง่ายกว่า firewall-cmd ของฝั่ง centos อีกแหละ แต่ด้วยความที่มันออกแบบมาให้ง่ายเลยอาจจะไม่รองรับการตั้งค่าที่ซับซ้อนสูงๆ นะ

ทุกวันนี้ผมเชื่อว่าหลายๆ ที่ก็คงมี firewall อยู่แล้ว แต่เพื่อความปลอดภัยตั้งไว้ที่ host อีกชั้นจะเป็นไรไป เผื่อวันดีคืนดี main firewall บึ้มไปจะได้ยังคงมีชีวิตรอดจากผู้ไม่ประสงค์ดีได้

## การเปิด/ปิด ufw

โดย default แล้วมันจะถูกปิดไว้ เราสามารถเปิดด้วยคำสั่งนี้ แต่ช้าก่อนถ้าคุณเปิดมันโดยยังไม่ได้อนุญาต ssh อาจจะงานเข้าได้

```
ufw enable
```

ส่วนการปิดก็

```
ufw disable
```

## การแสดงกฏทั้งหมด

ใช้ numbered เพื่อแสดงเลขบรรทัด

```
ufw status [numbered|verbose]
```

## การสร้างกฏ

syntax สำหรับการกฏว่าจะอนุญาตหรือไม่อนุญาตจะต่างกันแค่ allow กับ deny เท่านั้นใน syntax แบบเดียวกัน

```
ufw <allow|deny> <port|name>[/<protocal>]
```

ตัวอย่างการอนุญาต ssh

```
ufw allow ssh
```

ตัวอย่างการไม่อนุญาต port 777 แบบ tcp

```
ufw deny 777/tcp
```

## การแทรกกฏ

ด้วยความที่มันยังคงทำงานแบบ access list ที่อ่านจากบนมาล่างอยู่ ดังนั้นเราควรจะเรียนรู้การแทรกกฏไว้ด้วย โดยใช้

```
ufw insert <line_number>
```

เช่น จะเพิ่มกฏนี้ในบรรทัดที่ 5

```
ufw insert 5 allow https
```


## การลบกฏ

คล้ายกับ cisco เลยที่เพิ่มคำว่า delete เข้าไปแล้วตามด้วยกฏที่ต้องการลบ

เช่น ถ้าต้องการลบ การไม่อนุญาต port 777 แบบ tcp

```
ufw delete deny 777/tcp
```
หรือถ้าต้องการลบแบบบรรทัดก็ใช้

```
ufw delete <line_number>
```

เช่น จะลบบรรทัดที่ 5

```
ufw delete 5
```

## มาเล่นท่ายากกันหน่อยด้วยกฏแบบเฉพาะ address

จะมี syntax ดังนี้

```
ufw <allow|deny> from <source> to <destination> port <port_number> [proto <tcp|udp>]
```

เช่น อนุญาตให้ ssh ได้เฉพาะ network 192.16.0.0/24

```
ufw allow from 192.168.0.0/24 to any port 22 proto tcp
```

**สำหรับการใช้งานขั้นสูงนั้นคงต้องกลับไปใช้ iptables command เช่นเดิมโดยใส่คำสั่งที่ต้องการไว้ที่ `/etc/ufw/*.rules`**

## ตัวอย่างการใช้งาน

ออฟฟิศแห่งหนึ่งมีการแบ่ง network ดังนี้

- พนักงาน 192.168.0.0/24
- ผู้พัฒนา 10.0.0.0/24
- ผู้ดูแลระบบ 172.16.0.0/24

โดยทีเงื่อนไขว่า

- ทุกคนต้องสามารถใช้งาน http, https ได้
- ผู้พัฒนาต้องสามารถใช้งาน mysql (port 3306/tcp) ได้
- ผู้ดูแลระบบต้องสามารถใช้งาน ssh ได้
- เซิร์ฟเวอร์สามารถใช้ใช้งานขาออกได้หมด แต่ขาเข้าอนุญาตเฉพาะรายการข้างต้น

```
ufw default allow outgoing
ufw default deny incoming
ufw allow http
ufw allow https
ufw allow from 10.0.0.0/24 to any port 3306 proto tcp
ufw allow from 172.16.0.0/24 to any port 22 proto tcp
```

ปล. สำหรับ `ufw default` นั้น default สำหรับ incoming และ outgoing จะมีค่าเป็น deny และ allow ตามลำดับอยู่แล้ว

Ref: [https://help.ubuntu.com/community/UFW](https://help.ubuntu.com/community/UFW)
