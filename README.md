本项目仅限用于2024年浙江大学暑期学校课程项目模板。

## 如何启动本项目

1. 使用git命令，将本项目同步到本地：

   `git clone https://github.com/susicaliu/ZJU_SummerSchool_ProjectTemplate.git`
   
2. 在项目文件夹内，使用git命令，修改remote到你们小组的仓库：

   将原来的远程仓库重命名：`git remote rename origin template-origin`
   
   添加你的远程仓库地址：`git remote add origin your_remote_url`
   
   添加文件修改：`git add .`
   
   提交文件修改：`git commit -m "Initial Commit"`
   
   上传：`git push -u origin master`
   
3. 在项目文件夹内，使用npm运行项目：

   安装所有依赖库：`npm install`
   
   运行项目：`npm start`
   
   如果能正常运行，你应该可以看到浏览器中出现四个区域: Control Panel, Overview, Assist View, Detail View。Control Panel中有按钮和下拉框，Overview中有柱状图，Detail View中有地图。单击"add"或"minus"按钮，数字会同时发生变化。
   
   
## 本项目目前已安装的库

1. AntD

   UI组件库
   
1. echarts-for-react

   可视化库

1. papaparse

   解析.csv文件
