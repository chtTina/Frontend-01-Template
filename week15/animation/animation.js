/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-07-18 19:22:49
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-07-18 21:56:55
 */
export class Timeline {
  constructor () {
    this.animations = []
    this.requestId = null
    this.state = 'inited'
    this.tick = () => {
      console.log('tick')
      let t = Date.now() - this.startTime
      let animations = this.animations.filter(animation => !animation.finished)
      for (let animation of this.animations) {

        // t = animation.duration + animation.delay
        let {object, property, template, start, end, timingFunction, delay, duration} = animation
        let progression = timingFunction((t - delay) / duration)

        if (t > animation.duration + animation.delay) {
          progression = 1
          animation.finished = true
        }
        let value = animation.valueFromProgression(progression)

        object[property] = template(value)
      }
      if (animations.length) {
        this.requestId = requestAnimationFrame(() => this.tick())
      }
    }
  }

  pause () {
    if (this.state !== 'playing') {
      return
    }
    this.state = 'paused'

    this.pauseTime = Date.now()
    if (this.requestId !== null) {
      cancelAnimationFrame(this.requestId)
    }
  }

  start () {
    if (this.state !== 'inited') {
      return
    }
    this.state = 'playing'
    this.startTime = Date.now()
    this.tick()
  }

  restart () {
    if (this.state === 'playing') {
      this.pause()
    }
    this.animations = []
    this.requestId = null
    this.state = 'playing'
    this.startTime = Date.now()
    this.pauseTime = null
    this.tick()
  }

  resume () {
    if (this.state !== 'paused') {
      return
    }
    this.state = 'playing'

    this.startTime += Date.now() - this.pauseTime
    this.tick()
  }

  add (animation, addTime) {
    this.animations.push(animation)
    animation.finished = false
    if (this.state === 'playing') {
      animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime
    } else {
      animation.addTime = addTime !== void 0 ? addTime : 0
    }
  }
}

export class Animation {
  constructor (object, property, start, end, duration, delay , timingFunction, template) {
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay || 0
    this.timingFunction = timingFunction
  }
  valueFromProgression (progression) {
    return this.start + progression * (this.end - this.start)
  }
}

export class ColorAnimation {
  constructor (object, property, start, end, duration, delay , timingFunction, template) {
    this.object = object
    this.property = property
    this.template = template || ((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`)
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay || 0
    this.timingFunction = timingFunction
  }
  valueFromProgression (progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.r - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a)
    }
  }
}

/*
let animation = new Animation(object, property, start, end, duration, delay , timingFunction) 
let animation2 = new Animation(object2, property2, start, end, duration, delay , timingFunction) 

let timeline = new Timeline

timeline.add(animation)
timeline.add(animation2)

timeline.start()
timeline.pause()
timeline.resume()
timeline.stop()

setTimeout
setInterval
requestAnimationFrame

*/
