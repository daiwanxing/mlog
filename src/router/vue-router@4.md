router-link 移除了append 属性，原因是该功能实现很简单而且不经常被使用，可以完全交由用户来实现
            移除了tag属性,vue-router@3的tasg属性是指定渲染哪种标签，现在@4可以通过<strong>custom</strong>属性 配合 默认插槽自己定义
            标签内容。
            移除了event属性，通过<strong>v-slot</strong>暴露了一系列的api提供操作
            移除了exact属性，只匹配path部分，query和hash不再考虑

            update:
            所有的导航都是异步的



            get一个知识点，通过link标签，link rel="preload"属性， as="script" href="xx.js" 可以提前预加载一个脚本资源
            这个脚本资源，不会被执行，不会阻塞DOM渲染。会被预先请求到本地，随后如果浏览器发现有script标签的src请求了这个脚本，会直接从本地执行这个
            脚本资源。但是ESM的脚本提前preload好像没有此效果，随后的script标签请求一个type="module"的脚本文件
            并不会拿本地的，直接发起一个新的http请求, preload