---
layout: post
title: ผมลง Docker บน OS X อย่างไร
---

ถ้าใครยังไม่เคยได้ลองหรือใช้ docker อยากจะบอกเลยว่าคุณพลาดของสนุกไปแล้ว ใน windows และ os x ณ ตอนนี้เขียนนี้ถ้าไม่นับรวม docker beta แล้วก็ยังไม่มีวิธีจะรันมันตรงๆ บน os x โดยไม่ใช้ virtual machine มั้ง ผมเลยอาจจะแนะนำวิธีที่ผมใช้ในการลง docker บน vmware fusion ครับ

เริ่มจากลง docker, docker-machine จาก brew

```
brew install docker docker-machine
```

จากนั้นทำการสร้าง vm ของ docker สำหรับ `default` นั้นหมายถึงชื่อของ vm ครับที่ต้องเป็น default เพราะหากเราสั่ง `docker-machine` โดยไม่ใส่ชื่อของ vm จะหมายถึง default นั้นเอง

```
docker-machine create --driver vmwarefusion default
```

และสำหรับท่านที่ยังไม่สะใจเรื่องความแรงสามารถปรับแต่งได้ตามนี้

* `--vmwarefusion-cpu-count`
* `--vmwarefusion-disk-size`
* `--vmwarefusion-memory-size`

ส่วนรายละหยาบเพิ่มเติมสามารถตามไปอ่านจากต้นเรื่องที่ [https://docs.docker.com/machine/drivers/vm-fusion/](https://docs.docker.com/machine/drivers/vm-fusion/)