# 📸 Mesto – Traveler’s Photo Gallery  

## **Project Overview**  
**Mesto** is a **single-page application (SPA)** designed as a **gallery** where users can **view, like, and add photos**. Users can also **update their profile, change their avatar, and manage their cards**. All updated data is stored on the **server**.  

🔗 **[Live Demo](https://mi-viejo-amigo.github.io/mesto/)**  

---

## **Technologies Used**  
- **HTML, CSS, JavaScript**  

---

## **Implemented Features**  

### **Form Validation**  
✅ **Full form validation** for **profile editing, avatar updates, and adding new cards**.  
✅ **Validation is based on regular expressions** and includes **custom error messages**.  
✅ **Validation dynamically controls the button state** – if any field is invalid, the **“Save” button is disabled**.  
✅ **Error messages are cleared** when closing a pre-filled form.  

### **API Integration**  
✅ **Fetching initial card data and user information** from the server.  
✅ **Updating user data** when editing the profile.  
✅ **Submitting new cards** to the server.  
✅ **Updating profile avatars**.  
✅ **Deleting cards**.  
✅ **Adding and removing likes** on cards.  

### **Responsive Design**  
✅ **Adaptive layout** optimized for **desktops, tablets, and smartphones**.  
✅ **Different UI elements for touchscreens** (e.g., no hover effects).  

### **Selective Deletion**  
✅ **Only the owner can delete their cards** – the **delete icon appears only on owned cards**.  

### **Like Counter**  
✅ **Displays the number of likes** for each card.  
✅ **Like icon updates dynamically** based on the user's interaction.  

### **Loading State Notifications**  
✅ **When sending requests, the "Save" button text changes to "Saving..."**, indicating progress.  

### **Modal Window Handling**  
✅ **Modals can be closed** by clicking the **close button**, pressing **Esc**, or clicking the **overlay**.  

---

## **Installation & Setup**  

### **1️⃣ Install dependencies and start the project**  
```bash
npm install
npm run start
```

## **Try the Full Experience!** 🌟  
🚀 You can:  

- **Change your avatar** 🖼️  
- **Edit your profile** ✏️  
- **Add your own card** with a **title and image** 📸  
- **Like and delete your own cards** ❤️❌  

📌 **Currently, only my cards are displayed** (filtered by ID) to prevent uncontrolled content from other users.  

---

## **Author**  
👨‍💻 **Developed by [Nikita Frolov](https://github.com/mi-viejo-amigo)**  

📩 **Contact me:**  
- **GitHub:** [mi-viejo-amigo](https://github.com/mi-viejo-amigo)  
- **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/nktfrlv)  
- **Email:** [Letter me](mailto:nkt.frlv7@yandex.ru)  
