// 一个简单的事件订阅发布的实现，取代原生Event对象，提升IE下的兼容性
export function LoadEvent () {
    this.listeners = {};
    this.on = function (eventName, callback) {
      if (this.listeners[eventName] === undefined) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(callback);
    };
    this.emit = function (eventName) {
      this.listeners[eventName] && this.listeners[eventName].forEach(callback => callback());
    };
}

export function loadScript(scriptSrc) {
  return new Promise((resolve) => {
      const script = document.createElement('script');
      script.onload = script.onreadystatechange = function() {
          if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
              console.log("client script 加载完成");
              resolve();
              script.onload = script.onreadystatechange = null;
          }
      };
      script.setAttribute('src', scriptSrc);
      document.body.appendChild(script);
  })
}