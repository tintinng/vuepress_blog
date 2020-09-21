记录项目中使用Nginx在本地windows和阿里云Linux环境下部署
## Nginx-简介
- 基本概念
- 高性能的 HTTP和反向代理的web服务器
- 反向代理
   - 正向代理：在客户端配置代理服务器。
   - 反向代理：反向代理服务器和目标服务器视为同一个，客户端只需知道反向代理服务器地址和端口。隐藏了目标服务器。
## Nginx-在windows环境下部署**
### 命令环境
```bash
start nginx	启动
nginx -s stop	停止（不保存信息）
nginx -s quit	停止（保存信息）
nginx -s reload	重启
nginx -v	查看版本
```

   - 查看是否成功：`localhost：80`
   - build完以后，将dist扔到html里面
   - 配置nginx
```json
server {
    listen 80;
    server_name localhost;
    location / {
    	root html/dist; // 默认主目录
    	index index.html index.htm; // 入口文件
    	proxy_pass http://139.196.234.125:8080/; // 反向代理
    }
	# 正向代理
	location /api {
        proxy_pass http://139.196.234.125:8080/; 
    }
}
```


## 在Linux环境下部署
### nginx安装

- 下载nginx及相关组件
   - 选择稳定版本
   - 有些源无法访问就换
- 安装C++编译环境
- 安装nginx及相关组件
   - openssl
   - pcre
   - zlib
   - nginx 有些版本编译出错就更换版本
### dist上传到远程服务器

- 在本地 windows 上将dist文件夹打包（启用bash命令行）：
   - ``tar -cvf xxxx.tar *`
   - 在 html/文件夹中创建一个项目文件夹（nginx配置时也对应加上该路径） ``mkdir XXXX` 
- 远程 linux 系统上安装lrzsz （lrzsz是一款在linux里可代替ftp上传和下载的程序）
   - ``yum -y install lrzsz` 
- 远程 linux 系统上对应的文件夹下使用 ``rz` 命令上传压缩文件
- 在 linux 上解压
   - ``tar -xvf xxxx.tar` 
### 修改配置

- vim使用
   - insert：进入修改状态
   - ESC：退出状态
   - :wq：写入、退出
- 配置 nginx.conf
```json
server {
  			// 在远程服务器需要配置安全端口
        listen       80;
        server_name  localhost;

				// 在nginx下的html文件夹中放 testMaster 静态文件
        location /testMaster{
            root   html;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html; // root可以用来配置静态文件的路径
        }
```
### Linux下nginx相关命令
```bash
whereis nginx // 查看nginx安装目录

// nginx/sbin 目录下进行nginx常用命令操作
./nginx -v 	//查看当前nginx版本号
./nginx -s stop 	//关闭
./nginx 	//开启
./nginx -s reload 	//重新加载配置文件（修改配置文件后进行）
```


