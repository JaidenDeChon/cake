import pkg from '@trycourier/courier';

const { CourierClient } = pkg;
const courier = CourierClient({ authorizationToken: "pk_prod_SMC9QRNYT3MPZNMGXHX07J6JNDGG" });

export default async function sendNotification (data) {
    const profile = { email: 'jdechon1995@gmail.com'};
    const { messageId } = await courier.send({
        brand: "BAT1B0YFP2MBFWJ8FTH1SBQBM5AV",
        eventId: "BY1PVVKZ2Q4TD2QPR2VRMWRP2C92",
        recipientId: "a82e8c7e-5dab-4b0e-9346-ef29eef24253",
        profile,
        data
    });
    return messageId;
}
