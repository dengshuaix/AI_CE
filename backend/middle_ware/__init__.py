# -*- coding: utf-8 -*-
from flask import request
from flask_restful import abort
from flask_jwt_extended import jwt_required, get_jwt_identity


def load(app=None):
    if app is None:
        return

    # JWT 校验
    @jwt_required()
    def jwt_check():
        current_user_id = get_jwt_identity().get("user_id")
        if not current_user_id:
            abort(401, message="Token Error!,Please Login")
