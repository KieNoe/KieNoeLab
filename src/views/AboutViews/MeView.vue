<script setup lang="ts">
// MeView.vue - 关于我页面
</script>

<template>
  <div class="about-container">
    <section class="about-section">
      <h1 class="section-title">个人简介</h1>
      <div class="section-content">
        <p>
          KieNoeLab是一个致力于创新与实验的平台，由KieNoe创建。我们的网站致力于通过物理实验模拟，帮助用户更直观地理解物理学原理。
        </p>
        <p>
          我们精选教材中的经典实验，形象地展示实验全貌，结合浏览模式与实践模式，增强用户的学习体验。
        </p>
      </div>
    </section>

    <section class="about-section">
      <h1 class="section-title">愿景</h1>
      <div class="section-content">
        <p>我们的愿景是通过创新的物理实验模拟平台，让更多人爱上物理，激发他们探索科学的热情。</p>
        <p>
          我们希望通过直观、生动的实验展示，打破物理学的抽象壁垒，让每个用户都能轻松理解复杂的物理原理，培养他们的科学思维。
        </p>
        <p>
          在未来，我们将继续为学生、教师和物理爱好者提供丰富的学习资源，推动物理学科的普及与发展。
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
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
  background-color: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
}

.about-section:hover {
  transform: scale(1.1);
}

.section-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #89c2d9;
  padding-bottom: 10px;
}

.section-content {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}

.section-content p {
  margin-bottom: 15px;
}

.section-content p:last-child {
  margin-bottom: 0;
}
</style>
