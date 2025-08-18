# -*- coding: utf-8 -*-
from flask.cli import with_appcontext
from werkzeug.security import generate_password_hash

from manage import create_app, db

app = create_app()


@app.cli.command("init_superuser")
@with_appcontext
def init_db():
    """初始化数据库"""
    from models.rbac.user import User
    from sqlalchemy import select

    user = db.session.execute(select(User).where(User.username == "super")).scalar()
    if user:
        print("超级管理员已存在.")
    else:
        user = User()
        user.username = "superadmin"
        user.password = generate_password_hash("qwer1234")
        user.user_mobile = "17600000000"
        user.user_email = "17600000000@qq.com"
        user.nick_name = "超级管理员"
        db.session.add(user)
        db.session.commit()
        print("添加超级管理员成功.")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8099)
