const query=window.location.search.substring(1).split("&");
for (var i = 0, max=query.length; i<max; i++) {
    var param=query[i].split("=");
    console.log(param);

}
console.log(param[1]);
let open;
let store;
let tx;
let request;
var db=window.indexedDB || window.msIndexedDB || window.webkitIndexedDB || window.mozIndexedDB;
db?console.log("support"):console.log("not support");
request=db.open("DataStore",1);

request.onerror=function (e) {
    console.log("Error"+e);
};
request.onupgradeneeded=function (e) {
    open=e.target.result;
    store=open.createObjectStore("data", {keyPath:"name"});// or {keyPath:'Id',autoIncrement:true;
};

request.onsuccess=function (e) {
    open = e.target.result;
    tx = open.transaction("data", "readwrite");
    store = tx.objectStore("data");
    const getData = store.get(param[1]);
    getData.onsuccess = function (get) {
        open = get.target.result;
        // card(get.target.result);
        console.log(get.target.result);
        resume(open);
        edu(open.Education);
    };
    function resume(resu) {
        const left=document.querySelector(".leftDiv");
        // const div=document.createElement("div");
        // div.classList.add("card");
        // left.appendChild(div);
        const image=document.createElement("img");
        image.src="img/raj.jpg";
        left.appendChild(image);
        const h2 = document.createElement("h2");
        h2.textContent = resu.name;
        left.appendChild(h2);
        const mail=document.createElement("h3");
        left.appendChild(mail);
        const p=document.createElement("p");
        p.textContent=resu.gmail;
        left.appendChild(p);
        const h5=document.createElement("h5");
        h5.textContent=resu.number;
        left.appendChild(h5);
    }
    function edu(education) {
        const right=document.querySelector(".rightDiv");
        for (var i in education){
            var heading=document.createElement("h2");
            heading.textContent=education[i].College;
            right.appendChild(heading);
        }

    }
};