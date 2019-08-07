import { Promise, isPromise } from 'q'
import { promises } from 'fs'

// 1.let
// 2.const
// 3.箭头函数
// 4.参数展开
export function fn1(a = 1, b, ...args) {
  let arr1 = [1, 2, 3]
  let arr2 = [4, 5, 6]
  let arr = [a, ...arr1, ...arr2, ...args]
  console.log(arr)
  // 5.解构赋值
  let [x, y, z] = [1, 2, 3]
  console.log(x, y, z)
  let { o, p, q } = { o: 1, p: 2, q: 3 }
  console.log(o, p, q)
  let [{ n1, n2 }, [x1, x2, x3], str1] = [{ n1: 1, n2: 2 }, [1, 2, 3], 'dkfj']
  let [json, arr3, str2] = [{ n1: 1, n2: 2 }, [1, 2, 3], 'dkfj']
  console.log(n1, n2, x1, x2, x3, str1)
  console.log(json, arr3, str2)
}

// 6.数组api
// map:映射
// reduce：汇总
// filter：过滤器
// forEach：循环（迭代）
export function fn2() {
  let arr = [1, 2, 3]
  let arr1 = arr.map(item => item * 2)
  console.log(arr1)
  let avg = arr.reduce((tmp, item, index) => {
    if (index != arr.length - 1) {
      return tmp + item
    } else {
      return (tmp + item) / arr.length
    }
  })
  console.log(avg)
  let result = arr.filter(item => item > 2)
  console.log(result)
  let arr2 = [
    { name: 'xiaoming', score: 70 },
    { name: 'xiaowang', score: 97 },
    { name: 'xiaocui', score: 30 },
    { name: 'xiaofei', score: 59 }
  ]
  console.log(arr2.filter(item => item.score >= 60))
}

// 7.字符串api模板字符串
export function fn3() {
  let str = 'www.baidu.com'
  console.log(str.startsWith('www')) // true
  console.log(str.endsWith('com')) // true
}

// 8.面向对象
export function fn4() {
  class User {
    constructor(name, pwd) {
      this.name = name
      this.pwd = pwd
    }
    showName() {
      alert(this.name)
    }
    showPwd() {
      alert(this.pwd)
    }
  }
  let wanglimei = new User('wanglimei', 1234)
  wanglimei.showName()
  wanglimei.showPwd()

  class Vip extends User {
    constructor(name, pwd, level) {
      super(name, pwd)
      this.level = level
    }
    showLevel() {
      alert(this.level)
    }
  }

  let chenglei = new Vip('chenglei', 12345, 'c1')
  chenglei.showName()
  chenglei.showPwd()
  chenglei.showLevel()
}

// 9.json对象
// JSON.stringify(obj)序列化
// JSON.parse(str)反序列化

// 10.对象简写
export function fn5(a, b, c) {
  let obj = {
    a,
    b,
    sum() {
      return a + b + c
    }
  }
  console.log(obj.sum())
}

// 11.promise（适合一次读一堆）
export function fn6() {
  let success = true
  let todo = true
  function createPromise(bool) {
    return new Promise(function(resolve, reject) {
      if (bool) {
        resolve(bool)
      } else {
        reject(bool)
      }
    })
  }
  let p2 = new Promise(function(resolve, reject) {
    if (todo) {
      resolve(todo)
    } else {
      reject(todo)
    }
  })
  p2.then(
    function(success) {
      alert(success)
    },
    function(success) {
      alert(success)
    }
  )
  //常用于页面异步请求
  Promise.all([createPromise(success), createPromise(todo)]).then(
    function(arr) {
      let [bool1, bool2] = arr
      alert(bool1)
      alert(bool2)
    },
    function() {
      alert('至少有一个失败了')
    }
  )
  //竞速
  Promise.race([createPromise(success), createPromise(todo)])
}

// 12.generator函数--中间能停(可用于解决异步问题)（适合读取数据同时处理逻辑问题）
export function fn7() {
  function* show1() {
    console.log('a')
    yield //暂停
    console.log('b')
  }
  let genObj1 = show1()
  genObj1.next() //'a
  genObj1.next() //'b'

  function* show2() {
    console.log('a')
    let c = yield //暂停 可传参
    console.log('b')
    console.log(c)
  }
  let genObj2 = show2()
  genObj2.next(5) //'a
  genObj2.next(8) //'b' 8

  function* show3() {
    console.log('a')
    yield 12 //暂停 可返回
    console.log('b')
    yield 18 //暂停 可返回
    console.log('c')
    return 22
  }
  let genObj3 = show3()
  let res1 = genObj3.next() //'a
  let res2 = genObj3.next() //'b'
  let res3 = genObj3.next() //'c'
  console.log(res1) // {value:12,done:false}
  console.log(res2) //  {value:18,done:false}
  console.log(res3) //  {value:22,done:true}
}

// es7,es8浏览器暂不支持
// 数组includes,keys/values/entries
//async await(取代generator)
export function fn8() {
  let arr = [1, 34, 5656, 90, 0]
  console.log(arr.includes(1)) //true
  let user = { name: 'wanglimei', score: 87 }
  for (let value of user.values) {
    console.log(value) //'wanglimei' 87
  }
  for (let [key, value] of user.entries) {
    console.log(`${key}=${value}`)
  }
  function createPromise(bool) {
    return new Promise(function(resolve, reject) {
      if (bool) {
        resolve(bool)
      } else {
        reject(bool)
      }
    })
  }
  async function fun() {
    let data1 = await createPromise(true)
    let data2 = await createPromise(false)
    console.log(data1, data2)
  }
  fun()
}
