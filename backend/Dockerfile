FROM tiangolo/uvicorn-gunicorn:python3.8-slim

COPY . /app
WORKDIR /app

ENV PYTHONPATH "${PYTHONPATH}:/app"

RUN pip install -r requirements.txt
