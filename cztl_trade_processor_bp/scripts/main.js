import { world, ItemStack } from "@minecraft/server";

/**
 * EXCHANGE_RATES defines the ratio for Slot 1 items.
 * Example: stick = { cost: 32, reward: 1 }
 * Means:
 * 32 sticks → 1 emerald
 * 1 emerald → 32 sticks
 *
 * NOTE: This table is keyed by the cost item (what the player gives).
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

    // CLERIC
    "minecraft:rotten_flesh": { cost: 32, reward: 1 },
    "minecraft:gold_ingot": { cost: 3, reward: 1 },
    "minecraft:lapis_lazuli": { cost: 1, reward: 1 },
    "minecraft:rabbit_foot": { cost: 4, reward: 1 },
    "minecraft:glowstone_dust": { cost: 4, reward: 1 },
    "minecraft:scute": { cost: 4, reward: 1 },
    "minecraft:ender_pearl": { cost: 1, reward: 1 },

    // ARMORER / TOOLSMITH / WEAPONSMITH
    "minecraft:iron_ingot": { cost: 4, reward: 1 },
    "minecraft:diamond": { cost: 1, reward: 1 },

    // LEATHERWORKER
    "minecraft:leather": { cost: 6, reward: 1 },
    "minecraft:rabbit_hide": { cost: 6, reward: 1 },

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
 *
 * Behavior:
 * - Slots 0 and 1 are configuration slots (placeholders). A single item (amount === 1) in a config slot is treated as a placeholder and will NOT be consumed.
 * - If a config slot contains more than 1 item, the extra items are available for consumption (so 64 sticks in slot 0 will be used).
 * - Slots 2 and 3 are discount slots and are never consumed as input.
 * - EXCHANGE_RATES is keyed by the cost item (what the player gives).
 * - A trade only executes if:
 *     * the required cost amount exists in the input area (slots excluding discount slots; config slots count only if amount > 1), AND
 *     * there is at least one extra emerald present in the input area (excluding config and discount slots) — this is the "second emerald" requirement.
 */
function processTradeForInventory(inv, output) {
    const slotA = inv.getItem(0); // config slot A
    const slotB = inv.getItem(1); // config slot B
    const slot3 = inv.getItem(2); // discount A (potion/apple)
    const slot4 = inv.getItem(3); // discount B

    if (!slotA || !slotB) return false;

    // Determine which config slot is the cost item by checking EXCHANGE_RATES keys.
    let costItem, outputItem, rate;
    if (EXCHANGE_RATES[slotA.typeId]) {
        costItem = slotA.typeId;
        outputItem = slotB.typeId;
        rate = EXCHANGE_RATES[costItem];
    } else if (EXCHANGE_RATES[slotB.typeId]) {
        costItem = slotB.typeId;
        outputItem = slotA.typeId;
        rate = EXCHANGE_RATES[costItem];
    } else {
        // No matching rate found in either config slot
        return false;
    }

    // Base amounts from the rate
    let costAmount = rate.cost;
    let rewardAmount = rate.reward;
    const rewardItem = rate.rewardItem ?? "minecraft:emerald";

    let discountedCostAmount = costAmount;
    if (isDiscountActive(slot3, slot4)) {
        discountedCostAmount = Math.max(1, Math.floor(costAmount * 0.80));
    }

    // Define which slots are protected (config placeholders and discount slots)
    const CONFIG_SLOTS = [0, 1];
    const DISCOUNT_SLOTS = [2, 3];
    const EXCLUDE_FOR_EXTRA_EMERALD = CONFIG_SLOTS.concat(DISCOUNT_SLOTS); // exclude 0-3 when searching for the "second emerald"


    // Ensure output hopper has space before adding
    if (!isOutputHopperFull(output)) {
        // FORWARD: player gives costItem -> processor gives rewardItem
        const costMatch = findMatchingItem(inv, costItem, DISCOUNT_SLOTS, true);
        if (costMatch && costMatch.stack.amount >= discountedCostAmount) {
            const remaining = costMatch.stack.amount - discountedCostAmount;
            if (remaining > 0) {
                inv.setItem(costMatch.slot, new ItemStack(costMatch.stack.typeId, remaining));
            } else {
                inv.setItem(costMatch.slot, undefined);
            }

            output.addItem(new ItemStack(rewardItem, rewardAmount));
            return true;
        }

        // REVERSE: player gives rewardItem -> processor gives costItem into output hopper
        const outMatch = findMatchingItem(inv, rewardItem, DISCOUNT_SLOTS, /*allowConfigIfAmountGT1=*/ true);
        if (outMatch && outMatch.stack.amount >= rewardAmount) {
            const remainingOut = outMatch.stack.amount - rewardAmount;
            if (remainingOut > 0) {
                inv.setItem(outMatch.slot, new ItemStack(outMatch.stack.typeId, remainingOut));
            } else {
                inv.setItem(outMatch.slot, undefined);
            }
            output.addItem(new ItemStack(costItem, costAmount));
            return true;
        }
    }

    return false;
}


/**
 * FIXED: Weakness potion + golden apple = discount active
 * Slot 3 and 4 order DOES NOT matter.
 */
function isDiscountActive(a, b) {
    if (!a || !b) return false;

    const potionA = a.getComponent("minecraft:potion")?.effectId;
    const potionB = b.getComponent("minecraft:potion")?.effectId;

    const weaknessEffects = [
        "minecraft:weakness",
        "weakness",
        "minecraft:long_weakness",
        "long_weakness"
    ];

    const isWeakA = weaknessEffects.includes(potionA);
    const isWeakB = weaknessEffects.includes(potionB);

    const isAppleA = a.typeId === "minecraft:golden_apple";
    const isAppleB = b.typeId === "minecraft:golden_apple";

    return (isWeakA && isAppleB) || (isWeakB && isAppleA);
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
 * Returns { slot, stack } where stack is the actual ItemStack instance.
 * excludeSlots: array of slot indices to ignore (e.g., [2,3] to ignore discount slots).
 * allowConfigIfAmountGT1: when true, config slots (0 and 1) are allowed as matches only if their amount > 1.
 */
function findMatchingItem(inv, typeId, excludeSlots = [], allowConfigIfAmountGT1 = false) {
    const CONFIG_SLOTS = [0, 1];

    for (let i = 0; i < inv.size; i++) {
        if (excludeSlots.includes(i)) continue;

        const item = inv.getItem(i);
        if (!item) continue;

        if (item.typeId !== typeId) continue;

        // If this is a config slot and allowConfigIfAmountGT1 is false, treat a single-item stack as protected placeholder
        if (CONFIG_SLOTS.includes(i) && !allowConfigIfAmountGT1) {
            if (item.amount <= 1) {
                // skip this slot (it's a placeholder)
                continue;
            }
            // if amount > 1 and allowConfigIfAmountGT1 is true, fall through and allow consumption
        }

        // If we reach here, this slot is a valid match
        return { slot: i, stack: item };
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
