<script setup lang="ts">
// PrivacyView.vue - 隐私权页面
</script>

<template>
  <div class="about-container">
    <section class="about-section">
      <h1 class="section-title">信息收集</h1>
      <div class="section-content">
        <p>生效日期：2025 年 3 月 8 日</p>
        <p>
          KieNoeLab可能会收集用户在使用我们的服务时提供的个人信息，包括但不限于电子邮件地址、密码等。我们也可能自动收集某些信息，如IP地址、浏览器类型、访问时间等。
        </p>
        <p>我们收集这些信息的目的是为了提供、维护和改进我们的服务，以及为用户提供更好的体验。</p>
      </div>
    </section>

    <section class="about-section">
      <h1 class="section-title">数据使用</h1>
      <div class="section-content">
        <p>生效日期：2025 年 3 月 8 日</p>
        <p>
          KieNoeLab收集的信息将用于以下目的：提供和维护我们的服务；通知用户关于我们服务的变更；允许用户参与我们服务的互动功能；提供客户支持；收集分析数据以改进我们的服务；监控我们服务的使用情况。
        </p>
        <p>我们不会将您的个人信息用于上述目的之外的其他用途，除非获得您的明确同意。</p>
      </div>
    </section>

    <section class="about-section">
      <h1 class="section-title">数据存储与保护</h1>
      <div class="section-content">
        <p>生效日期：2025 年 3 月 8 日</p>
        <p>
          KieNoeLab重视您的个人信息安全。我们采取适当的技术和组织措施来保护您的个人信息免受未经授权的访问、使用或披露。
        </p>
        <p>
          然而，请注意，没有任何电子传输或存储方法是100%安全的。尽管我们努力使用商业上可接受的方式来保护您的个人信息，但我们不能保证其绝对安全。
        </p>
      </div>
    </section>

    <section class="about-section">
      <h1 class="section-title">第三方共享</h1>
      <div class="section-content">
        <p>生效日期：2025 年 3 月 8 日</p>
        <p>
          KieNoeLab不会出售、交易或出租用户的个人信息给第三方。我们可能会在以下情况下共享您的信息：在法律要求的情况下；保护我们的权利和财产；防止可能发生的不法行为；保护KieNoeLab用户或公众的人身安全。
        </p>
        <p>
          我们可能会与提供服务的第三方供应商共享信息，这些供应商帮助我们运营网站或提供服务。这些第三方有义务保密这些信息，并且不得将其用于任何其他目的。
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
