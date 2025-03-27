<script setup lang="ts">
import Matter from 'matter-js'
import { ref, onMounted, watch, reactive, onUnmounted, nextTick } from 'vue'
import 'mathjax/es5/tex-mml-chtml.js'
import { useLabStore } from '@/stores/labStore'

const labStore = useLabStore()
const containerRef = ref<HTMLElement | null>(null)
const showPosition = ref(true)
const showVelocity = ref(true)
const frictionAir = ref(0)
const gravity = ref(1)
const friction = ref(0)
const text = ref('')
const formula = ref('')

// 触发 MathJax 渲染
// 添加 MathJax 类型声明
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MathJax: any
  }
}

const renderMath = () => {
  if (!window.MathJax) {
    window.MathJax = {
      tex: {
        inlineMath: [
          ['$', '$'],
          ['\\(', '\\)']
        ]
      },
      svg: { fontCache: 'global' }
    }
  }
  window.MathJax.typesetPromise()
}

interface Box {
  box: Matter.Body
  name: string
}
const boxList = reactive<Box[]>([])
let animationFrameId: number | null = null
onMounted(() => {
  nextTick(() => renderMath())
  const { width, height } = containerRef.value!.getBoundingClientRect()
  const Engine = Matter.Engine
  const Render = Matter.Render
  const Bodies = Matter.Bodies
  const Composite = Matter.Composite
  const Runner = Matter.Runner
  // 3. 创建引擎
  const engine = Engine.create()
  engine.world.gravity.y = gravity.value

  // 4. 创建渲染器，并将引擎连接到画布上
  const render = Render.create({
    element: containerRef.value || undefined, // 使用ref获取DOM元素，处理null值
    engine: engine, // 绑定引擎
    options: {
      width: Number(width),
      height: Number(height),
      wireframes: false // 关闭线框模式
    }
  })
  // 5-1. 创建两个正方形
  const boxA = Bodies.rectangle(400, 200, 80, 80, {
    frictionAir: frictionAir.value,
    friction: friction.value
  })
  const boxB = Bodies.rectangle(450, 50, 80, 80, {
    frictionAir: frictionAir.value,
    friction: friction.value
  })

  // 5-2. 创建地面，将isStatic设为true，表示物体静止
  // 创建四个边界（地面、左墙、右墙、顶部）
  const thickness = 20 // 墙的厚度
  const ground = Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, {
    isStatic: true,
    friction: friction.value
  })
  const ceiling = Bodies.rectangle(width / 2, -thickness / 2, width, thickness, {
    isStatic: true,
    friction: friction.value
  })
  const leftWall = Bodies.rectangle(-thickness / 2, height / 2, thickness, height, {
    isStatic: true,
    friction: friction.value
  })
  const rightWall = Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, {
    isStatic: true,
    friction: friction.value
  })
  // 创建鼠标实例
  const mouse = Matter.Mouse.create(render.canvas)

  // 给鼠标添加约束·
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false // 默认为 true，会显示鼠标拖拽轨迹
      }
    }
  })

  // 6. 将所有物体添加到世界中
  Composite.add(engine.world, [boxA, boxB, ground, ceiling, leftWall, rightWall, mouseConstraint])

  // 7. 执行渲染操作
  Render.run(render)

  // 8. 创建运行方法
  const runner = Runner.create()

  // 9. 运行渲染器
  setTimeout(() => {
    Runner.run(runner, engine)
  }, 500)

  // 监听 `afterRender` 事件，在画布上绘制 "A"
  Matter.Events.on(render, 'afterRender', () => {
    const ctx = render.context
    ctx.fillStyle = 'black'
    ctx.font = '30px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('A', boxA.position.x, boxA.position.y)
    ctx.fillText('B', boxB.position.x, boxB.position.y)
  })
  // 重置实验
  const resetExperiment = () => {
    Matter.Body.setPosition(boxA, { x: 400, y: 200 }) // 复位 boxA
    Matter.Body.setVelocity(boxA, { x: 0, y: 0 }) // 清除速度

    Matter.Body.setPosition(boxB, { x: 450, y: 50 }) // 复位 boxB
    Matter.Body.setVelocity(boxB, { x: 0, y: 0 }) // 清除速度
  }
  watch(
    () => labStore.startLab,
    () => resetExperiment()
  )
  text.value =
    '如果物体受到外力的合力为零，则系统内各物体动量的向量和保持不变，系统质心维持原本的运动状态'
  formula.value = '$$ m_1 v_{01} + m_2 v_{02} = m_1 v_1 + m_2 v_2 $$'
  boxList.push({ box: boxA, name: 'A' }, { box: boxB, name: 'B' })
  // 添加实时更新函数
  function updateBoxData() {
    boxList.forEach((item) => {
      // 强制触发响应式更新
      item.box = { ...item.box }
    })
    animationFrameId = requestAnimationFrame(updateBoxData)
  }
  // 开始更新循环
  updateBoxData()

  // 在组件卸载时清理
  onUnmounted(() => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
  })
})
</script>
<template>
  <div class="labContainer">
    <div id="c" ref="containerRef"></div>
    <div class="parameterBox" :class="labStore.isParameterOpen ? 'active' : ''">
      <div class="parameter-content">
        <h2 class="parameter-title">参数调整</h2>

        <div class="physics-params">
          <h3>物理参数</h3>
          <div class="param-item">
            <span class="param-label">空气阻力</span>
            <el-slider :min="0" :max="1" :step="0.1" v-model="frictionAir" />
          </div>
          <div class="param-item">
            <span class="param-label">重力</span>
            <el-slider :min="0" :max="20" :step="0.5" v-model="gravity" />
          </div>
          <div class="param-item">
            <span class="param-label">摩擦力</span>
            <el-slider :min="0" :max="1" :step="0.1" v-model="friction" />
          </div>
        </div>

        <div class="object-params">
          <h3>物体参数</h3>
          <div class="param-switches">
            <div class="positionShow" :class="showPosition ? 'openModel' : ''">
              <div class="switch-item">
                <span>坐标显示</span>
                <el-switch v-model="showPosition" />
              </div>
            </div>
            <div class="speedShow" :class="showVelocity ? 'openModel' : ''">
              <div class="switch-item">
                <span>速率显示</span>
                <el-switch v-model="showVelocity" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="paramLists">
      <ul v-if="showPosition || showVelocity">
        <li v-for="(box, index) in boxList" :key="index">
          <span>{{ box.name }}:</span>
          <span v-if="showPosition"
            >X坐标：
            <p>{{ Math.floor(box.box.position.x) }}</p></span
          >
          <span v-if="showPosition"
            >Y坐标：
            <p>{{ Math.floor(box.box.position.y) }}</p></span
          >
          <br />
          <span v-if="showVelocity"
            >X方向速率：
            <p>{{ Number(box.box.velocity.x.toFixed(2)) }}</p>
          </span>
          <span v-if="showVelocity"
            >Y方向速率：
            <p>{{ Number(box.box.velocity.y.toFixed(2)) }}</p>
          </span>
          <br />

          <span v-if="showVelocity"
            >总速率：
            <p>{{ Math.floor(Math.sqrt(box.box.velocity.x ** 2 + box.box.velocity.y ** 2)) }}</p>
          </span>
        </li>
      </ul>
    </div>
    <div class="text" :class="labStore.isTextOpen ? 'active' : ''">
      <span>{{ formula }}</span>
      <span>
        {{ text }}
      </span>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.labContainer {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#c {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.parameterBox {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  transition: 0.5s;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.parameterBox.active {
  right: 0;
}

.parameter-content {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
.parameter-content h2 {
  cursor: default;
  font-size: 30px;
  transition: 0.5s;
}
.parameter-content h2:hover {
  font-size: 40px;
}

.parameter-title {
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.physics-params,
.object-params {
  margin-bottom: 30px;
  transition: 0.5s;
}

.physics-params h3,
.object-params h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #666;
  cursor: default;
  transition: 0.5s;
}
.physics-params h3:hover,
.object-params h3:hover {
  font-size: 24px;
}

.param-item {
  margin-bottom: 20px;
  transition: 0.5s;
}
.param-item span {
  transition: 0.5s;
  cursor: default;
}
.param-item span:hover {
  font-size: 22px;
}

.param-label {
  display: block;
  margin-bottom: 8px;
  color: #666;
}

.param-switches {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.param-switches .el-switch {
  transition: 0.5s;
}
.param-switches .el-switch:hover {
  transform: scale(1.3);
}
.param-switches span {
  font-size: 16px;
  transition: 0.5s;
  cursor: default;
}
.param-switches span:hover {
  font-size: 22px;
}

.positionShow {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 15px;
  height: 84px;
  margin-bottom: 15px;
  overflow: hidden;
  transition: 0.5s;
}

.speedShow {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 15px;
  height: 84px;
  margin-bottom: 15px;
  overflow: hidden;
  transition: 0.8s;
}
.positionShow:hover,
.speedShow:hover {
  transform: scale(1.05);
  background: rgba(0, 0, 0, 0.1);
}

.switch-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  opacity: 1;
  transition: 0.5s;
}
.switch-item.hidden {
  opacity: 0;
}

.switch-item:last-child {
  border-bottom: none;
}

.value-item {
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  color: #666;
}

.value {
  font-family: monospace;
  color: #409eff;
}
.paramLists {
  position: absolute;
  top: 0;
  right: 0;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}
.paramLists ul {
  display: flex;
  flex-direction: column;
}
.paramLists li {
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 10px 0;
}
.paramLists li span {
  transition: 0.5s;
  cursor: default;
  padding: 0 5px;
}
.paramLists li span:hover {
  font-size: 20px;
}
.text {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 40px;
  max-width: 500px;
  background: rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  transition: 0.5s;
  cursor: default;
  transform: translateY(-100%);
}
.text.active {
  transform: translateY(0);
}
.text span {
  transition: 0.5s;
  cursor: default;
}
.text span:hover {
  transform: scale(1.14);
}
</style>
