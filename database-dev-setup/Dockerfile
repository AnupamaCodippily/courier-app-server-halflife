FROM postgres:latest

ENV POSTGRES_DB courierdb
ENV POSTGRES_PASSWORD devtestpassword

COPY init.sql /docker-entrypoint-initdb.d/
