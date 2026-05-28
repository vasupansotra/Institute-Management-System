# TODO - Fix backend URL in frontend + resolve merge conflicts

- [ ] Inspect remaining frontend components for hardcoded `https://ims-backend-vsr9.onrender.com` and ensure they point to the correct backend URL for deployment.
- [ ] Fix `frontend/src/components/AddStudent.js` which contains git merge conflict markers (<<<<<<<, =======, >>>>>>>).
- [ ] Implement a single source of truth for API base URL (e.g., `REACT_APP_API_BASE_URL` via `.env`) and update all axios calls to use it.
- [ ] Ensure login/signup and other flows hit correct backend routes (`/user/login`, `/user/signup`, `/course/*`, `/student/*`, `/fee/*`).
- [ ] Re-check backend CORS configuration to allow the frontend origin.
- [ ] Run frontend build/tests and ensure the app compiles.
- [ ] Commit the changes to github (via user/branch workflow).

