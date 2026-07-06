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

### 🧑‍🌾 Farmer Trades
| Output Item              | Cost Item            | Cost Amount | Reward Amount |
|--------------------------|-----------------------|-------------|---------------|
| `minecraft:wheat`        | `minecraft:emerald`   | 20          | 1             |
| `minecraft:potato`       | `minecraft:emerald`   | 15          | 1             |
| `minecraft:carrot`       | `minecraft:emerald`   | 15          | 1             |
| `minecraft:beetroot`     | `minecraft:emerald`   | 15          | 1             |
| `minecraft:pumpkin`      | `minecraft:emerald`   | 6           | 1             |
| `minecraft:melon_slice`  | `minecraft:emerald`   | 4           | 1             |
| `minecraft:sweet_berries`| `minecraft:emerald`   | 10          | 1             |
| `minecraft:nether_wart`  | `minecraft:emerald`   | 12          | 1             |

---

### 🏹 Fletcher Trades
| Output Item              | Cost Item            | Cost Amount | Reward Amount |
|--------------------------|-----------------------|-------------|---------------|
| `minecraft:stick`        | `minecraft:emerald`   | 32          | 1             |
| `minecraft:flint`        | `minecraft:emerald`   | 10          | 1             |
| `minecraft:string`       | `minecraft:emerald`   | 14          | 1             |
| `minecraft:feather`      | `minecraft:emerald`   | 12          | 1             |
| `minecraft:tripwire_hook`| `minecraft:emerald`   | 8           | 1             |

---

### 🎣 Fisherman Trades
| Output Item              | Cost Item            | Cost Amount | Reward Amount |
|--------------------------|-----------------------|-------------|---------------|
| `minecraft:coal`         | `minecraft:emerald`   | 10          | 1             |
| `minecraft:cod`          | `minecraft:emerald`   | 10          | 1             |
| `minecraft:salmon`       | `minecraft:emerald`   | 10          | 1             |
| `minecraft:tropical_fish`| `minecraft:emerald`   | 6           | 1             |
| `minecraft:pufferfish`   | `minecraft:emerald`   | 4           | 1             |

---

### 🔪 Butcher Trades
| Output Item              | Cost Item            | Cost Amount | Reward Amount |
|--------------------------|-----------------------|-------------|---------------|
| `minecraft:raw_chicken`  | `minecraft:emerald`   | 14          | 1             |
| `minecraft:raw_porkchop` | `minecraft:emerald`   | 14          | 1             |
| `minecraft:raw_mutton`   | `minecraft:emerald`   | 14          | 1             |
| `minecraft:raw_beef`     | `minecraft:emerald`   | 14          | 1             |
| `minecraft:raw_rabbit`   | `minecraft:emerald`   | 14          | 1             |
| `minecraft:dried_kelp_block` | `minecraft:emerald` | 10      | 1             |
| `minecraft:sweet_berries`| `minecraft:emerald`   | 10          | 1             |

---

### ✝️ Cleric Trades
| Output Item              | Cost Item            | Cost Amount | Reward Amount |
|--------------------------|-----------------------|-------------|---------------|
| `minecraft:rotten_flesh` | `minecraft:emerald`   | 32          | 1             |
| `minecraft:gold_ingot`   | `minecraft:emerald`   | 3           | 1             |
| `minecraft:lapis_lazuli` | `minecraft:emerald`   | 1           | 1             |
| `minecraft:rabbit_foot`  | `minecraft:emerald`   | 4           | 1             |
| `minecraft:glowstone_dust`| `minecraft:emerald`  | 4           | 1             |
| `minecraft:scute`        | `minecraft:emerald`   | 4           | 1             |
| `minecraft:ender_pearl`  | `minecraft:emerald`   | 1           | 1             |

---

### ⚒️ Armorer / Toolsmith / Weaponsmith Trades
| Output Item              | Cost Item            | Cost Amount | Reward Amount |
|--------------------------|-----------------------|-------------|---------------|
| `minecraft:coal`         | `minecraft:emerald`   | 10          | 1             |
| `minecraft:iron_ingot`   | `minecraft:emerald`   | 4           | 1             |
| `minecraft:diamond`      | `minecraft:emerald`   | 1           | 1             |

---

### 👞 Leatherworker Trades
| Output Item              | Cost Item            | Cost Amount | Reward Amount |
|--------------------------|-----------------------|-------------|---------------|
| `minecraft:leather`      | `minecraft:emerald`   | 6           | 1             |
| `minecraft:rabbit_hide`  | `minecraft:emerald`   | 6           | 1             |
| `minecraft:flint`        | `minecraft:emerald`   | 10          | 1             |
| `minecraft:scute`        | `minecraft:emerald`   | 4           | 1             |

---

### 🗺️ Cartographer Trades
| Output Item              | Cost Item            | Cost Amount | Reward Amount |
|--------------------------|-----------------------|-------------|---------------|
| `minecraft:paper`        | `minecraft:emerald`   | 24          | 1             |
| `minecraft:glass_pane`   | `minecraft:emerald`   | 16          | 1             |

---

### 🧱 Mason Trades
| Output Item              | Cost Item            | Cost Amount | Reward Amount |
|--------------------------|-----------------------|-------------|---------------|
| `minecraft:clay_ball`    | `minecraft:emerald`   | 10          | 1             |
| `minecraft:stone`        | `minecraft:emerald`   | 20          | 1             |
| `minecraft:granite`      | `minecraft:emerald`   | 16          | 1             |
| `minecraft:diorite`      | `minecraft:emerald`   | 16          | 1             |
| `minecraft:andesite`     | `minecraft:emerald`   | 16          | 1             |
| `minecraft:polished_granite` | `minecraft:emerald` | 12       | 1             |
| `minecraft:polished_diorite` | `minecraft:emerald` | 12       | 1             |
| `minecraft:polished_andesite`| `minecraft:emerald` | 12       | 1             |
| `minecraft:dripstone_block`  | `minecraft:emerald` | 12       | 1             |
| `minecraft:quartz`       | `minecraft:emerald`   | 12          | 1             |

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

If you want, I can **insert this directly into your README.md**, or regenerate the entire README with this table included in the correct section.

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
