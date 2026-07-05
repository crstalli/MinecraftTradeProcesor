# Trade Hopper System

A custom data-driven scripting addon for Minecraft Bedrock Edition (1.21+) that introduces an automated, high-performance **Trade Processor**. Shaped like a standard hopper but styled with metallic gold accents, this block automates villager-style material exchanges via custom components and scripting environments.

## Features

- **Automated Processing**: Automatically checks its internal virtual slots every 10 ticks (0.5 seconds) to convert raw materials into trade balances.
- **Data-Driven 3D Geometry**: Uses a completely custom, non-solid multi-box hopper model with accurate selection and collision bounds.
- **Interactive Storage Feed**: Right-clicking the block with an empty hand displays current internal slot counts. Interacting with valid trade materials deposits them directly from your main hand.
- **Conflict-Free Recipe**: Crafts naturally at a crafting table without colliding with vanilla hopper registry paths.

---

## Default Trade Configurations

The processor evaluates items in its input buffer against the following exchange tables:

| Input Item | Input Cost | Output Item | Output Amount |
| :--- | :--- | :--- | :--- |
| `minecraft:gold_ingot` | 3 | `minecraft:emerald` | 1 |
| `minecraft:iron_ingot` | 4 | `minecraft:emerald` | 1 |
| `minecraft:diamond` | 1 | `minecraft:emerald` | 2 |

---

## Project Structure

```text
├── cztl_trade_processor_bp/          # Behavior Pack
│   ├── manifest.json
│   ├── blocks/
│   │   └── trade_processor.json     # Block definition & components
│   ├── recipes/
│   │   └── trade_hopper_recipe.json # Crafting configuration
│   └── scripts/
│       └── main.js                  # Processing logic & interaction events
│
└── cztl_trade_processor_rp/          # Resource Pack
    ├── manifest.json
    ├── blocks.json                  # Texture reference mappings
    ├── models/
    │   └── blocks/
    │       └── trade_processor.geo.json # 3D Hopper model layout
    └── textures/
        ├── terrain_texture.json     # Texture atlas mappings
        └── blocks/
            ├── trade_processor_top.png
            ├── trade_processor_side.png
            └── trade_processor_bottom.png
