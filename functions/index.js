const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendDailyNotifications = functions.pubsub
    .schedule("0 8,12,17 * * *")
    .timeZone("UTC")
    .onRun(async (context) => {
      const messages = [
        {
          title: "Good Morning!",
          body: "Let's get this day started with Event Planner App",
        },
        {
          title: "Lunch Time!",
          body: "Let Logging in to Event Planner App",
        },
        {
          title: "Evening Reminder",
          body: "Let's read about Event Planner App",
        },
      ];

      const currentHour = new Date().getUTCHours();
      let messageIndex;

      if (currentHour === 8) {
        messageIndex = 0;
      } else if (currentHour === 12) {
        messageIndex = 1;
      } else {
        messageIndex = 2;
      }

      const message = {
        notification: messages[messageIndex],
        topic: "daily_notifications",
      };

      try {
        const response = await admin.messaging().send(message);
        console.log("Successfully sent message:", response);
        return null;
      } catch (error) {
        console.log("Error sending message:", error);
        return null;
      }
    });
