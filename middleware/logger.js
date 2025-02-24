const logger=(req,res,next)=>{
    const time=new Intl.DateTimeFormate("en-US",{
        dataStyle:"short",
        timeStyle:"medium",

    }).format(Date.now());

    console.log('[${time}] ${req.method} ${req.url}');
    next();

};

module.exports=logger;