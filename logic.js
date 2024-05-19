import { input, rawlist, confirm } from '@inquirer/prompts';


const name = async() => { return await input({ message: 'What is your name ?'}) };

const orderItem = async() => {
    // RawList input Order meal
    const answerItem = await rawlist({
        message: 'What do you want to order ?',
        choices: [
            {name: 'Pizza', value: 'Pizza'},
            {name: 'Salad', value: 'Salad'},
            {name: 'Humburger', value: 'Humburger'}
        ],
    });
    return answerItem;
};

const confirmYesNoAnswer = async() => { 
    return await confirm({ message: "Do you want sonething else ?"}) };

const confirmOrder = async() => { 
    return await confirm({ message: "Do you confirm your order ? we want to start prepare your order..."}); };


const displayUserOrder = (pickItems) => {
    const itemSpell = (pickItems.length > 1) ? 'items' : 'item';
    console.log(`You have ordered ${pickItems.length} ${itemSpell}:`);
    console.log();
    console.log('Your order: ');
    console.log();
    let itemInd = 1;
    for (let item of pickItems) {
        console.log(`${itemInd}. ${item}`);
    }
    console.log();
};

const doCancelOrder = (confirmOrderAnswer) => { return (confirmOrderAnswer === false); }

export {
    name,
    orderItem,
    confirmYesNoAnswer,
    confirmOrder,
    displayUserOrder,
    doCancelOrder
}