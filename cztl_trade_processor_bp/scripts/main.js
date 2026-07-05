import { world } from "@minecraft/server";

// Define your villager-style trade prices here
const tradeTable = [
    {
        input_id: "minecraft:gold_ingot",
        input_cost: 3,         // Costs 3 Gold Ingots...
        output_id: "minecraft:emerald",
        output_amount: 1       // ...to get 1 Emerald
    },
    {
        input_id: "minecraft:iron_ingot",
        input_cost: 4,         // Costs 4 Iron Ingots...
        output_id: "minecraft:emerald",
        output_amount: 1       // ...to get 1 Emerald
    },
    {
        input_id: "minecraft:diamond",
        input_cost: 1,         // Costs 1 Diamond...
        output_id: "minecraft:emerald",
        output_amount: 2       // ...to get 2 Emeralds
    }
];

world.beforeEvents.worldInitialize.subscribe((event) => {
    event.blockComponentRegistry.registerCustomComponent("cztl:trade_processor", {
        onPlace(e) {
            const { block } = e;
            // Initialize empty simulated slots
            block.setDynamicProperty("slot_0", JSON.stringify({ id: "minecraft:air", count: 0 }));
            block.setDynamicProperty("slot_1", JSON.stringify({ id: "minecraft:air", count: 0 }));
        },
        
        onTick(e) {
            const { block } = e;
            
            let slot0 = JSON.parse(block.getDynamicProperty("slot_0") || '{"id":"minecraft:air","count":0}');
            let slot1 = JSON.parse(block.getDynamicProperty("slot_1") || '{"id":"minecraft:air","count":0}');

            // Skip processing if slot 0 is empty
            if (slot0.id === "minecraft:air" || slot0.count <= 0) return;

            // Find a matching trade price definition
            const trade = tradeTable.find(t => t.input_id === slot0.id);
            if (!trade) return;

            // Check if player has supplied enough items to meet the price threshold
            if (slot0.count >= trade.input_cost) {
                // Ensure output slot can accept the items (is empty or has matching item stack space)
                if (slot1.id === "minecraft:air" || (slot1.id === trade.output_id && slot1.count + trade.output_amount <= 64)) {
                    
                    // Deduct the payment cost from Slot 0
                    slot0.count -= trade.input_cost;
                    if (slot0.count === 0) slot0.id = "minecraft:air";

                    // Dispense the output reward to Slot 1
                    slot1.id = trade.output_id;
                    slot1.count += trade.output_amount;

                    // Commit updated transaction pricing back to block storage
                    block.setDynamicProperty("slot_0", JSON.stringify(slot0));
                    block.setDynamicProperty("slot_1", JSON.stringify(slot1));
                }
            }
        }
    });
});