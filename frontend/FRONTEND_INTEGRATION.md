# 🔌 Frontend Integration Guide
# Frontend को Backend से कैसे connect करें

---

## 📋 Table of Contents
1. [Setup](#setup)
2. [Helper Functions](#helper-functions)
3. [React Component Examples](#react-component-examples)
4. [Error Handling](#error-handling)
5. [Token Management](#token-management)

---

## ⚙️ SETUP

### 1. Frontend में axios install करो

```bash
cd frontend
npm install axios
```

### 2. API Configuration बनाओ

फाइल: `src/config/api.js`

```javascript
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// हर request से पहले token भेज दो
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
```

---

## 🛠️ HELPER FUNCTIONS

फाइल: `src/services/authService.js`

```javascript
import api from '../config/api';

// 📝 REGISTER - नया user बनाओ
export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/users/register', {
      name,
      email,
      password
    });
    
    // Token को localStorage में save करो
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// 🔑 LOGIN - user को authenticate करो
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/users/login', {
      email,
      password
    });
    
    // Token को localStorage में save करो
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// 👤 GET PROFILE - user का data fetch करो (Protected)
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    // Token expire हो गया हो तो logout करो
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw error.response?.data || { message: 'Failed to fetch profile' };
  }
};

// 🚪 LOGOUT - user को logout करो
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

// 🔍 CHECK AUTH - check करो कि user logged in है या नहीं
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// 👥 GET CURRENT USER - current logged in user get करो
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
```

---

## ⚛️ REACT COMPONENT EXAMPLES

### Register Component

```jsx
import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await registerUser(
        formData.name,
        formData.email,
        formData.password
      );
      
      console.log('✅ Registration successful:', response);
      navigate('/'); // Home page पर भेज दो
    } catch (err) {
      console.error('❌ Registration error:', err);
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
```

---

### Login Component

```jsx
import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser(formData.email, formData.password);
      
      console.log('✅ Login successful:', response);
      navigate('/'); // Home पर भेज दो
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
```

---

### Profile Component (Protected)

```jsx
import React, { useEffect, useState } from 'react';
import { getUserProfile, logoutUser, isAuthenticated } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.user);
        console.log('✅ Profile fetched:', response.user);
      } catch (err) {
        console.error('❌ Error fetching profile:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return <div>No user data</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      
      <button onClick={logoutUser} className="logout-btn">
        Logout
      </button>
    </div>
  );
}
```

---

### Protected Route Component

```jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

---

### App.jsx में usage

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
```

---

## ❌ ERROR HANDLING

### Common Errors और उनके solutions:

```javascript
// Error interceptor add करो
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;

    // 401 - Unauthorized (Token invalid/expired)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    // 400 - Bad Request
    if (error.response?.status === 400) {
      console.error('❌ Bad Request:', message);
    }

    // 500 - Server Error
    if (error.response?.status === 500) {
      console.error('❌ Server Error:', message);
    }

    return Promise.reject(error);
  }
);
```

---

## 🔐 TOKEN MANAGEMENT

### localStorage में token store करो:

```javascript
// Token save करो
localStorage.setItem('token', response.data.token);

// Token get करो
const token = localStorage.getItem('token');

// Token remove करो
localStorage.removeItem('token');
```

### Token को expiry से पहले refresh करो:

```javascript
const refreshToken = async () => {
  try {
    const response = await api.post('/users/refresh-token');
    localStorage.setItem('token', response.data.token);
    return response.data.token;
  } catch (error) {
    // Refresh fail हो तो logout करो
    logoutUser();
  }
};
```

---

## 🎯 WORKFLOW

```
┌──────────────┐
│  User        │
│  nahe logged │
└──────┬───────┘
       │
       │ /register पर जाओ
       │
       ▼
┌──────────────────┐
│ Register Form    │ ← name, email, password
│                  │
│ Submit Button    │
└──────┬───────────┘
       │
       │ registerUser() call करो
       │
       ▼
┌──────────────────────────────┐
│ Backend /api/users/register  │
│ 1. Password hash करो         │
│ 2. User save करो             │
│ 3. Token generate करो        │
│ Return: token + user data    │
└──────┬───────────────────────┘
       │
       │ Token को localStorage में save करो
       │
       ▼
┌──────────────┐
│ Home Page    │ ← Logged in!
│ या Profile   │
└──────────────┘
       │
       │ Protected route access करना है?
       │
       ▼
┌─────────────────────────────┐
│ ProtectedRoute component    │
│ 1. Check localStorage token │
│ 2. अगर token है तो component  │
│    render करो               │
│ 3. नहीं तो /login पर भेज दो  │
└─────────────────────────────┘
       │
       │ Profile route access करो
       │ API request में token भेज दो
       │
       ▼
┌────────────────────────────┐
│ Backend /api/users/profile │
│ 1. Token verify करो        │
│ 2. User data fetch करो     │
│ Return: user data          │
└────────┬───────────────────┘
         │
         │ Frontend में user data दिखाओ
         │
         ▼
┌──────────────────┐
│ Profile Page     │
│ User का data     │
│ Logout button    │
└──────────────────┘
```

---

## 🚀 QUICK START CHECKLIST

- [ ] `npm install axios` करो
- [ ] `src/config/api.js` बनाओ
- [ ] `src/services/authService.js` बनाओ
- [ ] Register, Login, Profile components बनाओ
- [ ] ProtectedRoute component बनाओ
- [ ] App.jsx में routes add करो
- [ ] .env में सही backend URL रखो
- [ ] Backend server चल रहा है?
- [ ] Postman से APIs test कर लो
- [ ] Frontend से register करो
- [ ] Frontend से login करो
- [ ] Protected route access करो

---

**Happy Frontend Integration! 🎉**
