window = this;
window.console = {
    log: (...args)=>PRINT(args),
};

console.log(2/0, window,PI);
var getAnswer = (a)=>{return `answer is ${a}!`;};