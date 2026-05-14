FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /django
ENV PYTHONPATH=/django

RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    gfortran \
    dos2unix \
    redis-server \
    # --- add these ---
    gdal-bin \
    libgdal-dev \
    libgeos-dev \
    libproj-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN pip install honcho

COPY . .

RUN dos2unix ./executables/start_web.sh && chmod +x ./executables/start_web.sh
RUN dos2unix ./executables/start_beat.sh && chmod +x ./executables/start_beat.sh

EXPOSE 8000 6379

CMD ["honcho", "start", "-f", "Procfile"]