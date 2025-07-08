# Calculator Web App

A modern, responsive calculator web application inspired by **Google's web calculator** and **Oppo mobile calculator**.  
Designed to deliver an intuitive user experience with smooth design, detailed functionality handling, and full keyboard support.

🌐 **Live demo:** [shiny-hotteok-6f3385.netlify.app](https://shiny-hotteok-6f3385.netlify.app/)

---

## 📌 Features

✅ **Responsive Design**  
- Built with HTML and CSS to provide a clean, minimal interface.  
- Dark theme with custom-styled buttons and smooth transitions.  
- Scrollable equation screen for long expressions.

✅ **Rich Functionality**  
- Handles addition, subtraction, multiplication, division.  
- Toggle sign button (+/-) to change the sign of numbers anytime.  
- Decimal point support.  
- Clear all (C) and backspace/delete for step-by-step correction.  
- Shows the entire equation above the result after calculation.

✅ **Keyboard Support**  
- Supports numbers, operators (+, -, *, /, x, ÷), decimal, backspace, and enter key for calculation.

✅ **Error Handling**  
- Displays "Error" for undefined operations (e.g., Infinity × 0).  
- Prevents invalid inputs like multiple consecutive operators, redundant decimal points, etc.

---

## ✨ Inspiration
- **Google Calculator:** For simplicity, usability, and familiar layout.
- **Oppo Mobile Calculator:** For the toggle sign (+/-) and handling of negative operands directly in the expression.

---

## 📂 Project Structure

```plaintext
├── index.html     # HTML structure: calculator screen & buttons
├── style.css      # CSS styles: dark theme, layout, responsive design
└── script.js      # JavaScript: functionality, operations, input handling
```

---

## 🛠 How It Works

### **HTML**
- Contains the main calculator container, display screens, and all calculator buttons.
- Buttons call JavaScript functions like `num()`, `setOperator()`, `toggleSign()`, `calculate()` etc., on click.
- Icons for backspace are included using Bootstrap Icons.

### **CSS**
- Uses Flexbox to center and arrange calculator components.
- Custom styling for:
  - Operators (orange-themed)
  - Toggle sign button (orange text)
  - Equal button (highlighted in orange)
  - Clear/delete buttons (grey)
- Scrollbar styling for the equation area to look sleek.
- Smooth hover and active states for better user feedback.

### **JavaScript**
- Maintains operands and operators separately in arrays to dynamically build and evaluate expressions.
- Handles complex edge cases, including:
  - Negating numbers mid-expression.
  - Changing operators on the fly.
  - Preventing multiple decimal points in the same operand.
  - Displaying correct equation above result.
- Supports keyboard inputs using `keydown` events.

---

## 🧪 Usage

**Online:**  
Just visit: [https://shiny-hotteok-6f3385.netlify.app/](https://shiny-hotteok-6f3385.netlify.app/)

**Locally:**  
1. Clone/download this repository.
2. Open `index.html` in your browser.
3. Start using the calculator!

---

## 🔧 Built With
- **HTML** – Markup
- **CSS** – Styling & layout
- **JavaScript (Vanilla)** – Logic and interactivity
- **Bootstrap Icons** – Backspace icon

---

## 🎨 Screenshots
![image](https://github.com/user-attachments/assets/b4fa0865-f066-4d59-b9f4-02518064d91e)
![image](https://github.com/user-attachments/assets/4721989d-ceb6-4724-a300-74500a8a19a6)
![image](https://github.com/user-attachments/assets/949b4505-d540-491f-a0b9-662d3a85eec5)
