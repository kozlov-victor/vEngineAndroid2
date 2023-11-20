window = this;
window._requestAnimationFrameGlobalCallBack = undefined;

(()=>{
    window.requestAnimationFrame = (fn)=>{
        if (_requestAnimationFrameGlobalCallBack===undefined) _requestAnimationFrameGlobalCallBack = fn;
    };
})();


const buffer = _gl.createBuffer();
_gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
_gl.bufferData(_gl.ARRAY_BUFFER, 1024, _gl.STATIC_DRAW);

requestAnimationFrame(()=>{
    const r = Math.random();
    _gl.clearColor(r,r,r,1.);
    _gl.clear(_gl.COLOR_BUFFER_BIT);
});