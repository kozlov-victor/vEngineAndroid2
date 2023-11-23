window = this;
window._requestAnimationFrameGlobalCallBack = undefined;

(()=>{
    window.requestAnimationFrame = (fn)=>{
        if (_requestAnimationFrameGlobalCallBack===undefined) _requestAnimationFrameGlobalCallBack = fn;
    };
})();