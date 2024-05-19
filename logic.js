import { input, rawlist, confirm } from '@inquirer/prompts';


const name = async() => { return await input({ message: 'What is your name ?'}) };

const generateChoices = async(menu) => {

    try {
        const items = (menu && menu.menuItems.length > 0) ? menu.menuItems : [];

        const mapChoices = new Map();
        const choices = [];
        for (let item of items) {
            const displayMenuItem = `*** ${item.name} *************** Price: ${item.price}$`;
            const choice = { name: displayMenuItem, value: item.itemId };
            choices.push(choice);
            mapChoices.set(item.itemId, displayMenuItem);
        }
        
        return { choices: choices, mapChoices: mapChoices };
    } catch (error) {
        console.log('Something went wrong...')
    }
}

const orderItem = async(menu) => {

    const { choices, mapChoices } = await generateChoices(menu);

    if (choices.length <= 0) { return false; }
    
    // RawList input Order meal
    const answerItem = await rawlist({
        message: 'What do you want to order ?',
        choices: choices,
    });
    
    return {
        answerItem: mapChoices.get(answerItem),
        answerItemId: answerItem,
        menu: menu
    };
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

const displayOrderSummery = (pickItems) => {

    console.log();
    console.log('Summery: ');
    console.log('Your order is: ');
    console.log();
    let itemInd = 1;
    for (let item of pickItems) {
        console.log(`${itemInd}. ${item}`);
    }
    console.log();

}

const generateNewOrder = (menu, pickItemsIds) => {

    const dishes = [];
    for (let pickItem of pickItemsIds) {
        const {itemId, menuId, price, name, preparationTime} = menu.menuItems.find(item => item.itemId == pickItem);
        const dish = { menuId: menuId, itemId: itemId, name: name, price: price, preparationTime: preparationTime };
        dishes.push(dish);
    }

    return { dishes: dishes };
}

const doCancelOrder = (confirmOrderAnswer) => { return (confirmOrderAnswer === false); }

export {
    name,
    orderItem,
    confirmYesNoAnswer,
    confirmOrder,
    displayUserOrder,
    doCancelOrder,
    generateNewOrder,
    displayOrderSummery
}