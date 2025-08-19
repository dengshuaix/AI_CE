# -*- coding: utf-8 -*-
import json

from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource


class VerifyTokenResource(Resource):

    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        user_info = json.loads(current_user)

        return jsonify({
            "code": 200,
            "data": user_info,
            "message": "认证成功!"
        })
