# -*- coding: utf-8 -*-
"""
    # 用户管理模块
"""
from flask_restful import Api

from resources.rbac_manage.user_manage.login import UserLoginResource


def load(app):
    api = Api(prefix=app.config["URL_PREFIX"] + '/')
    api.add_resource(UserLoginResource, '/user/login')  # 登陆：获取登陆信息

    api.init_app(app)
