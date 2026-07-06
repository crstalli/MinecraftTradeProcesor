# 🧩 Trade Hopper System  
### *Auto Villager Trades by CZTL*

A **Minecraft Bedrock Edition (1.21+)** addon introducing a fully automated, script‑driven **Trade Processor** block.  
It behaves like a hopper but performs villager‑style trades automatically — no villagers required.

The block features a **hopper‑colored body**, a **gold center ring**, and a glowing **emerald core**, giving it a unique identity while still fitting naturally into Minecraft’s visual style.

---

## ⚙️ How to Use

### 1. Craft the Trade Processor
Craft it at any crafting table using the custom recipe.  
It appears under the *Redstone* tab once installed.

### 2. Place the Block **with Hoppers**
The Trade Processor **requires both**:

- **An input hopper** feeding into the block (side or top)  
- **An output hopper** underneath the block  

It will **not function** unless both hoppers are attached.

### 3. Configure the Trade Slots (Input Hopper)
The input hopper must have **two specific slots** set:

- **Slot 1:** The *output item* (what you want to receive)  
- **Slot 2:** The *cost item* (what you pay)

Example trade setup:

| Slot | Item | Meaning |
|------|------|---------|
| 1 | `minecraft:stick` | Output item (you receive sticks) |
| 2 | `minecraft:emerald` | Cost item (you pay emeralds) |

### 4. Perform Trades
Once the slots are configured:

- **Adding emeralds** to the input hopper  
  → The processor outputs **sticks** into the output hopper.

- **Adding sticks** (e.g., 32) to the input hopper  
  → The processor allows **emeralds** to be pulled from it via the output hopper.

The processor **only works** when:

- Slot 1 and Slot 2 are valid items  
- Input hopper contains items matching either slot  
- Output hopper is present to pull results  

### 5. Processing Behavior
- The processor checks its internal buffer every **10 ticks (0.5 seconds)**.  
- It only runs in **loaded chunks**.  
- If the chunk unloads, processing pauses and resumes when reloaded.  
- No trades occur while unloaded.  
- The block **cannot output directly into a chest** — output must be pulled by a hopper.

---

## ✨ Features

- **Automated Trading**  
  Converts items based on configured slot pairs, mimicking villager trades without villagers.

- **Hopper‑Integrated Design**  
  - Accepts items from **sides and top** via hoppers.  
  - Requires a hopper **below** to pull out results.  
  - Does **not** output directly into chests.

- **Custom Geometry**  
  Hopper‑shaped model with a gold center ring and emerald core, built using multi‑box geometry and accurate collision bounds.

- **Script‑Driven Logic**  
  Powered by `main.js` for fast, tick‑based trade evaluation.

- **Conflict‑Free Crafting**  
  Uses unique registry paths to avoid vanilla hopper conflicts.

---

## 💱 Default Trade Configurations (Example Table)

These are example trades that can be represented via slot configuration and internal logic:

| Input Item | Input Cost | Output Item | Output Amount |
| :--- | :---: | :--- | :---: |
| `minecraft:gold_ingot` | 3 | `minecraft:emerald` | 1 |
| `minecraft:iron_ingot` | 4 | `minecraft:emerald` | 1 |
| `minecraft:diamond` | 1 | `minecraft:emerald` | 2 |
| `minecraft:emerald_block` | 63 | `minecraft:diamond` | 1 |

> Actual behavior depends on how you configure **Slot 1 (output)** and **Slot 2 (cost)** in the input hopper and how your script maps those items.

---

## 🧱 Pack Structure

```text
├── cztl_trade_processor_bp/          # Behavior Pack
│   ├── manifest.json
│   ├── blocks/
│   │   └── trade_processor.json      # Block definition & components
│   ├── recipes/
│   │   └── trade_hopper_recipe.json  # Crafting configuration
│   └── scripts/
│       └── main.js                   # Processing logic & interaction events
│
└── cztl_trade_processor_rp/          # Resource Pack
    ├── manifest.json
    ├── blocks.json                   # Texture reference mappings
    ├── models/
    │   └── blocks/
    │       └── trade_processor.geo.json # 3D Hopper model layout
    └── textures/
        ├── terrain_texture.json      # Texture atlas mappings
        └── blocks/
            ├── trade_processor_top.png
            ├── trade_processor_side.png
            └── trade_processor_bottom.png
