module.exports = (URL,callback) =>{

    URL = (/https:\/\/.*\/bootstrap.min.css/g.test(URL)) ? URL : URL;

    var response = {redirectURL : URL}
    callback(response);
}