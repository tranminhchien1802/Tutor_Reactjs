# TÀI LIỆU ÔN TẬP PHỎNG VẤN FULL-STACK
## Project: Tutor Web - Nền tảng kết nối Gia sư & Học viên

---

## PHẦN 1: TỔNG QUAN DỰ ÁN

### 1.1 Mô tả Project
**Tutor Web** là ứng dụng web kết nối gia sư và học viên, cung cấp các tính năng:
- Đăng ký, đăng nhập, quản lý profile
- Tìm kiếm và xem danh sách gia sư
- Quản lý lớp học (ParentClass, RequestClass, ReceivedClass)
- Thanh toán online
- Chat real-time
- Bản đồ vị trí
- Quản lý khóa học

### 1.2 Vai trò trong dự án
**Full-stack Developer** (Frontend & Backend)

---

## PHẦN 2: FRONTEND STACK

### 2.1 Công nghệ sử dụng

| Công nghệ | Version | Mục đích |
|-----------|---------|----------|
| **React** | 18.3.1 | Framework UI chính |
| **React Router DOM** | 6.28.0 | Điều hướng SPA |
| **Redux** | 5.0.1 | Quản lý state global |
| **React Redux** | 9.2.0 | Kết nối React với Redux |
| **Axios/Fetch API** | 1.7.9 | Gọi API backend |
| **Bootstrap** | 5.3.3 | CSS Framework |
| **React Bootstrap** | 2.10.5 | Component UI Bootstrap cho React |
| **TailwindCSS** | 3.4.15 | Utility-first CSS |
| **Socket.io Client** | 4.8.1 | Chat real-time |
| **SweetAlert2** | 11.26.17 | Thông báo đẹp |
| **React Slick** | 0.30.2 | Slider/Carousel |
| **JWT Decode** | 4.0.0 | Giải mã token |
| **Google Maps API** | 2.20.3 | Hiển thị bản đồ |

### 2.2 Tại sao chọn các công nghệ này?

#### **React 18**
**Lý do chọn:**
- **Virtual DOM**: Tối ưu hiệu năng render, chỉ cập nhật những component thay đổi
- **Component-based**: Dễ tái sử dụng, bảo trì và mở rộng
- **Hooks API**: Quản lý state và side effects gọn gàng (useState, useEffect, custom hooks)
- **Cộng đồng lớn**: Tài liệu phong phú, nhiều thư viện hỗ trợ
- **JSX**: Cú pháp gần gũi, dễ đọc

**Ví dụ thực tế trong project:**
```javascript
// Custom hook useHookAPI xử lý API calls
const { data, loading, error } = useHookAPI(serviceFunction, params);
```

#### **React Router DOM v6**
**Lý do chọn:**
- **Client-side Routing**: Chuyển trang không reload, trải nghiệm mượt mà
- **Dynamic Routing**: Hỗ trợ route params (`/tutors/:id`)
- **Protected Routes**: Bảo vệ route yêu cầu auth
- **Nested Routes**: Tổ chức route theo component tree

**Cấu trúc routing trong project:**
```javascript
// Public routes: Login, Register, Home, About
// Protected routes: Profile, Payment, Class management
```

#### **Redux Toolkit**
**Lý do chọn:**
- **Centralized State**: Quản lý state toàn cục (user login, token)
- **Predictable**: State thay đổi theo flow rõ ràng (Action → Reducer → Store)
- **DevTools**: Debug dễ dàng, theo dõi được mọi thay đổi state
- **Middleware**: Xử lý async actions (redux-thunk)

**Flow trong project:**
```
User Login → Dispatch Action → Call API → 
Store Token in Redux → Update UI
```

#### **Bootstrap + React Bootstrap**
**Lý do chọn:**
- **Responsive Grid**: Layout tự động适应 mobile/desktop
- **Pre-built Components**: Button, Modal, Form, Card...
- **React Integration**: Component dạng JSX, không cần jQuery
- **Nhanh prototype**: Dựng UI nhanh cho MVP

#### **TailwindCSS**
**Lý do chọn:**
- **Utility-first**: Class utility cho mọi style (flex, pt-4, text-center)
- **Customizable**: Dễ theme hóa qua config
- **No CSS conflict**: Tránh conflict CSS truyền thống
- **Purge unused**: Giảm size CSS production

#### **Socket.io Client**
**Lý do chọn:**
- **Real-time bidirectional**: Chat 2 chiều tức thời
- **Auto reconnect**: Tự động kết nối lại khi mất mạng
- **Room support**: Hỗ trợ chat room riêng tư
- **Fallback**: Tự động chuyển polling nếu WebSocket không available

**Ứng dụng trong project:**
```javascript
// ChatBox component kết nối socket.io
// Gửi/nhận message real-time giữa tutor và student
```

#### **SweetAlert2**
**Lý do chọn:**
- **Beautiful UI**: Alert đẹp hơn window.alert()
- **Customizable**: Màu sắc, icon, animation
- **Promise-based**: Xử lý action sau khi confirm
- **Accessibility**: Hỗ trợ keyboard navigation

---

## PHẦN 3: BACKEND STACK

### 3.1 Công nghệ Backend (dựa trên API URL)

| Công nghệ | Mục đích |
|-----------|----------|
| **Node.js** | Runtime môi trường server |
| **Express.js** | Web framework xử lý routing |
| **MongoDB** | Database NoSQL |
| **Mongoose** | ODM cho MongoDB |
| **JWT** | Authentication token |
| **bcryptjs** | Mã hóa mật khẩu |
| **Socket.io** | Real-time chat server |
| **Nodemailer** | Gửi email (forgot password) |
| **Stripe/PayPal** | Thanh toán online |

### 3.2 Tại sao chọn Node.js + Express?

**Lý do chọn Node.js:**
- **JavaScript full-stack**: Cùng ngôn ngữ FE & BE, dễ chuyển ngữ cảnh
- **Non-blocking I/O**: Xử lý nhiều request đồng thời, phù hợp real-time
- **NPM ecosystem**: Thư viện phong phú cho mọi nhu cầu
- **JSON native**: Làm việc với JSON tự nhiên, phù hợp REST API
- **Performance**: Event-driven, hiệu suất cao cho I/O bound tasks

**Lý do chọn Express.js:**
- **Minimal & Flexible**: Framework tối giản, dễ tùy biến
- **Middleware**: Xử lý request/response qua middleware chain
- **Routing**: Tổ chức route rõ ràng theo RESTful
- **Quick setup**: Khởi tạo project nhanh

**Cấu trúc API trong project:**
```
POST   /login              - Đăng nhập
POST   /register           - Đăng ký
POST   /forgot-password    - Yêu cầu reset password
POST   /verify-reset       - Xác thực reset token
POST   /updatepassword     - Đổi mật khẩu
GET    /profile            - Lấy profile (auth required)
POST   /profile/edit       - Cập nhật profile (auth required)
GET    /tutors             - Danh sách gia sư
GET    /courses            - Danh sách khóa học
POST   /payment            - Xử lý thanh toán
```

### 3.3 Authentication Flow (JWT)

**Tại sao chọn JWT?**
- **Stateless**: Server không cần lưu session, scale dễ dàng
- **Cross-domain**: Hoạt động tốt với CORS, microservices
- **Self-contained**: Chứa đủ thông tin trong payload
- **Secure**: Ký bằng secret key, chống giả mạo

**Flow hoạt động:**
```
1. User login → Server verify credentials
2. Server tạo JWT token (ký bằng secret)
3. Client lưu token (cookie/localStorage)
4. Mỗi request gửi token qua Authorization header
5. Server verify token → cho phép truy cập
```

**Implementation trong project:**
```javascript
// Frontend: Lưu token vào cookie
document.cookie = `token=${token}; path=/; max-age=${maxAge}`;

// Request có auth header
headers: {
  "Authorization": `Bearer ${token}`,
  "Content-Type": "application/json"
}
```

---

## PHẦN 4: DATABASE

### 4.1 MongoDB (NoSQL)

**Lý do chọn MongoDB:**
- **Schema-less**: Linh hoạt thay đổi cấu trúc dữ liệu
- **JSON-like (BSON)**: Phù hợp với JavaScript/Node.js
- **Scalability**: Horizontal scaling qua sharding
- **Performance**: Indexing, aggregation pipeline
- **Flexible queries**: Query document nested, array

**Collections trong project:**

#### **Users Collection**
```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  password: String (hashed),
  fullName: String,
  role: String, // "student" | "tutor" | "admin"
  phone: String,
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### **Tutors Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  subjects: [String],
  experience: Number,
  pricePerHour: Number,
  description: String,
  location: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  rating: Number,
  isAvailable: Boolean
}
```

#### **Courses Collection**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  tutorId: ObjectId (ref: Tutors),
  price: Number,
  duration: Number, // hours
  level: String, // "beginner" | "intermediate" | "advanced"
  students: [ObjectId], // enrolled students
  status: String // "active" | "completed" | "cancelled"
}
```

#### **Classes Collection**
```javascript
{
  _id: ObjectId,
  parentId: ObjectId (ref: Users),
  tutorId: ObjectId (ref: Tutors),
  subject: String,
  level: String,
  schedule: {
    days: [String], // ["Mon", "Wed", "Fri"]
    time: String // "18:00"
  },
  status: String, // "pending" | "accepted" | "rejected"
  createdAt: Date
}
```

#### **Payments Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  courseId: ObjectId,
  amount: Number,
  currency: String, // "VND" | "USD"
  method: String, // "stripe" | "paypal" | "bank_transfer"
  status: String, // "pending" | "completed" | "failed"
  transactionId: String,
  createdAt: Date
}
```

#### **Messages Collection (Chat)**
```javascript
{
  _id: ObjectId,
  senderId: ObjectId,
  receiverId: ObjectId,
  content: String,
  timestamp: Date,
  isRead: Boolean
}
```

### 4.2 Indexing Strategy

**Tại sao cần Index?**
- Tăng tốc độ query
- Giảm thời gian tìm kiếm từ O(n) → O(log n)

**Indexes trong project:**
```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })

// Tutors
db.tutors.createIndex({ userId: 1 })
db.tutors.createIndex({ subjects: 1 })
db.tutors.createIndex({ location: "2dsphere" }) // Geo query

// Courses
db.courses.createIndex({ tutorId: 1 })
db.courses.createIndex({ title: "text" }) // Full-text search

// Classes
db.classes.createIndex({ parentId: 1, status: 1 })
db.classes.createIndex({ tutorId: 1, status: 1 })
```

### 4.3 Database Relationships

**Reference vs Embedding:**

| Trường hợp | Chiến lược | Lý do |
|------------|------------|-------|
| User → Profile | **Embedding** | 1-1 relationship, luôn dùng cùng nhau |
| User → Courses | **Reference** | 1-n, courses độc lập, query riêng |
| Course → Tutor | **Reference** | Nhiều course cùng 1 tutor |
| Message → User | **Reference** | Tránh duplicate data |

---

## PHẦN 5: CÁC CÂU HỎI PHỎNG VẤN THƯỜNG GẶP

### 5.1 Frontend Questions

**Q1: Tại sao chọn React thay vì Vue/Angular?**
```
A: 
- React có cộng đồng lớn nhất, tài liệu phong phú
- Flexible, không ép buộc cấu trúc (unlike Angular)
- Dễ học hơn Angular, phù hợp team nhỏ
- Ecosystem phong phú (Redux, React Router, Next.js)
- Performance tốt nhờ Virtual DOM
```

**Q2: Xử lý state management như thế nào?**
```
A:
- Local state: useState trong component
- Global state: Redux (user info, token, cart)
- Server state: React Query/SWR (cache API responses)
- Form state: React Hook Form (nếu form phức tạp)
```

**Q3: Tối ưu performance React app?**
```
A:
- React.memo() cho component pure
- useMemo/useCallback cho expensive calculations
- Code splitting: React.lazy() + Suspense
- Virtual scrolling cho danh sách dài
- Debounce search input
- Lazy load images
```

**Q4: Xử lý authentication như thế nào?**
```
A:
- Login → nhận JWT token từ server
- Lưu token vào httpOnly cookie (secure)
- Attach token vào mọi request qua Axios interceptor
- Token expiry → refresh token hoặc redirect login
- Protected routes kiểm tra token trước khi render
```

### 5.2 Backend Questions

**Q5: Tại sao chọn MongoDB thay vì MySQL/PostgreSQL?**
```
A:
- Schema linh hoạt, dễ thay đổi khi requirement đổi
- Phù hợp dữ liệu hierarchical (comments, nested data)
- Scale horizontal dễ dàng (sharding)
- Query JSON-native, phù hợp JavaScript stack
- Geo queries hỗ trợ tốt (tìm tutor theo vị trí)

Tuy nhiên, nếu cần:
- Transactions phức tạp → PostgreSQL
- Data có cấu trúc cố định → MySQL
- Relationships phức tạp → SQL database
```

**Q6: Xử lý concurrency như thế nào?**
```
A:
- Node.js event-driven, non-blocking I/O
- Async/await cho database operations
- Cluster mode cho multi-core CPU
- Redis cache cho frequent queries
- Rate limiting chống spam requests
```

**Q7: Bảo mật API như thế nào?**
```
A:
- JWT authentication
- HTTPS trong production
- Input validation (Joi/express-validator)
- Sanitize input chống XSS
- CORS configuration
- Rate limiting (express-rate-limit)
- Hash password bằng bcrypt (salt rounds: 10)
- SQL/NoSQL injection prevention
```

**Q8: Xử lý file upload?**
```
A:
- Multer middleware cho Express
- Lưu file vào cloud storage (AWS S3, Cloudinary)
- Validate file type, size trước khi upload
- Generate unique filename tránh conflict
- CDN cho static assets
```

### 5.3 Database Questions

**Q9: Optimization database queries?**
```
A:
- Tạo index cho fields query thường xuyên
- Sử dụng .select() chỉ lấy fields cần thiết
- .limit() và .skip() cho pagination
- Avoid N+1 queries (dùng .populate() trong Mongoose)
- Explain plan để phân tích query performance
- Cache kết quả query bằng Redis
```

**Q10: Transaction trong MongoDB?**
```
A:
MongoDB 4.0+ hỗ trợ multi-document transactions:

db.collection.aggregate([
  { $match: { status: "pending" } }
], { session })

// Usage:
const session = await mongoose.startSession();
session.startTransaction();
try {
  await User.findByIdAndUpdate(userId, update, { session });
  await Payment.create([{ userId, amount }], { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
}
```

**Q11: Backup và restore database?**
```
A:
- Backup: mongodump --out /backup/location
- Restore: mongorestore /backup/location
- Scheduled backup qua cron job
- Cloud backup (MongoDB Atlas có built-in backup)
```

---

## PHẦN 6: THỰC HÀNH CODE

### 6.1 Frontend: Custom Hook cho API calls

```javascript
// src/Hooks/useHookAPI.js
import { useState, useEffect } from 'react';

const useHookAPI = (serviceFunction, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceFunction(params);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export default useHookAPI;
```

### 6.2 Backend: JWT Middleware

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
```

### 6.3 Backend: Controller Pattern

```javascript
// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
```

---

## PHẦN 7: KINH NGHIỆM THỰC TẾ

### 7.1 Vấn đề đã gặp và cách giải quyết

**Vấn đề 1: Token bị expire giữa chừng**
```
Giải pháp:
- Implement refresh token flow
- Auto refresh khi token còn 10% thời gian sống
- Lưu refresh token vào httpOnly cookie
```

**Vấn đề 2: Chat message bị trùng khi reconnect**
```
Giải pháp:
- Mỗi message có unique ID (UUID)
- Client lưu message IDs đã nhận
- Khi reconnect, gửi lastMessageId cho server
- Server chỉ gửi messages mới hơn lastMessageId
```

**Vấn đề 3: Performance khi render danh sách lớn**
```
Giải pháp:
- Virtual scrolling (react-window)
- Pagination server-side
- Lazy load images
- Memoize list items
```

**Vấn đề 4: CORS error khi deploy**
```
Giải pháp:
- Config CORS whitelist domains trong Express
- Dùng environment variables cho API URL
- Proxy trong development (setupProxy.js)
```

### 7.2 Best Practices áp dụng

**Frontend:**
- Component nhỏ, single responsibility
- Custom hooks cho reusable logic
- Error boundaries cho graceful error handling
- Loading states cho better UX
- Form validation client-side + server-side

**Backend:**
- MVC pattern (Model-View-Controller)
- Centralized error handling
- Input validation middleware
- Logging (Winston/Morgan)
- Environment variables cho config

**Database:**
- Index optimization
- Connection pooling
- Query profiling
- Regular backup

---

## PHẦN 8: CÂU HỎI TỰ ĐÁNH GIÁ

### Checklist trước phỏng vấn:

- [ ] Giải thích được architecture của project
- [ ] Hiểu rõ flow authentication (JWT)
- [ ] Giải thích được tại sao chọn MongoDB
- [ ] Biết cách optimize database queries
- [ ] Hiểu về React lifecycle & hooks
- [ ] Giải thích được Redux flow
- [ ] Biết xử lý CORS, security issues
- [ ] Hiểu về real-time communication (Socket.io)
- [ ] Biết về deployment & CI/CD
- [ ] Chuẩn bị ví dụ thực tế từ project

---

## TÀI LIỆU THAM KHẢO

1. React Docs: https://react.dev
2. Express.js Guide: https://expressjs.com
3. MongoDB Manual: https://docs.mongodb.com
4. JWT.io: https://jwt.io
5. Socket.io Docs: https://socket.io/docs
6. Redux Toolkit: https://redux-toolkit.js.org

---

**Biên soạn:** Dựa trên project Tutor Web
**Ngày cập nhật:** 2026
**Vị trí ứng tuyển:** Full-stack Developer (React + Node.js)
