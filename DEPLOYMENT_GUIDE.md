# 🚀 Hackathon Deployment Guide for CampusGPT

Congratulations on completing the build! To make your project **Production Ready** and **Host it** for the hackathon submission, follow these exact steps.

---

## 🏗️ 1. Prepare for Deployment (Manual Steps)

### A. Github Repository
You likely already have this, but if not:
1.  Initialize git in the root `CampusGPT` folder:
    ```bash
    git init
    git add .
    git commit -m "Initial commit - Ready for hackathon"
    ```
2.  Create a new repository on **GitHub**.
3.  Push your code there.

### B. Environment Variables
You will need your secrets handy.
- `GEMINI_API_KEY` (from your `.env`)

---

## 🌐 2. Deploy Frontend (Vercel)
Vercel is the best place to host your React/Vite Frontend.

1.  Go to [Vercel.com](https://vercel.com) and Sign Up/Login.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your **CampusGPT** repository.
4.  **Configure Project**:
    - **Root Directory**: Click "Edit" and select `client`. (Important!)
    - **Framework Preset**: It should auto-detect `Vite`.
    - **Environment Variables**:
      - `VITE_API_URL`: You don't have this yet! We will come back to this after deploying the backend.
5.  Click **Deploy**.

*Note: Initially, the frontend will load, but it won't connect to the backend until Step 3 is done.*

---

## ⚙️ 3. Deploy Backend (Render)
Render is excellent for hosting Node.js servers for free.

1.  Go to [Render.com](https://render.com) and Sign Up.
2.  Click **"New +"** -> **"Web Service"**.
3.  Connect your GitHub repository.
4.  **Configure Service**:
    - **Root Directory**: `server` (Important!)
    - **Runtime**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
5.  **Environment Variables** (Scroll down to "Advanced"):
    - Key: `GEMINI_API_KEY`, Value: `your_actual_key_here`
    - Key: `NODE_ENV`, Value: `production`
6.  Click **Create Web Service**.

**Wait for it to deploy.** Once finished, Render will render a URL like: `https://campus-gpt-backend.onrender.com`.

---

## 🔗 4. Connect Frontend to Backend

Now that your backend is live, you need to tell the frontend where it is.

1.  Go back to your **Vercel Project Dashboard**.
2.  Go to **Settings** -> **Environment Variables**.
3.  Add a new variable:
    - **Key**: `VITE_API_URL`
    - **Value**: `https://campus-gpt-backend.onrender.com/api` (Make sure to add `/api` at the end!)
4.  Go to **Deployments** tab and **Redeploy** the latest commit so the new variable takes effect.

---

## 🏆 5. Submission Checklist (The "Wow" Factor)

For a Hackathon transparency is key. Make sure your GitHub `README.md` is beautiful.

1.  **Screenshots**: Add screenshots of the Dashboard, Study Plan, and Tutor Chat to your README.
2.  **Demo Video**: Record a 1-minute Loom or screen capture showing:
    - Uploading a PDF.
    - Generating a Study Plan.
    - Chatting with the Tutor.
3.  **About Section**: clearly state "Powered by Gemini 1.5 Pro".

---

## ⚠️ Important Note on File Uploads
Since we are using **Render Free Tier**, the file system is "ephemeral".
- This means if the server restarts (which happens often on free tiers), **uploaded PDFs might disappear**.
- **For a Hackathon Demo**: This is usually fine! Just upload the file, demonstrate the feature, and you're good.
- **For Real Production**: You would integrate **AWS S3** or **Cloudinary**. (Ask me if you want this implemented, but it adds complexity).

You are ready to win! 🚀
