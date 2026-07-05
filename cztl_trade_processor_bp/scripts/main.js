import { world, ItemStack } from "@minecraft/server";

// Map facing_direction to coordinate offsets
const directionMap = {
    0: { x: 0, y: -1, z: 0 },  // Down
    1: { x: 0, y: 1, z: 0 },   // Up
    2: { x: 0, y: 0, z: -1 },  // North
    3: { x: 0, y: 0, z: 1 },   // South
    4: { x: -1, y: 0, z: 0 },  // West
    5: { x: 1, y: 0, z: 0 }    // East
};

world.beforeEvents.worldInitialize.subscribe((event) => {
    event.blockComponentRegistry.registerCustomComponent("cztl:trade_processor", {
        onTick(e) {
            const block = e.block;
            const container = block.getComponent("minecraft:inventory").container;
            const recipes = e.component.data.recipes;
            
            // Get the facing direction and calculate target block
            const direction = block.permutation.getState("minecraft:facing_direction");
            const offset = directionMap[direction];
            const targetBlock = block.offset(offset);
            const outputContainer = targetBlock?.getComponent("minecraft:inventory")?.container;

            // SAFETY CHECK: If no container, do not process
            if (!outputContainer) return;

            for (let recipe of recipes) {
                for (let i = 0; i < container.size; i++) {
                    const item = container.getItem(i);
                    
                    // Check if item matches input and meets threshold
                    if (item && item.typeId === recipe.input && item.amount >= recipe.input_amount) {
                        
                        // Consume the input
                        item.amount -= recipe.input_amount;
                        container.setItem(i, item);
                        
                        // Push the output to the adjacent container
                        outputContainer.addItem(new ItemStack(recipe.output, recipe.output_amount));
                        
                        return; // Process one recipe at a time
                    }
                }
            }
        }
    });
});
