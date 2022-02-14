/*
 1) Install Courier SDK: npm install @trycourier/courier
 2) Make sure you allow ES module imports: Add "type": "module" to package.json file 
 */
import pkg from '@trycourier/courier';
const { CourierClient } = pkg;

const courier = CourierClient(
  { authorizationToken: "pk_prod_5PATKZVX9AMKP5MDJ3SNN2BACHAQ"});

const { messageId } = await courier.send({
  eventId: "courier-quickstart",
  recipientId: "jdechon1995@gmail.com",
  data: {
    favoriteAdjective: "awesomeness"
  },
  profile: {
    email: "jdechon1995@gmail.com"
  }
});
