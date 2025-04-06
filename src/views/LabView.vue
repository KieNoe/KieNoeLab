<script setup lang="ts">
import Matter from 'matter-js'
import { ref, onMounted, watch, reactive, onUnmounted, nextTick } from 'vue'
import 'mathjax/es5/tex-mml-chtml.js'
import { useLabStore } from '@/stores/labStore'
import { useRoute } from 'vue-router'

const labStore = useLabStore()
const containerRef = ref<HTMLElement | null>(null)
const showPosition = ref(true)
const showVelocity = ref(true)
const frictionAir = ref(0)
const gravity = ref(1)
const friction = ref(0)
const text = ref('')
const formula = ref('')

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
let engine: Matter.Engine // 添加引擎变量以便全局访问
let render: Matter.Render // 添加渲染器变量以便全局访问

const labList = reactive([
  {
    name: '动量守恒定律',
    description:
      '如果物体受到外力的合力为零，则系统内各物体动量的向量和保持不变，系统质心维持其原本的运动状态',
    formula: '$$ m_1 v_{01} + m_2 v_{02} = m_1 v_1 + m_2 v_2 $$',
    object: [
      {
        name: 'boxA',
        textContent: 'A',
        position: {
          x: 39,
          y: 587
        },
        velocity: {
          x: 10,
          y: 0
        },
        width: 80,
        height: 80,
        isStatic: false
      },
      {
        name: 'boxB',
        textContent: 'B',
        position: {
          x: 1165,
          y: 587
        },
        velocity: {
          x: -5,
          y: 0
        },
        width: 80,
        height: 80,
        isStatic: false
      }
    ]
  },
  {
    name: '自由落体',
    description: '物体在重力作用下自由下落，其加速度等于重力加速度，与物体质量无关',
    formula: '$$ h = \\frac{1}{2}gt^2 $$',
    object: [
      {
        name: 'ball',
        textContent: 'A',
        position: {
          x: 600,
          y: 100
        },
        velocity: {
          x: 0,
          y: 0
        },
        width: 50,
        height: 50,
        isStatic: false
      }
    ]
  },
  {
    name: '斜面运动',
    description: '物体在斜面上运动时，受到平行于斜面的分力作用，导致物体沿斜面加速运动',
    formula: '$$ a = g\\sin\\theta $$',
    object: [
      {
        name: 'slope',
        textContent: 'A',
        position: {
          x: 600,
          y: 500
        },
        velocity: {
          x: 0,
          y: 0
        },
        width: 800,
        height: 20,
        isStatic: true,
        angle: 0.3 // 约17度斜面
      },
      {
        name: 'box',
        textContent: 'B',
        position: {
          x: 300,
          y: 400
        },
        velocity: {
          x: 0,
          y: 0
        },
        width: 50,
        height: 50,
        isStatic: false
      }
    ]
  },
  {
    name: '弹簧振子',
    description: '弹簧振子在弹性力作用下做简谐运动，其周期与弹簧刚度和物体质量有关',
    formula: '$$ T = 2\\pi\\sqrt{\\frac{m}{k}} $$',
    object: [
      {
        name: 'anchor',
        textContent: '',
        position: {
          x: 600,
          y: 100
        },
        velocity: {
          x: 0,
          y: 0
        },
        width: 50,
        height: 50,
        isStatic: true
      },
      {
        name: 'weight',
        textContent: 'A',
        position: {
          x: 400,
          y: 180
        },
        velocity: {
          x: 0,
          y: 0
        },
        width: 60,
        height: 60,
        isStatic: false
      }
    ]
  },
  {
    name: '杠杆原理',
    description: '杠杆是一种简单机械，当杠杆平衡时，力臂与力的乘积在杠杆两侧相等',
    formula: '$$ F_1 \\cdot d_1 = F_2 \\cdot d_2 $$',
    object: [
      {
        name: 'lever',
        textContent: 'A',
        position: {
          x: 600,
          y: 400
        },
        velocity: {
          x: 0,
          y: 0
        },
        width: 1200,
        height: 20,
        isStatic: false
      },
      {
        name: 'fulcrum',
        textContent: 'B',
        position: {
          x: 600,
          y: 430
        },
        velocity: {
          x: 0,
          y: 0
        },
        width: 30,
        height: 30,
        isStatic: true
      },
      {
        name: 'weight1',
        textContent: 'W1',
        position: {
          x: 400,
          y: 350
        },
        velocity: {
          x: 0,
          y: 0
        },
        width: 50,
        height: 50,
        isStatic: false
      },
      {
        name: 'weight2',
        textContent: 'W2',
        position: {
          x: 650,
          y: 350
        },
        velocity: {
          x: 0,
          y: 0
        },
        width: 100,
        height: 100,
        isStatic: false
      }
    ]
  },
  {
    name: '圆周运动',
    description: '物体做圆周运动时，需要向心力使物体保持在圆周轨道上，向心力与速度平方成正比',
    formula: '$$ F = \\frac{mv^2}{r} $$',
    object: [
      {
        name: 'center',
        textContent: '中心',
        position: {
          x: 600,
          y: 400
        },
        velocity: {
          x: 0,
          y: 0
        },
        width: 30,
        height: 30,
        isStatic: true
      },
      {
        name: 'orbiter',
        textContent: '物体',
        position: {
          x: 800,
          y: 400
        },
        velocity: {
          x: 0,
          y: 10
        },
        width: 40,
        height: 40,
        isStatic: false
      }
    ]
  },
  {
    name: '摆锤实验',
    description: '单摆在重力作用下做周期运动，其周期与摆长有关，与摆锤质量无关',
    formula: '$$ T = 2\\pi\\sqrt{\\frac{L}{g}} $$',
    object: [
      {
        name: 'anchor',
        textContent: 'A',
        position: {
          x: 600,
          y: 100
        },
        velocity: {
          x: 0,
          y: 0
        },
        width: 20,
        height: 20,
        isStatic: true
      },
      {
        name: 'pendulum',
        textContent: '摆锤',
        position: {
          x: 700,
          y: 300
        },
        velocity: {
          x: 0,
          y: 0
        },
        width: 60,
        height: 60,
        isStatic: false
      }
    ]
  }
])
const objects = reactive<Matter.Body[]>([]) // 明确类型为 Matter.Body 数组
const route = useRoute()
// 修改这一行，添加默认值和验证
const selectIndex = ref<number>(
  isNaN(Number(route.params.experimentID)) || Number(route.params.experimentID) >= labList.length
    ? 0
    : Number(route.params.experimentID)
)

// 设置当前实验的文本和公式
const setCurrentLabInfo = () => {
  const currentLab = labList[selectIndex.value || 0]
  text.value = currentLab.description || ''
  formula.value = currentLab.formula || ''
  nextTick(() => renderMath())
}

// 监听物理参数变化
watch(frictionAir, (newValue) => {
  objects.forEach((body) => {
    body.frictionAir = newValue
  })
})

watch(friction, (newValue) => {
  objects.forEach((body) => {
    body.friction = newValue
  })
})

watch(gravity, (newValue) => {
  if (engine) {
    engine.world.gravity.y = newValue
  }
})

onMounted(() => {
  // 设置当前实验信息
  setCurrentLabInfo()

  const { width, height } = containerRef.value!.getBoundingClientRect()
  const Engine = Matter.Engine
  const Render = Matter.Render
  const Bodies = Matter.Bodies
  const Composite = Matter.Composite
  const Runner = Matter.Runner

  // 创建引擎
  engine = Engine.create()
  engine.world.gravity.y = gravity.value

  // 创建渲染器，并将引擎连接到画布上
  render = Render.create({
    element: containerRef.value || undefined,
    engine: engine,
    options: {
      width: Number(width),
      height: Number(height),
      wireframes: false
    }
  })

  // 创建物体函数
  function createBox(
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    isStatic: boolean = false
  ) {
    const box = Bodies.rectangle(x, y, width, height, {
      frictionAir: frictionAir.value,
      friction: friction.value,
      isStatic: isStatic
    })
    objects.push(box)
    boxList.push({ box, name }) // 同时添加到 boxList 以保持一致性
    return box
  }

  // 创建实验物体
  labList[selectIndex.value].object.forEach((item) => {
    createBox(item.name, item.position.x, item.position.y, item.width, item.height, item.isStatic)
  })

  // 创建边界
  const thickness = 100
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
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  })

  // 将所有物体添加到世界中
  Composite.add(engine.world, [...objects, ground, ceiling, leftWall, rightWall, mouseConstraint])
  // 在 onMounted 函数中，在创建实验物体后添加以下代码
  // 在 "创建实验物体" 部分之后添加

  // 为特殊实验添加约束
  if (labList[selectIndex.value].name === '弹簧振子') {
    // 创建弹簧约束
    const spring = Matter.Constraint.create({
      pointA: { x: objects[0].position.x, y: objects[0].position.y },
      bodyB: objects[1],
      stiffness: 0.01,
      damping: 0.1,
      length: 200,
      render: {
        visible: true,
        lineWidth: 2,
        strokeStyle: '#4a4a4a'
      }
    })
    Composite.add(engine.world, spring)
  } else if (labList[selectIndex.value].name === '圆周运动') {
    // 创建圆周运动约束
    const constraint = Matter.Constraint.create({
      pointA: { x: objects[0].position.x, y: objects[0].position.y },
      bodyB: objects[1],
      stiffness: 1,
      length: 200,
      render: {
        visible: true,
        lineWidth: 2,
        strokeStyle: '#4a4a4a'
      }
    })
    Composite.add(engine.world, constraint)
  } else if (labList[selectIndex.value].name === '摆锤实验') {
    // 创建摆锤约束
    const pendulum = Matter.Constraint.create({
      pointA: { x: objects[0].position.x, y: objects[0].position.y },
      bodyB: objects[1],
      stiffness: 1,
      length: 200,
      render: {
        visible: true,
        lineWidth: 2,
        strokeStyle: '#4a4a4a'
      }
    })
    Composite.add(engine.world, pendulum)
  } else if (labList[selectIndex.value].name === '斜面运动') {
    // 设置斜面角度
    Matter.Body.setAngle(objects[0], objects[0].angle || 0.3)
  } else if (labList[selectIndex.value].name === '杠杆原理') {
    // 创建杠杆支点约束
    const pivot = Matter.Constraint.create({
      pointA: { x: objects[1].position.x, y: objects[1].position.y },
      bodyB: objects[0],
      stiffness: 1,
      length: 0,
      render: {
        visible: true,
        lineWidth: 2,
        strokeStyle: '#4a4a4a'
      }
    })
    Composite.add(engine.world, pivot)
  }
  // 执行渲染操作
  Render.run(render)

  // 创建运行方法
  const runner = Runner.create()

  // 运行渲染器
  setTimeout(() => {
    Runner.run(runner, engine)
  }, 500)

  // 监听 `afterRender` 事件，在画布上绘制文本
  Matter.Events.on(render, 'afterRender', () => {
    const ctx = render.context
    ctx.fillStyle = 'black'
    ctx.font = '30px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    labList[selectIndex.value].object.forEach((item, index) => {
      if (index < objects.length) {
        ctx.fillText(item.textContent, objects[index].position.x, objects[index].position.y)
      }
    })
  })

  // 重置实验
  const resetExperiment = () => {
    labList[selectIndex.value].object.forEach((item, index) => {
      if (index < objects.length) {
        Matter.Body.setPosition(objects[index], { x: item.position.x, y: item.position.y })
        Matter.Body.setVelocity(objects[index], { x: item.velocity.x, y: item.velocity.y })
      }
    })
  }

  watch(
    () => labStore.startLab,
    () => resetExperiment()
  )

  // 添加实时更新函数
  function updateBoxData() {
    // 更新 boxList 以保持与 objects 同步
    objects.forEach((body, index) => {
      if (index < boxList.length) {
        boxList[index].box = { ...body }
      }
    })
    animationFrameId = requestAnimationFrame(updateBoxData)
  }

  // 开始更新循环
  updateBoxData()
})

// 在组件卸载时清理
onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }

  // 清理 Matter.js 资源
  if (render) {
    Matter.Render.stop(render)
    if (render.canvas) {
      render.canvas.remove()
    }
  }

  if (engine) {
    Matter.Engine.clear(engine)
  }
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
        <li
          v-for="(obj, index) in objects"
          :key="index"
          v-show="index < labList[selectIndex].object.length"
        >
          <span>{{ labList[selectIndex].object[index].textContent }}:</span>
          <span v-if="showPosition"
            >X坐标：
            <p>{{ Math.floor(obj.position.x) }}</p></span
          >
          <span v-if="showPosition"
            >Y坐标：
            <p>{{ Math.floor(obj.position.y) }}</p></span
          >
          <br />
          <span v-if="showVelocity"
            >X方向速率：
            <p>{{ Number(obj.velocity.x.toFixed(2)) }}</p>
          </span>
          <span v-if="showVelocity"
            >Y方向速率：
            <p>{{ Number(obj.velocity.y.toFixed(2)) }}</p>
          </span>
          <br />

          <span v-if="showVelocity"
            >总速率：
            <p>
              {{ Math.floor(Math.sqrt(obj.velocity.x ** 2 + obj.velocity.y ** 2)) }}
            </p>
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
  background-color: var(--background-color);
  border-radius: 20px;
  transition: 0.5s;
  box-shadow: -2px 0 10px var(--color-01);
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
  color: var(--text-color);
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
  color: var(--text-color);
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
  color: var(--text-color);
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
  background-color: var(--more-color-2);
  border-radius: 12px;
  color: var(--text-color);
  padding: 15px;
  height: 84px;
  margin-bottom: 15px;
  overflow: hidden;
  transition: 0.5s;
}

.speedShow {
  background-color: var(--more-color-2);
  border-radius: 12px;
  color: var(--text-color);
  padding: 15px;
  height: 84px;
  margin-bottom: 15px;
  overflow: hidden;
  transition: 0.5s;
}
.positionShow:hover,
.speedShow:hover {
  transform: scale(1.05);
  background: var(--color-01);
}

.switch-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--more-color-2);
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
  background-color: var(--more-color-1);
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  color: var(--text-color);
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
