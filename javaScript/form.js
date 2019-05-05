function submit() {
    let open;
    let store;
    let tx;
    let request;
    const name=document.getElementById("name").value;
    const gmail=document.getElementById("mailId").value;
    const number=document.getElementById("phone_number").value;
    const data1=document.getElementById("data1").value;
    const data2=document.getElementById("data2").value;
    const data3=document.getElementById("data3").value;
    const data4=document.getElementById("data4").value;
    const data5=document.getElementById("data5").value;
    const data6=document.getElementById("data6").value;
    // console.log(number);
    var db=window.indexedDB || window.msIndexedDB || window.webkitIndexedDB || window.mozIndexedDB;
    db?console.log("support"):console.log("not support");
    request=db.open("DataStore",1);

    request.onerror=function (e) {
        console.log("Error"+e);
    };
    request.onupgradeneeded=function (e) {
        open=e.target.result;
        store=open.createObjectStore("data", {keyPath:"name"});
    };
    request.onsuccess=function (e) {
        open=e.target.result;
        tx=open.transaction("data","readwrite");
        store=tx.objectStore("data");
        store.put({
            name:name,
            gmail:gmail,
            number:number,
            Education:[{
                College: data1
            }, {
                College: data2
            }, {
                College: data3
            }, {
                College: data4
            }, {
                College: data5
            },{
                College:data6
            }]

        });
        window.open("index.html","_self")
    }
}