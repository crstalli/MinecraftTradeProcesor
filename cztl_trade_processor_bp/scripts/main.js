/*import { world } from "@minecraft/server";

const tradeTable = [
    {
        input_id: "minecraft:gold_ingot",
        input_cost: 3,
        output_id: "minecraft:emerald",
        output_amount: 1
    },
    {
        input_id: "minecraft:iron_ingot",
        input_cost: 4,
        output_id: "minecraft:emerald",
        output_amount: 1
    },
    {
        input_id: "minecraft:diamond",
        input_cost: 1,
        output_id: "minecraft:emerald",
        output_amount: 2
    }
];

function getBlockStorage(block) {
    const key = `cztl_tp_${block.dimension.id}_${block.location.x}_${block.location.y}_${block.location.z}`;
    const rawData = world.getDynamicProperty(key);
    return rawData ? JSON.parse(rawData) : {
        slot_0: { id: "minecraft:air", count: 0 },
        slot_1: { id: "minecraft:air", count: 0 }
    };
}

function saveBlockStorage(block, data) {
    const key = `cztl_tp_${block.dimension.id}_${block.location.x}_${block.location.y}_${block.location.z}`;
    world.setDynamicProperty(key, JSON.stringify(data));
}

world.beforeEvents.worldInitialize.subscribe((event) => {
    event.blockComponentRegistry.registerCustomComponent("cztl:trade_processor", {
        onPlace(e) {
            const block = e.block;
            saveBlockStorage(block, {
                slot_0: { id: "minecraft:air", count: 0 },
                slot_1: { id: "minecraft:air", count: 0 }
            });
        },

        onInteract(e) {
            const { block, player } = e;
            if (!block || !player) return;

            let storage = getBlockStorage(block);
            const playerEquip = player.getComponent("minecraft:equippable");
            const heldItem = playerEquip?.getEquipment("Mainhand");

            // If player interacts with an empty hand, show them what's inside the processor slots
            if (!heldItem) {
                player.sendMessage(`\n§b--- Trade Processor Status ---§r\nInput Slot (0): ${storage.slot_0.count}x ${storage.slot_0.id}\nOutput Slot (1): ${storage.slot_1.count}x ${storage.slot_1.id}\n§b----------------------------§r`);
                return;
            }

            // If player clicks with an item, try to insert it into Slot 0 if it's on the trade table
            const isValidTradeItem = tradeTable.some(t => t.input_id === heldItem.typeId);
            
            if (isValidTradeItem) {
                if (storage.slot_0.id === "minecraft:air" || storage.slot_0.id === heldItem.typeId) {
                    const currentCount = storage.slot_0.id === "minecraft:air" ? 0 : storage.slot_0.count;
                    
                    if (currentCount + 1 <= 64) {
                        storage.slot_0.id = heldItem.typeId;
                        storage.slot_0.count = currentCount + 1;
                        
                        // Deduct item from player inventory hand
                        if (heldItem.amount > 1) {
                            heldItem.amount -= 1;
                            playerEquip.setEquipment("Mainhand", heldItem);
                        } else {
                            playerEquip.setEquipment("Mainhand", undefined);
                        }

                        saveBlockStorage(block, storage);
                        player.onScreenDisplay.setActionBar(`§aDeposited 1x ${heldItem.typeId} into Input Slot.§r`);
                    }
                }
            } else if (heldItem.typeId === "minecraft:air" && storage.slot_1.count > 0) {
                // Quick feature: if they interact with a tool or empty container action, pull items from output slot
                player.onScreenDisplay.setActionBar(`§eOutput container holds uncollected trade balances.§r`);
            }
        },
        
        onTick(e) {
            const block = e.block;
            if (!block) return;
            
            let storage = getBlockStorage(block);
            let slot0 = storage.slot_0;
            let slot1 = storage.slot_1;

            if (slot0.id === "minecraft:air" || slot0.count <= 0) return;

            const trade = tradeTable.find(t => t.input_id === slot0.id);
            if (!trade) return;

            if (slot0.count >= trade.input_cost) {
                if (slot1.id === "minecraft:air" || (slot1.id === trade.output_id && slot1.count + trade.output_amount <= 64)) {
                    
                    slot0.count -= trade.input_cost;
                    if (slot0.count === 0) slot0.id = "minecraft:air";

                    slot1.id = trade.output_id;
                    slot1.count += trade.output_amount;

                    storage.slot_0 = slot0;
                    storage.slot_1 = slot1;
                    saveBlockStorage(block, storage);
                }
            }
        }
    });
});*/

import { world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    // This registration string MUST match the block JSON custom_components array exactly
    initEvent.blockComponentRegistry.registerCustomComponent("cztl:trade_processor", {
        
        // This method handles the right-click event natively
        onPlayerInteract(event) {
            const { block, player } = event;
            
            // Send a quick test chat to confirm the click is working
           
            
            // Your trading logic goes here...
        }
    });
});
import { world, Container } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent("cztl:trade_processor", {
        
        onPlayerInteract(event) {
            const { block, player } = event;
            
            // Get the block's internal inventory component container
            const inventoryComponent = block.getComponent("minecraft:inventory");
             player.sendMessage("§a[Trade Processor] Right-click detected successfully!");
            if (inventoryComponent && inventoryComponent.container) {
                // Force the player's screen to open the block's container view
                player.getComponent("minecraft:inventory")?.container; 
                 player.sendMessage("§a[Trade Processor] COntainer detected successfully!");
                // Native command execution to reliably display container screens for custom blocks
                player.runCommandAsync(`container open ${block.location.x} ${block.location.y} ${block.location.z}`);
            }
        }
    });
});