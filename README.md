# 📚 Lowcode Input Library

Thư viện input components cho Lowcoder platform - **100% Pure JavaScript, Zero Dependencies!**

## ✨ Tính năng

- 🔥 **Pure JavaScript**: Không Vue, React hay framework nào - vanilla JS thuần
- 🎯 **Zero Dependencies**: Hoàn toàn độc lập, không phụ thuộc external
- 🚀 **Ultra Lightweight**: Chỉ 18.92KB (3.32KB gzipped)
- 🎨 **Modern CSS**: Embedded với animations và hover effects  
- 📱 **ES2015 Compatible**: Lowcoder friendly syntax
- 📦 **Single File**: CSS + JS trong 1 file duy nhất

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

### ✅ Chỉ cần 1 file JavaScript thuần!

**Không lỗi syntax, không dependencies, không Vue:**

```html
<!-- Chỉ cần file này -->
<script src="https://raw.githubusercontent.com/YOUR_USERNAME/lowcode-input-lib/refs/heads/main/dist/lowcode-input-lib.umd.js"></script>
```

### 🔧 API đơn giản và rõ ràng

```javascript
// Tạo text input
const textInput = LowcodeInputLib.createTextInput({
  placeholder: 'Enter text...',
  class: 'my-custom-class'
});

// Listen for changes
textInput.on('change', (value) => {
  console.log('Text changed:', value);
});

// Mount to DOM
textInput.mount('#container');

// Set/get values
textInput.setValue('New value');
const currentValue = textInput.getValue();
```

### 📋 Tất cả component types:

```javascript
// Text Input
LowcodeInputLib.createTextInput(options)

// Number Input  
LowcodeInputLib.createNumberInput({ min: 0, max: 100 })

// Select Input
LowcodeInputLib.createSelectInput({ 
  options: [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' }
  ] 
})

// Textarea
LowcodeInputLib.createTextareaInput({ rows: 4 })

// Checkbox
LowcodeInputLib.createCheckboxInput({ label: 'Check me' })

// Radio Group
LowcodeInputLib.createRadioGroupInput({ 
  options: [...],
  direction: 'horizontal' // or 'vertical'
})

// Date Input
LowcodeInputLib.createDateInput()
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
└── lowcode-input-lib.umd.js    # Pure JavaScript + CSS (18.92KB, 3.32KB gzipped)
                                # No Vue, No React, No Dependencies
```

## 🎯 URL cho Lowcoder
`https://raw.githubusercontent.com/YOUR_USERNAME/lowcode-input-lib/refs/heads/main/dist/lowcode-input-lib.umd.js`

## ✅ Giải quyết tất cả vấn đề Lowcoder!

✅ **Không lỗi `Unexpected token ':'`** - Pure JavaScript ES2015  
✅ **Không lỗi `defineComponent`** - Không dùng Vue  
✅ **Zero external dependencies** - Hoàn toàn self-contained  
✅ **18KB lightweight** - Siêu nhẹ so với 117KB trước đó
✅ **Modern CSS embedded** - Styling đẹp built-in  
✅ **Simple API** - Dễ sử dụng hơn Vue components

## 🔧 Build Process

CSS được tự động inject vào JS file thông qua custom Vite plugin, không cần link CSS riêng.

## 📦 Components API

Tất cả components hỗ trợ:
- `v-model` binding
- Standard HTML attributes
- Event handlers (`onChange`, `onBlur`, `onFocus`)
- Custom CSS classes
