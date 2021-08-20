console.log('This is alarm clock tutorial');

const setTimeController = document.getElementById('set-time');
const setTimeButton = document.getElementById('set-time-button');
setTimeButton.addEventListener('click', setAlarm);

const tableBody = document.getElementById('table-body');
const audio = new Audio('audio/New_Land.mp3');
let closedAlarm = false;
let intervalForSec;
let timeOutForAlarm;


function setAlarm() {
    clearInterval(intervalForSec);
    clearTimeout(timeOutForAlarm);
    closedAlarm = false;
    const settedTime = setTimeController.value;
    if (settedTime == '') {
        console.log('Please choose time');

        //can set alert
    }

    else {

        // console.log('Current time is '+ currentTime);
        // console.log('Set time is '+ settedTime);
        const diff = getDiff(settedTime);
        let remainingSeconds = (diff / 1000).toFixed(0);
        tableBody.innerHTML = `<tr>
                                    <td>${settedTime}</td>
                                    <td id="remaining-seconds">${remainingSeconds} s</td>
                                    <td><button id="cancel-alarm" class="btn">Delete</button></td>
                                </tr>`;
        document.getElementById('cancel-alarm').addEventListener('click', cancelAlarmFunc);
        intervalForSec = setInterval(() => {
            if (remainingSeconds > 0) {
                if (closedAlarm) {
                    clearInterval();
                } else {
                    document.getElementById('remaining-seconds').innerText = `${remainingSeconds - 1} s`;
                    remainingSeconds--;
                }
            } else {
                clearInterval();
            }
        }, 1000);
        timeOutForAlarm = setTimeout(() => {
            if (closedAlarm) {
                clearTimeout();
            } else {
                audio.play();
                document.getElementById('alert').style.visibility = "visible";
                document.getElementById('close-alert').addEventListener('click', closeAlertFunc);
            }
        }, diff)


        // audio.play();
        // setTimeout(() => {
        //     audio.pause();
        // }, 3000);
    }
}


function cancelAlarmFunc() {
    closedAlarm = true;
    document.getElementById('alert').style.visibility = "hidden";
    tableBody.innerHTML = '';
}


function closeAlertFunc() {
    audio.pause();
    document.getElementById('alert').style.visibility = "hidden";
    tableBody.innerHTML = '';

}

function getDiff(stringTime) {
    const timeArr = stringTime.split(':');
    // console.log(timeArr);
    const currentTime = new Date();
    const settedTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), timeArr[0], timeArr[1]);
    let diff = settedTime - currentTime;
    if (diff < 0) {
        diff = diff + 86400000;
    }
    console.log(diff);
    return diff;
}