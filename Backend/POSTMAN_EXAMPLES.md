# Postman API Examples

Use environment variables:

```text
base_url=http://localhost:9000
token=<login user token>
admin_token=<login admin token>
product_id=<product id from product list>
order_id=<order id from create order>
```

## Auth

```http
POST {{base_url}}/api/users/register
Content-Type: application/json

{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "password123"
}
```

```http
POST {{base_url}}/api/users/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

## Products

```http
GET {{base_url}}/api/products?search=shirt&page=1&limit=8&sortBy=priceAsc
```

```http
POST {{base_url}}/api/products/{{product_id}}/reviews
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "rating": 5,
  "comment": "Great quality."
}
```

## Wishlist

```http
POST {{base_url}}/api/wishlist
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "productId": "{{product_id}}"
}
```

## Orders

```http
POST {{base_url}}/api/orders
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "orderItems": [
    {
      "product": "{{product_id}}",
      "quantity": 1,
      "size": "M",
      "color": "Blue"
    }
  ],
  "shippingAddress": {
    "firstName": "Demo",
    "lastName": "User",
    "address": "123 Main Street",
    "city": "Mumbai",
    "postalCode": "400001",
    "country": "India",
    "phone": "9999999999"
  },
  "paymentMethod": "Razorpay"
}
```

## Payments

```http
POST {{base_url}}/api/payments/create-order
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "orderId": "{{order_id}}"
}
```

```http
POST {{base_url}}/api/payments/verify
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "orderId": "{{order_id}}",
  "demo": true,
  "razorpay_order_id": "demo_order_id",
  "razorpay_payment_id": "demo_payment_id",
  "razorpay_signature": "demo"
}
```
