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
- 重启 
    uwsgi --reload api.pid
- 停止
    uwsgi --stop api.pid
- 日志
    tail -f log/api.log
- 查看进程
    ps -ef | grep uwsgi
```
