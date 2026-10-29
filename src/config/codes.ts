export interface RewardCode {
  code: string
  points: number
}

export const rewardCodes: RewardCode[] = [
  { code: 'UNBISOUS', points: 100 },
  { code: 'BOUBOUBG', points: 200 },
  { code: 'FINISHTHIS', points: 1000 },
  { code: 'BOUBOUCLEMEILLEUR', points: 500 },
  { code: 'CHOCOLAT', points: 50 },
  { code: 'RENNEENRETARD', points: 50 },
  { code: 'SAPINQUIPIQUE', points: 50 },
  { code: 'LUTINENPAUSE', points: 50 },
  { code: 'GREL0TFOLLE', points: 50 },
  { code: 'NEIGESURPRISE', points: 50 },
]

export const rewardCodeHints = [
  'Quand les joues rougissent et que les fenêtres givrent, Mimi tient une tasse entre ses mains.',
  'Dans la grande course de décembre, quelqu’un a oublié de regarder l’heure.',
  'Le sapin préféré de Mimi garde ses distances avec les mains trop curieuses.',
  'Même les plus petits assistants savent parfois fermer l’atelier avant les autres.',
  'Dans un coin de la maison, une petite musique ne respecte plus vraiment le rythme.',
  'Un éclat blanc est tombé du ciel et personne ne sait encore ce qu’il cache.',
]
