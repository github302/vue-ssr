export function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
                resolve(window.mallCloud.components.goodsDetail__v2shuai);
                console.log("script loaded");
                script.onload = script.onreadystatechange = null;
            }
        }
        script.setAttribute('src', src);
        document.body.appendChild(script);
    })
    
}