window = this;
window._requestAnimationFrameGlobalCallBack = undefined;

(()=>{
    window.requestAnimationFrame = (fn)=>{
        if (_requestAnimationFrameGlobalCallBack===undefined) _requestAnimationFrameGlobalCallBack = fn;
    };
})();

requestAnimationFrame(()=>{
    const r = Math.random();
    _gl.clearColor(r,r,r,1.);
    _gl.clear(_gl.COLOR_BUFFER_BIT);
    console.log(r);
});