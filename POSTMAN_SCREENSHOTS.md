# Postman Screenshot Checklist

| Request Name | Method | Endpoint | Authorization Required | Expected Status Code | Expected JSON Response | Suggested Screenshot Filename |
|---|---|---|---|---|---|---|
| Health Check | GET | /api/health | No | 200 | {"success":true,"message":"API is running"} | health-check.png |
| Register | POST | /api/auth/register | No | 201 | {"success":true,"message":"User registered successfully"} | register.png |
| Login | POST | /api/auth/login | No | 200 | {"success":true,"message":"Login successful"} | login.png |
| Profile | GET | /api/auth/profile | Yes | 200 | {"success":true,"message":"Profile fetched"} | profile.png |
| Convert Currency | POST | /api/convert | Yes | 201 | {"success":true,"message":"Conversion completed"} | convert.png |
| Get History | GET | /api/history | Yes | 200 | {"success":true,"message":"History fetched"} | history-list.png |
| Get History by ID | GET | /api/history/:id | Yes | 200 | {"success":true,"message":"Conversion fetched"} | history-by-id.png |
| Create History | POST | /api/history | Yes | 201 | {"success":true,"message":"History entry created"} | create-history.png |
| Update History | PUT | /api/history/:id | Yes | 200 | {"success":true,"message":"History entry updated"} | update-history.png |
| Delete History | DELETE | /api/history/:id | Yes | 200 | {"success":true,"message":"History entry deleted"} | delete-history.png |
| Unauthorized Request | GET | /api/history | No | 401 | {"success":false,"message":"Token missing"} | unauthorized.png |
| Google OAuth | GET | /auth/google | No | 302 | Redirect to Google login page | google-oauth.png |
