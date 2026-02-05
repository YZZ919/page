# self_page (Hugo)

这个仓库是一个 Hugo 静态站点，已配置通过 GitHub Actions 自动部署到 GitHub Pages。

## 本地运行

```bash
hugo server
```

## 部署到 GitHub Pages

1. 把代码推送到 `main` 分支（`push` 会触发部署）。
2. 到 GitHub 仓库页面：`Settings` → `Pages` → `Build and deployment`，选择 `Source: GitHub Actions`。
3. 等待 `Actions` 里 `Deploy Hugo site to GitHub Pages` 工作流跑完后，即可访问你的 Pages 地址：
   - 通常是：`https://<GitHub用户名>.github.io/<仓库名>/`

