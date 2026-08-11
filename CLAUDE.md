# CLAUDE.md

> 每次对话开始时，先叫一声"涵哥"，确认已读此文件。

## Project Overview

Simon Han Yang (涵哥) 的学术个人主页，部署在 GitHub Pages (`simonhanyang.github.io`)。

- **技术栈**: 纯静态 HTML/CSS/JS，无框架、无构建步骤、无 package.json
- **部署方式**: push 到 `main` 分支即自动上线（GitHub Pages 直接 serve `main` 根目录）
- **内容结构**:
  - `index.html` — 单页主页（导航、简介、论文、经历、博文、联系方式）
  - `publication/` — 论文详情页及配图
  - `posts/` — 博客文章
  - `css/` + `js/` — 样式和交互脚本
  - `image/` — 站点通用图片
  - `CV/` — 学术简历 PDF
  - `her/` — 个人内容

## Git Workflow: GitHub Flow

本项目采用 **GitHub Flow**，规则如下：

1. **`main` 分支永远是可部署的** — 任何时候 `main` 上的代码都应该是站点的正确状态
2. **所有改动从 branch 开始** — 需要修改时，从 `main` 创建一个描述性命名的分支（如 `add-icra27-paper`、`fix-mobile-nav`）
3. **在 branch 上提交改动** — 可以多次 commit，保持增量
4. **完成后合并回 `main`** — 确认无误后合并到 `main`，删除 feature branch
5. **合并后即上线** — GitHub Pages 会自动部署最新的 `main`

### 分支命名规范

- 加论文: `add-<venue><year>-<topic>` (如 `add-icra27-cell-manipulation`)
- 修 bug: `fix-<what>` (如 `fix-nav-links`)
- 改样式: `style-<what>` (如 `style-publication-cards`)
- 重构: `refactor-<what>` (如 `refactor-css-variables`)
- 内容更新: `update-<what>` (如 `update-cv-2026`)

### Commit Message 规范

- 英文书写，简洁明了
- 格式: `<动词> <描述>` (如 `Add IROS26 publication`, `Fix mobile nav links`, `Update CV for 2026`)
- 一个 commit 做一件事，不要混杂无关改动

### Tag 习惯

- 加完重要论文或做完大改后，打轻量 tag 标记里程碑
- 格式: `YYYY-MM-<简述>` (如 `2026-06-iros26`, `2026-08-style-refresh`)

## Working with This Project

- 不要用 `git add -A`，按文件名精确 add
- 图片放在对应目录的 `image/` 子目录下
- 新论文: 先在 `publication/<name>/` 下放配图，再在 `index.html` 的 publications section 加卡片
- 修改前先 `git status` 和 `git diff` 确认当前状态
