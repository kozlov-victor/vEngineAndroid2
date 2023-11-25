window = this;
window._requestAnimationFrameGlobalCallBack = ()=>{};

(()=>{
    window.requestAnimationFrame = (fn)=>{
        if (_requestAnimationFrameGlobalCallBack===undefined) _requestAnimationFrameGlobalCallBack = fn;
    };
})();