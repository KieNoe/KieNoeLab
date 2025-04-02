<script setup lang="ts">
// ChangelogView.vue - 更新日志页面
</script>

<template>
  <div class="about-container">
    <section class="about-section">
      <h1 class="section-title">版本更新</h1>
      <div class="section-content">
        <p><strong>版本 1.0.4</strong> - 2025年1月15日</p>
        <p>
          进行整体设计风格的规划，确保图标、文字、元素位置等方面的一致性；配置路由跳转及页面切换功能的实现。
        </p>
        <p>
          设计并实现 Banner、SideBar、Loading 等核心组件；完成Notification、labList、Content、Footer
          等页面的设计与实现。
        </p>
        <p><strong>版本 1.0.3</strong> - 2024年12月20日</p>
        <p>优化页面元素的交互效果，使操作更加流畅自然，并通过多元化的页面配色方案提升视觉体验。</p>
        <p>完善用户反馈系统，增加更多的用户互动功能。</p>
      </div>
    </section>

    <section class="about-section">
      <h1 class="section-title">已知问题</h1>
      <div class="section-content">
        <p>在某些移动设备上，页面响应式布局可能存在显示异常。</p>
        <p>在网络连接不稳定的情况下，数据加载可能会出现延迟。</p>
        <p>我们正在积极解决这些问题，并将在下一版本中修复。</p>
      </div>
    </section>

    <section class="about-section">
      <h1 class="section-title">新功能</h1>
      <div class="section-content">
        <p><strong>即将推出</strong></p>
        <p>用户个性化设置：允许用户自定义界面主题和布局。</p>
        <p>高级搜索功能：提供更精确的内容搜索和过滤选项。</p>
        <p>社区互动功能：增加用户之间的交流和分享功能。</p>
        <p>我们期待您对这些新功能的反馈，以便我们不断改进和优化平台体验。</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
* {
  color: var(--text-color);
}
.about-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.about-section {
  margin-bottom: 0;
  background-color: var(--background-color);
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 12px var(--color-01);
  transition: all 0.5s;
}

.about-section:hover {
  transform: scale(1.1);
}

.section-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--text-color);
  border-bottom: 2px solid #89c2d9;
  padding-bottom: 10px;
}

.section-content {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
}

.section-content p {
  margin-bottom: 15px;
}

.section-content p:last-child {
  margin-bottom: 0;
}
</style>
