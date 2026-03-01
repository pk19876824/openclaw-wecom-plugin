#!/bin/bash

# WeCom Plugin Quick Start Script
# 帮助你快速创建和发布 WeCom 插件

set -e

echo "🦐 OpenClaw WeCom Plugin - 快速开始向导"
echo "========================================"
echo ""

# 检查是否已安装必要工具
check_requirements() {
    echo "📋 检查必要工具..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js 未安装，请先安装 Node.js 20+"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm 未安装"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        echo "❌ Git 未安装"
        exit 1
    fi
    
    echo "✅ 所有必要工具已安装"
    echo ""
}

# 创建插件目录结构
create_structure() {
    echo "📁 创建插件目录结构..."
    
    mkdir -p src
    mkdir -p .github/workflows
    
    echo "✅ 目录结构创建完成"
    echo ""
}

# 复制现有代码
copy_code() {
    echo "📋 复制 WeCom 通道代码..."
    
    WECOM_SRC="/home/openclaw/code/openclaw/extensions/wecom/src"
    
    if [ -d "$WECOM_SRC" ]; then
        cp -r "$WECOM_SRC"/* ./src/
        echo "✅ 代码复制完成"
    else
        echo "⚠️  未找到 WeCom 源代码，请手动复制"
    fi
    
    echo ""
}

# 安装依赖
install_deps() {
    echo "📦 安装依赖..."
    npm install
    echo "✅ 依赖安装完成"
    echo ""
}

# 编译代码
build_code() {
    echo "🔨 编译 TypeScript 代码..."
    npm run build
    echo "✅ 代码编译完成"
    echo ""
}

# 初始化 Git
init_git() {
    echo "🌿 初始化 Git 仓库..."
    
    if [ ! -d ".git" ]; then
        git init
        git add .
        git commit -m "Initial release: WeCom plugin for OpenClaw"
        echo "✅ Git 仓库初始化完成"
    else
        echo "ℹ️  Git 仓库已存在"
    fi
    
    echo ""
}

# 显示下一步操作
show_next_steps() {
    echo "🎉 插件创建完成！"
    echo ""
    echo "下一步操作："
    echo ""
    echo "1️⃣  在 GitHub 创建新仓库"
    echo "   访问：https://github.com/new"
    echo "   仓库名：openclaw-wecom-plugin"
    echo ""
    echo "2️⃣  关联远程仓库并推送"
    echo "   git remote add origin https://github.com/<your-username>/openclaw-wecom-plugin.git"
    echo "   git push -u origin main"
    echo ""
    echo "3️⃣  发布到 npm"
    echo "   npm login"
    echo "   npm version 1.0.0"
    echo "   npm publish --access public"
    echo ""
    echo "4️⃣  回复社区邮件"
    echo "   参考 MIGRATION.md 中的邮件模板"
    echo ""
    echo "5️⃣  提交到 OpenClaw 社区插件列表"
    echo "   PR 到：https://github.com/openclaw/openclaw"
    echo "   添加你的插件到社区插件页面"
    echo ""
    echo "📚 详细指南请查看：MIGRATION.md"
    echo ""
}

# 主流程
main() {
    check_requirements
    create_structure
    copy_code
    install_deps
    build_code
    init_git
    show_next_steps
}

# 运行主流程
main
