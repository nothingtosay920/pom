import ReactMarkdown from 'react-markdown';     // 解析 markdown
import remarkGfm from 'remark-gfm';             // markdown 对表格/删除线/脚注等的支持
import MarkNav from 'markdown-navbar';          // markdown 目录
import style from '../styles/Article.module.sass'
import Head from 'next/head';
import Panel from './components/panel/panel';
import { Affix, Button } from '@arco-design/web-react';

const markdown = `# 浏览器

​		浏览器主要分为：浏览器进程、渲染器进程、GPU进程、网络进程、插件进程、缓存进程。

## Browser进程

1. 浏览器的主进程(负责协调、主控)，该进程只有一个。

2. 负责浏览器界面显示，与用户交互。如前进，后退等

3. 负责各个页面的管理，创建和销毁其他进程

4. 将渲染(Renderer)进程得到的内存中的Bitmap(位图)，绘制到用户界面上

      网络资源的管理，下载等

## 第三方插件进程

​		每种类型的插件对应一个进程，当使用该插件时才创建

## GPU进程

  只有一个，用于3D/动画绘制等等

 ## Renderer(渲染进程 重要)

​		即通常所说的浏览器内核(Renderer进程，内部是多线程)，每个Tab页面都有一个渲染进程，互不影响，主要作用为页面渲染，脚本执行，事件处理等。

​		渲染进程Renderer包括：GUI渲染线程、JS引擎线程、定时触发器线程。

### GUI渲染线程

1. 负责渲染浏览器界面，解析HTML，CSS，构建DOM树和RenderObject树，布局和绘制等

   \- 解析css，生成CSSOM(CSS规则树)

   \- 把DOM Tree 和CSSOM结合，生成Rendering Tree(渲染树)

2. 修改了一些元素的颜色或者背景色，页面就会重绘(Repaint),修改元素的尺寸，页面就会回流(Reflow)

3. 当页面需要Repaing和Reflow时GUI线程执行，绘制页面,回流(Reflow)比重绘(Repaint)的成本要高，我们要尽量避免Reflow和Repaint

4. GUI渲染线程与JS引擎线程是互斥的

   \- 当JS引擎执行时GUI线程会被挂起(相当于被冻结了)

   \- GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行

### JS引擎线程

1. JS引擎线程就是JS内核，负责处理Javascript脚本程序(例如V8引擎),运行代码
2. JS引擎一直等待着任务队列中任务的到来，然后加以处理
   	- 浏览器同时只能有一个JS引擎线程在运行JS程序，所以js是单线程运行的
    - 一个Tab页(renderer进程)中无论什么时候都只有一个JS线程在运行JS程序
3. GUI渲染线程与JS引擎线程是互斥的，js引擎线程会阻塞GUI渲染线程

 ### 定时触发器线程

1. setInterval 与 setTimeout 所在线程

2. 浏览器定时计数器并不是由JavaScript引擎计数的 (因为JavaScript引擎是单线程的，如果处于阻塞线程状态就会影响记计时的准确)

3. 通过单独线程来计时并触发定时(计时完毕后，添加到事件触发线程的事件队列中，等待JS引擎空闲后执行)，这个线程就是定时触发器线程，也叫定时器线程

4. W3C在HTML标准中规定，规定要求setTimeout中低于4ms的时间间隔算为4ms

### 异步http请求线程

1. 在XMLHttpRequest在连接后是通过浏览器新开一个线程请求

2. 将检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件，将这个回调再放入事件队列中再由JavaScript引擎执行

3. 简单说就是当执行到一个http异步请求时，就把异步请求事件添加到异步请求线程，等收到响应 (准确来说应该是http状态变化)，再把回调函数添加到事件队列，等待js引擎线程来执行




`
 
export default function Article() {

  return (
    <>
      <Head>
        <title>xxx</title>
      </Head>
      <div className={style.warpper}>
          <ReactMarkdown className={style.markdown} remarkPlugins={[remarkGfm]}>
            {markdown}
          </ReactMarkdown>
          <Affix offsetTop={150} className={style.panelAffix}>
            <Panel/>
          </Affix>
          <div className={style.asider}></div>  
          {/* <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-31guanzhu1"></use>
          </svg> */}
      </div>
    </>
  )

} 