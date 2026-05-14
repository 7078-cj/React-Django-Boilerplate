import subprocess
import os

DB_NAME = input("Database name: ")
DB_USER = input("Username: ")
DB_PASS = input("Password: ")
HOST = input("Host (default: localhost): ") or "localhost"
PORT = input("Port (default: 5432): ") or "5432"
SUPERUSER = input("Postgres superuser (default: postgres): ") or "postgres"
SUPERUSER_PASS = input("Postgres superuser password: ")

env = {**os.environ, "PGPASSWORD": SUPERUSER_PASS}

def run(sql, dbname="postgres"):
    result = subprocess.run(
        ["psql", "-U", SUPERUSER, "-h", HOST, "-p", PORT, "-d", dbname, "-c", sql],
        env=env,
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        print(f"  ❌ {result.stderr.strip()}")
    else:
        print(f"  ✅ {sql[:80].strip()}")

print("\n🐘 Setting up PostgreSQL for Django + GeoDjango...\n")

# ─────────────────────────────
# 1. Create DB + User
# ─────────────────────────────
run(f"CREATE DATABASE {DB_NAME};")
run(f"CREATE USER {DB_USER} WITH PASSWORD '{DB_PASS}';")

# ─────────────────────────────
# 2. Role configuration
# ─────────────────────────────
run(f"ALTER ROLE {DB_USER} SET client_encoding TO 'utf8';")
run(f"ALTER ROLE {DB_USER} SET default_transaction_isolation TO 'read committed';")
run(f"ALTER ROLE {DB_USER} SET timezone TO 'UTC';")

# ─────────────────────────────
# 3. Permissions
# ─────────────────────────────
run(f"GRANT ALL PRIVILEGES ON DATABASE {DB_NAME} TO {DB_USER};")
run(f"ALTER DATABASE {DB_NAME} OWNER TO {DB_USER};", dbname=DB_NAME)

# ─────────────────────────────
# 4. Enable PostGIS (GeoDjango)
# ─────────────────────────────
run("CREATE EXTENSION IF NOT EXISTS postgis;", dbname=DB_NAME)
run("CREATE EXTENSION IF NOT EXISTS postgis_topology;", dbname=DB_NAME)

# ─────────────────────────────
# 5. Schema permissions
# ─────────────────────────────
run(f"GRANT ALL ON SCHEMA public TO {DB_USER};", dbname=DB_NAME)
run(f"ALTER SCHEMA public OWNER TO {DB_USER};", dbname=DB_NAME)
run(f"GRANT CREATE ON SCHEMA public TO {DB_USER};", dbname=DB_NAME)
run(f"GRANT USAGE ON SCHEMA public TO {DB_USER};", dbname=DB_NAME)

print(f"""
🎉 DONE!

Add this to your .env:

PG_NAME={DB_NAME}
PG_USER={DB_USER}
PG_PASSWORD={DB_PASS}
PG_HOST={HOST}
PG_PORT={PORT}

🚀 GeoDjango is now ready (PostGIS enabled)
""")