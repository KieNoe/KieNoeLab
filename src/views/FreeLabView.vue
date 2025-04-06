<script setup lang="ts">
import Matter from 'matter-js'
import { ref, onMounted, watch, reactive, onUnmounted } from 'vue'
import { useLabStore } from '@/stores/labStore'

const labStore = useLabStore()
const containerRef = ref<HTMLElement | null>(null)
const frictionAir = ref(0)
const gravity = ref(1)
const friction = ref(0)

// 物体类型定义
interface ObjectType {
  name: string
  type: 'rectangle' | 'circle' | 'polygon' | 'trapezoid'
  width?: number
  height?: number
  radius?: number
  sides?: number
  color: string
  density: number
  isStatic: boolean
}

// 可选物体列表
const objectTypes = reactive<ObjectType[]>([
  {
    name: '正方形',
    type: 'rectangle',
    width: 80,
    height: 80,
    color: '#FF5733',
    density: 0.001,
    isStatic: false
  },
  {
    name: '长方形',
    type: 'rectangle',
    width: 120,
    height: 60,
    color: '#33A8FF',
    density: 0.001,
    isStatic: false
  },
  {
    name: '圆形',
    type: 'circle',
    radius: 40,
    color: '#33FF57',
    density: 0.001,
    isStatic: false
  },
  {
    name: '三角形',
    type: 'polygon',
    sides: 3,
    radius: 50,
    color: '#F033FF',
    density: 0.001,
    isStatic: false
  },
  {
    name: '五边形',
    type: 'polygon',
    sides: 5,
    radius: 40,
    color: '#FFFF33',
    density: 0.001,
    isStatic: false
  },
  {
    name: '静态平台',
    type: 'rectangle',
    width: 200,
    height: 20,
    color: '#888888',
    density: 0.001,
    isStatic: true
  },
  {
    name: '梯形',
    type: 'trapezoid',
    width: 120,
    height: 60,
    color: '#FF9933',
    density: 0.001,
    isStatic: false
  }
])

// 当前选中的物体类型索引
const selectedObjectIndex = ref(-1)

interface Box {
  box: Matter.Body
  name: string
}
const boxList = reactive<Box[]>([])
const animationFrameId: number | null = null
let engine: Matter.Engine // 添加引擎变量以便全局访问
let render: Matter.Render // 添加渲染器变量以便全局访问

const objects = reactive<Matter.Body[]>([]) // 明确类型为 Matter.Body 数组

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

let addObjectToWorld: (objectType: ObjectType) => void
onMounted(() => {
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
    isStatic: boolean = false,
    color: string = '#FF5733'
  ) {
    const box = Bodies.rectangle(x, y, width, height, {
      frictionAir: frictionAir.value,
      friction: friction.value,
      isStatic: isStatic,
      render: {
        fillStyle: color
      }
    })
    objects.push(box)
    boxList.push({ box, name }) // 同时添加到 boxList 以保持一致性
    return box
  }

  // 创建圆形物体
  function createCircle(
    name: string,
    x: number,
    y: number,
    radius: number,
    isStatic: boolean = false,
    color: string = '#33FF57'
  ) {
    const circle = Bodies.circle(x, y, radius, {
      frictionAir: frictionAir.value,
      friction: friction.value,
      isStatic: isStatic,
      render: {
        fillStyle: color
      }
    })
    objects.push(circle)
    boxList.push({ box: circle, name })
    return circle
  }

  // 创建多边形物体
  function createPolygon(
    name: string,
    x: number,
    y: number,
    sides: number,
    radius: number,
    isStatic: boolean = false,
    color: string = '#F033FF'
  ) {
    const polygon = Bodies.polygon(x, y, sides, radius, {
      frictionAir: frictionAir.value,
      friction: friction.value,
      isStatic: isStatic,
      render: {
        fillStyle: color
      }
    })
    objects.push(polygon)
    boxList.push({ box: polygon, name })
    return polygon
  }

  // 创建梯形物体
  function createTrapezoid(
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    isStatic: boolean = false,
    color: string = '#FF9933'
  ) {
    const trapezoid = Bodies.trapezoid(x, y, width, height, 0.3, {
      frictionAir: frictionAir.value,
      friction: friction.value,
      isStatic: isStatic,
      render: {
        fillStyle: color
      }
    })
    objects.push(trapezoid)
    boxList.push({ box: trapezoid, name })
    return trapezoid
  }

  // 添加物体到世界中的函数
  addObjectToWorld = (objectType: ObjectType) => {
    const centerX = width / 2
    const centerY = height / 3

    let body: Matter.Body

    switch (objectType.type) {
      case 'rectangle':
        body = createBox(
          objectType.name,
          centerX,
          centerY,
          objectType.width!,
          objectType.height!,
          objectType.isStatic,
          objectType.color
        )
        break
      case 'circle':
        body = createCircle(
          objectType.name,
          centerX,
          centerY,
          objectType.radius!,
          objectType.isStatic,
          objectType.color
        )
        break
      case 'polygon':
        body = createPolygon(
          objectType.name,
          centerX,
          centerY,
          objectType.sides!,
          objectType.radius!,
          objectType.isStatic,
          objectType.color
        )
        break
      case 'trapezoid':
        body = createTrapezoid(
          objectType.name,
          centerX,
          centerY,
          objectType.width!,
          objectType.height!,
          objectType.isStatic,
          objectType.color
        )
        break
    }

    // 将新创建的物体添加到世界中
    Composite.add(engine.world, body)
  }

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

  // 执行渲染操作
  Render.run(render)

  // 创建运行方法
  const runner = Runner.create()

  // 运行渲染器
  setTimeout(() => {
    Runner.run(runner, engine)
  }, 500)

  // 重置实验
  const resetExperiment = () => {
    // 清空物体数组
    objects.splice(0, objects.length)
    boxList.splice(0, boxList.length)

    // 清除世界中的所有物体
    Composite.clear(engine.world, true, true)

    // 重新创建边界
    const { width, height } = containerRef.value!.getBoundingClientRect()
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

    // 将边界和鼠标约束添加到世界中
    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall, mouseConstraint])
  }

  watch(
    () => labStore.startLab,
    () => resetExperiment()
  )
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
    <div class="objectPanel" :class="labStore.isTextOpen ? 'active' : ''">
      <div class="panel-header">
        <h3>添加物体</h3>
      </div>
      <div class="object-list">
        <div
          v-for="(object, index) in objectTypes"
          :key="index"
          class="object-item"
          :class="selectedObjectIndex === index ? 'selected' : ''"
          @click="addObjectToWorld(object)"
        >
          <div class="object-preview" :style="{ backgroundColor: object.color }"></div>
          <div class="object-name">{{ object.name }}</div>
        </div>
      </div>
    </div>
    <div class="parameterBox" :class="labStore.isParameterOpen ? '' : 'active'">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  transition: 0.5s;
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

.objectPanel {
  position: absolute;
  top: 20px;
  left: -300px;
  width: 280px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 15px;
  transition: 0.5s;
  max-height: 80%;
  overflow-y: auto;
}

.objectPanel.active {
  left: 20px;
}

.panel-header {
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.panel-header h3 {
  margin: 0;
  font-size: 18px;
  color: var(--text-color);
}

.object-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.object-item {
  background-color: var(--background-color);
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.object-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.object-item.selected {
  background-color: #e6f7ff;
  border: 1px solid #1890ff;
}

.object-preview {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.object-name {
  font-size: 14px;
  color: var(--text-color);
  text-align: center;
}

.parameterBox {
  position: absolute;
  top: 20px;
  right: -300px;
  width: 280px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 15px;
  transition: 0.5s;
  max-height: 80%;
  overflow-y: auto;
}

.parameterBox.active {
  right: 20px;
}

.parameter-title {
  margin: 0 0 15px 0;
  font-size: 18px;
  color: var(--text-color);
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.physics-params h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: var(--text-color);
}

.param-item {
  margin-bottom: 15px;
}

.param-label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--text-color);
}
</style>
