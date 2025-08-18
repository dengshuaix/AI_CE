# -*- coding: utf-8 -*-
"""
    # 用户管理模块
"""
from flask_restful import Api

from resources.user_manage.login import UserLoginResource


def load(app):
    api = Api(prefix=app.config["URL_PREFIX"] + '/user')
    api.add_resource(UserLoginResource, '/login')  # 登陆：获取登陆信息
    api.add_resource(UserLoginResource, '/auth')  # auth 认证统一token

    api.init_app(app)
