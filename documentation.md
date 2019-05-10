# PROJECT NAME
Jumbo Jumbo Menu
---

Name: Bethany Hsiao, Angela Pan

Date: May 9, 2019

Project Topic: DIY Website version of the Jumbo Jumbo Menu

URL: http://

---

### 1. MongoDB and Schemas

Schemas:
- Reviews
```javascript
{
  rating: Number,
  comment: String,
  date: String,
  name: String,
  id: Number
}
```
- Food Items
```javascript
{
   ingredients: String,
    type: String,
    name: String,
    picture: String,
    price: String,
    id: Number
}
```
- Drink Items
```javascript
{
  name: String,
  type: String,
  toppings: String,
  ice: Number,
  sugar: Number,
  flavor: String,
  id: Number
}
```

### 2. Live Updates

GET endpoint route: `/reviews`
Users can add reviews and have live updates for the new reviews

### 3. View Data

GET endpoint route: `/reviews`
GET endpoint route: `/drinks`
GET endpoint route: `/food`

### 4. 10 Endpoints

HTML drink form route: `/drinkform`
HTML food form route: `/foodform`

POST endpoint route: `/reviews`
POST endpoint route: `/drinks`
POST endpoint route: `/food`

DELETE end point route: `/reviews/:id`
DELETE end point route: `/drinks/:id`
DELETE end point route: `/food/:id`

GET endpoint route: `/`
GET endpoint route: `/drinks`
GET endpoint route: `/food`
GET endpoint route: `/reviews`
GET endpoint route: `/about`


Example Node.js POST request to endpoint:

```javascript
var request = require("request");

var options = {
  method: "POST",
  url: "http://localhost:3000/food",
  headers: {
    "content-type": "application/x-www-form-urlencoded"
  },
  form: {
    ingredients: "Beef, Beef Brother, Scallions, Bok Choy",
    type: "Noodle Bowl",
    name: "Beef Noodle Soup",
    picture: "http://jumbojumbocafe.com/wp-content/uploads/photo-gallery/imported_from_media_libray//noodles1.jpg",
    price: "6.90",
    id: 4
  }
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 5. Modules

Created Food, Review, BBT modules from our 3 schemas

### 6. NPM Packages

MOMENT - formatted date
VALIDATOR - Make sure user-entered links for images are true URL's
