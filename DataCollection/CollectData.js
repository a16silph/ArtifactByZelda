var fetchStart = "fetch-start";
var fetchDone = "fetch-done";
var fetchDuration = "fetch-duration";
Init();
function Init(){
    var perfTimes = parseInt(localStorage.getItem("PerfTimes"));
    if(isNaN(perfTimes) || perfTimes < 1){
        return;
    }

    console.log(`Fetch ${perfTimes} started`);
    performance.mark(fetchStart);
    window.onload = incrementPerfTest;
}

function incrementPerfTest() {
    performance.mark(fetchDone);
    var measure = performance.measure(fetchDuration, fetchStart, fetchDone);
    var perfTimes = parseInt(localStorage.getItem("PerfTimes"));
    console.log(`Fetch ${perfTimes} done`);
    perfTimes = perfTimes - 1;
    localStorage.setItem("PerfTimes", perfTimes);

    var duration = measure.duration / 1000;

    var perfResult = localStorage.getItem("PerfResult");
    perfResult += `\n${duration}`;
    localStorage.setItem("PerfResult", perfResult);


    if(perfTimes < 1){
            console.log("Performance check done!");
        return;
    }
    location.reload();
}



function setupPerfButton(){
    var perfButton = document.createElement ('button');
    perfButton.innerHTML = '<button id="perfButton" type="button">'
            + 'Performance x 10</button>'
            ;
    document.body.appendChild (perfButton);
    perfButton.addEventListener("click", PerformanceCheck(10));
}

function setupDownloadButton(){
    var perfResult = localStorage.getItem("PerfResult");
    var resultsText = document.createElement ('div');
    resultsText.innerHTML = `<p>${perfResult}</p>`;

    var downloadButton = document.createElement ('div');
    downloadButton.innerHTML = '<button id="perfButton" type="button">'
            + 'Download</button>'
            ;
    document.body.appendChild (downloadButton);
    document.body.appendChild (resultsText);
}

function Download(){
  var perfResult = localStorage.getItem("PerfResult");
  var totalTimes = localStorage.getItem("TotalTimes");
  download(perfResult, `PerformanceTest_${typeName}_${totalTimes}.csv`, "string");
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
function PerformanceCheck(times){
    console.log(`Start performance test ${times}`);
    localStorage.setItem("PerfTimes", times);
    localStorage.setItem("PerfResult", `${typeName}`);
    localStorage.setItem("TotalTimes", times);
    location.reload();
}
