import { world, ItemStack } from "@minecraft/server";

/**
 * EXCHANGE_RATES defines the ratio for Slot 1 items.
 * Example: stick = { cost: 32, reward: 1 }
 * Means:
 * 32 emeralds → 1 stick
 * 1 stick → 32 emeralds
 */
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

import { world, ItemStack } from "@minecraft/server";

/**
 * EXCHANGE_RATES defines the ratio for Slot 1 items.
 * Example: stick = { cost: 32, reward: 1 }
 * Means:
 * 32 emeralds → 1 stick
 * 1 stick → 32 emeralds
 */
const EXCHANGE_RATES = {
    "minecraft:stick": { cost: 32, reward: 1 },
    "minecraft:gold_ingot": { cost: 3, reward: 1 },
    "minecraft:iron_ingot": { cost: 4, reward: 1 },
    "minecraft:diamond": { cost: 1, reward: 1 },
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

/**
 * MAIN TRADE LOGIC
 */
function processTrade(block) {
    const inputHoppers = findInputHoppers(block);
    if (inputHoppers.length === 0) return;

    const output = findOutputHopper(block);
    if (!output) return;

    // Try each hopper until one succeeds
    for (const inv of inputHoppers) {
        if (processTradeForInventory(inv, output)) {
            return; // stop after first successful trade
        }
    }
}

/**
 * Trade logic for a single hopper inventory
 */
function processTradeForInventory(inv, output) {
    const slot1 = inv.getItem(0); // output item
    const slot2 = inv.getItem(1); // cost item
    const slot3 = inv.getItem(2); // discount item A
    const slot4 = inv.getItem(3); // discount item B

    if (!slot1 || !slot2) return false;

    const outputItem = slot1.typeId;
    const costItem = slot2.typeId;

    const rate = EXCHANGE_RATES[outputItem];
    if (!rate) return false;

    let costAmount = rate.cost;
    let rewardAmount = rate.reward;
    const rewardItem = rate.rewardItem ?? "minecraft:emerald";

    // ⭐ 20% discount if weakness potion + golden apple in ANY order
    if (isDiscountActive(slot3, slot4)) {
        costAmount = Math.max(1, Math.floor(costAmount * 0.80));
    }

    // ⭐ FORWARD TRADE: costItem → outputItem
    const costStack = findMatchingItem(inv, costItem);
    if (costStack && costStack.amount >= costAmount + 1) {
        costStack.amount -= costAmount;
        inv.setItem(costStack.slot, costStack);
        output.addItem(new ItemStack(outputItem, rewardAmount));
        return true;
    }

    // ⭐ REVERSE TRADE: outputItem → costItem (with hopper fullness check)
    if (!isOutputHopperFull(output)) {
        const outputStack = findMatchingItem(inv, outputItem);
        if (outputStack && outputStack.amount >= rewardAmount + 1) {
            outputStack.amount -= rewardAmount;
            inv.setItem(outputStack.slot, outputStack);
            output.addItem(new ItemStack(costItem, costAmount));
            return true;
        }
    }

    return false;
}

/**
 * Weakness potion + golden apple = discount active
 * Slot 3 and 4 order DOES NOT matter.
 */
function isDiscountActive(a, b) {
    if (!a || !b) return false;

    const weaknessPotions = [
        "minecraft:splash_potion",
        "minecraft:splash_potion:weakness",
        "minecraft:splash_potion:long_weakness"
    ];

    const isWeaknessA = weaknessPotions.some(p => a.typeId.startsWith(p));
    const isWeaknessB = weaknessPotions.some(p => b.typeId.startsWith(p));

    const isAppleA = a.typeId === "minecraft:golden_apple";
    const isAppleB = b.typeId === "minecraft:golden_apple";

    return (isWeaknessA && isAppleB) || (isWeaknessB && isAppleA);
}

/**
 * Prevent hopper overflow by requiring at least 32 free item spaces.
 */
function isOutputHopperFull(outputInv) {
    let freeSpace = 0;

    for (let i = 0; i < outputInv.size; i++) {
        const item = outputInv.getItem(i);
        if (!item) freeSpace += 64;
        else freeSpace += (64 - item.amount);
    }

    return freeSpace < 32;
}

/**
 * Find any item in the hopper matching typeId.
 */
function findMatchingItem(inv, typeId) {
    for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        if (item && item.typeId === typeId) {
            return { slot: i, amount: item.amount };
        }
    }
    return null;
}

/**
 * Find ALL input hoppers (up to 5)
 */
function findInputHoppers(block) {
    const { x, y, z } = block.location;
    const dim = block.dimension;

    const offsets = [
        { x: 0, y: 1, z: 0 },   // above
        { x: 1, y: 0, z: 0 },   // east
        { x: -1, y: 0, z: 0 },  // west
        { x: 0, y: 0, z: 1 },   // south
        { x: 0, y: 0, z: -1 }   // north
    ];

    const hoppers = [];

    for (const o of offsets) {
        const b = dim.getBlock({ x: x + o.x, y: y + o.y, z: z + o.z });
        if (b?.typeId === "minecraft:hopper") {
            const inv = b.getComponent("minecraft:inventory")?.container;
            if (inv) hoppers.push(inv);
        }
    }

    return hoppers;
}

/**
 * Find hopper below the block.
 */
function findOutputHopper(block) {
    const { x, y, z } = block.location;
    const dim = block.dimension;

    const b = dim.getBlock({ x, y: y - 1, z });
    if (b?.typeId !== "minecraft:hopper") return null;

    return b.getComponent("minecraft:inventory")?.container ?? null;
}
