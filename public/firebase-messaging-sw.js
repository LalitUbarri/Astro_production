importScripts('https://www.gstatic.com/firebasejs/8.2.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.2/firebase-messaging.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.2/firebase-analytics.js');

var notifyPayload = '';
firebase.initializeApp({

	apiKey: "AIzaSyBsD9t9guYXiTYKmq7J_M--dRhArQ1z_4I",
	authDomain: "astro-user-app.firebaseapp.com",
	projectId: "astro-user-app",
	storageBucket: "astro-user-app.appspot.com",
	messagingSenderId: "775309704174",
	appId: "1:775309704174:android:d48ca182375e2ca9deecff",
	measurementId: "G-LSRVDRDT8C"

});


const messaging = firebase.messaging();

/*
messaging.onBackgroundMessage(function(payload) {
	console.log('Received background message ', payload);
  
	const notifyPayload = payload;
	const notificationOptions = {
	  body: payload.data
	};

	let targetAction = notifyPayload.data.targetAction;
	let targetActionData = notifyPayload.data.targetActionData;
	console.log("targetAction", targetAction,"targetActionData",targetActionData);
  
	self.registration.showNotification(targetActionData,
	  notificationOptions);
  });

  */


self.addEventListener('push', function (event) {
	console.log('Push Notification Received.');
	var eventData = event.data.text();
	obj = JSON.parse(eventData); //Parse the received JSON object.

	//printing payload 
	console.log("PAyload is " + JSON.stringify(obj, 2, null));

	notifyPayload = obj;


	//obj={"data":{"gcm.notification.message":"camp today","gcm.notification.scheduleId":"86","gcm.notification.pushType":"1","campaignId":"94","targetAction":"4","sound":"default","gcm.notification.campaignId":"94","targetActionData":"RECHARGE","title":"camp today","message":"camp today","body":"camp today","click_action":"4","pushType":"1","gcm.notification.targetActionData":"RECHARGE","scheduleId":"86","gcm.notification.targetAction":"4"},"from":"1096120539981","priority":"high","notification":{"title":"camp today","body":"camp today","click_action":"4"},"collapse_key":"do_not_collapse"}
	//const title = obj.data.title;

	click = obj.data.targetActionData;

	var options = {
		body: obj.data.body,
		icon: obj.data.icon,
		actions: [
			{
				action: 'coffee-action',
				title: 'Coffee',
				icon: ''
			},
			{
				action: 'doughnut-action',
				title: 'Doughnut',
				icon: ''
			}]
	};
	//event.preventDefault();
	let targetAction = notifyPayload.data ? notifyPayload.data.targetAction : "";
	let targetActionData = notifyPayload.data ? notifyPayload.data.targetActionData : "";
	let title = notifyPayload.data ? notifyPayload.data.title : "";
	let body = notifyPayload.data ? notifyPayload.data.body : "";

	console.log("targetAction", targetAction, "targetActionData", targetActionData);


	if (targetAction == 6 && targetActionData) {
		self.registration.showNotification(title, {
			body: body,
			actions: [
				{ action: 'accept', title: 'Accept' },
				{ action: 'reject', title: 'Reject' }]
		});
	}
	else {
		self.registration.showNotification(title, {
			body: body
		});

	}

	//toast.success('successful',targetActionData);


});



self.addEventListener('notificationclick', function (event) {
	console.log("Notification clicked");
	event.notification.close();
	event.preventDefault(); // prevent the browser from focusing the Notification's tab
	console.log("OPTIONS DATA", notifyPayload);
	let targetAction = notifyPayload.data.targetAction;
	let targetActionData = notifyPayload.data.targetActionData;

	if (!event.action) {
		// Was a normal notification click
		console.log('Notification Click.');
		return;
	}

	var link = location.origin + "/astrologer/chat?targetActionType=" + targetAction + "&targetActionData=" + targetActionData;

	switch (event.action) {
		case 'accept':
			if (targetAction == 6 && targetActionData) {
				link += "&requestStatus=Accepted";
				event.waitUntil(clients.openWindow(link));
			}
			break;
		case 'reject':
			if (targetAction == 6 && targetActionData) {
				console.log(`Unknown action clicked: '${event.action}'`);
			}
			break;
		default:
			console.log(`Unknown action clicked: '${event.action}'`);
			break;
	}




});

