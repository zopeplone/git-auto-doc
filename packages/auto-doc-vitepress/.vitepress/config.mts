import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Git-Auto-Doc",
  description: "一个基于git提交日志自动生成开发文档的工具",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '快速开始', link: '/info/start' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '快速开始', link: '/info/start' },
          { text: '配置', link: '/info/config' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zopeplone' }
    ]
  }
})
