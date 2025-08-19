#!/usr/bin/fra.env python
# -*- coding: utf-8 -*-
import pytz
from datetime import timedelta

DEBUG = True
URL_PREFIX = "/api/v1"
SECRET_KEY = ""
# ORM
SQLALCHEMY_DATABASE_URI = "mysql+pymysql://xxxxx:xxxxx@127.0.0.1:3306/xxxxx?charset=utf8mb4"  # mysql数据库"
SQLALCHEMY_ECHO = False
SQLALCHEMY_NATIVE_UNICODE = True
SQLALCHEMY_TRACK_MODIFICATIONS = 0
# JWT
JWT_SECRET_KEY = "xxxxx"
JWT_VERIFY_CLAIMS = [
    "signature",
    "exp",
    "iat",
]
JWT_REQUIRED_CLAIMS = [
    "exp",
    "iat",
]
JWT_HEADER_NAME = "Authorization"
JWT_AUTH_ENDPOINT = "jwt"
JWT_ALGORITHM = "HS256"
JWT_DECODE_ALGORITHMS = "HS256"
JWT_AUTH_HEADER_PREFIX = "JWT"
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)

# Flask Caching
CACHE_REDIS_HOST = "127.0.0.1"
CACHE_REDIS_PORT = 6379
CACHE_REDIS_DB = 1
CACHE_REDIS_PASSWORD = ""
CACHE_KEY_PREFIX = ""
CACHE_DEFAULT_TIMEOUT = 3600

# Redis Utils
REDIS_HOST = "127.0.0.1"
REDIS_PORT = 6379
REDIS_DB = '13'
REDIS_PASSWORD = ''

# 时区设置
TZ = pytz.timezone("Asia/shanghai")
