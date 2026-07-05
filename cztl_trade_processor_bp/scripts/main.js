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

// Helper functions to safely read and write tracking data globally using coordinates
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
        
        onTick(e) {
            const block = e.block;
            if (!block) return;
            
            // Read tracking data via the working world API wrapper
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

                    // Commit updates back cleanly
                    storage.slot_0 = slot0;
                    storage.slot_1 = slot1;
                    saveBlockStorage(block, storage);
                }
            }
        }
    });
});