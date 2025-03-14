<script setup lang="ts">
import Matter from 'matter-js'
import { ref, onMounted } from 'vue'

const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { width, height } = containerRef.value!.getBoundingClientRect()
  const Engine = Matter.Engine
  const Render = Matter.Render
  const Bodies = Matter.Bodies
  const Composite = Matter.Composite
  const Runner = Matter.Runner
  // 3. 创建引擎
  let engine = Engine.create()

  // 4. 创建渲染器，并将引擎连接到画布上
  let render = Render.create({
    element: containerRef.value || undefined, // 使用ref获取DOM元素，处理null值
    engine: engine // 绑定引擎
  })

  // 5-1. 创建两个正方形
  let boxA = Bodies.rectangle(400, 200, 80, 80)
  let boxB = Bodies.rectangle(450, 50, 80, 80)

  // 5-2. 创建地面，将isStatic设为true，表示物体静止
  let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

  // 6. 将所有物体添加到世界中
  Composite.add(engine.world, [boxA, boxB, ground])

  // 7. 执行渲染操作
  Render.run(render)

  // 8. 创建运行方法
  var runner = Runner.create()

  // 9. 运行渲染器
  Runner.run(runner, engine)

  // 重置实验
  const resetExperiment = () => {
    Matter.Body.setPosition(boxA, { x: 400, y: 200 }) // 复位 boxA
    Matter.Body.setVelocity(boxA, { x: 0, y: 0 }) // 清除速度

    Matter.Body.setPosition(boxB, { x: 450, y: 50 }) // 复位 boxB
    Matter.Body.setVelocity(boxB, { x: 0, y: 0 }) // 清除速度
  }

  // 监听屏幕点击
  const handleClick = () => {
    resetExperiment()
  }
  window.addEventListener('click', handleClick)
})
</script>
<template>
  <div id="c" ref="containerRef"></div>
</template>
<style scoped></style>
