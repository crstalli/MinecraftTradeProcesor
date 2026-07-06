# 🧩 Trade Hopper System  
### *Automated Villager‑Style Trading — No Villagers Required*  
**By CZTL**

The **Trade Hopper System** is a Minecraft Bedrock Edition (1.21+) addon introducing a fully automated, script‑powered **Trade Processor** block.  
It performs villager‑style trades using hopper‑based item routing — letting you build trading halls, factories, and automated economies **without any villagers**.

The block features a hopper‑shaped body, a gold center ring, and a glowing emerald core, giving it a distinct identity while fitting naturally into Minecraft’s visual style.

---

## ⚙️ How It Works

### 1. Craft the Trade Processor
Craft it at any crafting table using the included recipe.  
It appears under the **Redstone** tab once installed.

---

## 🧱 Required Hopper Setup

The Trade Processor **only works when connected to hoppers**:

### Input Hoppers (up to 5)
Items may be fed into the processor from:

- Top  
- North  
- South  
- East  
- West  

Each input hopper defines **its own trade pair**.

### Output Hopper (required)
A hopper **must be placed directly underneath** the processor.  
All trade results are pulled out through this hopper.

The processor will **not function** unless an output hopper is present, and there are empty slots for it to put items.

---

## 🎛️ Configuring Trades (Input Hopper Slots)

Each input hopper defines **one trade** using its first two slots:

| Slot | Purpose | Example |
|------|----------|---------|
| **Slot 1** | Output item (what you receive) | `minecraft:stick` |
| **Slot 2** | Cost item (what you pay) | `minecraft:emerald` |

This pair defines the trade ratio using the internal exchange table.

I recommend putting filter items in the remaining slots that aren't used (slot 5 always, 3,4 if you aren't doing zombie discounts).

### Example
If Slot 1 = `stick` and Slot 2 = `emerald`:

- **32 emeralds → 1 stick**  
- **1 stick → 32 emeralds**

Trades are **bi‑directional** automatically.

Each hopper can define a **different trade**, allowing multi‑trade setups.

---

## 💱 Zombification Discount (20% Off)

If **any input hopper** contains:

- A **FERMENTED SPIDER EYE**
- A **golden apple**

In **Slot 3 and Slot 4** (order does not matter):

- A flat **20% discount** is applied to the cost.

### Example
- Normal: **32 emeralds → 1 stick**  
- Discounted: **25 emeralds → 1 stick**

Discount items are **not consumed**.


---

## 🔁 Trade Processing Behavior

### Tick Rate
The processor runs every **16 ticks (0.8 seconds, 1/2 hopper speed)** via:

```json
"minecraft:tick": {
  "interval_range": [16, 16]
}
```

This provides:

Low lag

Smooth processing

Predictable timing

Safe operation even with many processors in one area

Hopper Overflow Protection
Reverse trades output large amounts (e.g., 32 emeralds).
To prevent overflow:

Reverse trades only run when the output hopper has at least 32 free item spaces.

Multi‑Hopper Input
If multiple input hoppers are attached:

Each hopper is checked independently

The first successful trade ends the tick

Each hopper may define its own trade pair

Chunk Loading
Processing only occurs when the chunk is loaded.
If unloaded, trading pauses automatically.

---

## 💱 Default Trade Configurations (Example Table)

These are example trades that can be represented via slot configuration and internal logic:

## 📘 Exchange Rates



This README lists all villager trades supported by the CZTL Trade Processor.  
Values match Bedrock Edition and your custom configuration.

---

### 🧑‍🌾 Farmer
| Item | Cost | Reward |
|------|------|--------|
| Wheat | 20 | 1 Emerald |
| Potato | 26 | 1 Emerald |
| Carrot | 22 | 1 Emerald |
| Beetroot | 15 | 1 Emerald |
| Bread | 2 | 6 Emerald |
| Pumpkin | 6 | 1 Emerald |
| Pumpkin Pie | 4 | 4 Emerald |
| Apple | 4 | 4 Emerald |
| Melon Slice | 4 | 1 Emerald |
| Cookie | 3 | 18 Emerald |
| Suspicious Stew | 1 | 1 Emerald |
| Cake | 1 | 1 Emerald |
| Golden Carrot | 3 | 3 Emerald |
| Glistering Melon Slice | 4 | 3 Emerald |
| Nether Wart | 22 | 1 Emerald |

---

### 🏹 Fletcher
| Item | Cost | Reward |
|------|------|--------|
| Stick | 32 | 1 Emerald |
| Arrow | 1 Emerald | 16 Arrows |
| Flint | 26 | 1 Emerald |
| Bow | 2 Emerald | 1 Bow |
| String | 14 | 1 Emerald |
| Crossbow | 3 Emerald | 1 Crossbow |
| Feather | 24 | 1 Emerald |
| Tripwire Hook | 8 | 1 Emerald |

---

### 🎣 Fisherman
| Item | Cost | Reward |
|------|------|--------|
| Coal | 10 | 1 Emerald |
| Cod | 10 | 1 Emerald |
| Salmon | 10 | 1 Emerald |
| Tropical Fish | 6 | 1 Emerald |
| Pufferfish | 4 | 1 Emerald |
| All Boat Types | 1 | 1 Emerald |

---

### 🍖 Butcher
| Item | Cost | Reward |
|------|------|--------|
| Raw Chicken | 14 | 1 Emerald |
| Raw Rabbit | 4 | 1 Emerald |
| Raw Porkchop | 7 | 1 Emerald |
| Rabbit Stew | 1 | 1 Emerald |
| Cooked Chicken | 1 Emerald | 8 Cooked Chicken |
| Cooked Porkchop | 1 Emerald | 5 Cooked Porkchop |
| Raw Beef | 10 | 1 Emerald |
| Raw Mutton | 7 | 1 Emerald |
| Dried Kelp Block | 10 | 1 Emerald |
| Sweet Berries | 10 | 1 Emerald |

---

### ✝️ Cleric
| Item | Cost | Reward |
|------|------|--------|
| Rotten Flesh | 32 | 1 Emerald |
| Gold Ingot | 3 | 1 Emerald |
| Lapis Lazuli | 2 | 1 Emerald |
| Rabbit Foot | 4 | 1 Emerald |
| Glowstone Dust | 1 Emerald | 1 Glowstone Dust |
| Scute | 4 | 1 Emerald |
| Ender Pearl | 4 Emerald | 1 Ender Pearl |
| Experience Bottle | 1 Emerald | 3 Bottles |

---

### ⚒️ Smiths (Armorer / Toolsmith / Weaponsmith)
| Item | Cost | Reward |
|------|------|--------|
| Iron Ingot | 4 | 1 Emerald |
| Bell | 36 | 1 Emerald |
| Shield | 5 | 1 Emerald |
| Iron Armor (full set) | Various | 1 Emerald |
| Iron Tools | Various | 1 Emerald |
| Chainmail Armor | Various | 1 Emerald |

---

### 🐄 Leatherworker
| Item | Cost | Reward |
|------|------|--------|
| Leather | 6 | 1 Emerald |
| Leather Armor | Various | 1 Emerald |
| Rabbit Hide | 9 | 1 Emerald |
| Scute | 4 | 1 Emerald |
| Leather Horse Armor | 6 | 1 Emerald |
| Saddle | 6 | 1 Emerald |

---

### 🗺️ Cartographer
| Item | Cost | Reward |
|------|------|--------|
| Paper | 24 | 1 Emerald |
| Glass Pane | 16 | 1 Emerald |
| Map | 7 | 1 Emerald |
| Compass | 4 | 1 Emerald |
| Empty Map | 8 | 1 Emerald |
| Banner | 3 | 1 Emerald |
| Woodland Explorer Map | 14 | 1 Emerald |
| Ocean Explorer Map | 13 | 1 Emerald |

---

### 🧱 Mason
| Item | Cost | Reward |
|------|------|--------|
| Clay Ball | 10 | 1 Emerald |
| Stone | 20 | 1 Emerald |
| Granite / Diorite / Andesite | 16 | 1 Emerald |
| Polished Variants | 12 | 1 Emerald |
| Dripstone Block | 12 | 1 Emerald |
| Quartz | 12 | 1 Emerald |
| Quartz Pillar | 1 | 1 Emerald |
| Chiseled Quartz Block | 1 | 1 Emerald |
| Quartz Bricks | 1 | 1 Emerald |
| Block of Quartz | 1 | 1 Emerald |

---

### 🧶 Shepherd
| Item | Cost | Reward |
|------|------|--------|
| All Wool Colors | 18 | 1 Emerald |
| All Dye Colors | 1 | 3 Emerald |
| All Carpet Colors | 1 | 4 Emerald |
| All Banner Colors | 3 | 1 Emerald |
| Painting | 2 | 1 Emerald |
| Shears | 3 | 1 Emerald |

---

### 📚 Librarian
| Item | Cost | Reward |
|------|------|--------|
| Paper | 24 | 1 Emerald |
| Book | 5 | 1 Emerald |
| Bookshelf | 9 | 1 Emerald |
| Lantern | 1 | 1 Emerald |
| Clock | 3 | 1 Emerald |
| Compass | 4 | 1 Emerald |
| Name Tag | 20 | 1 Emerald |

---

### 💎 Custom Trades
| Item | Cost | Reward |
|------|------|--------|
| Emerald Block | 63 | 1 Diamond |

---

### 🧶 Shepherd Wool Trades
| Output Item              | Cost Item            | Cost Amount | Reward Amount |
|--------------------------|-----------------------|-------------|---------------|
| All wool colors          | `minecraft:emerald`   | 16          | 1             |

*(Your script lists each color individually — all cost 16.)*

---

### 🎨 Shepherd Dye Trades
| Output Item              | Cost Item            | Cost Amount | Reward Amount |
|--------------------------|-----------------------|-------------|---------------|
| All dye colors           | `minecraft:emerald`   | 12          | 1             |

---

### 💎 Custom Override
| Output Item              | Cost Item            | Cost Amount | Reward Amount | Reward Item |
|--------------------------|-----------------------|-------------|---------------|-------------|
| `minecraft:emerald_block`| `minecraft:diamond`   | 63          | 1             | `minecraft:diamond` |

---

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
