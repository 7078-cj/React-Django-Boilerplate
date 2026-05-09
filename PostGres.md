Here’s a clean **step-by-step Markdown guide** you can copy into your project (`postgres-setup.md`) 👇

---

````md
# 🐘 PostgreSQL Setup for Django (Windows + psql + psycopg)

This guide walks through installing, configuring, and connecting PostgreSQL to a Django project with a safe setup (Postgres → Django → fallback-ready).

---

# 1. Install PostgreSQL

Download and install:
- https://www.postgresql.org/download/windows/

During installation:
- Remember the **postgres password**
- Default port: `5432`
- Install **pgAdmin + Command Line Tools**

---

# 2. Verify Installation

Open PowerShell:

```bash
psql -U postgres
````

If it opens `postgres=#`, you're good.

---

# 3. Create Database + User


```bash
python setup-db.py
```
---

# 5. Install Django PostgreSQL Driver

Inside virtual environment:

```bash
pip install psycopg
```

OR fallback:

```bash
pip install psycopg2-binary
```

---

# 6. Configure `.env`

```env
SECRET_KEY=your_secret_key

PG_NAME=myproject
PG_USER=myuser
PG_PASSWORD=mypassword
PG_HOST=localhost
PG_PORT=5432
```

---

# 7. Django `settings.py` Database Config

```python
PG_NAME = env.str("PG_NAME", default=None)
PG_USER = env.str("PG_USER", default=None)
PG_PASSWORD = env.str("PG_PASSWORD", default=None)
PG_HOST = env.str("PG_HOST", default=None)
PG_PORT = env.str("PG_PORT", default=None)

if all([PG_NAME, PG_USER, PG_PASSWORD, PG_HOST, PG_PORT]):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": PG_NAME,
            "USER": PG_USER,
            "PASSWORD": PG_PASSWORD,
            "HOST": PG_HOST,
            "PORT": PG_PORT,
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
```

---

# 8. Run Migrations

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

# ⚠️ Common Issues

### ❌ password authentication failed

* Wrong password OR user not updated

Fix:

```sql
ALTER USER myuser WITH PASSWORD 'mypassword';
```

---

### ❌ permission denied for schema public

Fix:

```sql
GRANT ALL ON SCHEMA public TO myuser;
ALTER SCHEMA public OWNER TO myuser;
```

---

### ❌ connection refused

* PostgreSQL service not running

---

# 🚀 Recommended Production Upgrade

For real apps:

* Use Docker PostgreSQL
* Separate dev/prod settings
* Use PostGIS for geolocation features
* Use environment-based DB switching

---

```



