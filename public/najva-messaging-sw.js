importScripts('https://app.najva.com/static/cdn/najva-app/najva-app.js');
importScripts('https://app.najva.com/static/cdn/najva-app/najva-messaging.js');

// configuration

var config = {
    messagingSenderId: "334645784830"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

function isMobileUserAgent() {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(self.navigator.userAgent || self.navigator.vendor);
    return check;
}
const isMobile = isMobileUserAgent();
messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);

    const notificationTitle = payload.data.title;

    var expireTime = parseInt(payload.data.expireTime);

    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon,
        image: payload.data.image,
        requireInteraction: true,
        data: payload.data,
        silent: payload.data.silent || false,
        dir: payload.data.direction || 'auto',
        tag: payload.data.tag || '',
        renotify: payload.data.renotify || false,
        timestamp: payload.data.timestamp,
        badge: payload.data.badge,
        vibrate: payload.data.vibrate,
        sound: payload.data.sound,
    };
    let notif_actions = [];
    if (payload.data.btn1_enabled && payload.data.btn1_action) {
        if (isMobile) {
            if (
                payload.data.btn1_action === "open-link"
                || payload.data.btn1_action === "open-app"
                || payload.data.btn1_action === "open-call"
                || payload.data.btn1_action === "open-sms"
                || payload.data.btn1_action === "open-telegram-channel"
                || payload.data.btn1_action === "join-telegram-channel"
            ) {
                notif_actions.push({
                    title: payload.data.btn1_title,
                    icon: payload.data.btn1_icon,
                    action: "btn1_clicked",
                });
            }
        }
        else {
            if (
                payload.data.btn1_action === "open-link"
                || payload.data.btn1_action === "open-telegram-channel"
                || payload.data.btn1_action === "join-telegram-channel"
            ) {
                notif_actions.push({
                    title: payload.data.btn1_title,
                    icon: payload.data.btn1_icon,
                    action: "btn1_clicked",
                });
            }
        }
    }
    if (payload.data.btn2_enabled && payload.data.btn2_action) {
        if (isMobile) {
            if (
                payload.data.btn2_action === "open-link"
                || payload.data.btn2_action === "open-app"
                || payload.data.btn2_action === "open-call"
                || payload.data.btn2_action === "open-sms"
                || payload.data.btn2_action === "open-telegram-channel"
                || payload.data.btn2_action === "join-telegram-channel"
            ) {
                notif_actions.push({
                    title: payload.data.btn2_title,
                    icon: payload.data.btn2_icon,
                    action: "btn2_clicked",
                });
            }
        }
        else {
            if (
                payload.data.btn2_action === "open-link"
                || payload.data.btn2_action === "open-telegram-channel"
                || payload.data.btn2_action === "join-telegram-channel"
            ) {
                notif_actions.push({
                    title: payload.data.btn2_title,
                    icon: payload.data.btn2_icon,
                    action: "btn2_clicked",
                });
            }
        }
    }
    notificationOptions["actions"] = notif_actions;

    var notificationPromise = self.registration.showNotification(notificationTitle,
        notificationOptions);

    notificationPromise.then(function () {
        registration.getNotifications().then(function (notifications) {
            var current_notification = notifications[notifications.length - 1];
            console.log(current_notification);
            if (expireTime > 0) {
                setTimeout(function () {
                    current_notification.close()
                }, expireTime);
            }
        });
    });

    return notificationPromise;
});


self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification);
    event.notification.close();
    event.notification.clicked = true;
    if (event.action === "btn1_clicked") {
        event.waitUntil(
            clients.matchAll({
                type: "window",
                includeUncontrolled: true
            })
                .then(function (clientList) {
                    const action = event.notification.data.btn1_action;
                    const final_address = event.notification.data.btn1_final_address;
                    const content = event.notification.data.btn1_content;
                    let url = final_address;
                    if (isMobile) {
                        url = `https://click.najva.com/call-actions?action=${encodeURIComponent(action)}&final_address=${encodeURIComponent(final_address)}&content=${encodeURIComponent(content)}`;
                    }
                    if (clients.openWindow) {
                        return clients.openWindow(url);
                    }
                })
        );
    }
    else if (event.action === "btn2_clicked") {
        event.waitUntil(
            clients.matchAll({
                type: "window",
                includeUncontrolled: true
            })
                .then(function (clientList) {
                    const action = event.notification.data.btn2_action;
                    const final_address = event.notification.data.btn2_final_address;
                    const content = event.notification.data.btn2_content;
                    let url = final_address;
                    if (isMobile) {
                        url = `https://click.najva.com/call-actions=${encodeURIComponent(action)}&final_address=${encodeURIComponent(final_address)}&content=${encodeURIComponent(content)}`;
                    }
                    if (clients.openWindow) {
                        return clients.openWindow(url);
                    }
                })
        );
    }
    else {
        event.waitUntil(
            clients.matchAll({
                type: "window",
                includeUncontrolled: true
            })
                .then(function (clientList) {
                    var url = "";
                    if (event.notification.data.complete_url) {
                        url = event.notification.data.complete_url
                    }
                    else {
                        url = "https://click.najva.com/redirect/?notification_id=" + event.notification.data.notification_id;
                        url += '&website_id=' + event.notification.data.website_id;
                        url += '&api_key=' + event.notification.data.api_key;
                        url += "&next=" + event.notification.data.url;
                    }

                    for (var i = 0; i < clientList.length; i++) {
                        var client = clientList[i];
                        if (client.url === url && 'focus' in client)
                            return client.focus();
                    }
                    if (clients.openWindow) {
                        return clients.openWindow(url);
                    }
                })
        );
    }
});

self.addEventListener('notificationclose', function (event) {
    var p = new Promise(function (resolve, reject) {
        if (event.notification.clicked) {
            resolve('ok');
        }
    });
    event.waitUntil(p);
    event.notification.close();
});


