const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tutorweb';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.log('⚠️ MongoDB not connected, using mock data');
  });

// ==================== MOCK DATA (Khi không có MongoDB) ====================
let mockCourses = [
  {
    _id: '1',
    slug: 'lop-toan-12',
    subject: 'Toán',
    grade: '12',
    salary: '3.000.000đ/tháng',
    fee: '500.000đ',
    teachingMode: 'trực tiếp',
    schedule: '3 buổi/tuần (2h/buổi)',
    sexTutor: 'Nam/Nữ',
    address: 'Quận 1, TP.HCM',
    studentInfo: 'Học sinh lớp 12, học lực khá',
    requirements: 'Gia sư có kinh nghiệm ôn thi đại học',
    contact: '0901234567',
    status: 'active',
    image: 'course-1.jpg',
    createdAt: new Date()
  },
  {
    _id: '2',
    slug: 'lop-ngu-van-10',
    subject: 'Ngữ văn',
    grade: '10',
    salary: '2.500.000đ/tháng',
    fee: '400.000đ',
    teachingMode: 'trực tuyến',
    schedule: '2 buổi/tuần (1.5h/buổi)',
    sexTutor: 'Nữ',
    address: 'Quận Bình Thạnh, TP.HCM',
    studentInfo: 'Học sinh lớp 10, cần cải thiện kỹ năng viết',
    requirements: 'Gia sư nhiệt tình, có phương pháp giảng dạy dễ hiểu',
    contact: '0912345678',
    status: 'active',
    image: 'course-2.jpg',
    createdAt: new Date()
  },
  {
    _id: '3',
    slug: 'lop-tieng-anh-8',
    subject: 'Tiếng Anh',
    grade: '8',
    salary: '2.800.000đ/tháng',
    fee: '450.000đ',
    teachingMode: 'trực tiếp',
    schedule: '3 buổi/tuần (1.5h/buổi)',
    sexTutor: 'Nam/Nữ',
    address: 'Quận Gò Vấp, TP.HCM',
    studentInfo: 'Học sinh lớp 8, mất gốc tiếng Anh',
    requirements: 'Gia sư có chứng chỉ IELTS 6.5 trở lên',
    contact: '0923456789',
    status: 'active',
    image: 'course-3.jpg',
    createdAt: new Date()
  },
  {
    _id: '4',
    slug: 'lop-ly-11',
    subject: 'Lý',
    grade: '11',
    salary: '2.700.000đ/tháng',
    fee: '450.000đ',
    teachingMode: 'trực tiếp',
    schedule: '2 buổi/tuần (2h/buổi)',
    sexTutor: 'Nam',
    address: 'Quận Tân Bình, TP.HCM',
    studentInfo: 'Học sinh lớp 11, học lực trung bình',
    requirements: 'Gia sư kiên nhẫn, giải đáp thắc mắc chi tiết',
    contact: '0934567890',
    status: 'active',
    image: 'course-4.jpg',
    createdAt: new Date()
  },
  {
    _id: '5',
    slug: 'lop-toan-9-luyen-thi-vao-10',
    subject: 'Toán',
    grade: '9',
    salary: '3.500.000đ/tháng',
    fee: '600.000đ',
    teachingMode: 'trực tiếp',
    schedule: '4 buổi/tuần (2h/buổi)',
    sexTutor: 'Nam/Nữ',
    address: 'Quận Phú Nhuận, TP.HCM',
    studentInfo: 'Học sinh lớp 9, chuẩn bị thi vào 10',
    requirements: 'Gia sư có kinh nghiệm luyện thi vào 10',
    contact: '0945678901',
    status: 'active',
    image: 'course-5.jpg',
    createdAt: new Date()
  },
  {
    _id: '6',
    slug: 'lop-tieng-anh-giao-tiep',
    subject: 'Tiếng Anh',
    grade: 'Người lớn',
    salary: '4.000.000đ/tháng',
    fee: '700.000đ',
    teachingMode: 'trực tuyến',
    schedule: '3 buổi/tuần (1h/buổi)',
    sexTutor: 'Nam/Nữ',
    address: 'Online',
    studentInfo: 'Người đi làm, cần cải thiện giao tiếp',
    requirements: 'Gia sư bản ngữ hoặc IELTS 7.0+',
    contact: '0956789012',
    status: 'active',
    image: 'course-6.jpg',
    createdAt: new Date()
  }
];

let mockTutors = [
  {
    _id: '1',
    slug: 'nguyen-van-a',
    userId: 'user1',
    fullName: 'Nguyễn Văn A',
    name: 'Nguyễn Văn A',
    subjects: ['Toán', 'Lý'],
    specialization: 'Toán, Lý',
    introduction: 'Sinh viên năm 4 ĐH Bách Khoa, có 3 năm kinh nghiệm gia sư Toán và Lý. Phương pháp dạy dễ hiểu, tận tâm.',
    experience: 3,
    pricePerHour: 150000,
    description: 'Sinh viên năm 4 ĐH Bách Khoa, có 3 năm kinh nghiệm gia sư Toán và Lý',
    location: { type: 'Point', coordinates: [106.6297, 10.8231] },
    rating: 4.8,
    isAvailable: true,
    phone: '0901111222',
    email: 'nguyenvana@email.com',
    avatar: null
  },
  {
    _id: '2',
    slug: 'tran-thi-b',
    userId: 'user2',
    fullName: 'Trần Thị B',
    name: 'Trần Thị B',
    subjects: ['Ngữ văn', 'Tiếng Anh'],
    specialization: 'Ngữ văn, Tiếng Anh',
    introduction: 'Giáo viên văn trường THPT chuyên, có 5 năm kinh nghiệm. Dạy văn bằng cả trái tim!',
    experience: 5,
    pricePerHour: 200000,
    description: 'Giáo viên văn trường THPT chuyên, có 5 năm kinh nghiệm',
    location: { type: 'Point', coordinates: [106.6881, 10.7769] },
    rating: 4.9,
    isAvailable: true,
    phone: '0902222333',
    email: 'tranthib@email.com',
    avatar: null
  },
  {
    _id: '3',
    slug: 'le-van-c',
    userId: 'user3',
    fullName: 'Lê Văn C',
    name: 'Lê Văn C',
    subjects: ['Tiếng Anh'],
    specialization: 'Tiếng Anh',
    introduction: 'IELTS 8.0, có chứng chỉ TESOL, chuyên luyện thi IELTS. Cam kết đầu ra!',
    experience: 4,
    pricePerHour: 250000,
    description: 'IELTS 8.0, có chứng chỉ TESOL, chuyên luyện thi IELTS',
    location: { type: 'Point', coordinates: [106.7097, 10.7626] },
    rating: 5.0,
    isAvailable: true,
    phone: '0903333444',
    email: 'levanc@email.com',
    avatar: null
  },
  {
    _id: '4',
    slug: 'pham-thi-d',
    userId: 'user4',
    fullName: 'Phạm Thị D',
    name: 'Phạm Thị D',
    subjects: ['Toán', 'Hóa'],
    specialization: 'Toán, Hóa',
    introduction: 'Sinh viên ĐH Sư Phạm, dạy dễ hiểu, nhiệt tình. Free buổi học đầu tiên!',
    experience: 2,
    pricePerHour: 120000,
    description: 'Sinh viên ĐH Sư Phạm, dạy dễ hiểu, nhiệt tình',
    location: { type: 'Point', coordinates: [106.6602, 10.7626] },
    rating: 4.5,
    isAvailable: true,
    phone: '0904444555',
    email: 'phamthid@email.com',
    avatar: null
  }
];

let mockUsers = [
  {
    _id: '1',
    email: 'admin@tutorweb.com',
    password: '$2a$10$KIXxQF6JqHvZ1qN1qN1qN.8ZqHvZ1qN1qN1qN.8ZqHvZ1qN1qN1qN', // admin123
    fullName: 'Admin',
    role: 'admin',
    phone: '0909999888'
  },
  {
    _id: '2',
    email: 'tutor@email.com',
    password: '$2a$10$KIXxQF6JqHvZ1qN1qN1qN.8ZqHvZ1qN1qN1qN.8ZqHvZ1qN1qN1qN', // tutor123
    fullName: 'Gia Sư Demo',
    role: 'tutor',
    phone: '0908888777'
  },
  {
    _id: '3',
    email: 'student@email.com',
    password: '$2a$10$KIXxQF6JqHvZ1qN1qN1qN.8ZqHvZ1qN1qN1qN.8ZqHvZ1qN1qN1qN', // student123
    fullName: 'Học Viên Demo',
    role: 'student',
    phone: '0907777666'
  }
];

// ==================== ROUTES ====================

// Get courses (support both /courses and /api/courses)
app.get(['/courses', '/api/courses'], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const keyword = req.query.keyword;
    
    let filteredCourses = mockCourses;
    
    if (keyword) {
      filteredCourses = mockCourses.filter(c => 
        c.subject.toLowerCase().includes(keyword.toLowerCase()) ||
        c.grade.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      courses: paginatedCourses,
      totalPages: Math.ceil(filteredCourses.length / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get course detail
app.get(['/courses/:slug', '/api/courses/:slug'], async (req, res) => {
  try {
    const course = mockCourses.find(c => c.slug === req.params.slug);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tutors
app.get(['/tutors', '/api/tutors'], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0; // Frontend uses 0-based index
    const limit = 6;
    
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    const paginatedTutors = mockTutors.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedTutors,
      pagination: {
        totalPages: Math.ceil(mockTutors.length / limit),
        currentPage: page + 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search tutors (MUST be before /tutors/:slug)
app.get(['/tutors/filter', '/api/tutors/filter'], async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const specialization = req.query.specialization;

    let filteredTutors = mockTutors;

    // Helper to remove Vietnamese diacritics
    const removeDiacritics = (str) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    };

    if (keyword) {
      const normalizedKeyword = removeDiacritics(keyword.toLowerCase());
      filteredTutors = mockTutors.filter(t =>
        removeDiacritics(t.fullName.toLowerCase()).includes(normalizedKeyword) ||
        t.subjects.some(s => removeDiacritics(s.toLowerCase()).includes(normalizedKeyword))
      );
    }

    if (specialization) {
      const normalizedSpec = removeDiacritics(specialization.toLowerCase());
      filteredTutors = filteredTutors.filter(t =>
        t.subjects.some(s => removeDiacritics(s.toLowerCase()).includes(normalizedSpec))
      );
    }

    res.json({
      success: true,
      tutors: filteredTutors,
      pagination: {
        totalPages: Math.ceil(filteredTutors.length / 6),
        currentPage: 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tutor detail (MUST be after /tutors/filter)
app.get(['/tutors/:slug', '/api/tutors/:slug'], async (req, res) => {
  try {
    const tutor = mockTutors.find(t => t.slug === req.params.slug);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.json({ success: true, data: tutor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
app.post(['/login', '/api/login'], async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Demo: accept any password for demo accounts
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }
    
    // Generate JWT token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'tutorweb-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      _id: user._id,
      id: user._id,
      name: user.fullName,
      email: user.email,
      role: user.role,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register
app.post(['/register', '/api/register'], async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;
    
    // Check if user exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }
    
    // Create new user (in mock data)
    const newUser = {
      _id: String(mockUsers.length + 1),
      email,
      password, // In production, hash this!
      fullName,
      role: role || 'student',
      phone: req.body.phone || ''
    };
    
    mockUsers.push(newUser);
    
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'tutorweb-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Forgot password
app.post(['/forgot-password', '/api/forgot-password'], async (req, res) => {
  try {
    const { email } = req.body;
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }
    
    // In production, send email with reset token
    res.json({
      success: true,
      message: 'Email khôi phục đã được gửi (demo: vui lòng kiểm tra console)'
    });
    console.log('Reset token for', email, ': demo-reset-token');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get profile (protected)
app.get(['/profile', '/api/profile'], async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tutorweb-secret-key');
    
    const user = mockUsers.find(u => u._id === decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Update profile (protected)
app.post(['/profile/edit', '/api/profile/edit'], async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tutorweb-secret-key');
    
    const userIndex = mockUsers.findIndex(u => u._id === decoded.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user
    const { fullName, phone } = req.body;
    if (fullName) mockUsers[userIndex].fullName = fullName;
    if (phone) mockUsers[userIndex].phone = phone;
    
    res.json({
      success: true,
      user: {
        id: mockUsers[userIndex]._id,
        email: mockUsers[userIndex].email,
        fullName: mockUsers[userIndex].fullName,
        role: mockUsers[userIndex].role,
        phone: mockUsers[userIndex].phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register course (protected - for tutors)
app.post(['/courses/register-Course', '/api/courses/register-Course'], async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tutorweb-secret-key');
    
    if (decoded.role !== 'tutor') {
      return res.status(403).json({ message: 'Chỉ gia sư mới có thể nhận lớp' });
    }
    
    const { courseId } = req.body;
    const course = mockCourses.find(c => c._id === courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Lớp học không tồn tại' });
    }
    
    res.json({
      success: true,
      message: 'Đăng ký nhận lớp thành công',
      course: {
        id: course._id,
        subject: course.subject,
        grade: course.grade
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create course (protected - for students/parents)
app.post(['/courses/create', '/api/courses/create'], async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tutorweb-secret-key');
    
    const {
      subject,
      grade,
      address,
      salary,
      sessions,
      schedule,
      studentInfo,
      requirements,
      teachingMode,
      contact,
      sexTutor
    } = req.body;
    
    // Create slug from subject and grade
    const slug = `lop-${subject.toLowerCase().replace(/ /g, '-')}-${grade}`;
    
    const newCourse = {
      _id: String(mockCourses.length + 1),
      slug,
      subject,
      grade,
      salary: `${parseInt(salary).toLocaleString('vi-VN')}đ/tháng`,
      fee: '500.000đ',
      teachingMode: teachingMode === 'Offline' ? 'trực tiếp' : 'trực tuyến',
      schedule: `${sessions} buổi/tuần (${schedule})`,
      sexTutor,
      address,
      studentInfo,
      requirements,
      contact,
      status: 'active',
      image: `course-${(mockCourses.length % 6) + 1}.jpg`,
      createdAt: new Date()
    };
    
    mockCourses.push(newCourse);
    
    res.json({
      success: true,
      course: newCourse
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get my courses (protected)
app.get(['/courses/my-courses', '/api/courses/my-courses'], async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tutorweb-secret-key');
    
    // Return all courses created by this user (in real app, filter by userId)
    const userCourses = mockCourses.filter(c => c.status === 'active');
    
    res.json({
      success: true,
      courses: userCourses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete course (protected)
app.delete(['/courses/:slug/delete', '/api/courses/:slug/delete'], async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.JWT_SECRET || 'tutorweb-secret-key');
    
    const { slug } = req.params;
    const courseIndex = mockCourses.findIndex(c => c.slug === slug);
    
    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    mockCourses.splice(courseIndex, 1);
    
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== TRANSACTIONS & PAYMENT ====================

// Mock transactions
let mockTransactions = [];

// Create transaction (for payment)
app.post(['/transactions/create', '/api/transactions/create'], async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tutorweb-secret-key');
    
    const { amount, paymentMethod, courseId } = req.body;
    
    const transactionId = `TXN${Date.now()}`;
    
    const newTransaction = {
      transactionId,
      userId: decoded.id,
      amount: amount || 500000,
      paymentMethod: paymentMethod || 'QR_CODE',
      courseId,
      status: 'pending',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ThanhToanTutorWeb',
      createdAt: new Date()
    };
    
    mockTransactions.push(newTransaction);
    
    res.json({
      success: true,
      transaction: newTransaction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get transaction details
app.get(['/transactions/:id', '/api/transactions/:id'], async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.JWT_SECRET || 'tutorweb-secret-key');
    
    const { id } = req.params;
    const transaction = mockTransactions.find(t => t.transactionId === id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json({
      success: true,
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Process payment (check payment status)
app.post(['/transactions/processPayment', '/api/transactions/processPayment'], async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.JWT_SECRET || 'tutorweb-secret-key');
    
    const { transactionId } = req.body;
    const transaction = mockTransactions.find(t => t.transactionId === transactionId);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Simulate payment check - after 30 seconds, mark as completed
    const timeSinceCreated = Date.now() - new Date(transaction.createdAt).getTime();
    if (timeSinceCreated > 30000) { // 30 seconds
      transaction.status = 'completed';
    }
    
    res.json({
      success: true,
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 TUTORWEB BACKEND SERVER                              ║
║                                                           ║
║   Server running on: http://localhost:${PORT}               ║
║   API Base URL: http://localhost:${PORT}/api                ║
║                                                           ║
║   📚 Available Endpoints:                                 ║
║   GET  /api/courses         - Danh sách lớp học          ║
║   GET  /api/courses/:slug   - Chi tiết lớp học           ║
║   GET  /api/tutors          - Danh sách gia sư           ║
║   GET  /api/tutors/:slug    - Chi tiết gia sư            ║
║   POST /api/login           - Đăng nhập                  ║
║   POST /api/register        - Đăng ký                    ║
║   GET  /api/profile         - Lấy profile (auth)         ║
║   POST /api/profile/edit    - Cập nhật profile (auth)    ║
║                                                           ║
║   🔑 Demo Accounts:                                      ║
║   - admin@tutorweb.com / admin123                        ║
║   - tutor@email.com / tutor123                           ║
║   - student@email.com / student123                       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
