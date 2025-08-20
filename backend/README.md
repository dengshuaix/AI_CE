# 项目介绍

# 代码结构

# 运行项目
```python
- python3虚拟环境
    python3 -m venv venv
    source venv/bin/activate
- 进入项目
    cd backend
- 安装依赖
    pip install -r requirements.txt
- 部署
    uwsgi --ini uwsgi.ini
    ./start.sh
- 重启 
    uwsgi --reload api.pid
    ./restart.sh
- 停止
    uwsgi --stop api.pid 
    ./stop.sh
- 日志
    tail -f log/api.log
- 查看进程
    ps -ef | grep uwsgi
```
# 数据库
```python
- 创建数据库
    create database db_name;
- 执行数据库迁移
    flask db init
    flask db migrate
    flask db upgrade
```