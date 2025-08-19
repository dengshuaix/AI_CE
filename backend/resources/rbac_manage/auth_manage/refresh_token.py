# -*- coding: utf-8 -*-
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from flask_restful import Resource


class VerifyTokenRefreshResource(Resource):

    @jwt_required(refresh=True)
    def post(self):
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity)
        result = {
            'token': access_token,
        }
        return jsonify({
            "code": 200,
            "data": result,
            "message": "刷新令牌成功!"
        })
