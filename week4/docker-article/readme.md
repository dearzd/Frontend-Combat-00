# Docker run Single Spa Article

docker 容器导出会很大，所以这个作业就以描述**如何实现**的方式来提交。

## 准备 docker 和网站环境

1. 下载 docker 安装 `https://www.docker.com/products/docker-desktop`。
2. `docker pull nginx` 安装 `nginx` 镜像。
3. 修改周三作业 `week4/single-spa-article/root-config/src/index.ejs` 里所有子应用的 import 地址为 `8080`。
4. 分别对 `week4/single-spa-article/root-config`, `week4/single-spa-article/sidebar`, `week4/single-spa-article/sidebar`执行 `yarn build`。
5. 拷贝 build 好的所有文件到一个目录。这里已经拷贝好了，在 `week4/docker-article/article` 下。

## 用 docker 运行周四作业

- `./article` 文件夹是周四作业打包好的所有 bundle 文件。
- 拷贝`./article` 整个文件夹到电脑用户根目录，我这里 mac 电脑是 `~`。
- `docker run -d -p 8080:80 --name webserver -v ~/article:/usr/share/nginx/html nginx`。
- go to `http://localhost:8080`，即可看到跟上一个周四作业 Gif 演示同样到网站。
