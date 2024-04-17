let notifications = [];

function writeLog(log) {
    postMessage({type: 'writeLog', msg: log});
}

writeLog("Worker loaded");

onmessage = (e) => {
    const type = e.data.type;
    if (type === "showNotification") {
        writeLog("I will try to show a notification");

        showNotification(e.data.msg);
    }
    else if (type === "clearNotifications") {
        writeLog("I will clear all notifications but not ones who was displayed before page refresh");
        notifications.forEach(n => n.close());
        notifications = [];
    }
};

function showNotification(msg) {
    const notification = new Notification(msg);
    notification.onclick = function () {
        this.close();
    }
    notification.onshow = function () {
        writeLog("Notification displayed")
    }
    notification.onclose = function () {
        notifications = notifications.filter(n => n !== notification);
    }
    notifications.push(notification);
}