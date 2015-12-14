---
layout: post
title: MongoDB ODM on Phalcon PHP
---

หลายคนน่าจะเคยใช้ Object-Relational Map (ORM) กันมาแล้ว แต่วันนี้ผมจะมาลองใช้สิ่งที่เรียกว่า ODM (Object-Document Map) เพื่อใช้งาน MongoDB ร่วมกับ Phalcon PHP

เริ่มจากการ inject mongo client สำหรับการเชื่อมต่อไปหา mongodb และ collection manager ที่ใช้จัดการคำสั่ง collection เสียก่อน ในโค้ดด้านลงผมเชื่อมไปหา database ที่ชื่อว่า bilio

```php
// index.php

// ...

// Setting up the mongodb connection
$di->set('mongo', function () {
  $mongo = new MongoClient();
  return $mongo->selectDB("biblio");
}, true);

$di->set('collectionManager', function(){
  return new Phalcon\Mvc\Collection\Manager();
}, true);

// ...
```

แล้วก็สร้าง model ของ collection ที่เราต้องการใช้งาน โดยกำหนดค่าภายใน getSource() ให้เป็นชื่อของ collection ที่ต้องการ

```php
use Phalcon\Mvc\Collection;

class Users extends Collection {
	public function getSource() {
	  return "users";
	}
}
```

แค่ที่ก็พร้อมใช้งานแล้วครับ โดยการใช้งานก็ไม่ต่างจาก ORM เลย

```php

// ...

// Create new user
$user = new Users();
$user->name = "John";
$user->email = "john@example.com";
$user->save();

// Find user by id
$user = Users::findById($id);

// Find user by name
$user = User::findFirst(array(
  array('name' => 'John')
));
$user->surname = "Doe";
$user->save();

// ...

```

Reference: [ODM (Object-Document Mapper)¶](https://docs.phalconphp.com/en/latest/reference/odm.html)
