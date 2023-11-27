const buffer = _gl.createBuffer();
_gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
_gl.bufferData(_gl.ARRAY_BUFFER, 1024, _gl.STATIC_DRAW);

_external.changeSurfaceWidth(600);
_external.changeSurfaceHeight(600);

requestAnimationFrame(()=>{
    const r = Math.random();
    _gl.clearColor(r,r,r,1.);
    _gl.clear(_gl.COLOR_BUFFER_BIT);
    console.log(ss.testValue);
});