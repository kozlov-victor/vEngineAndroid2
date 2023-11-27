window = this;
window._requestAnimationFrameGlobalCallBack = ()=>{};

(()=>{
    window.requestAnimationFrame = (fn)=>{
        _requestAnimationFrameGlobalCallBack = fn;
    };
})();