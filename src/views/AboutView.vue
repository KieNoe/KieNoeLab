<script setup lang="ts">
import MeView from './AboutViews/MeView.vue'
import CopyrightView from './AboutViews/CopyrightView.vue'
import PrivacyView from './AboutViews/PrivacyView.vue'
import TermsView from './AboutViews/TermsView.vue'
import ChangelogView from './AboutViews/ChangelogView.vue'
import { useAboutStatus } from '@/stores/aboutStatus'
import { toRefs } from 'vue'

const aboutStore = useAboutStatus()
const { meStatus, copyrightStatus, privacyStatus, termsStatus, changelogStatus } =
  toRefs(aboutStore)

const treeData = [
  {
    id: '1',
    label: '关于我',

    children: [
      { id: '1-1', label: '个人简介' },
      { id: '1-2', label: '愿景' }
    ]
  },
  {
    id: '2',
    label: '版权',

    children: [
      { id: '2-1', label: '版权声明' },
      { id: '2-2', label: '许可与使用条款' }
    ]
  },
  {
    id: '3',
    label: '隐私权',

    children: [
      { id: '3-1', label: '信息收集' },
      { id: '3-2', label: '数据使用' },
      { id: '3-3', label: '数据存储与保护' },
      { id: '3-4', label: '第三方共享' }
    ]
  },
  {
    id: '4',
    label: '条款',

    children: [
      { id: '4-1', label: '服务条款' },
      { id: '4-2', label: 'Cookie 政策' }
    ]
  },
  {
    id: '5',
    label: '更新日志',

    children: [
      { id: '5-1', label: '版本更新' },
      { id: '5-2', label: '已知问题' },
      { id: '5-3', label: '新功能' }
    ]
  }
]

const toggleNode = (nodeId: string) => {
  // 重置所有状态
  meStatus.value = false
  copyrightStatus.value = false
  privacyStatus.value = false
  termsStatus.value = false
  changelogStatus.value = false

  // 根据节点ID设置对应状态
  switch (nodeId) {
    case '1':
      meStatus.value = true
      break
    case '2':
      copyrightStatus.value = true
      break
    case '3':
      privacyStatus.value = true
      break
    case '4':
      termsStatus.value = true
      break
    case '5':
      changelogStatus.value = true
      break
  }
}
</script>

<template>
  <div class="about-container">
    <div class="left">
      <div class="tree-title">关于</div>
      <ul class="tree-list">
        <li v-for="node in treeData" :key="node.id" class="tree-item">
          <div
            class="node-header"
            @click="toggleNode(node.id)"
            :class="{
              active:
                (node.id === '1' && meStatus) ||
                (node.id === '2' && copyrightStatus) ||
                (node.id === '3' && privacyStatus) ||
                (node.id === '4' && termsStatus) ||
                (node.id === '5' && changelogStatus)
            }"
            :data-children="node.children?.length"
          >
            <span class="label">{{ node.label }}</span>
            <span class="arrow"><ion-icon name="caret-forward-outline"></ion-icon></span>
          </div>
          <ul class="node-children" v-if="node.children">
            <li
              v-for="child in node.children"
              :key="child.id"
              :class="{
                visible:
                  (node.id === '1' && meStatus) ||
                  (node.id === '2' && copyrightStatus) ||
                  (node.id === '3' && privacyStatus) ||
                  (node.id === '4' && termsStatus) ||
                  (node.id === '5' && changelogStatus)
              }"
            >
              {{ child.label }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="right">
      <MeView :class="{ 'view-active': meStatus }" />
      <CopyrightView :class="{ 'view-active': copyrightStatus }" />
      <PrivacyView :class="{ 'view-active': privacyStatus }" />
      <TermsView :class="{ 'view-active': termsStatus }" />
      <ChangelogView :class="{ 'view-active': changelogStatus }" />
    </div>
  </div>
</template>

<style scoped>
.about-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.left {
  width: 300px;
  height: 100%;
  border-right: 1px solid #000;
  background-color: #f0f0f0;
  padding: 20px 0;
}

.right {
  flex: 1;
  height: 100%;
  background-color: #f0f0f0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.tree-title {
  font-size: 50px;
  font-weight: bold;
  padding: 0 20px;
  margin-bottom: 20px;
  cursor: default;
  transition: 0.5s;
}
.tree-title:hover {
  font-size: 65px;
}

.tree-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tree-item {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.tree-item:first-child .node-header {
  border-top: none;
}

.node-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: 0.5s;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.node-header:hover {
  background: rgba(0, 0, 0, 0.2);
}

.node-header:hover .label {
  font-size: 18px;
}

.node-header .label {
  font-size: 15px;
  transition: 0.5s;
}

.node-header .arrow {
  color: rgba(0, 0, 0, 0.8);
  transition: 0.5s;
}

.node-header.active .arrow {
  transform: rotate(90deg);
}

.node-children {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 0;
  opacity: 0;
  transition: 0.5s;
}

.node-children li {
  padding: 8px 20px 8px 40px;
  cursor: default;
  transition: 0.5s;
  font-size: 15px;
}

.node-children li:hover {
  background: rgba(0, 0, 0, 0.2);
  font-size: 17px;
}

.tree-item .node-children {
  height: 0;
}

.tree-item:has(.node-header.active) .node-children {
  opacity: 1;
}

/* 为不同数量的子项设置对应的高度 */
.tree-item:has(.node-header.active[data-children='2']) .node-children {
  height: 72px;
}

.tree-item:has(.node-header.active[data-children='3']) .node-children {
  height: 108px;
}

.tree-item:has(.node-header.active[data-children='4']) .node-children {
  height: 144px;
}

.node-children li.visible {
  display: block;
}

.right {
  position: relative;
  flex: 1;
  background-color: #f0f0f0;
}

.right > * {
  position: absolute;
  opacity: 0;
  transform: translateY(-200%);
  transition: 0.7s;
}

.right .view-active {
  opacity: 1;
  z-index: 10;
  transform: translateY(0);
}
</style>
