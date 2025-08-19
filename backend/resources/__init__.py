# -*- coding: utf-8 -*-
from resources.rbac_manage import auth_manage


def load(app):
    auth_manage.load(app)
