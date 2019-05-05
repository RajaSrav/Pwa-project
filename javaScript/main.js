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
    const getData=store.getAll();
    getData.onsuccess=function (get) {
        open=get.target.result;
        card(get.target.result);

    };
    function card(data) {
        let main=document.querySelector(".main");
        for(let i in data) {
            const div=document.createElement("div");
            div.classList.add("card");
            main.appendChild(div);
            const image=document.createElement("img");
            image.src="img/raj.jpg";
            div.appendChild(image);
            const a = document.createElement("a");
            a.textContent = data[i].name;

            div.appendChild(a);
            // const mail=document.createElement("h3");

            // a.appendChild(mail);
            const a=document.createElement("a");
            a.textContent=data[i].gmail;
            a.href="resume.html?name="+data[i].name;
            div.appendChild(a);
        }

    }

};
// request.onsuccess=function (e) {
//     open = e.target.result;
//
//     function getData(callback) {
//         tx = open.transaction("data", IDBTransaction.READ_ONLY);
//          store = tx.objectStore("data");
//         let result = [];
//
//         tx.oncomplete = function (e) {
//             callback(result);
//             // console.log(e);
//         };
//         store.getAll().onsuccess=function (e) {
//             result=e.target.result;
//             // console.log(rawData);
//
//         };
//     }
//
//
//     let main=document.querySelector(".main");
//     getData(function (data1) {
//         console.log(data1);
//         for(let i in data1) {
//             const h2 = document.createElement("h2");
//             h2.textContent = data1[i].name;
//             main.appendChild(h2);
//
//         }
//     });
//
// };
