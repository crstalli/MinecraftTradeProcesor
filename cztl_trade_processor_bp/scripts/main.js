import { world, ItemStack } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe((event) => {
    event.blockComponentRegistry.registerCustomComponent("cztl:trade_processor", {
        onTick(e) {
            const block = e.block;
            const container = block.getComponent("minecraft:inventory").container;
            const recipes = e.component.data.recipes;
            
            // Get the block the hopper is pointing into
            // In Bedrock, you can use the 'facing_direction' permutation to find the target
            const direction = block.permutation.getState("minecraft:facing_direction");
            const targetBlock = block.getBlock(direction); 
            const outputContainer = targetBlock?.getComponent("minecraft:inventory")?.container;

            // SAFETY CHECK: If no container, do not process
            if (!outputContainer) return;

            for (let recipe of recipes) {
                for (let i = 0; i < container.size; i++) {
                    const item = container.getItem(i);
                    
                    // Check if item matches input and meets threshold (keeping 1 as filter)
                    if (item && item.typeId === recipe.input && item.amount > recipe.input_amount) {
                        
                        // Consume the input (leaves 1 behind as a filter)
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
