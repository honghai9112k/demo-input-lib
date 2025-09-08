# 📚 Lowcode Input Library

Thư viện Vue 3 components cho Lowcoder platform - **Chỉ cần 1 file JS duy nhất!**

## ✨ Tính năng

- 🎯 **Single File Deployment**: CSS đã được embed vào JS, chỉ cần import 1 file
- 🚀 Vue 3 + TypeScript
- 🎨 Modern CSS với animations và hover effects  
- 📱 Responsive design
- 🌗 Dark mode support
- 📦 UMD format - tương thích với mọi môi trường

## 📋 Components

- `TextInput` - Input text với validation
- `NumberInput` - Input số với min/max
- `SelectInput` - Dropdown select với multiple support
- `TextareaInput` - Textarea với resize
- `CheckboxInput` - Checkbox với label
- `RadioGroupInput` - Radio button group
- `DateInput` - Date picker

## 🚀 Cách deploy lên GitHub để có link CDN

### Bước 1: Tạo GitHub Repository
```bash
# Tạo repo mới trên GitHub (ví dụ: lowcode-input-lib)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/lowcode-input-lib.git
git push -u origin main
```

### Bước 2: Get Raw File URL
Sau khi push lên GitHub, file sẽ có đường dẫn:
```
https://raw.githubusercontent.com/USERNAME/lowcode-input-lib/refs/heads/main/dist/lowcode-input-lib.umd.js
```

## 🚀 Cách sử dụng trong Lowcoder

### ⚠️ Quan trọng: Thứ tự load library

Để tránh lỗi `Cannot read properties of undefined (reading 'defineComponent')`, cần đảm bảo thứ tự:

1. **Load Vue 3 trước:**
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

2. **Sau đó load library:**
```html
<script src="https://raw.githubusercontent.com/YOUR_USERNAME/lowcode-input-lib/refs/heads/main/dist/lowcode-input-lib.umd.js"></script>
```

### ✅ Components tự động đăng ký

Library sẽ tự động:
- Phát hiện Vue
- Đăng ký tất cả components global
- Sẵn sàng sử dụng ngay

```javascript
// Không cần import - components đã được đăng ký global
const { createApp } = Vue;

createApp({
  data() {
    return {
      textValue: '',
      options: [
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' }
      ]
    }
  }
}).mount('#app');
```

```html
<!-- Sử dụng trực tiếp -->
<lowcoder-text-input v-model="textValue" placeholder="Nhập text..."></lowcoder-text-input>
<lowcoder-select-input v-model="selectValue" :options="options"></lowcoder-select-input>
```

## 💡 Sử dụng

### Trong Lowcoder Platform
```javascript
// Components tự động được đăng ký global
const { createApp } = Vue;

createApp({
  data() {
    return {
      textValue: '',
      selectValue: '',
      options: [
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' }
      ]
    }
  }
}).mount('#app');
```

```html
<div id="app">
  <!-- Text Input -->
  <lowcoder-text-input 
    v-model="textValue" 
    placeholder="Nhập text...">
  </lowcoder-text-input>

  <!-- Select Input -->
  <lowcoder-select-input 
    v-model="selectValue" 
    :options="options"
    placeholder="Chọn option...">
  </lowcoder-select-input>
</div>
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build single file
npm run build

# Test demo
open demo-single-file.html
```

## 📁 File Structure

```
dist/
└── lowcode-input-lib.umd.js    # Single file with embedded CSS (21KB)
```

## 🎯 Ví dụ URL thực tế
Giống như: `https://raw.githubusercontent.com/anhnk456/camuda/refs/heads/main/my-bpmn-widget.umd.js`

URL của bạn sẽ là: `https://raw.githubusercontent.com/YOUR_USERNAME/lowcode-input-lib/refs/heads/main/dist/lowcode-input-lib.umd.js`

## 🔧 Troubleshooting

### ❌ Lỗi: `Cannot read properties of undefined (reading 'defineComponent')`

**Nguyên nhân:** Vue chưa được load khi library khởi tạo

**Giải pháp:**
1. Đảm bảo load Vue 3 trước library
2. Sử dụng thứ tự chính xác:
```html
<!-- 1. Load Vue trước -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<!-- 2. Load library sau -->
<script src="YOUR_GITHUB_RAW_URL"></script>
```

### ✅ Kiểm tra library đã load thành công:
```javascript
console.log('Vue:', typeof Vue !== 'undefined');
console.log('Library:', typeof LowcoderInputLib !== 'undefined'); 
console.log('Components:', window.LowcoderInputComponents);
```

## 🔧 Build Process

CSS được tự động inject vào JS file thông qua custom Vite plugin, không cần link CSS riêng.

## 📦 Components API

Tất cả components hỗ trợ:
- `v-model` binding
- Standard HTML attributes
- Event handlers (`onChange`, `onBlur`, `onFocus`)
- Custom CSS classes
