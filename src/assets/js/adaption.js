export function adaption(rootValue=37.5) {
    let dpr, rem, scale;
    let docEl = document.documentElement;
    let fontEl = document.createElement('style');
    let metaEl = document.querySelector("meta[name='viewport']");

    dpr = window.devicePixelRatio || 1;
    // rem = docEl.clientWidth * dpr / rootValue;
    rem =  dpr/2 * rootValue;//用于字体的rem适配
    scale = 1 / dpr;
    let width = dpr * window.screen.width;
    // let width = dpr * docEl.clientWidth;

    //设置viewport,进行缩放，达到高清适配效果
    metaEl.setAttribute(
      "content",
      "width=" +
        width +
        ",initial-scale=" +
        scale +
        ",maximum-scale=" +
        scale +
        ",minimum-scale=" +
        scale +
        ",user-scalable=no"
    );

    //设置data-dpi属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);

    //动态写入样式
    docEl.firstElementChild.appendChild(fontEl);
    fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

    //给js调用，某一dpr下rem和px之间的转换函数
    window.rem2px = function (v) {
        v = parseFloat(v);
        return v / rem;
    }
}

/* h5适配方案(设计稿750*1334 css样式书写可以全部采用px)
*  1 高清border 设置缩放适配
* 2 尺寸 vm适配 postcss - px - to - viewport
* 3 字体 rem适配 postcss-pxtorem 固定大小
* 
*
*
*
*/