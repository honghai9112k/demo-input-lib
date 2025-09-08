# 📚 Lowcode Input Library

Thư viện input components cho Lowcoder platform - **100% Standalone, không phụ thuộc external!**

## ✨ Tính năng

- 🎯 **Zero Dependencies**: Vue đã được bundle vào, không cần load external
- 🚀 **Single File**: Chỉ 1 file JS duy nhất với CSS embedded
- 🎨 Modern CSS với animations và hover effects  
- 📱 Responsive design
- 🌗 Dark mode support
- 📦 117KB gzip 39KB - Self-contained

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

### ✅ Chỉ cần 1 file duy nhất!

**Không cần load Vue external** - tất cả đã được bundle:

```html
<!-- Chỉ cần file này -->
<script src="https://raw.githubusercontent.com/YOUR_USERNAME/lowcode-input-lib/refs/heads/main/dist/lowcode-input-lib.umd.js"></script>
```

### 🎯 Components tự động sẵn sàng

```javascript
// Sử dụng helper function được tạo sẵn
const app = createLowcoderApp({
  data() {
    return {
      textValue: '',
      options: [
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' }
      ]
    }
  }
});

app.mount('#app');
```

```html
<!-- Components đã được đăng ký global -->
<lowcoder-text-input v-model="textValue" placeholder="Ready to use!"></lowcoder-text-input>
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
└── lowcode-input-lib.umd.js    # Standalone file (117KB, 39KB gzipped)
                                # Vue + Components + CSS all bundled
```

## 🎯 URL cho Lowcoder
`https://raw.githubusercontent.com/YOUR_USERNAME/lowcode-input-lib/refs/heads/main/dist/lowcode-input-lib.umd.js`

## 🔧 Không còn lỗi dependency!

✅ **Không cần load Vue external**  
✅ **Không có lỗi `defineComponent`**  
✅ **Zero external dependencies**  
✅ **Single file deployment**

## 🔧 Build Process

CSS được tự động inject vào JS file thông qua custom Vite plugin, không cần link CSS riêng.

## 📦 Components API

Tất cả components hỗ trợ:
- `v-model` binding
- Standard HTML attributes
- Event handlers (`onChange`, `onBlur`, `onFocus`)
- Custom CSS classes
