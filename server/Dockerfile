# Pull base image
FROM python:3.10.2-slim-bullseye

# Set environment variables
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
COPY ./requirements.txt .
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2
# RUN apk update
# RUN apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install -r requirements.txt

# Copy project
COPY . .