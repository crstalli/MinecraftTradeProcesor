import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

// Define your trade registry via an array of objects
const TRADE_REGISTRY = [
    {
        input: "minecraft:gold_ingot",
        cost: 3,
        output: "minecraft:emerald",
        reward: 1,
        displayName: "Gold Ingot"
    },
    {
        input: "minecraft:iron_ingot",
        cost: 4,
        output: "minecraft:emerald",
        reward: 1,
        displayName: "Iron Ingot"
    },
    {
        input: "minecraft:diamond",
        cost: 1,
        output: "minecraft:emerald",
        reward: 2,
        displayName: "Diamond"
    }
];

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent("cztl:trade_processor", {
        onPlayerInteract(event) {
            const { player } = event;
            
            const inventory = player.getComponent("minecraft:inventory")?.container;
            if (!inventory) return;

            // 1. Build a list of available trades based on what is currently in the player's inventory
            let validTrades = [];

            for (const trade of TRADE_REGISTRY) {
                let totalInputItems = 0;
                
                // Count total items matching this specific trade input
                for (let i = 0; i < inventory.size; i++) {
                    const item = inventory.getItem(i);
                    if (item && item.typeId === trade.input) {
                        totalInputItems += item.amount;
                    }
                }

                // If they have enough to do at least 1 trade, calculate it
                const possibleTrades = Math.floor(totalInputItems / trade.cost);
                if (possibleTrades > 0) {
                    validTrades.push({
                        ...trade,
                        possibleTrades: possibleTrades,
                        totalCost: possibleTrades * trade.cost,
                        totalReward: possibleTrades * trade.reward
                    });
                }
            }

            // 2. Build the dynamic Action Form UI
            const form = new ActionFormData().title("Trade Processor");

            if (validTrades.length === 0) {
                form.body("Your inventory does not contain any valid trading materials.\n\nRequired:\n- 3x Gold Ingot -> 1x Emerald\n- 4x Iron Ingot -> 1x Emerald\n- 1x Diamond -> 2x Emeralds");
                form.button("Close", "textures/ui/cross_out");
            } else {
                form.body("Select a valid processing route from your inventory below:");
                for (const trade of validTrades) {
                    form.button(`Process ${trade.totalCost}x ${trade.displayName}\n[+${trade.totalReward} Emeralds]`, "textures/ui/checkbox");
                }
            }

            // 3. Handle the form selection response
            form.show(player).then((response) => {
                if (response.canceled || validTrades.length === 0) return;

                const selectedTrade = validTrades[response.selection];
                let remainingCost = selectedTrade.totalCost;

                // Deduct input costs from player inventory slots
                for (let i = 0; i < inventory.size; i++) {
                    if (remainingCost <= 0) break;
                    const item = inventory.getItem(i);
                    
                    if (item && item.typeId === selectedTrade.input) {
                        if (item.amount <= remainingCost) {
                            remainingCost -= item.amount;
                            inventory.setItem(i, undefined);
                        } else {
                            item.amount -= remainingCost;
                            inventory.setItem(i, item);
                            remainingCost = 0;
                        }
                    }
                }

                // Deliver output rewards
                player.runCommandAsync(`give @s ${selectedTrade.output} ${selectedTrade.totalReward}`);
                player.sendMessage(`§a[Trade Processor] Successfully processed ${selectedTrade.possibleTrades} trades for ${selectedTrade.displayName}!`);
            });
        }
    });
});


// import { world, Container } from "@minecraft/server";

// world.beforeEvents.worldInitialize.subscribe((initEvent) => {
//     initEvent.blockComponentRegistry.registerCustomComponent("cztl:trade_processor", {
        
//         onPlayerInteract(event) {
//             const { block, player } = event;
            
//             // Get the block's internal inventory component container
//             const inventoryComponent = block.getComponent("minecraft:inventory");
//              player.sendMessage("§a[Trade Processor] Right-click detected successfully!");
//             if (inventoryComponent && inventoryComponent.container) {
//                 // Force the player's screen to open the block's container view
//                 player.getComponent("minecraft:inventory")?.container; 
//                  player.sendMessage("§a[Trade Processor] COntainer detected successfully!");
//                 // Native command execution to reliably display container screens for custom blocks
//                 player.runCommandAsync(`container open ${block.location.x} ${block.location.y} ${block.location.z}`);
//             }
//         }
//     });
// });