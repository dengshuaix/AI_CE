# -*- coding: utf-8 -*-
from flask import request
from flask_restful import abort


def load(app=None):
    if app is None:
        return

    # 权限校验
    @app.before_request
    def middleware_verify_identity():
        req_url = request.url_rule.rule if request.url_rule else "" or request.path
        if not req_url:
            abort(400, message='访问路由不存在')
