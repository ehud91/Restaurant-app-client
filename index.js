import { spinner, 
         sleep } from './utils.js';
import { name, 
         orderItem,
         confirmYesNoAnswer,
         confirmOrder,
         displayUserOrder,
         doCancelOrder } from './logic.js';
import { CONSTANTS } from './consts.js';

``


const main = async() => {

    // Clear input screen
    console.clear();

    // Input question Customer Name
    const answerName = await name();

    await spinner(CONSTANTS.SPINNER_MESSAGE_LOADING_INPUT, 2000);

    // Answer customer name
    await console.log(`Hi ${answerName}`);

    await spinner(CONSTANTS.SPINNER_MESSAGE_LOADING_QUESTION, 2000);

    const pickItems = [];
    let yesNoAnswer = true;
    while (yesNoAnswer) {

        const answerItem = await orderItem();

        pickItems.push(answerItem);
    
        await spinner(CONSTANTS.SPINNER_MESSAGE_LOADING_INPUT, 2000);

        // Answer customer order
        console.log(`You ordered: ${answerItem}`);

        // confirm the order
        yesNoAnswer = await confirmYesNoAnswer();

        if (yesNoAnswer) {

            console.log(`Continue your order`);
            await spinner(CONSTANTS.SPINNER_MESSAGE_LOADING_QUESTION, 2000);
        }
    }

    // display the user order
    displayUserOrder(pickItems);

    // confirm the order - yes/no
    const confirmOrderAnswer = await confirmOrder();

    await spinner(CONSTANTS.SPINNER_MESSAGE_LOADING_INPUT, 2000);

    // cancel the order - yes/no
    if (doCancelOrder(confirmOrderAnswer)) {
        await spinner(CONSTANTS.SPINNER_MESSAGE_LOADING_INPUT, 2000);
        console.log();
        console.log(`Your order has been canceled`);
        console.log(`${CONSTANTS.THANK_YOU_MESSAGE} ${answerName}`);
        console.log();
        console.log('See you next time...');
        console.log();
        return false;
    }

    await spinner(CONSTANTS.SPINNER_MESSAGE_LOADING_INPUT, 2000);

    console.log();
    console.log(`${CONSTANTS.THANK_YOU_MESSAGE} ${answerName},`);
    console.log(`${CONSTANTS.STARTING_MESSAGE}`);
    console.log();
}




main();