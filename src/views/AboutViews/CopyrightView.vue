<script setup lang="ts">
// CopyrightView.vue - 版权页面
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const msg = `Copyright (c) [2025] [KieNoe]
</br>
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following condition:
</br>
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
</br>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.`
const open = () => {
  ElMessageBox.alert(msg, 'MIT License', {
    // if you want to disable its autofocus
    // autofocus: false,
    dangerouslyUseHTMLString: true,
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`
      })
    }
  })
}
</script>

<template>
  <div class="about-container">
    <section class="about-section">
      <h1 class="section-title">版权声明</h1>
      <div class="section-content">
        <p>Copyright (c) [2025] [KieNoe]</p>
        <p>本项目采用 MIT 协议开源，具体内容请查看<strong @click="open"> MIT LICENSE </strong>。</p>
        <p>本项目遵循以下条款：</p>
        <p>1.您可以自由使用、修改、分发本项目的代码，但必须保留本版权声明。</p>
        <p>2.本项目以“按原样”(AS IS)提供，不提供任何明示或暗示的担保。</p>
        <p>3.若对本项目进行了修改或派生作品，请注明原作者，并提供修改内容的说明。</p>

        <p>若有其他问题或想要贡献代码，欢迎访问我们的 GitHub 页面 [GitHub 项目地址]。</p>
      </div>
    </section>

    <section class="about-section">
      <h1 class="section-title">许可与使用条款</h1>
      <div class="section-content">
        <p>本项目基于 [MIT] 许可开源，用户可以按照该协议的规定自由使用、修改、分发本项目的代码。</p>
        <p>不得将本项目用于任何违法或不道德的活动。</p>
        <p>因使用本项目代码导致的任何损失、损害或法律纠纷，开发者不承担任何责任。</p>
        <p>我们保留随时修改本条款的权利，最新版本将在 [项目官网或 GitHub 链接] 公布。</p>
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
.section-content strong {
  cursor: pointer;
}

.section-content p:last-child {
  margin-bottom: 0;
}
</style>
