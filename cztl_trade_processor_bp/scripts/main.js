import { world } from "@minecraft/server";

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

world.beforeEvents.worldInitialize.subscribe((event) => {
    event.blockComponentRegistry.registerCustomComponent("cztl:trade_processor", {
        onPlace(e) {
            const block = e.block;
            block.setDynamicProperty("slot_0", JSON.stringify({ id: "minecraft:air", count: 0 }));
            block.setDynamicProperty("slot_1", JSON.stringify({ id: "minecraft:air", count: 0 }));
        },
        
        onTick(e) {
            const block = e.block;
            
            let slot0 = JSON.parse(block.getDynamicProperty("slot_0") || '{"id":"minecraft:air","count":0}');
            let slot1 = JSON.parse(block.getDynamicProperty("slot_1") || '{"id":"minecraft:air","count":0}');

            if (slot0.id === "minecraft:air" || slot0.count <= 0) return;

            const trade = tradeTable.find(t => t.input_id === slot0.id);
            if (!trade) return;

            if (slot0.count >= trade.input_cost) {
                if (slot1.id === "minecraft:air" || (slot1.id === trade.output_id && slot1.count + trade.output_amount <= 64)) {
                    
                    slot0.count -= trade.input_cost;
                    if (slot0.count === 0) slot0.id = "minecraft:air";

                    slot1.id = trade.output_id;
                    slot1.count += trade.output_amount;

                    block.setDynamicProperty("slot_0", JSON.stringify(slot0));
                    block.setDynamicProperty("slot_1", JSON.stringify(slot1));
                }
            }
        }
    });
});