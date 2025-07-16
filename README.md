# Setup Guide: Next.js + React Query + Axios

## 📁 Cấu trúc thư mục đã tạo

```
├── lib/
│   ├── axios.ts          # Cấu hình Axios với interceptors
│   ├── api.ts            # API helper functions
│   ├── query-client.ts   # Cấu hình React Query
│   └── utils.ts          # Utility functions
├── services/
│   ├── types.ts          # TypeScript types cho API
│   ├── auth.service.ts   # Authentication service
│   ├── user.service.ts   # User management service
│   └── index.ts          # Export tất cả services
├── hooks/
│   ├── useAuth.ts        # Authentication hooks
│   ├── useUsers.ts       # User management hooks
│   └── index.ts          # Export tất cả hooks
├── components/
│   ├── ui/
│   │   └── button.tsx    # UI components
│   └── demo/
│       ├── AuthDemo.tsx  # Authentication demo
│       └── UserDemo.tsx  # User management demo
└── app/
    ├── providers.tsx     # React Query provider
    └── page.tsx          # Main page
```

## 🚀 Cách sử dụng

### 1. API Calls với Axios

```typescript
import { api } from '@lib/api';

// GET request
const response = await api.get<User[]>('/users');

// POST request
const newUser = await api.post<User>('/users', userData);

// Upload file
const uploadResult = await api.upload<{ url: string }>(
  '/upload',
  file,
  (progress) => {
    console.log(`Upload progress: ${progress}%`);
  }
);
```

### 2. React Query Hooks

```typescript
import { useAuth, useUsers, useUserById } from '@hooks';

// Authentication
const { currentUser, login, logout, isAuthenticated } = useAuth();

// User management - List users
const { users, createUser, updateUser, deleteUser } = useUsers({
  page: 1,
  limit: 10,
});

// User management - Get user by ID
const { data: user, isLoading, error } = useUserById('user-id');
```

### 3. Services

```typescript
import { authService, userService } from '@services';

// Authentication
await authService.login({ email, password });
await authService.getCurrentUser();

// User management
await userService.getUsers({ page: 1, limit: 10 });
await userService.createUser(userData);
await userService.getUserById('user-id');
```

## 🔧 Cấu hình

### Environment Variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

### Alias Paths

Đã cấu hình sẵn các alias:

- `@/*` - Root directory
- `@components/*` - UI components
- `@services/*` - API services
- `@hooks/*` - React Query hooks
- `@lib/*` - Utilities và configs

## 📝 Features đã setup

### ✅ Axios Configuration

- Base URL configuration
- Request/Response interceptors
- Token management
- Error handling
- File upload support

### ✅ React Query Setup

- QueryClient configuration
- Optimistic updates
- Cache invalidation
- Error handling
- Loading states

### ✅ Authentication System

- Login/Logout
- Token management
- Current user query
- Protected routes support

### ✅ User Management System

- CRUD operations
- Pagination support
- Individual user queries
- Avatar upload
- Password change

### ✅ TypeScript Support

- Full type safety
- API response types
- Service interfaces
- Hook return types

## 🎯 Next Steps

1. **Cập nhật API URL** trong `.env.local`
2. **Tùy chỉnh API endpoints** trong services
3. **Thêm validation** cho forms
4. **Implement error boundaries**
5. **Add loading states** cho components
6. **Setup protected routes**

## 🔍 Testing

Chạy development server:

```bash
npm run dev
```

Truy cập `http://localhost:3000` để xem demo:

- **Authentication Demo**: Test login/logout functionality
- **User Management Demo**: Test CRUD operations và user search

## 📚 Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- [Next.js Documentation](https://nextjs.org/docs)
