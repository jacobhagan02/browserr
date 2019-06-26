module.exports = (URL,callback) =>{

    var og = URL;

    if(/(wss:\/\/|rubygems|github|stackoverflow|getbootstrap|jquery\.com|bitbucket|git|npm|yarn|bower|w3\.org|code|download|\.zip|\.tar|\.gz|reactjs\.org|facebook|C:\/|browserr)/i.test(URL)){
        var response = {}
        callback(response);
    }else{

        let i;
        const cache = {
            bootstrapC : "node_modules/bootstrap/dist/css/bootstrap.min.css",
            bootstrapM : "node_modules/bootstrap/dist/css/bootstrap.min.css.map",
            bootstrapJ :"node_modules/bootstrap/dist/js/bootstrap.min.js",
            bootstrapJM : "node_modules/bootstrap/dist/js/bootstrap.min.js.map",
            jqueryJ : "node_modules/jquery/dist/jquery.min.js",
            jqueryJ1 : "node_modules/jquery/dist/jquery.min.js",
            jqueryJM : "node_modules/jquery/dist/jquery.min.map",
            jqueryS : "node_modules/jquery/dist/jquery.slim.min.js",
            jquerySM : "node_modules/jquery/dist/jquery.min.map",
            jqueryC : "node_modules/jquery/dist/core.js",
            sizzleJ : "node_modules/jquery/external/sizzle/sizzle.min.js",
            sizzleM : "node_modules/jquery/external/sizzle/sizzle.min.map",
            reqjs : "cache/require.min.js",
            vueJS : "node_modules/vue/dist/vue.min.js",
            vueR : "node_modules/vue-router/dist/vue-router.js",
            babel : "node_modules/@babel/standalone/babel.min.js",
            react : "node_modules/react/umd/react.production.min.js",
            reactdom: "/home/jacobhagan2002/electron/browserr/node_modules/react-dom/umd/react-dom.production.min.js"
        }

        const tests = { 
            bootstrapC : /bootstrap(\.min)?\.css/,
            bootstrapM : /bootstrap(\.min)?\.css\.map/,
            bootstrapJ : /bootstrap(\.min)?\.js/,
            bootstrapJM : /bootstrap(\.min)?\.js\.map/,
            jqueryC : /jquery-?(\/|\.|-[0-9]\.[0-9]\.[0-9])?core\.js/,
            jqueryJ : /jquery(\.min)?\.js/,
            jqueryJ1 : /jquery-[0-9]\.[0-9]\.[0-9]\.min\.js/,
            jqueryJM : /jquery(-[0-9]\.[0-9]\.[0-9])?\.min\.map/,
            jqueryS : /jquery(-[0-9]\.[0-9]\.[0-9])?\.slim(-[0-9]\.[0-9]\.[0-9])?\.js/,
            jquerySM : /jquery(-[0-9]\.[0-9]\.[0-9])?\.slim(-[0-9]\.[0-9]\.[0-9])?\.min\.map/,
            sizzleJ : /sizzle(-[0-9]\.[0-9]\.[0-9])?\.js/,
            sizzleM : /sizzle(-[0-9]\.[0-9]\.[0-9])?\.min(-[0-9]\.[0-9]\.[0-9])?\.map/,
            reqjs : /require(\.min)?\.js/,
            vueJS : /vue-router(\.min)?\.js/,
            vueR : /vue(\.min)?\.js/,
            babel : /babel(\.min)?\.js/,
            react : /react\.production(\.min)?\.js/,
            reactdom : /react-dom(\.production)?(\.min)?\.js/
        }


        for(i in tests){
            URL = (tests[i].test(URL)) ? __dirname.replace(/\\/g,'/') + '/../' + cache[i] : URL;
        }

        // console.log(URL);
        if(URL === og){
            callback({});
        }else{
            // console.log('\n\nREDIRECT\n\n');
            callback({cancel: false, redirectURL : URL});
        }
    }
}