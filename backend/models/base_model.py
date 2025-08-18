# -*- coding: utf-8 -*-
import datetime
import enum

from flask_sqlalchemy.query import Query

from manage import db


def get_now_datetime():
    """
        # 获取当前时间,格式:年-月-日 时:分:秒
    :return:
    """
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


class BaseModel(db.Model):
    __abstract__ = True

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(e)
            return False

    # 更新
    @classmethod
    def update(cls, id, data):
        try:
            instance = cls.query.filter_by(id=id).first()
            if not instance:
                return None
            for key, value in data.items():
                setattr(instance, key, value)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(e)
            return False

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(e)
            return False

    @staticmethod
    def save_list(x_list):
        try:
            db.session.add_all(x_list)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(e)
            return False

    # 原始sql调用
    @staticmethod
    def original_sql(sql):
        rows = []
        try:
            rows = db.session.execute(sql)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(e)
        return rows

    # 多sql 事务处理
    @staticmethod
    def transaction_original_sql(sql_list=None):
        if sql_list is None:
            sql_list = []
        try:
            with db.session.begin_nested():
                for sql in sql_list:
                    db.session.add(sql)
                db.session.commit()
                db.session.close()
        except Exception as e:
            print(e)
            db.session.rollback()
            return False
        return True

    @property
    def to_dict(self):
        """将orm single query to dict数据转换为字典"""
        data_dic = {}
        for c in self.__table__.columns:
            value = getattr(self, c.name)
            if isinstance(value, datetime.datetime):
                value = value.strftime("%Y-%m-%d %H:%M:%S")
            elif isinstance(value, datetime.date):
                value = value.strftime("%Y-%m-%d")
            elif isinstance(value, type(None)):
                value = ""
            elif isinstance(value, enum.Enum):
                value = {"name": value.name, "value": value.value}
            else:
                value = str(value)
            data_dic[c.name] = value
        return data_dic


class BaseIdModel(BaseModel):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, comment='主键ID')

    @classmethod
    def update(cls, id, data):
        """

        :param id:
        :param data:
        :return:
        """
        try:
            instance = cls.get_by_id(id)
            if not instance:
                return None
            for key, value in data.items():
                setattr(instance, key, value)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(e)
            return False

    @classmethod
    def get_by_id(cls, id):
        """
            根据id获取数据
        :param cls:
        :param id:
        :return:
        """
        return cls.query.filter_by(id=id).first()

    @classmethod
    def get_by_ids(cls, ids):
        """
            根据ids获取数据
        :param id:
        :return:
        """
        return cls.query.filter(cls.id.in_(ids)).all()


class BaseTimeModel(BaseModel):
    __abstract__ = True

    create_record_time = db.Column(db.DateTime, default=get_now_datetime, comment='记录创建时间')  # 创建时间
    update_record_time = db.Column(db.DateTime, default=get_now_datetime, onupdate=get_now_datetime,
                                   comment='记录更新时间')  # 更新时间
    delete_record_time = db.Column(db.DateTime, default=get_now_datetime, comment='记录删除时间')  # 删除时间
