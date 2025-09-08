# Hướng dẫn sử dụng trong Lowcoder

## Cách import thư viện vào Lowcoder

### Bước 1: Upload files
1. Upload file `dist/index.umd.js` lên server của bạn hoặc CDN
2. Upload file `dist/lowcoder-input-lib.css` lên server của bạn hoặc CDN
3. Hoặc copy nội dung các file và paste vào Lowcoder

### Bước 2: Import trong Lowcoder

```html
<!-- Import CSS trước -->
<link rel="stylesheet" href="path/to/lowcoder-input-lib.css">

<!-- Import Vue 3 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- Import thư viện UMD -->
<script src="path/to/index.umd.js"></script>
```

### Bước 3: Sử dụng trong Lowcoder

```javascript
// Tạo Vue instance với components
const app = Vue.createApp({
    components: {
        TextInput,
        NumberInput,
        SelectInput,
        TextareaInput,
        CheckboxInput,
        RadioGroupInput,
        DateInput
    },
    data() {
        return {
            formData: {
                name: '',
                age: 0,
                city: '',
                notes: '',
                agree: false,
                gender: '',
                birthdate: ''
            }
        }
    },
    template: `
        <div>
            <h3>Form nhập liệu</h3>
            
            <!-- Text Input -->
            <div class="form-group">
                <label>Họ tên:</label>
                <TextInput 
                    v-model="formData.name"
                    placeholder="Nhập họ tên"
                    @change="onNameChange"
                />
            </div>
            
            <!-- Number Input -->
            <div class="form-group">
                <label>Tuổi:</label>
                <NumberInput 
                    v-model="formData.age"
                    :min="1"
                    :max="120"
                    placeholder="Nhập tuổi"
                />
            </div>
            
            <!-- Select Input -->
            <div class="form-group">
                <label>Thành phố:</label>
                <SelectInput 
                    v-model="formData.city"
                    :options="cityOptions"
                    placeholder="Chọn thành phố"
                />
            </div>
            
            <!-- Textarea Input -->
            <div class="form-group">
                <label>Ghi chú:</label>
                <TextareaInput 
                    v-model="formData.notes"
                    :rows="3"
                    placeholder="Nhập ghi chú"
                />
            </div>
            
            <!-- Checkbox -->
            <CheckboxInput 
                v-model="formData.agree"
                label="Tôi đồng ý với điều khoản"
            />
            
            <!-- Radio Group -->
            <div class="form-group">
                <label>Giới tính:</label>
                <RadioGroupInput 
                    v-model="formData.gender"
                    :options="genderOptions"
                    direction="horizontal"
                />
            </div>
            
            <!-- Date Input -->
            <div class="form-group">
                <label>Ngày sinh:</label>
                <DateInput 
                    v-model="formData.birthdate"
                    type="date"
                />
            </div>
            
            <!-- Hiển thị kết quả -->
            <div class="result">
                <h4>Kết quả:</h4>
                <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
            </div>
        </div>
    `,
    computed: {
        cityOptions() {
            return [
                { label: 'Hà Nội', value: 'hanoi' },
                { label: 'Hồ Chí Minh', value: 'hcm' },
                { label: 'Đà Nẵng', value: 'danang' }
            ];
        },
        genderOptions() {
            return [
                { label: 'Nam', value: 'male' },
                { label: 'Nữ', value: 'female' },
                { label: 'Khác', value: 'other' }
            ];
        }
    },
    methods: {
        onNameChange(value) {
            console.log('Name changed:', value);
            // Có thể trigger event cho Lowcoder
        }
    }
});

// Mount app vào element của Lowcoder
app.mount('#my-form');
```

## API Reference

### TextInput
- `modelValue`: string - Giá trị hiện tại
- `type`: 'text' | 'email' | 'password' | 'url' | 'tel' - Loại input
- `placeholder`: string - Placeholder text
- `maxLength`: number - Độ dài tối đa
- `minLength`: number - Độ dài tối thiểu
- `disabled`: boolean - Vô hiệu hóa
- `required`: boolean - Bắt buộc

### NumberInput
- `modelValue`: number - Giá trị số
- `min`: number - Giá trị nhỏ nhất
- `max`: number - Giá trị lớn nhất
- `step`: number - Bước nhảy

### SelectInput
- `modelValue`: string | string[] - Giá trị được chọn
- `options`: Array<{label: string, value: string, disabled?: boolean}> - Danh sách option
- `multiple`: boolean - Cho phép chọn nhiều
- `placeholder`: string - Text hiển thị khi chưa chọn

### TextareaInput
- `modelValue`: string - Nội dung textarea
- `rows`: number - Số dòng hiển thị
- `resize`: 'none' | 'both' | 'horizontal' | 'vertical' - Cho phép resize

### CheckboxInput
- `modelValue`: boolean - Trạng thái checked
- `label`: string - Label hiển thị bên cạnh checkbox

### RadioGroupInput
- `modelValue`: string - Giá trị được chọn
- `options`: Array<{label: string, value: string, disabled?: boolean}> - Danh sách radio
- `direction`: 'horizontal' | 'vertical' - Hướng hiển thị

### DateInput
- `modelValue`: string - Giá trị ngày (YYYY-MM-DD)
- `type`: 'date' | 'datetime-local' | 'time' - Loại date input
- `min`: string - Ngày nhỏ nhất
- `max`: string - Ngày lớn nhất

## Events
Tất cả components đều emit các events sau:
- `update:modelValue` - Khi giá trị thay đổi (cho v-model)
- `change` - Khi giá trị thay đổi (có thể dùng để tương tác với Lowcoder)
- `blur` - Khi mất focus  
- `focus` - Khi được focus

## CSS Classes
Mỗi component có class riêng để customize:
- `lowcoder-text-input`
- `lowcoder-number-input` 
- `lowcoder-select-input`
- `lowcoder-textarea-input`
- `lowcoder-checkbox`
- `lowcoder-radio-group`
- `lowcoder-date-input`
