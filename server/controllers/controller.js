const index=(req,res)=>{
    res.render("index.ejs",{
        title:"Hola mundo"
    });
}

module.exports = {
    index
}