const functions = require("firebase-functions");
const admin = require("firebase-admin");
const moment = require("moment-timezone");

admin.initializeApp();

exports.sendDailyNotifications = functions.pubsub
    .schedule("0 8,12,17 * * *")
    .timeZone("Asia/Kolkata")
    .onRun(async (context) => {
      const messages = [
        {
          title: "Good Morning!",
          body: "Let's get this day started with Event Planner App",
        },
        {
          title: "Good Afternoon!",
          body: "Let's log in to Event Planner App",
        },
        {
          title: "Evening Reminder",
          body: "Let's read about Event Planner App",
        },
      ];

      // Get the current hour in IST
      const currentHour = moment().tz("Asia/Kolkata").hour();
      let messageIndex;

      if (currentHour === 8) {
        messageIndex = 0; // Good Morning
      } else if (currentHour === 12) {
        messageIndex = 1; // Good Afternoon
      } else if (currentHour === 17) {
        messageIndex = 2; // Evening Reminder
      } else {
        console.log("No message to send at this hour.");
        return null; // Exit if not one of the specified hours
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
