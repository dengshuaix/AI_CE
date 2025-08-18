# -*- coding: utf-8 -*-
from werkzeug.security import check_password_hash, generate_password_hash
from models.base_model import BaseIdModel, BaseTimeModel
from manage import db


# 用户模型
class User(BaseIdModel, BaseTimeModel):
    username = db.Column(db.String(255), nullable=False, comment='用户帐号')
    password = db.Column(db.String(255), nullable=False, comment='用户密码')
    nick_name = db.Column(db.String(255), nullable=True, comment='用户昵称')
    user_mobile = db.Column(db.String(128), nullable=False, comment='用户电话号码')
    user_email = db.Column(db.String(128), nullable=True, comment='用户电子邮箱')

    @staticmethod
    def is_user_exist(username=None):
        """
            # 检测用户是否注册/存在
        :return:
        """

        user = User.query.filter(
            User.username == username,
        ).first()
        if user:
            return user  # 用户已注册
        return False  # 用户未注册

    @staticmethod
    def check_password(username, password):
        """
            检查密码正确性
        :param username:
        :param password:
        :return:
        """
        # 查找用户
        user = User.query.filter(
            User.username == username,
        ).first()
        if user is None:
            return False  # 用户不存在

        # 使用 check_password_hash 来验证密码是否匹配
        if check_password_hash(user.password, password):
            return True  # 密码正确
        else:
            return False  # 密码错误
