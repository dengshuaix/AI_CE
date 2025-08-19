# -*- coding: utf-8 -*-
from flask import Flask
from flask_caching import Cache
from flask_cors import CORS
from flask_migrate import Migrate
from flask_redis import FlaskRedis
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
migrate = Migrate()
redis_store = FlaskRedis()
cache_redis = Cache(config={"CACHE_TYPE": "redis"})

# JSON WEB TOKEN
jwt = JWTManager()


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
    CORS(app, supports_credentials=True)  # 允许跨域携带凭证

    # 初始化数据库
    db.init_app(app)
    migrate.init_app(app, db)

    redis_store.init_app(app)
    jwt.init_app(app)

    cache_redis.init_app(app, config={
        "CACHE_REDIS_HOST": app.config["CACHE_REDIS_HOST"],
        "CACHE_REDIS_PORT": app.config["CACHE_REDIS_PORT"],
        "CACHE_REDIS_DB": app.config["CACHE_REDIS_DB"],
        "CACHE_REDIS_PASSWORD": app.config["CACHE_REDIS_PASSWORD"],
        "CACHE_KEY_PREFIX": app.config["CACHE_KEY_PREFIX"]
    })

    #  中间件
    middle_ware.load(app)

    # api 资源
    resources.load(app)

    return app
