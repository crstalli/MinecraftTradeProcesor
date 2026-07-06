import { world, ItemStack } from "@minecraft/server";

const EXCHANGE_RATES = {
    // FARMER
    "minecraft:wheat": { cost: 20, reward: 1 },
    "minecraft:potato": { cost: 15, reward: 1 },
    "minecraft:carrot": { cost: 15, reward: 1 },
    "minecraft:beetroot": { cost: 15, reward: 1 },
    "minecraft:pumpkin": { cost: 6, reward: 1 },
    "minecraft:melon_slice": { cost: 4, reward: 1 },
    "minecraft:sweet_berries": { cost: 10, reward: 1 },
    "minecraft:nether_wart": { cost: 12, reward: 1 },

    // FLETCHER
    "minecraft:stick": { cost: 32, reward: 1 },
    "minecraft:flint": { cost: 10, reward: 1 },
    "minecraft:string": { cost: 14, reward: 1 },
    "minecraft:feather": { cost: 12, reward: 1 },
    "minecraft:tripwire_hook": { cost: 8, reward: 1 },

    // FISHERMAN
    "minecraft:coal": { cost: 10, reward: 1 },
    "minecraft:cod": { cost: 10, reward: 1 },
    "minecraft:salmon": { cost: 10, reward: 1 },
    "minecraft:tropical_fish": { cost: 6, reward: 1 },
    "minecraft:pufferfish": { cost: 4, reward: 1 },

    // BUTCHER
    "minecraft:raw_chicken": { cost: 14, reward: 1 },
    "minecraft:raw_porkchop": { cost: 14, reward: 1 },
    "minecraft:raw_mutton": { cost: 14, reward: 1 },
    "minecraft:raw_beef": { cost: 14, reward: 1 },
    "minecraft:raw_rabbit": { cost: 14, reward: 1 },
    "minecraft:dried_kelp_block": { cost: 10, reward: 1 },
    "minecraft:sweet_berries": { cost: 10, reward: 1 },

    // CLERIC
    "minecraft:rotten_flesh": { cost: 32, reward: 1 },
    "minecraft:gold_ingot": { cost: 3, reward: 1 },
    "minecraft:lapis_lazuli": { cost: 1, reward: 1 },
    "minecraft:rabbit_foot": { cost: 4, reward: 1 },
    "minecraft:glowstone_dust": { cost: 4, reward: 1 },
    "minecraft:scute": { cost: 4, reward: 1 },
    "minecraft:ender_pearl": { cost: 1, reward: 1 },

    // ARMORER / TOOLSMITH / WEAPONSMITH
    "minecraft:coal": { cost: 10, reward: 1 },
    "minecraft:iron_ingot": { cost: 4, reward: 1 },
    "minecraft:diamond": { cost: 1, reward: 1 },

    // LEATHERWORKER
    "minecraft:leather": { cost: 6, reward: 1 },
    "minecraft:rabbit_hide": { cost: 6, reward: 1 },
    "minecraft:flint": { cost: 10, reward: 1 },
    "minecraft:scute": { cost: 4, reward: 1 },

    // CARTOGRAPHER
    "minecraft:paper": { cost: 24, reward: 1 },
    "minecraft:glass_pane": { cost: 16, reward: 1 },

    // MASON
    "minecraft:clay_ball": { cost: 10, reward: 1 },
    "minecraft:stone": { cost: 20, reward: 1 },
    "minecraft:granite": { cost: 16, reward: 1 },
    "minecraft:diorite": { cost: 16, reward: 1 },
    "minecraft:andesite": { cost: 16, reward: 1 },
    "minecraft:polished_granite": { cost: 12, reward: 1 },
    "minecraft:polished_diorite": { cost: 12, reward: 1 },
    "minecraft:polished_andesite": { cost: 12, reward: 1 },
    "minecraft:dripstone_block": { cost: 12, reward: 1 },
    "minecraft:quartz": { cost: 12, reward: 1 },

    // SHEPHERD
    "minecraft:white_wool": { cost: 16, reward: 1 },
    "minecraft:light_gray_wool": { cost: 16, reward: 1 },
    "minecraft:gray_wool": { cost: 16, reward: 1 },
    "minecraft:black_wool": { cost: 16, reward: 1 },
    "minecraft:brown_wool": { cost: 16, reward: 1 },
    "minecraft:red_wool": { cost: 16, reward: 1 },
    "minecraft:orange_wool": { cost: 16, reward: 1 },
    "minecraft:yellow_wool": { cost: 16, reward: 1 },
    "minecraft:lime_wool": { cost: 16, reward: 1 },
    "minecraft:green_wool": { cost: 16, reward: 1 },
    "minecraft:cyan_wool": { cost: 16, reward: 1 },
    "minecraft:light_blue_wool": { cost: 16, reward: 1 },
    "minecraft:blue_wool": { cost: 16, reward: 1 },
    "minecraft:purple_wool": { cost: 16, reward: 1 },
    "minecraft:magenta_wool": { cost: 16, reward: 1 },
    "minecraft:pink_wool": { cost: 16, reward: 1 },

    // DYES (Shepherd)
    "minecraft:white_dye": { cost: 12, reward: 1 },
    "minecraft:light_gray_dye": { cost: 12, reward: 1 },
    "minecraft:gray_dye": { cost: 12, reward: 1 },
    "minecraft:black_dye": { cost: 12, reward: 1 },
    "minecraft:brown_dye": { cost: 12, reward: 1 },
    "minecraft:red_dye": { cost: 12, reward: 1 },
    "minecraft:orange_dye": { cost: 12, reward: 1 },
    "minecraft:yellow_dye": { cost: 12, reward: 1 },
    "minecraft:lime_dye": { cost: 12, reward: 1 },
    "minecraft:green_dye": { cost: 12, reward: 1 },
    "minecraft:cyan_dye": { cost: 12, reward: 1 },
    "minecraft:light_blue_dye": { cost: 12, reward: 1 },
    "minecraft:blue_dye": { cost: 12, reward: 1 },
    "minecraft:purple_dye": { cost: 12, reward: 1 },
    "minecraft:magenta_dye": { cost: 12, reward: 1 },
    "minecraft:pink_dye": { cost: 12, reward: 1 },

    // CUSTOM OVERRIDE
    "minecraft:emerald_block": { cost: 63, reward: 1, rewardItem: "minecraft:diamond" }
};

world.beforeEvents.worldInitialize.subscribe(init => {
    init.blockComponentRegistry.registerCustomComponent("cztl:trade_processor", {
        onPlace(ev) {
            ev.block.getComponent("minecraft:tick")?.startTick();
        },
        onTick(ev) {
            processTrade(ev.block);
        }
    });
});

function processTrade(block) {
    const input = findInputHopper(block);
    if (!input) return;

    const output = findOutputHopper(block);
    if (!output) return; // ⭐ EXIT EARLY — no hopper below

    const inv = input.getComponent("minecraft:inventory")?.container;
    if (!inv) return;

    processSlot(inv, inv.getItem(0), 0, output);
    processSlot(inv, inv.getItem(1), 1, output);
}

function findInputHopper(block) {
    const { x, y, z } = block.location;
    const dim = block.dimension;

    const offsets = [
        { x: 0, y: 1, z: 0 },   // above
        { x: 1, y: 0, z: 0 },   // east
        { x: -1, y: 0, z: 0 },  // west
        { x: 0, y: 0, z: 1 },   // south
        { x: 0, y: 0, z: -1 }   // north
    ];

    for (const o of offsets) {
        const b = dim.getBlock({ x: x + o.x, y: y + o.y, z: z + o.z });
        if (b?.typeId === "minecraft:hopper") return b;
    }

    return null;
}

function findOutputHopper(block) {
    const { x, y, z } = block.location;
    const dim = block.dimension;

    const b = dim.getBlock({ x, y: y - 1, z });
    if (b?.typeId !== "minecraft:hopper") return null;

    return b.getComponent("minecraft:inventory")?.container ?? null;
}

function processSlot(inv, item, slotIndex, outputInv) {
    if (!item) return;

    const type = item.typeId;

    // ⭐ FORWARD TRADE
    if (EXCHANGE_RATES[type]) {
        const rate = EXCHANGE_RATES[type];
        const rewardItem = rate.rewardItem ?? "minecraft:emerald";

        if (item.amount >= rate.cost + 1) {
            const remaining = item.amount - rate.cost;
            inv.setItem(slotIndex, new ItemStack(type, remaining)); // leave 1
            outputInv.addItem(new ItemStack(rewardItem, rate.reward)); // ⭐ send to bottom hopper
            return;
        }
    }

    // ⭐ REVERSE TRADE
    const rewardTypes = new Set(["minecraft:emerald", "minecraft:diamond", "minecraft:emerald_block"]);

    if (rewardTypes.has(type)) {
        for (const itemId in EXCHANGE_RATES) {
            const rate = EXCHANGE_RATES[itemId];
            const rewardItem = rate.rewardItem ?? "minecraft:emerald";

            if (type !== rewardItem) continue;

            if (item.amount >= rate.reward + 1) {
                const remaining = item.amount - rate.reward;
                inv.setItem(slotIndex, new ItemStack(type, remaining)); // leave 1
                outputInv.addItem(new ItemStack(itemId, rate.cost)); // ⭐ send to bottom hopper
                return;
            }
        }
    }
}
