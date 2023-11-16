window = this;
window.console = {
    log: (...args)=>PRINT(args),
};

console.log(2/0, window,PI);
window.getAnswer = (a)=>{return `answer is ${new Date().getTime()} ${a}!`;};