#!/usr/bin/fra.env python
# -*- coding: utf-8 -*-
import pytz

DEBUG = 0
TESTING = 0
URL_PREFIX = ""
ENV = "production"
SECRET_KEY = ""
# ORM
SQLALCHEMY_DATABASE_URI = "mysql+pymysql://xxxx:xxxx@localhost:3306/ai_education?charset=utf8mb4"
SQLALCHEMY_ECHO = False
SQLALCHEMY_NATIVE_UNICODE = True
SQLALCHEMY_TRACK_MODIFICATIONS = 0

# 时区设置
TZ = pytz.timezone("Asia/shanghai")
