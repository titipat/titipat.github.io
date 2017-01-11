---
layout: post
title: วิธีส่ง http chunk (expressjs streaming) ผ่าน nginx proxy
---

# tl;dr

- http chunk encoding เป็นวิธีหนึ่งในการส่งข้อมูลแบบเรื่อยๆ และผมเอาประยุกต์ใช้กับการทำ streaming ผ่าน http endpoint โดยใช้ nginx เป็น ingress node
- การทำ proxy ด้วย nginx แบบ out of box ต้องปิด `proxy_buffering` เพื่อให้ nginx ส่ง response จาก proxied server โดยทันที

เรื่องมีอยู่ว่าผมทำ feature การ streaming ผ่าน http endpoint บน expressjs ที่มีหน้าตาประมาณ

```
// express.js

app.get('/streaming', (req, res) => {
  source.on('data', (data) => {
    res.write(data)
  })
})
```

แล้ว deploy บน aws beanstalk แบบใน vpc ก่อนใช้ nginx ทำ proxy อีกรอบเพื่อเป็น ssl terminal

```
client -> [ nginx -> beanstalk (vpc) ]
```

แต่ปัญหาที่พบคือผู้ใช้สามารถเชื่อมต่อได้ถึง endpoint และไม่ได้ error แต่กลับไม่มีอะไร response กลับมาเลย เมื่อลองใช้ tcpdump ดูที่ nginx ก็เห็นว่ามีการวิ่งระหว่าง nginx <-> beantalk แล้วแสดงว่าปัญหาคงอยู่สักที่ใน nginx

หลังจากเปิด nginx doc ในหมวด proxy ดูแล้วพบว่ามี parameter ที่ชื่อว่า proxy_buffering ซึ่งปกติจะเปิดเป็นค่า default ทำหน้าที่เก็บ response จาก proxied server ลง buffer ไว้จะถึงขนาดหนึ่งก่อนจะ return กลับไป หลังจากปิดค่าที่ว่าแล้วสั่ง reload nginx ระบบก็ทำงานได้อย่างต้องการ

```
# nginx configurate file

location /beanstalk {
    proxy_pass http://beanstalk-endpoint/;
    proxy_buffering off;
    include proxy_params;
}
```


references

- [Module ngx_http_proxy_module](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffering)