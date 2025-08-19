# -*- coding: utf-8 -*-
import json

from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource

from models import User


class UserInfoResource(Resource):
    # 获取指定用户
    @jwt_required()
    def get(self):
        user_info = get_jwt_identity()
        if not user_info:
            return jsonify(code=400, data={}, message="token信息错误！")
        # 从token中获取用户id
        user_id = json.loads(user_info).get("id")
        if not user_id:
            return jsonify(code=400, data={}, message="token信息错误！")

        user = User.get_by_id(user_id)
        if not user:
            return jsonify(code=400, data={}, message="用户不存在！获取详细信息失败！")

        user_detail_info = user.to_dict
        # 移除非展示字段
        user_detail_info.pop("password")
        user_detail_info.pop("create_time")
        user_detail_info.pop("update_time")
        user_detail_info.pop("delete_time")

        return jsonify(code=201, data=user_detail_info, message='获取用户详细信息成功')
