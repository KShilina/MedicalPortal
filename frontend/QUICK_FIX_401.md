# 🚨 Quick Fix for 401 Unauthorized Error

## ⚡ Fastest Solution (Most Common Issue)

**90% of 401 errors are caused by ONE setting:**

### Token Endpoint Authentication Method

1. Go to: https://manage.auth0.com/dashboard/
2. Click: **Applications** → Your App → **Settings**
3. Scroll down and click: **Advanced Settings**
4. Find: **Token Endpoint Authentication Method**
5. Change it to: **"None"** (if it's set to "Post" or "Client Secret")
6. Click: **Save Changes**
7. Restart your app: Stop and run `npm start` again

---

## ✅ Complete 5-Minute Checklist

Open Auth0 Dashboard → Your App → Settings, and verify:

### 1. Application Type (Top of Settings Page)
- [ ] Must be: **"Single Page Application"**
- [ ] NOT: "Regular Web Application" or "Native"

### 2. Token Endpoint Authentication Method (Advanced Settings)
- [ ] Must be: **"None"**
- [ ] NOT: "Post" or "Client Secret"
- [ ] Location: Settings → Advanced Settings → Token Endpoint Authentication Method

### 3. Allowed Web Origins (Application URIs Section)
- [ ] Must include: **`http://localhost:3000`**
- [ ] This is CRITICAL - without it, you get 401 errors
- [ ] Location: Settings → Application URIs → Allowed Web Origins

### 4. Allowed Callback URLs (Application URIs Section)
- [ ] Must include: **`http://localhost:3000`**
- [ ] Location: Settings → Application URIs → Allowed Callback URLs

### 5. Allowed Logout URLs (Application URIs Section)
- [ ] Must include: **`http://localhost:3000`**
- [ ] Location: Settings → Application URIs → Allowed Logout URLs

### 6. Verify .env File Matches Auth0
- [ ] Domain in .env matches Auth0 Dashboard
- [ ] Client ID in .env matches Auth0 Dashboard

---

## 🔍 How to Find Each Setting

### Application Type
- **Where:** Top of Settings page, first field
- **What to look for:** Dropdown that says "Application Type"

### Token Endpoint Authentication Method
- **Where:** Settings → Scroll down → Click **"Advanced Settings"** → Find "Token Endpoint Authentication Method"
- **What to look for:** Dropdown (often hidden in Advanced Settings)

### Application URIs
- **Where:** Settings → Scroll to "Application URIs" section
- **What to look for:** Four text fields:
  - Application URL
  - Allowed Callback URLs
  - Allowed Logout URLs
  - Allowed Web Origins

---

## 🎯 Most Common Mistakes

1. **Token Endpoint Auth = "Post"** ❌
   - Should be: **"None"** ✅

2. **Application Type = "Regular Web Application"** ❌
   - Should be: **"Single Page Application"** ✅

3. **Missing Web Origins** ❌
   - Must add: **`http://localhost:3000`** ✅

4. **Wrong Port** ❌
   - Using 5173 (Vite) instead of 3000 (CRA) ✅

---

## 🔄 After Making Changes

1. ✅ Click **"Save Changes"** in Auth0
2. ✅ Stop your React app (Ctrl+C)
3. ✅ Restart: `npm start`
4. ✅ Clear browser cache or use incognito
5. ✅ Try logging in again

---

## 📞 Still Not Working?

Check the browser console for:
- Exact error message
- Network tab → Failed `/oauth/token` request → Response tab
- Look for specific error code (e.g., `invalid_client`, `unauthorized_client`)

Common error codes:
- `invalid_client` = Wrong Client ID or Application Type
- `unauthorized_client` = Token Endpoint Auth Method wrong
- `access_denied` = CORS issue (check Web Origins)

---

## 🆘 Need More Help?

See the full guide: `AUTH0_SETUP_VERIFICATION.md`

