// Đòn đánh
interface Attack {
    name: string;
    damage?: string;
    cost?: string[];
    effect?: string;
}

// Điểm yếu
interface Weakness {
    type: string;
    value?: string;
}
// Kháng cự
interface Resistance {
    type: string;
    value?: string;
}

interface PokemonCard {
    id: string;
    name: string;
    type: string;
    hp?: number;
    rarity?: "Common" | "Uncommon" | "Rare" | "Ultra Rare" | "Secret Rare";
    attacks?: Attack[];
    weaknesses?: Weakness[];
    resistances?: Resistance[];
    retreatCost?: number;
    illustrator?: string;
    set?: string;
    flavorText?: string;
    imageUrl?: string;
}