## 小组分工
1. 雷皓宇

   控制台代码编写
   总体页面布局
   图形资源整合

2. 岳瀚阳

   饼形图代码
   堆叠柱状图代码
   树状图代码

3. 章涛

   条形图代码
   PPT制作与展示

## 文件结构
1. public

2. src
   components：各个组件代码

     BarChart: 柱状图

     BarMusicGenre： 堆叠柱状图
     BarPodGenre
     BarPreferedContent
     BarPrePlan

     DropdownButton： 下拉按钮

     PieMusicGenre： 饼图
     PiePodGenre
     PiePreferedContent
     PiePrePlan

     Title： 标题

     Tree： 树状图

     VariableSelector： 控制台
   
   data
     dataset： 数据集

   graphs
     api.js

   test
     App.test.js

   App.js: 网页整合代码

   app.modules.css: 格式控制代码

   index.css

   index.js

   logo.cvg

   serviceWorker.js

   setupTsets.js  

3. package-lock.json

4. package.json


           

## 如何启动本项目
   
1. 在项目文件夹内，使用npm运行项目：

   安装所有依赖库：`npm install`
   
   运行项目：`npm start`
      
## 本项目目前已安装的库

1. AntD

   UI组件库
   
1. echarts-for-react

   可视化库

1. papaparse

   解析.csv文件

1. material-ui

   美化插件
