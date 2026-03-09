FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /django
ENV PYTHONPATH=/django
# Install build tools + Redis + dos2unix
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    gfortran \
    dos2unix \
    redis-server \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN pip install honcho

# Copy project files
COPY . .

# Normalize line endings & make scripts executable
RUN dos2unix ./executables/start_web.sh && chmod +x ./executables/start_web.sh
RUN dos2unix ./executables/start_beat.sh && chmod +x ./executables/start_beat.sh

# Expose ports
EXPOSE 8000 6379

# Use Honcho to run all processes
CMD ["honcho", "start", "-f", "Procfile"]