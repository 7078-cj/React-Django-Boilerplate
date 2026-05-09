Here’s a clean **step-by-step Markdown guide** you can copy into your project (`postgres-setup.md`) 👇

---

````md
# 🐘 PostgreSQL Setup for Django (Windows + psql + psycopg)

This guide walks through installing, configuring, and connecting PostgreSQL to a Django project with a safe setup (Postgres → Django → fallback-ready).


---

# 1. Create Database + User


```bash
python setup-db.py
```
---

# 2. Configure `.env`

```env
SECRET_KEY=your_secret_key

PG_NAME=myproject
PG_USER=myuser
PG_PASSWORD=mypassword
PG_HOST=localhost
PG_PORT=5432
```

---
# 3. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

# 9. Test Connection

Run server:

```bash
python manage.py runserver
```

---

# 10. Manual DB Test (Optional but recommended)

```bash
psql -U myuser -d myproject -h localhost
```
---