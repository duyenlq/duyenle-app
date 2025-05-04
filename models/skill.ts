export interface Skill {
  id: string,
  name: string,
  mana: {
    total: number,
    pp: number,
  },
  power: number,
  type: string,
  // Normal (Thường)
  // Fire (Lửa)
  // Water (Nước)
  // Electric (Điện)
  // Grass (Cỏ)
  // Ice (Băng)
  // Fighting (Chiến đấu)
  // Poison (Độc)
  // Ground (Đất)
  // Flying (Bay)
  // Psychic (Tâm linh)
  // Bug (Côn trùng)
  // Rock (Đá)
  // Ghost (Ma)
  // Dragon (Rồng)
  // Dark (Bóng tối)
  // Steel (Thép)
  // Fairy (Tiên) 
  active: boolean,
  rate: number,
}
