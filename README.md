# **📘 EdumateTask — Mobile & Web Application**

A cross-platform **Education Management App** built using **Expo + React Native + Expo Router + Redux Toolkit + RTK Query + NativeWind (Tailwind CSS)**.
This project supports **Android, iOS, and Web** from a single codebase.

---

## 🚀 **Features**

* 👤 User Authentication (Redux Persist)
* 🌓 System-Level Dark Mode + Manual Toggle
* 📱 Fully responsive for **Mobile & Web**
* ⚡ API integration using **RTK Query**
* 🎛 Modern UI using **NativeWind (Tailwind CSS)**
* 🧩 Modular & Scalable Architecture
* 🔄 Optimistic updates + Caching
* 🧭 Expo Router navigation (tabs + stacks)

---

# 📦 **Project Structure**

```
EdumateTask/
│── app/                      # Expo Router (screens + routes)
│   ├── (tabs)/               # Bottom tabs: Home, Post, Profile
│   ├── (auth)/               # Login / Register
│   ├── modal.tsx
│── redux/
│   ├── api/                  # RTK Query APIs
│   ├── feature/              # Slices
│   ├── store.ts              # Global store + Persist
│── components/               # Reusable UI components
│── hooks/                    # Custom hooks (color scheme, etc.)
│── global.css                # Tailwind setup
│── package.json
```

---

# 🛠 **Tech Stack**

| Layer           | Tools                                 |
| --------------- | ------------------------------------- |
| UI              | React Native, Expo Router, NativeWind |
| State           | Redux Toolkit, Redux Persist          |
| Data Fetching   | RTK Query                             |
| Platform        | Expo SDK                              |
| Animations      | Reanimated                            |
| API             | JSONPlaceholder (demo)                |
| Device Features | Expo Haptics                          |

---

# 🔧 **Installation Guide**

## **1️⃣ Install Expo CLI (if missing)**

```bash
npm install -g expo-cli
```

---

# 📥 **2️⃣ Clone the Repository**

```bash
git clone https://github.com/Monirul-Jim/EdumateTask
cd EdumateTask
```

---

# 📦 **3️⃣ Install Dependencies**

```bash
npm install
```

---

# ▶️ **4️⃣ Run the App**

### **📱 Mobile (Android / iOS)**

```bash
npx expo start
```

Scan the QR code with Expo Go.

---

### **🖥 Web**

```bash
npx expo start --web
```

---

# 🎯 **Environment Setup (Optional)**

Create `.env` if using custom backend:

```
API_URL=https://example.com
```

---

# 🧩 **State Management**

This project uses:

### 🔹 **Redux Toolkit**

* Centralized store
* Scalable reducers and slices

### 🔹 **RTK Query**

* Auto caching
* Auto request deduping
* Background refetch
* Normalized response handling

Example:

```ts
const { data, isLoading } = useGetUsersQuery();
```

### 🔹 **Redux Persist**

* Saves user session
* Works on **web & native**
* Uses `AsyncStorage` or `localStorage` based on platform

---

# ⚡ **Caching Strategy (RTK Query)**

RTK Query provides:

* **Aggressive caching** to avoid unnecessary API calls
* **Refetch-on-mount**, **refetch-on-focus**
* Background updates
* Optimistic cache update for Post creation

Example config:

```ts
keepUnusedDataFor: 60,
refetchOnFocus: true,
```

---

# 🏗 **Architecture Explanation**

### **Why Expo?**

* Zero-config cross-platform development
* Web + Mobile in one codebase
* Faster deployment

### **Why Expo Router?**

* File-based routing
* Cleaner screen structure
* Better deep link support
* Automatic type-safe routes

### **Why Redux Toolkit?**

* Eliminates boilerplate
* Predictable global state
* Simplifies async logic

### **Why RTK Query?**

* Built-in caching
* Easy CRUD handling
* Better API maintainability

### **Why NativeWind?**

* Tailwind consistency
* Fast development
* Dynamic theme support

---

# ⚖ **Trade-offs & Decisions**

### ✔ Chosen: **Redux Toolkit + RTK Query**

**Reason:**
Reliable, scalable, strong caching, works across web + native better than Zustand or React Query.

---

### ✔ Chosen: **Expo Router**

**Reason:**
Cleaner navigation structure, better DX than React Navigation custom stacks.

---

### ✔ Chosen: **NativeWind**

**Reason:**
Tailwind helps maintain consistent UI faster.

---

### ✔ Chosen: **Monorepo-like Expo structure**

**Reason:**
Easier to maintain mobile & web builds together.

---

# 📚 **Available Scripts**

| Command            | Description         |
| ------------------ | ------------------- |
| `expo start`       | Start dev server    |
| `expo start --web` | Run web app         |
| `expo build`       | Expo build tools    |
| `expo prebuild`    | Bare workflow build |

---

# 👨‍💻 Author

**Md Monirul Jim**
*Full-Stack Mobile Developer*
🔗 GitHub: *Monirul-Jim*

---

# 📄 License

MIT (Free to use)

---
