window = this;
window.console = {
    log: (...args)=>__nativeBridge__.PRINT(args),
};

console.log(2/0, window,Date,__nativeBridge__.PI);
console.log('---------js----------------------');
console.log('---------js----------------------');
console.log('---------js----------------------');
console.log('---------js----------------------');
console.log('---------js----------------------');
console.log('---------js----------------------');
window.getAnswer = (a)=>{
    const val = new Date().getTime();
    console.log(`success message! ${a} ${val} ${__nativeBridge__.PI}`);
};