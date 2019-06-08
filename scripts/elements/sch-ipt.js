module.exports = class extends HTMLElement {    
    constructor(){
        super();

        this.addEventListener('change',e=>console.log(e))
        this.addEventListener('keypress', (k)=>{
//            console.log(k.key);

            var ele = this;
            if(k.key=='Enter'){
                k.preventDefault();
                if(this.innerText.slice(0,7) == 'https:/' || this.innerText.slice(0,7) == 'http://'){
                    getCurrentView().src=this.innerText;
                    getCurrentView().focus();
                    ele.innerHTML = this.innerText;
                } else {
                    urlify(this.innerText,(url)=>{
                        //console.log(url);
                        getCurrentView().src=url;
                        getCurrentView().focus();
                        ele.innerHTML = url;
                    });
                }
                

                
                //updateTabIcon(this.innerHTML);
            }else{
                document.querySelector('omni-box').change(this.innerText + k.key);
            }
        });
    }
}