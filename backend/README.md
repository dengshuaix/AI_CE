# 项目介绍

# 代码结构

# 运行项目
```python
- python3虚拟环境
    python3 -m venv venv3
    source venv3/bin/activate
- 安装依赖
    pip install -r requirements.txt
- 部署
    uwsgi --ini uwsgi.ini
- 重启 
    uwsgi --reload uwsgi.pid
- 停止
    uwsgi --stop uwsgi.pid
```
