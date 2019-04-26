// 1.let
// 2.const
// 3.箭头函数
// 4.参数展开
function fn1(a=1,b,...args){
    let arr1 = [1,2,3]
    let arr2 = [4,5,6]
    let arr = [a,...arr1,...arr2,...args]
    console.log(arr);
    // 5.解构赋值
    let [x,y,z] = [1,2,3];
    console.log(x,y,z)
    let {o,p,q} = {o:1,p:2,q:3}
    console.log(o,p,q)
    let [{n1,n2},[x1,x2,x3],str1] = [{n1:1,n2:2},[1,2,3],"dkfj"]
    let [json,arr3,str2] = [{n1:1,n2:2},[1,2,3],"dkfj"]
    console.log(n1,n2,x1,x2,x3,str1)
    console.log(json,arr3,str2)
}

// 6.数组api
// map:映射
// reduce：汇总
// filter：过滤器
// forEach：循环（迭代）
function fn2() {
    let arr = [1,2,3];
    let arr1 = arr.map(item=>item*2);
    console.log(arr1);
    let avg = arr.reduce((tmp,item,index)=>{
        if(index!=arr.length-1){
            return tmp + item
        }else{
            return (tmp + item)/arr.length
        }
    })
    console.log(avg);
    let result = arr.filter(item=>item>2)
    console.log(result);
    let arr2 = [
        {name:'xiaoming',score:70},
        {name:'xiaowang',score:97},
        {name:'xiaocui',score:30},
        {name:'xiaofei',score:59}
    ]
    console.log(arr2.filter(item=>item.score>=60));
}

// 7.字符串api模板字符串
function fn3(){
    let str = "www.baidu.com"
    console.log(str.startsWith('www'))// true
    console.log(str.endsWith("com"))// true

}

// 8.面向对象
function fn4(){
    class User{
        constructor(name,pwd){
            this.name = name;
            this.pwd = pwd;
        }
        showName(){
            alert(this.name);
        }
        showPwd(){
            alert(this.pwd);
        }
    }
    let wanglimei = new User('wanglimei',1234);
    wanglimei.showName()
    wanglimei.showPwd()

    class Vip extends User{
        constructor(name,pwd,level){
            super();
            this.level = level;
        }
        showLevel(){
            
        }
    }
}

export {fn1,fn2,fn3,fn4}
