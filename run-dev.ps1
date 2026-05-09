# =========================
# 1. PostgreSQL (psql)
# =========================
Start-Process powershell -ArgumentList "
psql -U postgres
"

# =========================
# 2. Backend (Django)
# =========================
Start-Process powershell -ArgumentList "
cd backend;
env\Scripts\activate;
py manage.py runserver
"

# =========================
# 3. Frontend (React/Vite)
# =========================
Start-Process powershell -ArgumentList "
cd frontend;
npm run dev
"