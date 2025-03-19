<script setup lang="ts">
import Matter from 'matter-js'
import { ref, onMounted, watch } from 'vue'
import { useLabStore } from '@/stores/labStore'

const labStore = useLabStore()
const containerRef = ref<HTMLElement | null>(null)
const showYVelocity = ref(false)
const showPosition = ref(false)
const showVelocity = ref(false)
const showPositionX = ref(false)
const showPositionY = ref(false)
const showVelocitySize = ref(false)
const showVelocityX = ref(false)
const showAngle = ref(false)

onMounted(() => {
  const { width, height } = containerRef.value!.getBoundingClientRect()
  const Engine = Matter.Engine
  const Render = Matter.Render
  const Bodies = Matter.Bodies
  const Composite = Matter.Composite
  const Runner = Matter.Runner
  // 3. 创建引擎
  const engine = Engine.create()

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
    render: {
      fillStyle: 'lightblue',
      strokeStyle: 'black',
      lineWidth: 3
    }
  })
  const boxB = Bodies.rectangle(450, 50, 80, 80)

  // 5-2. 创建地面，将isStatic设为true，表示物体静止
  // 创建四个边界（地面、左墙、右墙、顶部）
  const thickness = 20 // 墙的厚度
  const ground = Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, {
    isStatic: true
  })
  const ceiling = Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true })
  const leftWall = Bodies.rectangle(-thickness / 2, height / 2, thickness, height, {
    isStatic: true
  })
  const rightWall = Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, {
    isStatic: true
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
  Runner.run(runner, engine)

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
            <el-slider :min="0" :max="1" :step="0.1" />
          </div>
          <div class="param-item">
            <span class="param-label">重力</span>
            <el-slider :min="0" :max="20" :step="0.5" />
          </div>
          <div class="param-item">
            <span class="param-label">摩擦力</span>
            <el-slider :min="0" :max="1" :step="0.1" />
          </div>
          <div class="param-item">
            <span class="param-label">静态摩擦</span>
            <el-slider :min="0" :max="1" :step="0.1" />
          </div>
          <div class="param-item">
            <span class="param-label">弹性</span>
            <el-slider :min="0" :max="1" :step="0.1" />
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
              <div class="switch-item" :class="showPosition ? '' : 'hidden'">
                <span>X坐标</span>
                <el-switch v-model="showPositionX" />
              </div>
              <div class="switch-item" :class="showPosition ? '' : 'hidden'">
                <span>Y坐标</span>
                <el-switch v-model="showPositionY" />
              </div>
            </div>
            <div class="speedShow" :class="showVelocity ? 'openModel' : ''">
              <div class="switch-item">
                <span>速率显示</span>
                <el-switch v-model="showVelocity" />
              </div>
              <div class="switch-item" :class="showVelocity ? '' : 'hidden'">
                <span>速率大小</span>
                <el-switch v-model="showVelocitySize" />
              </div>
              <div class="switch-item" :class="showVelocity ? '' : 'hidden'">
                <span>X方向速率</span>
                <el-switch v-model="showVelocityX" />
              </div>
              <div class="switch-item" :class="showVelocity ? '' : 'hidden'">
                <span>Y方向速率</span>
                <el-switch v-model="showYVelocity" />
              </div>
              <div class="switch-item" :class="showVelocity ? '' : 'hidden'">
                <span>运动朝向角度</span>
                <el-switch v-model="showAngle" />
              </div>
            </div>
          </div>
        </div>
      </div>
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
.positionShow.openModel {
  height: 188px;
}
.speedShow.openModel {
  height: 340px;
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
</style>
