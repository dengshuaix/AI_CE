# -*-coding:utf-8-*-
import json

# 登陆
# -*- coding: utf-8 -*-
from flask import jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token
from flask_restful import Resource, reqparse, abort
from models.rbac.user import User

parse_base = reqparse.RequestParser()
parse_base.add_argument("username", type=str, required=True, help="请输入用户名")
parse_base.add_argument("password", type=str, required=True, help="请输入密码")


class UserLoginResource(Resource):

    def post(self):
        args = parse_base.parse_args()

        username = args.get("username")
        password = args.get("password")

        # checkout user exist
        user_obj = User.is_user_exist(username=username)
        if not user_obj or not User.check_password(username, password):
            return jsonify(code=400, message="用户不存在/密码错误")

        user_identity = {
            "id": user_obj.id,
            "username": user_obj.username,
            "user_mobile": user_obj.user_mobile,
            "user_email": user_obj.user_email,
        }
        user_identity = json.dumps(user_identity, ensure_ascii=False)
        token = create_access_token(user_identity, fresh=True)  # 刷新新鲜度
        refresh_token = create_refresh_token(identity=user_identity)

        # 组装 token 内容
        login_info = {
            "id": user_obj.id,
            'token': token,
            'refresh_token': refresh_token,
            "username": user_obj.username,
            "user_mobile": user_obj.user_mobile,
            "user_email": user_obj.user_email,
        }

        return jsonify({
            "code": 201,
            "data": login_info,
            "message": "登录成功!"
        })
