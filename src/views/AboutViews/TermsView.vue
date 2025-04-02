<script setup lang="ts">
// TermsView.vue - 条款页面
</script>

<template>
  <div class="about-container">
    <section class="about-section">
      <h1 class="section-title">服务条款</h1>
      <div class="section-content">
        <p>生效日期：2025 年 3 月 8 日</p>
        <p>
          欢迎使用KieNoeLab平台。通过访问或使用我们的服务，您同意受这些条款的约束。如果您不同意这些条款，请不要使用我们的服务。
        </p>
        <p><strong>使用规则</strong></p>
        <p>本网站提供物理实验模拟功能，供用户学习和探索物理知识。</p>
        <p>您不得以任何方式滥用本网站，包括但不限于：</p>

        <p>&nbsp;&nbsp;&nbsp;非法用途：不得利用本网站从事任何违法活动；</p>
        <p>&nbsp;&nbsp;&nbsp;未经授权的访问：不得试图破解、篡改或攻击本网站；</p>
        <p>
          &nbsp;&nbsp;&nbsp;滥用资源：不得以超出合理限度的方式占用服务器资源或影响其他用户的使用体验。
        </p>
        <p><strong>账户与安全</strong></p>

        <p>&nbsp;&nbsp;&nbsp;注册：部分功能可能需要您注册账户并提供有效的电子邮件地址。</p>
        <p>
          &nbsp;&nbsp;&nbsp;安全性：您有责任保护自己的账户信息。任何因账户被盗或滥用而产生的责任由您自行承担。
        </p>
        <p>&nbsp;&nbsp;&nbsp;终止账户：如果您违反本条款，我们有权限制或终止您的账户。</p>
        <p><strong>内容与知识产权</strong></p>
        <p>
          &nbsp;&nbsp;&nbsp;网站内容：所有实验模拟、文本、图像、代码等均受知识产权保护，未经授权不得复制或用于商业目的。
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;用户内容：如果您提交任何评论、反馈或贡献代码，您同意授予我们在法律允许范围内的使用权。
        </p>
        <p><strong> 免责声明 </strong></p>
        <p>
          &nbsp;&nbsp;&nbsp;“按原样”提供：本网站的内容仅供学习和参考，不能保证所有实验结果的完全准确性。
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;不提供担保：本网站不对因使用本网站而导致的任何损失或损害承担责任，包括但不限于数据丢失、计算错误或技术故障。
        </p>
        <p><strong>修改与终止</strong></p>
        <p>
          我们保留随时修改这些条款的权利。修改后的条款将在我们的网站上发布时立即生效。您继续使用我们的服务将被视为接受修改后的条款。
        </p>
        <p>您必须遵守所有适用的法律法规，并对您在KieNoeLab平台上的所有活动负责。</p>
      </div>
    </section>

    <section class="about-section">
      <h1 class="section-title">Cookie 政策</h1>
      <div class="section-content">
        <p>生效日期：2025 年 3 月 8 日</p>
        <p>
          KieNoeLab使用Cookie和类似技术来提供、保护和改进我们的服务。Cookie是存储在您设备上的小文本文件，可以帮助我们识别您的浏览器或设备。
        </p>
        <p>我们使用以下类型的 Cookie：</p>
        <p>必要 Cookie：这些Cookie保障网站基本功能，如用户登录、页面导航等。</p>
        <p>功能Cookie：用于记住您的偏好，例如语言设置或主题选择。</p>
        <p>分析Cookie：用于收集访问量、用户行为等数据，帮助我们优化网站体验。</p>
        <p>您可以通过浏览器设置，隐私选项，第三方工具管理或禁用 Cookie</p>
        <p>
          我们可能会不时更新本政策，以反映技术或法律的变化。任何变更将在本页面发布。 如果您对 Cookie
          政策有任何疑问，请联系我们。
        </p>
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
