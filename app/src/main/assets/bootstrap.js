window = this;
window._requestAnimationFrameGlobalCallBack = ()=>{};

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
            for (const t of tasks) {
                t();
            }
            this.tasks.length = 0;
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