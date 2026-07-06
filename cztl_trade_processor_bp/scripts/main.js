import { world, ItemStack } from "@minecraft/server";

/**
 * EXCHANGE_RATES defines the ratio for Slot 1 items.
 */
const EXCHANGE_RATES = {
    "minecraft:wheat": { cost: 20, reward: 1 },
    "minecraft:potato": { cost: 15, reward: 1 },
    "minecraft:carrot": { cost: 15, reward: 1 },
    "minecraft:beetroot": { cost: 15, reward: 1 },
    "minecraft:pumpkin": { cost: 6, reward: 1 },
    "minecraft:melon_slice": { cost: 4, reward: 1 },
    "minecraft:sweet_berries": { cost: 10, reward: 1 },
    "minecraft:nether_wart": { cost: 12, reward: 1 },

    // Fletcher
    "minecraft:stick": { cost: 32, reward: 1 },
    "minecraft:flint": { cost: 10, reward: 1 },
    "minecraft:string": { cost: 14, reward: 1 },
    "minecraft:feather": { cost: 12, reward: 1 },
    "minecraft:tripwire_hook": { cost: 8, reward: 1 },

    // Fisherman
    "minecraft:coal": { cost: 10, reward: 1 },
    "minecraft:cod": { cost: 10, reward: 1 },
    "minecraft:salmon": { cost: 10, reward: 1 },
    "minecraft:tropical_fish": { cost: 6, reward: 1 },
    "minecraft:pufferfish": { cost: 4, reward: 1 },

    // Butcher
    "minecraft:raw_chicken": { cost: 14, reward: 1 },
    "minecraft:raw_porkchop": { cost: 14, reward: 1 },
    "minecraft:raw_mutton": { cost: 14, reward: 1 },
    "minecraft:raw_beef": { cost: 14, reward: 1 },
    "minecraft:raw_rabbit": { cost: 14, reward: 1 },
    "minecraft:dried_kelp_block": { cost: 10, reward: 1 },

    // Cleric
    "minecraft:rotten_flesh": { cost: 32, reward: 1 },
    "minecraft:gold_ingot": { cost: 3, reward: 1 },
    "minecraft:lapis_lazuli": { cost: 1, reward: 1 },
    "minecraft:rabbit_foot": { cost: 4, reward: 1 },
    "minecraft:glowstone_dust": { cost: 4, reward: 1 },
    "minecraft:scute": { cost: 4, reward: 1 },
    "minecraft:ender_pearl": { cost: 1, reward: 1 },

    // Smiths
    "minecraft:iron_ingot": { cost: 4, reward: 1 },
    "minecraft:diamond": { cost: 1, reward: 1 },

    // Leatherworker
    "minecraft:leather": { cost: 6, reward: 1 },
    "minecraft:rabbit_hide": { cost: 6, reward: 1 },

    // Cartographer
    "minecraft:paper": { cost: 24, reward: 1 },
    "minecraft:glass_pane": { cost: 16, reward: 1 },

    // Mason
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

    // Wool/Dyes
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

    // Custom
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
    const inputs = findInputHoppers(block);
    if (inputs.length === 0) return;

    const output = findOutputHopper(block);
    if (!output) return;

    for (const inv of inputs) {
        if (processTradeForInventory(inv, output)) return;
    }
}

/**
 * TRADE LOGIC FOR ONE HOPPER
 */
function processTradeForInventory(inv, output) {
    const slotA = inv.getItem(0);
    const slotB = inv.getItem(1);
    const slot3 = inv.getItem(2);
    const slot4 = inv.getItem(3);

    if (!slotA || !slotB) return false;

    let costItem, outputItem, rate;

    if (EXCHANGE_RATES[slotA.typeId]) {
        costItem = slotA.typeId;
        outputItem = slotB.typeId;
        rate = EXCHANGE_RATES[costItem];
    } else if (EXCHANGE_RATES[slotB.typeId]) {
        costItem = slotB.typeId;
        outputItem = slotA.typeId;
        rate = EXCHANGE_RATES[costItem];
    } else return false;

    const rewardItem = rate.rewardItem ?? "minecraft:emerald";
    const costAmount = rate.cost;
    const rewardAmount = rate.reward;

    const discountActive = isDiscountActive(slot3, slot4);
    const discountedCost = discountActive
        ? Math.max(1, Math.floor(costAmount * 0.8))
        : costAmount;

    // FORWARD TRADE (items → emerald)
    if (canOutput(output, rewardItem)) {
        const costMatch = findItem(inv, costItem);

        if (costMatch && costMatch.stack.amount > discountedCost) {
            consume(inv, costMatch.slot, discountedCost);
            output.addItem(new ItemStack(rewardItem, rewardAmount));
            return true;
        }
    }

    // REVERSE TRADE (emerald → items)
    if (canOutput(output, costItem)) {
        const rewardMatch = findItem(inv, rewardItem);

        if (rewardMatch && rewardMatch.stack.amount > rewardAmount) {
            consume(inv, rewardMatch.slot, rewardAmount);
            output.addItem(new ItemStack(costItem, costAmount));
            return true;
        }
    }

    return false;
}

/**
 * DISCOUNT LOGIC — ONLY ONE DEBUG MESSAGE
 */
function isDiscountActive(a, b) {

    if (!a || !b) return false;

    const isApple = (item) =>
        item.typeId === "minecraft:golden_apple";

    const isSpiderEye = (item) =>
        item.typeId === "minecraft:fermented_spider_eye";

    // Discount triggers when one slot has apple and the other has fermented spider eye
    return (isApple(a) && isSpiderEye(b)) || (isApple(b) && isSpiderEye(a));
}


/**
 * NEVER CONSUME CONFIG SLOTS BELOW 1
 */
function consume(inv, slot, amount) {
    const item = inv.getItem(slot);
    let remaining = item.amount - amount;

    if (slot === 0 || slot === 1) {
        if (remaining < 1) remaining = 1;
    }

    inv.setItem(slot, new ItemStack(item.typeId, remaining));
}

/**
 * FIND ANY MATCHING ITEM (CONFIG SLOTS PROTECTED)
 */
function findItem(inv, typeId) {
    for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        if (!item) continue;
        if (item.typeId !== typeId) continue;

        if ((i === 0 || i === 1) && item.amount <= 1) continue;

        return { slot: i, stack: item };
    }
    return null;
}

/**
 * OUTPUT HOPPER SPACE CHECK
 */
function canOutput(inv, itemId) {
    for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);

        if (!item) return true;

        if (item.typeId === itemId && item.amount < 64) return true;
    }

    return false;
}

/**
 * FIND INPUT HOPPERS
 */
function findInputHoppers(block) {
    const { x, y, z } = block.location;
    const dim = block.dimension;

    const offsets = [
        { x: 0, y: 1, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: -1, y: 0, z: 0 },
        { x: 0, y: 0, z: 1 },
        { x: 0, y: 0, z: -1 }
    ];

    const list = [];
    for (const o of offsets) {
        const b = dim.getBlock({ x: x + o.x, y: y + o.y, z: z + o.z });
        if (b?.typeId === "minecraft:hopper") {
            const inv = b.getComponent("minecraft:inventory")?.container;
            if (inv) list.push(inv);
        }
    }
    return list;
}

/**
 * FIND OUTPUT HOPPER
 */
function findOutputHopper(block) {
    const { x, y, z } = block.location;
    const dim = block.dimension;

    const b = dim.getBlock({ x, y: y - 1, z });
    if (b?.typeId !== "minecraft:hopper") return null;

    return b.getComponent("minecraft:inventory")?.container ?? null;
}
