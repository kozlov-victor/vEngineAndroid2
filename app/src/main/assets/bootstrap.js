window = this;
window._requestAnimationFrameGlobalCallBack = undefined;

(()=>{
    window.requestAnimationFrame = (fn)=>{
        if (_requestAnimationFrameGlobalCallBack===undefined) _requestAnimationFrameGlobalCallBack = fn;
    };
})();


//const buffer = gl.createBuffer();
//gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//gl.bufferData(gl.ARRAY_BUFFER, 1024, gl.STATIC_DRAW);

requestAnimationFrame(()=>{
    const r = Math.random();
    _gl.clearColor(r,r,r,1.);
    _gl.clear(_gl.COLOR_BUFFER_BIT);
    console.log(r);
});