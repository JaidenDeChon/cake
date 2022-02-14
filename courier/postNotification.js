import pkg from '@trycourier/courier';

const { CourierClient } = pkg;
const courier = CourierClient({ authorizationToken: "pk_prod_5PATKZVX9AMKP5MDJ3SNN2BACHAQ" });

export default async function sendNotification (data) {
    const profile = { email: 'jdechon1995@gmail.com'};
    const { messageId } = await courier.send({
        brand: "RX7QMXSPECMBR2GHANCK1TVBA1CN",
        eventId: "HW0F5J8ZPZ413PQG7QPHN5T6S9YV",
        recipientId: "594e1eee-54f7-4fc7-985d-20d0094e02c1",
        profile,
        data
    });
    return messageId;
}
