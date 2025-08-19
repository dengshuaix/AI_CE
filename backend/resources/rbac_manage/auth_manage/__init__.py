# -*- coding: utf-8 -*-

"""
    # 用户认证
"""
from flask_restful import Api

from resources.rbac_manage.auth_manage.login import UserLoginResource
from resources.rbac_manage.auth_manage.refresh_token import VerifyTokenRefreshResource
from resources.rbac_manage.auth_manage.user_info import UserInfoResource
from resources.rbac_manage.auth_manage.verify_token import VerifyTokenResource


def load(app):
    api = Api(prefix=app.config["URL_PREFIX"] + '/auth')
    api.add_resource(UserLoginResource, '/login')  # 用户登录
    api.add_resource(UserInfoResource, '/user/info')  # 用户信息
    api.add_resource(VerifyTokenResource, '/verify/token')  # 用户token认证
    api.add_resource(VerifyTokenRefreshResource, '/verify/token/refresh')  # 用户token刷新

    api.init_app(app)
