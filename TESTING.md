# Testing Guide - AI-Powered Institute Management System

This guide provides step-by-step instructions to test the complete AI integration.

## 🧪 Pre-Testing Checklist

Before testing, ensure all three services are running:

- [ ] **Backend (Express)**: Running on port 4200
- [ ] **Frontend (React)**: Running on port 3000
- [ ] **AI Service (FastAPI)**: Running on port 8000

## 📋 Test Scenarios

### Test 1: User Authentication with Role

**Objective:** Verify that users can signup/login with roles and the role is stored correctly.

**Steps:**
1. Go to `http://localhost:3000/signup`
2. Fill in the signup form:
   - Full Name: Test Admin
   - Phone: 9876543210
   - Email: admin@test.com
   - Password: test123
   - Role: Select "admin"
   - Upload any image
3. Click "Create Your Account"
4. You should be redirected to login
5. Login with your credentials
6. Open browser DevTools (F12) → Application → Local Storage
7. Verify these keys exist:
   - `token`: Should contain JWT token
   - `uId`: Should contain user ID
   - `fullName`: Should contain "Test Admin"
   - `email`: Should contain "admin@test.com"
   - `role`: Should contain "admin"

**Expected Result:** ✅ User is logged in and all localStorage values are set correctly

---

### Test 2: AI Chat - Basic Functionality

**Objective:** Verify the AI chat interface loads and can send messages.

**Steps:**
1. After login, you should be on the dashboard
2. Look at the left sidebar
3. Click on "AI Assistant" (with robot icon)
4. You should see:
   - Header: "Institute AI Assistant"
   - Welcome message from AI
   - Text input field
   - Send button
5. Type: "Hello"
6. Click "Send" or press Enter

**Expected Result:** ✅ AI responds with a greeting message

---

### Test 3: AI Chat - Fee Query

**Objective:** Verify AI can retrieve fee information using tools.

**Prerequisites:** 
- User must have some fee records in the database
- Or the tool should return appropriate message if no records exist

**Steps:**
1. Navigate to AI Assistant
2. Type: "Meri fees pending hai?" (Are my fees pending?)
3. Click Send

**Expected Result:** ✅ AI should respond with fee information or appropriate message

**Check Backend Logs:**
```
AI Chat request from user: <user_id>, role: <role>
Message: Meri fees pending hai?
Detected intent: fee-related
Response generated using gemini/grok
```

---

### Test 4: AI Chat - Student Query

**Objective:** Verify AI can retrieve student information.

**Prerequisites:**
- User must have students added to their account

**Steps:**
1. Navigate to AI Assistant
2. Type: "Mere students kitne hain?" (How many students do I have?)
3. Click Send

**Expected Result:** ✅ AI should respond with student count and list

**Check Backend Logs:**
```
Detected intent: student-related
```

---

### Test 5: AI Chat - Course Query

**Objective:** Verify AI can retrieve course information.

**Prerequisites:**
- User must have courses added to their account

**Steps:**
1. Navigate to AI Assistant
2. Type: "Mere courses batao" (Tell me my courses)
3. Click Send

**Expected Result:** ✅ AI should respond with course information

**Check Backend Logs:**
```
Detected intent: course-related
```

---

### Test 6: LLM Provider Detection

**Objective:** Verify the AI shows which LLM provider responded.

**Steps:**
1. Send any message in AI chat
2. Look at the AI's response
3. Check the provider label below the response

**Expected Result:** ✅ You should see either:
- "✨ Gemini" (if Gemini responded)
- "🔄 Grok" (if Grok was used as fallback)

---

### Test 7: Typing Indicator

**Objective:** Verify the typing indicator shows while waiting for AI response.

**Steps:**
1. Send a message in AI chat
2. Observe the UI while waiting for response

**Expected Result:** ✅ You should see three animated dots (typing indicator)

---

### Test 8: Clear Chat

**Objective:** Verify the clear chat functionality.

**Steps:**
1. Send a few messages
2. Click the "Clear Chat" button in the top right
3. Observe the chat

**Expected Result:** ✅ Chat is cleared and only the welcome message remains

---

### Test 9: Error Handling - Empty Message

**Objective:** Verify the system handles empty messages.

**Steps:**
1. Leave the input field empty
2. Try to click Send

**Expected Result:** ✅ Send button should be disabled, or message should not be sent

---

### Test 10: Error Handling - AI Service Down

**Objective:** Verify error message when AI service is unavailable.

**Steps:**
1. Stop the AI service (Ctrl+C in the AI service terminal)
2. Go to AI chat in the frontend
3. Try to send a message
4. Observe the error message

**Expected Result:** ✅ You should see: "AI service is currently unavailable. Please try again later."

5. Restart the AI service
6. Try sending a message again

**Expected Result:** ✅ AI should respond normally

---

### Test 11: Authorization - Invalid Token

**Objective:** Verify that invalid tokens are rejected.

**Steps:**
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Modify the `token` value to something invalid
4. Try to send a message in AI chat

**Expected Result:** ✅ You should see: "invalid token" error

---

### Test 12: Authorization - No Token

**Objective:** Verify that requests without token are rejected.

**Steps:**
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Delete the `token` key
4. Try to send a message in AI chat

**Expected Result:** ✅ You should see: "invalid token" error

---

### Test 13: Role-Based Access

**Objective:** Verify that different roles see appropriate information.

**Steps:**

**As Student:**
1. Create a student account
2. Login
3. Ask: "Meri fees pending hai?"
4. Expected: Should show only that student's fees

**As Teacher:**
1. Create a teacher account
2. Add some students
3. Ask: "Mere students kitne hain?"
4. Expected: Should show only teacher's students

**As Admin:**
1. Create an admin account
2. Add multiple students and courses
3. Ask: "Mere courses batao?"
4. Expected: Should show all admin's courses

---

### Test 14: Multi-language Support

**Objective:** Verify AI can understand Hindi/English mix.

**Steps:**
1. Type: "Meri fees kitni hai?"
2. Type: "Mere students batao please"
3. Type: "Courses list do"

**Expected Result:** ✅ AI should understand and respond appropriately

---

### Test 15: Chat History

**Objective:** Verify chat history is maintained during session.

**Steps:**
1. Send message 1: "Hello"
2. Send message 2: "How are you?"
3. Send message 3: "What are my courses?"
4. Scroll up in the chat

**Expected Result:** ✅ All three messages should be visible in the chat

---

### Test 16: Responsive Design

**Objective:** Verify the AI chat works on different screen sizes.

**Steps:**
1. Open the app in desktop browser
2. Resize the browser window to different widths
3. Test on mobile viewport (DevTools → Device Toolbar)

**Expected Result:** ✅ Chat interface should be responsive and usable on all screen sizes

---

### Test 17: Keyboard Shortcuts

**Objective:** Verify keyboard shortcuts work.

**Steps:**
1. Type a message
2. Press Enter (without Shift)
3. Expected: Message should be sent
4. Type a message
5. Press Shift + Enter
6. Expected: New line should be added, message should not be sent

---

### Test 18: Loading State

**Objective:** Verify loading state is shown while waiting for response.

**Steps:**
1. Send a message
2. Observe the UI immediately after sending

**Expected Result:** ✅ Send button should show "Sending..." and be disabled

---

### Test 19: Multiple Rapid Messages

**Objective:** Verify the system handles multiple messages correctly.

**Steps:**
1. Send message 1: "Hello"
2. Wait for response
3. Send message 2: "What are my courses?"
4. Wait for response
5. Send message 3: "Tell me about fees"

**Expected Result:** ✅ All messages should be sent and responded to in order

---

### Test 20: Backend Health Check

**Objective:** Verify the AI service health endpoint works.

**Steps:**
1. Open browser or use curl
2. Go to: `http://localhost:8000/health`
3. Or use backend endpoint: `http://localhost:4200/api/ai/health`

**Expected Result:** ✅ Should return JSON with status and LLM availability

```json
{
  "status": "healthy",
  "gemini_available": true,
  "grok_available": true
}
```

---

## 🔍 Backend Logs Verification

### Check Express Backend Logs

When you send an AI chat message, you should see:

```
AI Chat request from user: <user_id>, role: <role>
Message: <user_message>
AI Response from gemini/grok: <first_100_chars_of_response>...
```

### Check AI Service Logs

When you send an AI chat message, you should see:

```
INFO: Received chat request from user: <user_id>, role: <role>
INFO: Message: <user_message>
INFO: Detected intent: fee-related/student-related/course-related
INFO: Attempting to use Gemini...
INFO: Gemini response successful
INFO: Response generated using gemini
```

Or if Gemini fails:

```
WARNING: Gemini failed: <error_message>
INFO: Falling back to Grok...
INFO: Grok response successful
INFO: Response generated using grok
```

---

## 🐛 Common Issues During Testing

### Issue 1: "AI service is currently unavailable"

**Diagnosis:**
- Check if AI service is running: `http://localhost:8000`
- Check backend logs for connection errors
- Verify `AI_SERVICE_URL` in `backend/.env`

**Solution:**
```bash
cd ai-service
uvicorn app.main:app --reload --port 8000
```

### Issue 2: "Invalid token"

**Diagnosis:**
- Check if you're logged in
- Verify token exists in localStorage
- Check if JWT_SECRET matches in both backend and ai-service

**Solution:**
- Logout and login again
- Verify `JWT_SECRET=123` in both `backend/.env` and `ai-service/.env`

### Issue 3: AI responds with generic message

**Diagnosis:**
- Check if tools are being called
- Verify backend APIs are working
- Check if user has data in database

**Solution:**
- Add some students/courses/fees first
- Check backend API responses directly

### Issue 4: CORS errors in browser console

**Diagnosis:**
- Frontend origin not in allowed origins
- CORS not configured correctly

**Solution:**
- Verify CORS in `backend/app.js`
- Verify CORS in `ai-service/app/main.py`
- Ensure `http://localhost:3000` is in allowed origins

### Issue 5: "Module not found" in AI service

**Diagnosis:**
- Dependencies not installed
- Virtual environment not activated

**Solution:**
```bash
cd ai-service
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

---

## ✅ Success Criteria

The integration is working correctly if:

- [ ] All three services start without errors
- [ ] User can signup/login with role
- [ ] AI chat interface loads
- [ ] AI responds to messages
- [ ] Fee queries work
- [ ] Student queries work
- [ ] Course queries work
- [ ] LLM provider is shown in response
- [ ] Error messages are user-friendly
- [ ] Typing indicator shows while loading
- [ ] Chat history is maintained
- [ ] Clear chat works
- [ ] Keyboard shortcuts work
- [ ] Responsive design works
- [ ] Authorization works (invalid tokens rejected)
- [ ] Backend logs show proper flow
- [ ] AI service logs show proper flow

---

## 📊 Performance Testing

### Test Response Times

1. **Gemini Response Time:** Should be 2-5 seconds
2. **Grok Response Time:** Should be 3-7 seconds
3. **Tool Execution Time:** Should be <1 second
4. **Frontend Rendering:** Should be instant

### Test Concurrent Users

1. Open multiple browser tabs
2. Login with different users
3. Send messages simultaneously
4. Verify all requests are handled correctly

---

## 🎯 Test Data Setup

Before testing AI features, add some test data:

### Add Test Courses:
1. Go to "Add Course"
2. Add 2-3 courses with:
   - Course Name: "Python Programming"
   - Price: 5000
   - Description: "Learn Python from basics to advanced"
   - Starting Date: 2024-01-01
   - End Date: 2024-06-01
   - Upload an image

### Add Test Students:
1. Go to "Add Student"
2. Add 3-5 students with:
   - Full Name, Phone, Email, Address
   - Select a course
   - Upload an image

### Add Test Fees:
1. Go to "Collect Fee"
2. Add fee records for students

---

## 📝 Test Report Template

Use this template to record your test results:

```
Test Date: _______________
Tester Name: _____________

Test 1: User Authentication
Status: [ ] Pass [ ] Fail
Notes: _________________

Test 2: AI Chat - Basic
Status: [ ] Pass [ ] Fail
Notes: _________________

Test 3: AI Chat - Fee Query
Status: [ ] Pass [ ] Fail
Notes: _________________

Test 4: AI Chat - Student Query
Status: [ ] Pass [ ] Fail
Notes: _________________

Test 5: AI Chat - Course Query
Status: [ ] Pass [ ] Fail
Notes: _________________

Test 6: LLM Provider Detection
Status: [ ] Pass [ ] Fail
Notes: _________________

Test 7: Error Handling
Status: [ ] Pass [ ] Fail
Notes: _________________

Test 8: Authorization
Status: [ ] Pass [ ] Fail
Notes: _________________

Overall Status: [ ] PASS [ ] FAIL

Issues Found:
1. _________________
2. _________________
3. _________________

Recommendations:
1. _________________
2. _________________
```

---

## 🚀 Automated Testing (Future)

For production, consider adding:

1. **Unit Tests:** Test individual tools and LLM router
2. **Integration Tests:** Test API endpoints
3. **E2E Tests:** Test complete user flows
4. **Load Tests:** Test concurrent users
5. **Security Tests:** Test authentication and authorization

---

## ✨ Testing Complete!

If all tests pass, your AI-powered Institute Management System is ready for use! 🎉

For any issues, refer to the troubleshooting section in SETUP_GUIDE.md