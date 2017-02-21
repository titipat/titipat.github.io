---
layout: post
title: วิธีพิมพ์ Double curly braces `{{ }}` บน jekyll
---

เป็นเอนทรีต่อเนื่องจาก [เพราะเวลาของสองเราไม่เท่ากัน (mysql, js epoch time are not equals)](https://titipat.github.io/2016/04/26/two-time-not-equals.html) เมื่อผมจะใส่โค้ด angularjs ว่า

{% raw %}
```html
{{ created_at | date : 'HH:mm' }}
```
{% endraw %}

แต่ดันแสดงผลเป็นว่างเปล่าแบบนี้แบบนี้

```html
{{ created_at | date : 'HH:mm' }}
```

แต่มันไม่ใช่แค่แสดงผลว่างเปล่าหรอกนะ มันหายไปเลยต่างหาก สาเหตุเพราะว่า Double curly braces มันไปชนกับ jekyll นั้นเอง วิธีแก้คือเราต้องการทาง escape ส่วนนี้ไว้ด้วยการใช้ `{% raw %}` คู่กับ `{% endraw %}` ซึ่งจะได้โค่ดหน้าตาประมาณนี้

```html
{.% raw %}
    {.{ created_at | date : 'HH:mm' }}
{.% endraw %}
```

ผมเติม . เข้าไปเพื่อให้แสดงผลได้เฉยๆ นะครับอย่าลืมเอาออกด้วยล่ะ
