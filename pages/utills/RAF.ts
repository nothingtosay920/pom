type RAFoptions = {
  totalDuration: number,
  interval: number
}

type RAFFunc = (currentCount: number) => any

export const RAF = (func: RAFFunc, options: RAFoptions = { 
  totalDuration: 10 * 1000,
  interval: 1000
}) => {
  const totalDuration = options.totalDuration
  let requestRef: null | number = null;
  let startTime: number
  let prevEndTime;
  let prevTime: number
  let currentCount = totalDuration;
  let endTime: number
  let timeDifferance = 0; // 每1s倒计时偏差值，单位ms
  let interval = options.interval
  let nextTime = interval;

  const animate = (timestamp: DOMHighResTimeStamp) => {
    if (prevTime !== undefined) {
      const deltaTime = timestamp - prevTime;
      if (deltaTime >= nextTime) {
        prevTime = timestamp;
        prevEndTime = endTime;
        endTime = new Date().getTime();
        currentCount = currentCount - 1000;
        timeDifferance = endTime - startTime - (totalDuration - currentCount);
        nextTime = interval - timeDifferance;
        // 慢太多了，就立刻执行下一个循环
        if (nextTime < 0) {
          nextTime = 0;
        }
        console.log(`执行下一次渲染的时间是：${nextTime}ms`);
        func(currentCount)
        if (currentCount <= 0) {
          currentCount = 0;
          cancelAnimationFrame(requestRef as number);
          return;
        }
      }
    } else {
      startTime = new Date().getTime();
      prevTime = timestamp;
      endTime = new Date().getTime();
    }
    requestRef = requestAnimationFrame(animate);
  };
  requestRef = requestAnimationFrame(animate);
}

// requestRef = requestAnimationFrame(animate);

