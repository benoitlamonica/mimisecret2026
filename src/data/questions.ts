import type { ReplaceSpaces } from "@/utils/types"

export type QuestionDifficulty = 'easy' | 'medium' | 'hard'

export interface QuestionDefinition<Name extends string = string> {
  name: Name
  options: string[]
  answer: string
}

export interface Question<Name extends string = string> extends QuestionDefinition<Name> {
  id: ReplaceSpaces<Name>
  difficulty: QuestionDifficulty
}

const easyQuestions: QuestionDefinition[] = [
  {
    name: 'Quelle est la couleur du soleil sur la plupart des dessins d’enfants ?',
    options: ['Jaune', 'Violet', 'Noir', 'Rose'],
    answer: 'Jaune',
  },
  {
    name: 'Combien de jours compte une semaine ?',
    options: ['Cinq', 'Six', 'Sept', 'Huit'],
    answer: 'Sept',
  },
  {
    name: 'Quel animal aboie ?',
    options: ['Le chat', 'Le chien', 'Le cheval', 'La poule'],
    answer: 'Le chien',
  },
  {
    name: 'Quelle planète habitons-nous ?',
    options: ['Mars', 'La Terre', 'Vénus', 'Jupiter'],
    answer: 'La Terre',
  },
  {
    name: 'Combien font 2 + 2 ?',
    options: ['3', '4', '5', '6'],
    answer: '4',
  },
  {
    name: 'Quel fruit est généralement jaune et courbé ?',
    options: ['La banane', 'La fraise', 'La pomme', 'La cerise'],
    answer: 'La banane',
  },
  {
    name: 'Quelle saison vient après l’été ?',
    options: ['Le printemps', 'L’hiver', 'L’automne', 'La saison des pluies'],
    answer: 'L’automne',
  },
  {
    name: 'Combien de pattes a une araignée ?',
    options: ['Six', 'Huit', 'Dix', 'Douze'],
    answer: 'Huit',
  },
  {
    name: 'Quel astre éclaire la Terre pendant la journée ?',
    options: ['La Lune', 'Le Soleil', 'Mars', 'Une étoile filante'],
    answer: 'Le Soleil',
  },
  {
    name: 'Dans quel pays se trouve la tour Eiffel ?',
    options: ['En Italie', 'En Espagne', 'En France', 'Au Portugal'],
    answer: 'En France',
  },
  {
    name: 'Quel animal miaule ?',
    options: ['Le chien', 'Le chat', 'Le lapin', 'Le canard'],
    answer: 'Le chat',
  },
  {
    name: 'Combien de mois y a-t-il dans une année ?',
    options: ['Dix', 'Onze', 'Douze', 'Treize'],
    answer: 'Douze',
  },
  {
    name: 'Quelle boisson obtient-on généralement avec des feuilles et de l’eau chaude ?',
    options: ['Le thé', 'Le lait', 'Le jus d’orange', 'La limonade'],
    answer: 'Le thé',
  },
  {
    name: 'Quel jour vient après lundi ?',
    options: ['Dimanche', 'Mardi', 'Mercredi', 'Vendredi'],
    answer: 'Mardi',
  },
  {
    name: 'De quelle couleur est habituellement une feuille d’arbre en été ?',
    options: ['Verte', 'Bleue', 'Violette', 'Orange'],
    answer: 'Verte',
  },
  {
    name: 'Quel objet utilise-t-on pour écrire sur une feuille ?',
    options: ['Une cuillère', 'Un crayon', 'Une chaussure', 'Une assiette'],
    answer: 'Un crayon',
  },
  {
    name: 'Combien de roues possède généralement un vélo ?',
    options: ['Une', 'Deux', 'Trois', 'Quatre'],
    answer: 'Deux',
  },
  {
    name: 'Quel animal donne de la laine ?',
    options: ['Le mouton', 'Le dauphin', 'Le perroquet', 'Le crocodile'],
    answer: 'Le mouton',
  },
  {
    name: 'Quel sens permet de sentir les odeurs ?',
    options: ['La vue', 'L’ouïe', 'L’odorat', 'Le toucher'],
    answer: 'L’odorat',
  },
  {
    name: 'Quel objet indique l’heure ?',
    options: ['Une horloge', 'Une valise', 'Un parapluie', 'Une fourchette'],
    answer: 'Une horloge',
  },
]

const mediumQuestions: QuestionDefinition[] = [
  {
    name: 'Quelle est la capitale de l’Italie ?',
    options: ['Milan', 'Rome', 'Venise', 'Naples'],
    answer: 'Rome',
  },
  {
    name: 'Quel est le plus grand océan du monde ?',
    options: ['L’océan Atlantique', 'L’océan Indien', 'L’océan Pacifique', 'L’océan Arctique'],
    answer: 'L’océan Pacifique',
  },
  {
    name: 'Qui a écrit Le Petit Prince ?',
    options: ['Victor Hugo', 'Jules Verne', 'Antoine de Saint-Exupéry', 'Molière'],
    answer: 'Antoine de Saint-Exupéry',
  },
  {
    name: 'Quel métal est représenté par le symbole Au ?',
    options: ['L’argent', 'L’or', 'Le cuivre', 'Le fer'],
    answer: 'L’or',
  },
  {
    name: 'Combien de côtés possède un hexagone ?',
    options: ['Cinq', 'Six', 'Sept', 'Huit'],
    answer: 'Six',
  },
  {
    name: 'Quel instrument possède généralement 88 touches ?',
    options: ['Le violon', 'La flûte', 'Le piano', 'La trompette'],
    answer: 'Le piano',
  },
  {
    name: 'Quelle langue est principalement parlée au Brésil ?',
    options: ['L’espagnol', 'Le portugais', 'Le français', 'L’italien'],
    answer: 'Le portugais',
  },
  {
    name: 'Quel est le plus grand mammifère du monde ?',
    options: ['L’éléphant d’Afrique', 'La baleine bleue', 'La girafe', 'L’hippopotame'],
    answer: 'La baleine bleue',
  },
  {
    name: 'Dans quel sport utilise-t-on un volant ?',
    options: ['Le badminton', 'Le rugby', 'Le golf', 'Le judo'],
    answer: 'Le badminton',
  },
  {
    name: 'Quel gaz les plantes absorbent-elles principalement ?',
    options: ['L’oxygène', 'L’hélium', 'Le dioxyde de carbone', 'L’hydrogène'],
    answer: 'Le dioxyde de carbone',
  },
  {
    name: 'Quelle est la capitale de l’Espagne ?',
    options: ['Barcelone', 'Madrid', 'Séville', 'Valence'],
    answer: 'Madrid',
  },
  {
    name: 'Combien de joueurs une équipe de football aligne-t-elle sur le terrain ?',
    options: ['Cinq', 'Sept', 'Onze', 'Quinze'],
    answer: 'Onze',
  },
  {
    name: 'Quel pays est surnommé le pays du Soleil-Levant ?',
    options: ['La Chine', 'Le Japon', 'La Corée du Sud', 'La Thaïlande'],
    answer: 'Le Japon',
  },
  {
    name: 'Quel est le résultat de 9 × 8 ?',
    options: ['Soixante-deux', 'Soixante-douze', 'Quatre-vingt-deux', 'Quatre-vingt-dix'],
    answer: 'Soixante-douze',
  },
  {
    name: 'Quel célèbre paquebot a coulé en 1912 ?',
    options: ['Le Titanic', 'Le Santa Maria', 'Le Nautilus', 'Le Victory'],
    answer: 'Le Titanic',
  },
  {
    name: 'Quelle partie de la plante absorbe principalement l’eau du sol ?',
    options: ['La fleur', 'La feuille', 'La racine', 'Le fruit'],
    answer: 'La racine',
  },
  {
    name: 'Quel est le contraire de “optimiste” ?',
    options: ['Curieux', 'Prudent', 'Pessimiste', 'Généreux'],
    answer: 'Pessimiste',
  },
  {
    name: 'Quel pays a la forme d’une botte sur une carte ?',
    options: ['La Grèce', 'L’Italie', 'La Croatie', 'La Norvège'],
    answer: 'L’Italie',
  },
  {
    name: 'Quel appareil sert à mesurer la température ?',
    options: ['Un baromètre', 'Un thermomètre', 'Un altimètre', 'Un chronomètre'],
    answer: 'Un thermomètre',
  },
  {
    name: 'Quel est le nom du satellite naturel de la Terre ?',
    options: ['Le Soleil', 'La Lune', 'Mars', 'Vénus'],
    answer: 'La Lune',
  },
]

const hardQuestions: QuestionDefinition[] = [
  {
    name: 'Quelle est la capitale de l’Australie ?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    answer: 'Canberra',
  },
  {
    name: 'Quel peintre a réalisé La Nuit étoilée ?',
    options: ['Claude Monet', 'Pablo Picasso', 'Vincent van Gogh', 'Salvador Dalí'],
    answer: 'Vincent van Gogh',
  },
  {
    name: 'Quel est le symbole chimique du sodium ?',
    options: ['S', 'So', 'Na', 'Sd'],
    answer: 'Na',
  },
  {
    name: 'Dans quel pays se trouve la cité antique de Machu Picchu ?',
    options: ['Le Pérou', 'Le Mexique', 'La Bolivie', 'Le Chili'],
    answer: 'Le Pérou',
  },
  {
    name: 'Quel organe pompe le sang dans le corps humain ?',
    options: ['Le foie', 'Le cœur', 'Le poumon', 'Le rein'],
    answer: 'Le cœur',
  },
  {
    name: 'Qui était le dieu de la foudre dans la mythologie grecque ?',
    options: ['Apollon', 'Hadès', 'Zeus', 'Hermès'],
    answer: 'Zeus',
  },
  {
    name: 'Quel est le nom du processus par lequel une chenille devient papillon ?',
    options: ['La germination', 'La métamorphose', 'La fermentation', 'La migration'],
    answer: 'La métamorphose',
  },
  {
    name: 'Quelle planète est célèbre pour ses anneaux visibles ?',
    options: ['Mercure', 'Saturne', 'Neptune', 'Vénus'],
    answer: 'Saturne',
  },
  {
    name: 'Quel écrivain français a créé le personnage d’Arsène Lupin ?',
    options: ['Maurice Leblanc', 'Émile Zola', 'Marcel Proust', 'Alexandre Dumas'],
    answer: 'Maurice Leblanc',
  },
  {
    name: 'Quel fleuve traverse la ville de Londres ?',
    options: ['La Seine', 'Le Danube', 'La Tamise', 'Le Tage'],
    answer: 'La Tamise',
  },
  {
    name: 'Quel est le plus haut sommet du monde ?',
    options: ['Le mont Blanc', 'Le Kilimandjaro', 'L’Everest', 'Le mont Fuji'],
    answer: 'L’Everest',
  },
  {
    name: 'Quelle civilisation a construit les pyramides de Gizeh ?',
    options: ['Les Romains', 'Les Égyptiens', 'Les Vikings', 'Les Incas'],
    answer: 'Les Égyptiens',
  },
  {
    name: 'Quel est le plus petit nombre premier ?',
    options: ['0', '1', '2', '3'],
    answer: '2',
  },
  {
    name: 'Quel scientifique a formulé la théorie de la relativité ?',
    options: ['Isaac Newton', 'Albert Einstein', 'Galilée', 'Louis Pasteur'],
    answer: 'Albert Einstein',
  },
  {
    name: 'Quelle mer sépare principalement l’Europe et l’Afrique ?',
    options: ['La mer Baltique', 'La mer Méditerranée', 'La mer du Nord', 'La mer Noire'],
    answer: 'La mer Méditerranée',
  },
  {
    name: 'Quel est le nom de la galaxie qui contient le système solaire ?',
    options: ['Andromède', 'La Voie lactée', 'Le Grand Nuage', 'Sombrero'],
    answer: 'La Voie lactée',
  },
  {
    name: 'Qui a composé la Neuvième Symphonie ?',
    options: ['Mozart', 'Beethoven', 'Chopin', 'Vivaldi'],
    answer: 'Beethoven',
  },
  {
    name: 'Quel pays a offert la Statue de la Liberté aux États-Unis ?',
    options: ['Le Royaume-Uni', 'La France', 'L’Espagne', 'L’Allemagne'],
    answer: 'La France',
  },
  {
    name: 'Comment appelle-t-on l’étude scientifique des séismes ?',
    options: ['La sismologie', 'La météorologie', 'La botanique', 'La zoologie'],
    answer: 'La sismologie',
  },
  {
    name: 'Quel est le nom du détroit entre la France et le Royaume-Uni ?',
    options: ['Le détroit de Béring', 'Le détroit de Gibraltar', 'La Manche', 'Le Bosphore'],
    answer: 'La Manche',
  },
]

function addQuestionData<Name extends string>(questions: QuestionDefinition<Name>[], difficulty: QuestionDifficulty): Question<Name>[] {
  return questions.map((q) => ({
    ...q,
    id: q.name.replace(/\s+/g, '') as ReplaceSpaces<Name>,
    difficulty
  }))
}

export const questions: Question[] = [
  ...addQuestionData(easyQuestions, 'easy'),
  ...addQuestionData(mediumQuestions, 'medium'),
  ...addQuestionData(hardQuestions, 'hard')
]
