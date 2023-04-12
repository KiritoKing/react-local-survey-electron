# React-Electron Local Survey System

React-Electron Local Survey System 是一个开源的本地问卷管理系统，使用React+Electron的方案构建客户端，文件系统使用JSON作为基础传递和存储问卷和结果。

**Author: ChlorineC, HUST, Wuhan, 2023**

**Mail: kiritoclzh@gmail.com**

## 项目依赖

这个应用主要依赖 [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) 和 [surveyjs](https://github.com/surveyjs/survey-library) 两个开源库，前者作为项目脚手架（本仓库前面的Commit记录就是直接Fork的*boilerplate*仓库），后者用于渲染和管理问卷组件。

其他依赖请参考 `package.json`。