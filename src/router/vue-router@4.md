router-link 移除了append 属性，原因是该功能实现很简单而且不经常被使用，可以完全交由用户来实现
            移除了tag属性,vue-router@3的tasg属性是指定渲染哪种标签，现在@4可以通过<strong>custom</strong>属性 配合 默认插槽自己定义
            标签内容。
            移除了event属性，通过<strong>v-slot</strong>暴露了一系列的api提供操作
            移除了exact属性，只匹配path部分，query和hash不再考虑

            update:
            所有的导航都是异步的