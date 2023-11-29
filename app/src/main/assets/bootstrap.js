window = this;
window._requestAnimationFrameGlobalCallBack = ()=>{};
window._nextTick = ()=>{
    window._requestAnimationFrameGlobalCallBack(Date.now());
    window._taskQueue.drain();
};


_globalGL.texImage2D = (...args)=>{
    if (args.length===9) {
        _globalGL._texImage2D_9(...args);
    }
    else if (args.length===6) {
        args[5] = args[5]._bitmap.$id;
        _external._texImage2D_6(...args);
    }
    else throw new Error('wrong arguments for texImage2D invocation');
}

//const glNameByName = {};
//Object.keys(_globalGL).forEach(key=>{
//    glNameByName[_globalGL[key]] = key;
//});
//
//Object.keys(_globalGL).forEach(key=>{
//    const orig = _globalGL[key];
//    if (typeof _globalGL[key]!=='function') return;
//    if (key==='getError') return;
//    _globalGL[key] = (...args)=>{
//        const result = orig(...args);
//        if (_globalGL.getError()!==0) {
//            const argsDebug = [];
//            args.forEach(arg=>{
//                argsDebug.push(glNameByName[arg]||arg);
//            });
//            throw new Error(`error invocation ${key} with args ${argsDebug} (${args})`);
//        }
//        return result;
//    }
//});

(()=>{

    class TaskQueue {

        constructor(){
            this._tasks = [];
        }

        addNextTask(fn) {
            this._tasks.push(fn);
        }

        drain() {
            for (const t of this._tasks) {
                t();
            }
            this._tasks.length = 0;
        }

    }

    window._taskQueue = new TaskQueue();
    window._drainTaskQueue = ()=>window._taskQueue.drain();

    class CanvasStyle {

        constructor(){

        }

        set width(val){
            _external.setSurfaceWidth(parseInt(val));
        }

        get width(){
            return _external.getSurfaceWidth();
        }

        set height(val){
            _external.setSurfaceHeight(parseInt(val));
        }

        get height(){
            return _external.getSurfaceHeight();
        }
    }

    class Canvas {
        constructor(){
            this.style = new CanvasStyle();
            this.clientWidth = this.style.width;
            this.clientHeight = this.style.height;
            this.ontouchstart = ()=>{};
            this.ontouchmove = ()=>{};
            this.ontouchend = ()=>{};
        }
        getContext(val){
            if (val==='webgl') return _globalGL;
            else return null;
        }
        setAttribute(){
        }
        addEventListener(){
        }
        set width(val){
            this.style.width = val;
        }

        get width(){
            return this.style.width;
        }

        set height(val){
            this.style.height = val;
        }

        get height(){
            return this.style.height;
        }
    }

    class Image {

        constructor(){
            this._src = null;
            this._onload = null;
            this.onerror = null;
            this.width = 0;
            this.height = 0;
        }

        set src(val){
            this._src = val;
            _taskQueue.addNextTask(()=>{
                console.log('loading image data',this._src);
                const bitmapId = _external._loadBitmap(val);
                if (bitmapId!==0) {
                    this._bitmap = {$id:bitmapId};
                    this._onload && this._onload();
                }
                else this.onerror && this.onerror();
            });
        }

        get src(){
            return this._src;
        }

        set onload(cb) {
            this._onload = cb;
        }

        get onload(){
            return this._onload;
        }

    }
    window.Image = Image;

    const globalCanvas = new Canvas();
    _globalGL.canvas = globalCanvas;

    class Document {
        constructor(){
            this.body = {
                appendChild:()=>{},
                addEventListener:()=>{},
                style: {}
            }
        }
        createElement(val){
            if (val==='canvas') return globalCanvas;
            else throw new Error(`can not create element ${val}`);
        }
        getElementById(val){
            return globalCanvas;
        }
        querySelector(){
            return globalCanvas;
        }
        addEventListener(){
        }
    }

    window.document = new Document();
    window.navigator = {
        platform: 'vEngine',
        userAgent: 'vEngine'
    };
    window.innerWidth = innerWidth;
    window.innerHeight = innerHeight;
    window.self = window;
    window.performance = {
        now:()=>new Date().getTime(),
    };
    window.setTimeout = ()=>{};
    window.setInterval = ()=>{};
    window.scrollTo = ()=>{};
    window.requestAnimationFrame = (fn)=>{
        _requestAnimationFrameGlobalCallBack = fn;
    };
    window.addEventListener = ()=>{}; // todo
})();