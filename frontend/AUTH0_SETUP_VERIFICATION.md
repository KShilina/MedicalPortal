# Auth0 Configuration Verification Guide

## 🔍 Step-by-Step Verification Checklist

Follow these steps to verify your Auth0 application is configured correctly for a Single Page Application (SPA).

### Step 1: Navigate to Your Auth0 Application

1. Go to [https://manage.auth0.com/dashboard/](https://manage.auth0.com/dashboard/)
2. Log in to your Auth0 account
3. Click on **Applications** in the left sidebar
4. Find and click on your application (Client ID: `eOWxiQxKlDPz6aoz5zD6g89wYz6pzQyg`)
5. Click on the **Settings** tab

---

### Step 2: Verify Application Type ✅

**Location:** Top of the Settings page, under "Application Type"

**Required Setting:**
- ✅ **MUST be:** "Single Page Application"
- ❌ **MUST NOT be:** "Regular Web Application", "Native", or "Machine to Machine"

**How to Fix:**
- If it's not "Single Page Application", click the dropdown and select "Single Page Application"
- Click **Save Changes** at the bottom of the page

---

### Step 3: Verify Token Endpoint Authentication Method ✅

**Location:** Settings page → Scroll down to **Advanced Settings** → Click **Advanced Settings** → Find **Token Endpoint Authentication Method**

**Required Setting:**
- ✅ **MUST be:** "None"
- ❌ **MUST NOT be:** "Post", "Client Secret", or any other option

**How to Fix:**
- Click on **Advanced Settings** (expandable section)
- Find "Token Endpoint Authentication Method"
- Select **"None"** from the dropdown
- Click **Save Changes**

**Why:** SPAs cannot securely store client secrets, so they use PKCE (Proof Key for Code Exchange) instead.

---

### Step 4: Verify Application URIs ✅

**Location:** Settings page → Scroll to **Application URIs** section

**Required Settings:**

1. **Application URL:**
   - ✅ Set to: `http://localhost:3000`
   - Or leave blank if not needed

2. **Allowed Callback URLs:**
   - ✅ **MUST include:** `http://localhost:3000`
   - Can include multiple URLs separated by commas
   - Example: `http://localhost:3000,http://localhost:3000/callback`

3. **Allowed Logout URLs:**
   - ✅ **MUST include:** `http://localhost:3000`
   - Can include multiple URLs separated by commas
   - Example: `http://localhost:3000,http://localhost:3000/logout`

4. **Allowed Web Origins:**
   - ✅ **MUST include:** `http://localhost:3000`
   - This is critical for CORS - without it, you'll get 401 errors
   - Can include multiple URLs separated by commas
   - Example: `http://localhost:3000`

5. **Initiate Login URI:**
   - ⚠️ **Leave blank** (or use HTTPS URL only)
   - HTTP URLs are not allowed here

**How to Fix:**
- Scroll to the "Application URIs" section
- Add `http://localhost:3000` to each of the fields above
- Click **Save Changes**

---

### Step 5: Verify Grant Types ✅

**Location:** Settings page → **Advanced Settings** → **Grant Types** tab

**Required Grant Types (should be checked):**
- ✅ **Authorization Code** (required for SPAs)
- ✅ **Refresh Token** (optional, but recommended)
- ❌ **Implicit** (deprecated, should be unchecked)
- ❌ **Client Credentials** (not needed for SPAs)

**How to Fix:**
- Click **Advanced Settings**
- Go to **Grant Types** tab
- Ensure "Authorization Code" is checked
- Uncheck "Implicit" if it's checked (it's deprecated)
- Click **Save Changes**

---

### Step 6: Verify Your .env File ✅

**Location:** `/Users/e.shilina/MedicalPortal/frontend/.env`

**Current Values:**
```
REACT_APP_AUTH0_DOMAIN=dev-cru6uhu6jy40xwqb.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=eOWxiQxKlDPz6aoz5zD6g89wYz6pzQyg
```

**Verification:**
1. Open your Auth0 Dashboard → Your Application → Settings
2. Compare:
   - **Domain** in Auth0 Dashboard should match `REACT_APP_AUTH0_DOMAIN`
   - **Client ID** in Auth0 Dashboard should match `REACT_APP_AUTH0_CLIENT_ID`

**How to Find in Auth0:**
- **Domain:** Look at the top of the Settings page, or in the "Basic Information" section
- **Client ID:** Found in the "Basic Information" section at the top of Settings

---

## 🚨 Common Mistakes to Avoid

1. **Wrong Application Type**
   - ❌ Using "Regular Web Application" (requires client secret)
   - ✅ Use "Single Page Application"

2. **Token Endpoint Auth Method**
   - ❌ Using "Post" or "Client Secret"
   - ✅ Use "None" for SPAs

3. **Missing Web Origins**
   - ❌ Not adding `http://localhost:3000` to Allowed Web Origins
   - ✅ This causes CORS errors and 401 Unauthorized

4. **Wrong Port**
   - ❌ Using port 5173 (Vite default) when app runs on 3000
   - ✅ Use the actual port your app runs on (3000 for Create React App)

5. **HTTPS in Initiate Login URI**
   - ❌ Using `http://localhost:3000` in Initiate Login URI
   - ✅ Leave blank or use HTTPS URL only

---

## ✅ Final Checklist

Before testing, verify:

- [ ] Application Type = "Single Page Application"
- [ ] Token Endpoint Authentication Method = "None"
- [ ] Allowed Callback URLs includes `http://localhost:3000`
- [ ] Allowed Logout URLs includes `http://localhost:3000`
- [ ] Allowed Web Origins includes `http://localhost:3000`
- [ ] Grant Types includes "Authorization Code"
- [ ] .env file has correct Domain and Client ID
- [ ] All changes have been saved in Auth0 Dashboard

---

## 🔄 After Making Changes

1. **Save all changes** in Auth0 Dashboard
2. **Restart your React app:**
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   cd /Users/e.shilina/MedicalPortal/frontend
   npm start
   ```
3. **Clear browser cache** or use incognito mode
4. **Try logging in again**

---

## 🐛 Still Getting 401 Error?

If you've verified all the above and still get a 401 error:

1. **Check browser console** for the exact error message
2. **Check Network tab** in browser DevTools:
   - Look for the failed request to `/oauth/token`
   - Check the response body for specific error details
3. **Verify the redirect URI** matches exactly:
   - Check browser console for "Auth0 Configuration" log
   - Ensure it matches what's in Auth0 Dashboard
4. **Try creating a new Auth0 Application:**
   - Sometimes it's easier to start fresh with correct settings
   - Create new SPA application
   - Update .env file with new credentials

---

## 📞 Need More Help?

- Auth0 Documentation: [https://auth0.com/docs/quickstart/spa/react](https://auth0.com/docs/quickstart/spa/react)
- Auth0 Community: [https://community.auth0.com/](https://community.auth0.com/)

