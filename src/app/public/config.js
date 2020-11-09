window.fetchEnvVars = new Promise(function (resolve, reject) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            window.envVars = myObj;
            resolve(myObj);
        }
    };
    xmlhttp.open("GET", "config.json", true);
    xmlhttp.send();
});