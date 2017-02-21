window.onload = function(){
    imgLocation("container","box");
    console.log(document.getElementById("container").style.width);
    window.onscroll  = function(){
        if(checkflag()){
            var container = document.getElementById("container");
            for(var i=0;i<10;i++){
                var box = document.createElement("div");
                box.className = "box";
                var boximg = document.createElement("div");
                boximg.className = "box_img";
                var randomNum = Math.floor(Math.random()*10);
                var img = document.createElement("img");
                img.src = "img/"+randomNum+".jpg";
                container.appendChild(box);
                box.appendChild(boximg);
                boximg.appendChild(img);
            }
            imgLocation("container","box");
            
        }
    }
    
}

function checkflag(){
    var container = document.getElementById("container");
    var childarr = getchildarr(container,"box");
    var lastchild = childarr[childarr.length-1];
    var lcOffsetTop = lastchild.offsetTop;
    var clientheight = document.documentElement.clientHeight||document.body.clientHeight;
    var scolltop = document.documentElement.scrollTop||document.body.scrollTop;
    if(lcOffsetTop<clientheight+scolltop){
        return true;
    }
}

function imgLocation(parent,content){
    var container = document.getElementById(parent);
    var childarr = getchildarr(container,content);
    var imgwidth = childarr[0].offsetWidth;
    var clientwidth = document.documentElement.clientWidth||document.body.clientWidth;
    var num = Math.floor(clientwidth/imgwidth);
    container.style.cssText = "width:" + imgwidth*num + "px;margin: 0 auto;" ;
    var childheight = [];
    for(var i=0;i<childarr.length;i++){
        if(i < num){
            childheight.push(childarr[i].offsetHeight);
        }else{
            var minheight = Math.min.apply(null,childheight);
            childarr[i].style.position = "absolute";
            childarr[i].style.top = minheight+"px";
            var minnum = getminnum(childheight,minheight);
            childarr[i].style.left = childarr[minnum].offsetLeft+"px";
            childheight[minnum] +=  childarr[i].offsetHeight;
        }
    }
}

function getchildarr(parent,content){
    var child = parent.getElementsByTagName("*");
    var childarr = [];
    for(var i=0;i<child.length;i++){
        if(child[i].className == content){
            childarr.push(child[i]);
        }
    }
    return childarr;
}

function getminnum(childheight,minheight){
    for(var i=0;i<childheight.length;i++){
        if(childheight[i] == minheight){
            return i;
        }
    }
}
