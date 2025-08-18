# -*-coding:utf-8-*-
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
migrate = Migrate()


def create_app():
    """
        # 创建 flask app 实例
    :return:
    """
    import os
    import middle_ware
    import resources

    app = Flask(__name__)

    app.config.from_pyfile(os.path.join(app.root_path, 'config', 'config.py'))

    # 初始化数据库
    db.init_app(app)
    migrate.init_app(app, db)

    #  中间件
    middle_ware.load(app)

    # api 资源
    resources.load(app)

    return app
