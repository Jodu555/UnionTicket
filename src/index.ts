import axios from 'axios';
import {CommandManager, Command} from '@jodu555/commandmanager';
import { RootVenueData, RootShopping } from './types';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

interface Spiel {
    ID: string;
    inBasket: boolean;
    lastConfirmation: number;
}

const spiele: Spiel[] = [];

const SESSION_ID = process.env.SESSION_ID;

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: false});
async function tryToAddVenueToBasket(venueID: string): Promise<BasketReturn> {
    try {
        const response = await axios<RootVenueData>({
            method: 'POST',
            url: `https://tickets.union-zeughaus.de/unveu/SynwayVenue/VenueData/Veranstaltungen2/${venueID}`,
            headers: {
                "Cookie": `ASP.NET_SessionId=${SESSION_ID}; Path=/; Expires=Mon, 20 Apr 2026 09:56:25 GMT;`
            }
        })
        console.log(response.status);
        
        
        if(response.data.error !== undefined) {
            console.log(response.data.error);
            return {success: false};
        }

        if(response.data == undefined) {
            console.log(response.data);
            return {success: false};
        }
        
        if(response.data.data.Blocks == undefined) {
            console.log('No blocks found');
            console.log(response.data);
            return {success: false};
        }


        const blocks = response.data.data.Blocks.filter(x => x.Stand != 'SEKTOR 5' && x.Blocked != true);
        
        const chosenBlock = blocks[0];
        
        if(chosenBlock) {

            console.log(`Trying to add ${blocks[0].ID} in venue ${venueID} to the Basket`);
            return await addToBasket(venueID, blocks[0].ID);
        } else {

            return {success: false};
        }
    } catch (error) {
        console.log(error);
        return {success: false};
    }
}

interface BasketSuccessReturn {
    success: true;
    data: {
        titles: string[];
        price: number;
    }
}

interface BasketErrorReturn {
    success: false;
}

type BasketReturn = BasketSuccessReturn | BasketErrorReturn;

async function addToBasket(venueID: string, blockID: string): Promise<BasketReturn> {
    try {
        
        const bodyData = new FormData();
    
        bodyData.append('Count', 1);
        bodyData.append('BlockID', blockID,);
        bodyData.append('ResellingID', '',);
        bodyData.append('ZD', '',);
        bodyData.append('ID', venueID,);
        bodyData.append('SubName', 'Veranstaltungen2');
    
        const response = await axios<RootShopping>({
            method: 'POST',
            url: `https://tickets.union-zeughaus.de/unveu/SynwayVenue/BookTicket/Veranstaltungen2/${venueID}`,
            data: bodyData,
            headers: {
                "Cookie": `ASP.NET_SessionId=${SESSION_ID}; Path=/; Expires=Mon, 20 Apr 2026 09:56:25 GMT;`
            }
        });
    
        if(response.data.error !== undefined) {
            console.log(response.data.error);
            return {success: false};
        }
    
        if(response.data.data.NewShoppingCart == undefined) {
            console.log('No NewShoppingCart found');
            console.log(response.data);
            return {success: false};
        }

        // console.log(response.status, response.statusText, response.data);
        console.log('ADDED TO BASKET OMG 🤯');
    
        const addedItem = response.data.data.NewShoppingCart.Items[0];
    
        return {success: true, data: {
            titles: [addedItem.Name1, addedItem.Name2],
            price: addedItem.Price
        }};
    } catch (error) {
        console.log(error);
        return {success: false};
    }
}
test();
async function test() {
    // bot.on('message', async (msg) => {
    //     console.log(msg.text);
    // });
    // bot.sendMessage(process.env.TELEGRAM_CHAT_ID, `<pre>${JSON.stringify({test: true})}</pre>`);
}


main();
async function main() {
    const commandManager = CommandManager.createCommandManager(process.stdin, process.stdout);    
    commandManager.registerCommand(
        new Command(
            'add', // The Command
            'add <ID>', // A Usage Info with arguments
            'Adds a Spiel to be watched', // A Description what the command does
            (command, [...args], scope) => {

                const ID = args[1] as string;

                spiele.push({
                    ID,
                    inBasket: false,
                    lastConfirmation: 0
                });

                return `Spiel ${ID} Added`;
            }
        )
    );

    commandManager.registerCommand(
        new Command(
            'list', // The Command
            'list', // A Usage Info with arguments
            'Lists all watched Spiele', // A Description what the command does
            (command, [...args], scope) => {
                const spieleString = spiele.map(x => `- ${x.ID} (${x.inBasket ? '' : 'nicht'} im Warenkorb) zum Basket hinzugefügt: ${x.lastConfirmation}`).join('\n');
                return `Liste der Spiele:\n\n${spieleString}`;
            }
        )
    );

    commandManager.registerCommand(
        new Command(
            'remove', // The Command
            'remove <ID>', // A Usage Info with arguments
            'Removes a watched Spiel', // A Description what the command does
            (command, [...args], scope) => {

                const ID = args[1] as string;

                const spiel = spiele.find(x => x.ID === ID);
                if(spiel === undefined) {
                    return `Spiel ${ID} nicht gefunden`;
                }

                spiele.splice(spiele.indexOf(spiel), 1);

                return `Spiel ${ID} entfernt`;
            }
        )
    );

    await checkForSpiele();
}

async function checkForSpiele() {

    for await (const spiel of spiele) {

        if(spiel.inBasket) {
            continue;
        }

        const worked = await tryToAddVenueToBasket(spiel.ID);
        console.log(worked);
        
        if(worked.success === false) {
            console.log('This did not work 😢');
            continue;
        }

        spiel.inBasket = true;

        let message = `Ein Ticket wurde zu deinem Warenkorb hinzugefügt:\n\n`
        message += ` Preis: ${worked.data.price}€\n`;
        message += `  ${worked.data.titles.map((title) => `- ${title}`).join('\n')}
        `.trim();

        bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
    }

    setTimeout(checkForSpiele, 30 * 1000);
}