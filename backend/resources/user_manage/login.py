# -*-coding:utf-8-*-
from flask import jsonify, request
from flask_restful import Resource

from models.user import User


class UserLoginResource(Resource):

    def post(self):
        args = request.get_json()
        username = args.get("username")
        password = args.get("password")
        print(username, password)

        #
        # # checkout user exist
        # user_obj = User.is_user_exist(username=username)
        # if not user_obj or not User.check_password(username, password):
        #     return jsonify(code=400, message="用户不存在/密码错误")

        return jsonify({
            "code": 200,
            "data": [],
            "message": "登录成功!"
        })
