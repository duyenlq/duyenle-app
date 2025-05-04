import type { Skill } from '@/models/skill'

interface hpPK{
    total: number,
    percent: number,
    now: number,
}

export interface Monster{
    id: string,
    name: string,
    hp: hpPK,
    atk: number,
    def: number,
    speed: number|string,
    critical: number,
    critical_strike: number,
    img?: string,
    skill: Skill[],
    currentLevel: number,
    life: boolean,
    buff?: String[],
    size:{
        w: number,
        h: number,
    }
    type:string[],
}