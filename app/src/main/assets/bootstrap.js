window = this;
window.console = {
    log: (...args)=>__nativeBridge__.PRINT(args),
};

console.log(2/0, window,__nativeBridge__.PI);
window.getAnswer = (a)=>{return `answer is ${new Date().getTime()} ${a}!!!`;};