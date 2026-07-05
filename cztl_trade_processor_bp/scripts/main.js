import { world, ItemStack } from "@minecraft/server";

const recipes = [
    { input: "minecraft:stick", input_amount: 32, output: "minecraft:emerald", output_amount: 1 },
    { input: "minecraft:emerald", input_amount: 1, output: "minecraft:stick", output_amount: 32 }
];

const directionOffsets = {
    0: { x: 0, y: -1, z: 0 }, // Down
    1: { x: 0, y: 1, z: 0 },  // Up
    2: { x: 0, y: 0, z: -1 }, // North
    3: { x: 0, y: 0, z: 1 },  // South
    4: { x: -1, y: 0, z: 0 }, // West
    5: { x: 1, y: 0, z: 0 }   // East
};

world.beforeEvents.worldInitialize.subscribe((event) => {
    event.blockComponentRegistry.registerCustomComponent("cztl:trade_processor", {
        onTick(e) {
            const block = e.block;
            // Use storage_item for 1.21+ container management
            const storageComponent = block.getComponent("minecraft:storage_item");
            const container = storageComponent?.container;
            if (!container) return;
            
            // Resolve facing direction to find the target drop-off container
            const direction = block.permutation.getState("minecraft:facing_direction");
            const offset = directionOffsets[direction] || { x: 0, y: -1, z: 0 };
            const targetBlock = block.offset(offset);
            
            // The output destination could be a standard block inventory
            const outputContainer = targetBlock?.getComponent("minecraft:inventory")?.container 
                                  || targetBlock?.getComponent("minecraft:storage_item")?.container;

            if (!outputContainer) return;

            for (let recipe of recipes) {
                for (let i = 0; i < container.size; i++) {
                    const item = container.getItem(i);
                    
                    if (item && item.typeId === recipe.input && item.amount >= recipe.input_amount) {
                        const newAmount = item.amount - recipe.input_amount;
                        
                        if (newAmount > 0) {
                            item.amount = newAmount;
                            container.setItem(i, item);
                        } else {
                            container.setItem(i, undefined);
                        }
                        
                        outputContainer.addItem(new ItemStack(recipe.output, recipe.output_amount));
                        return; 
                    }
                }
            }
        }
    });
});