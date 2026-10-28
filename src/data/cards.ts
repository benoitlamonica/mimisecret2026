import type { ReplaceSpaces } from "@/utils/types"

export type Rarity = 'Commun' | 'Rare' | 'Épique' | 'Légendaire' | 'Extraordinaire'

export type CardID<Name extends string> = Lowercase<ReplaceSpaces<Name>>

export interface CardDefinition<Name extends string = string> {
  name: Name
  type: string
  description: string
  power: string
}

export interface Card<Name extends string = string> extends CardDefinition<Name> {
  id: CardID<Name>
  rarity: Rarity
  accent: string
  symbol: string
}

export const commonCards: CardDefinition[] = [
  { name: 'La boule de Noël', type: 'Décoration', description: 'Une boule brillante qui fait danser la lumière du sapin.', power: 'Éclat festif' },
  { name: 'Le bisou de Noël', type: 'Tendresse', description: 'Un petit bisou qui réchauffe les joues et les cœurs.', power: 'Douceur partagée' },
  { name: 'Le nœud rouge', type: 'Décoration', description: 'Le ruban parfait pour rendre chaque paquet encore plus précieux.', power: 'Joli paquet' },
  { name: 'La chaussette de Noël', type: 'Tradition', description: 'Elle attend patiemment une surprise près de la cheminée.', power: 'Poche à trésors' },
  { name: 'Le calendrier de l’Avent', type: 'Tradition', description: 'Vingt-quatre petites fenêtres et autant de raisons de sourire.', power: 'Compteur de magie' },
  { name: 'Le papier cadeau', type: 'Emballage', description: 'Un papier coloré qui cache une surprise soigneusement choisie.', power: 'Mystère emballé' },
  { name: 'Le ruban doré', type: 'Emballage', description: 'Une boucle dorée qui termine les cadeaux avec élégance.', power: 'Touche finale' },
  { name: 'La guirlande', type: 'Décoration', description: 'Elle serpente dans la maison et allume la fête.', power: 'Lumière en fête' },
  { name: 'Le petit sapin', type: 'Décoration', description: 'Petit par la taille, immense par la joie qu’il apporte.', power: 'Esprit de Noël' },
  { name: 'La boule à neige', type: 'Souvenir', description: 'Un monde minuscule où il neige à chaque fois qu’on le secoue.', power: 'Neige éternelle' },
  { name: 'Le flocon de papier', type: 'Création', description: 'Un peu de papier devient une fenêtre ouverte sur l’hiver.', power: 'Découpe magique' },
  { name: 'La bougie parfumée', type: 'Ambiance', description: 'Sa flamme douce parfume la pièce de cannelle et d’orange.', power: 'Lueur chaleureuse' },
  { name: 'Le bonnet de Noël', type: 'Accessoire', description: 'Un bonnet rouge qui transforme instantanément une tenue.', power: 'Style festif' },
  { name: 'Les chaussettes douillettes', type: 'Confort', description: 'Le meilleur équipement pour traverser les soirées fraîches.', power: 'Pieds au chaud' },
  { name: 'Le chocolat chaud', type: 'Gourmandise', description: 'Une tasse fumante qui rend les matins d’hiver plus doux.', power: 'Cacao réconfortant' },
  { name: 'Le marshmallow', type: 'Gourmandise', description: 'Un nuage sucré qui flotte sur le chocolat chaud.', power: 'Nuage sucré' },
  { name: 'Le biscuit étoilé', type: 'Gourmandise', description: 'Un petit biscuit fait avec amour et beaucoup de cannelle.', power: 'Croquant de fête' },
  { name: 'La clémentine', type: 'Gourmandise', description: 'Son parfum rappelle les goûters et les vacances de décembre.', power: 'Zeste d’hiver' },
  { name: 'Le sucre d’orge', type: 'Gourmandise', description: 'Une douceur rayée à savourer lentement devant le sapin.', power: 'Sucre enchanté' },
  { name: 'La cannelle', type: 'Parfum', description: 'Son parfum suffit à faire entrer Noël dans toute la maison.', power: 'Épice chaleureuse' },
  { name: 'Le chocolat', type: 'Gourmandise', description: 'Un carré fondant qui disparaît toujours un peu trop vite.', power: 'Carré de bonheur' },
  { name: 'Le lait pour le Père Noël', type: 'Tradition', description: 'Un verre préparé avec soin pour le grand voyage de la nuit.', power: 'Pause bien méritée' },
  { name: 'Le grelot', type: 'Décoration', description: 'Un tintement léger annonce que la fête approche.', power: 'Son de fête' },
  { name: 'La clochette', type: 'Décoration', description: 'Elle chante doucement au moindre mouvement de la porte.', power: 'Ding enchanté' },
  { name: 'La neige sur la fenêtre', type: 'Paysage', description: 'Un dessin blanc qui transforme le monde extérieur.', power: 'Paysage givré' },
  { name: 'Le pull de Noël', type: 'Vêtement', description: 'Un pull coloré, parfois kitsch, toujours réconfortant.', power: 'Maille festive' },
  { name: 'Les chaussons', type: 'Confort', description: 'Ils attendent au pied du lit pour commencer la journée.', power: 'Pas moelleux' },
  { name: 'La carte de vœux', type: 'Attention', description: 'Quelques mots écrits à la main pour penser à ceux qu’on aime.', power: 'Message sincère' },
  { name: 'Le souhait de Noël', type: 'Tradition', description: 'Un vœu discret confié aux lumières du sapin.', power: 'Espoir lumineux' },
  { name: 'La musique de Noël', type: 'Ambiance', description: 'Quelques notes suffisent à faire chanter toute la maison.', power: 'Mélodie festive' },
  { name: 'La nappe de fête', type: 'Décoration', description: 'Elle habille la table avant l’arrivée des grands plats.', power: 'Table élégante' },
  { name: 'La serviette pliée', type: 'Décoration', description: 'Une petite attention qui rend le repas encore plus spécial.', power: 'Table soignée' },
  { name: 'Le verre qui tinte', type: 'Tradition', description: 'Deux verres se rencontrent et la soirée peut commencer.', power: 'Santé partagée' },
  { name: 'La boule brillante', type: 'Décoration', description: 'Elle reflète les lumières et les visages autour du sapin.', power: 'Reflet joyeux' },
  { name: 'Le sapin parfumé', type: 'Décoration', description: 'Son odeur de forêt fraîche remplit la pièce de souvenirs.', power: 'Parfum de forêt' },
  { name: 'La pomme de pin', type: 'Décoration', description: 'Un petit trésor de la nature posé près des branches.', power: 'Décor naturel' },
  { name: 'Le renne en bois', type: 'Décoration', description: 'Une silhouette douce qui veille sur les cadeaux.', power: 'Gardien de bois' },
  { name: 'L’ange du sapin', type: 'Décoration', description: 'Il veille tout en haut de l’arbre sur la maison endormie.', power: 'Veille céleste' },
  { name: 'L’étoile en papier', type: 'Création', description: 'Une étoile faite maison qui brille de toute sa simplicité.', power: 'Artisanat lumineux' },
  { name: 'La fenêtre illuminée', type: 'Ambiance', description: 'Une lumière accueillante qui se voit depuis la rue.', power: 'Maison accueillante' },
  { name: 'Le matin de Noël', type: 'Moment précieux', description: 'Le jour se lève et la magie est déjà dans l’air.', power: 'Réveil merveilleux' },
  { name: 'Le paquet sous le sapin', type: 'Tradition', description: 'Il attend son moment, entouré de rubans et de mystère.', power: 'Promesse cachée' },
  { name: 'Le rire dans la maison', type: 'Émotion', description: 'Un rire spontané qui rend la fête plus belle.', power: 'Joie contagieuse' },
  { name: 'La photo près du sapin', type: 'Souvenir', description: 'Un instant figé pour garder la chaleur de cette journée.', power: 'Souvenir précieux' },
  { name: 'Le plaid de Noël', type: 'Confort', description: 'Un plaid tout doux pour se blottir quand la nuit tombe.', power: 'Cocon douillet' },
  { name: 'Le chant sous la douche', type: 'Joie', description: 'Même les matins pressés ont droit à leur refrain de fête.', power: 'Bonne humeur' },
  { name: 'Le vœu sous le gui', type: 'Tradition', description: 'Un baiser volé sous une branche porte-bonheur.', power: 'Baiser porte-bonheur' },
  { name: 'Le petit cadeau surprise', type: 'Attention', description: 'Une petite boîte qui dit simplement : je pensais à toi.', power: 'Geste attentionné' },
  { name: 'La lumière du sapin', type: 'Ambiance', description: 'Elle scintille doucement quand la maison devient silencieuse.', power: 'Lueur paisible' },
  { name: 'La veillée de décembre', type: 'Moment précieux', description: 'Une soirée calme où chacun profite d’être ensemble.', power: 'Temps partagé' },
]

export const rareCards: CardDefinition[] = [
  { name: 'Patiner sur la glace', type: 'Aventure hivernale', description: 'Un tour de piste, les joues rouges et le sourire grand comme l’hiver.', power: 'Glisse parfaite' },
  { name: 'Manger du chocolat', type: 'Gourmandise', description: 'Un moment simple qui devient précieux quand on le partage.', power: 'Pause fondante' },
  { name: 'Faire un bonhomme de neige', type: 'Aventure hivernale', description: 'Trois boules, deux branches et une bonne dose de rire.', power: 'Compagnon de neige' },
  { name: 'La bataille de boules de neige', type: 'Jeu d’hiver', description: 'Une bataille joyeuse où personne ne reste complètement sec.', power: 'Lancer givré' },
  { name: 'La promenade illuminée', type: 'Balade', description: 'Découvrir les maisons décorées quand la nuit est tombée.', power: 'Chemin scintillant' },
  { name: 'Le marché de Noël', type: 'Sortie festive', description: 'Des chalets, des odeurs d’épices et des lumières partout.', power: 'Flânerie enchantée' },
  { name: 'Le vin chaud', type: 'Boisson festive', description: 'Une tasse épicée qui réchauffe les mains après une balade.', power: 'Chaleur épicée' },
  { name: 'Les marrons chauds', type: 'Gourmandise', description: 'Une poignée fumante à déguster en rentrant du froid.', power: 'Chaleur des rues' },
  { name: 'La recette de famille', type: 'Tradition', description: 'Une recette transmise avec ses secrets et ses petits gestes.', power: 'Saveur héritée' },
  { name: 'La chasse aux cadeaux', type: 'Aventure', description: 'Trouver la cachette parfaite avant le grand matin.', power: 'Discrétion absolue' },
  { name: 'Le secret bien gardé', type: 'Mystère', description: 'Ne rien révéler, même quand l’excitation devient impossible à cacher.', power: 'Silence complice' },
  { name: 'Le cadeau fait main', type: 'Création', description: 'Un présent imparfait et sincère, fabriqué spécialement pour quelqu’un.', power: 'Amour artisanal' },
  { name: 'Le puzzle de Noël', type: 'Jeu', description: 'Une image à construire lentement autour d’une boisson chaude.', power: 'Patience partagée' },
  { name: 'La partie de jeu de société', type: 'Jeu', description: 'Un tournoi familial où la mauvaise foi fait partie du plaisir.', power: 'Rivalité joyeuse' },
  { name: 'Le marché aux sapins', type: 'Tradition', description: 'Choisir l’arbre qui aura l’honneur de porter toutes les lumières.', power: 'Choix du roi' },
  { name: 'La balade en forêt', type: 'Promenade', description: 'L’air froid, les branches blanches et le silence sous les pas.', power: 'Souffle de nature' },
  { name: 'La lettre au Père Noël', type: 'Tradition', description: 'Une liste de rêves écrite avec une attention très sérieuse.', power: 'Rêves sur papier' },
  { name: 'Le réveil avant tout le monde', type: 'Impatience', description: 'Ouvrir les yeux trop tôt parce que la magie ne peut pas attendre.', power: 'Éveil matinal' },
  { name: 'Le secret du paquet', type: 'Mystère', description: 'Deviner ce qui se cache sous le papier sans jamais le déchirer.', power: 'Instinct de détective' },
  { name: 'La photo de famille', type: 'Souvenir', description: 'Réunir tout le monde, même ceux qui prétendent ne pas aimer les photos.', power: 'Portrait de fête' },
  { name: 'La bataille de coussins', type: 'Jeu d’hiver', description: 'Une aventure improvisée qui finit en éclats de rire.', power: 'Coup moelleux' },
  { name: 'La playlist de décembre', type: 'Ambiance', description: 'La bande-son parfaite pour cuisiner, décorer et danser.', power: 'Rythme festif' },
  { name: 'Les décorations retrouvées', type: 'Souvenir', description: 'Chaque boîte ressort avec ses trésors et ses histoires.', power: 'Mémoire décorée' },
  { name: 'Le chocolat partagé', type: 'Gourmandise', description: 'Le dernier carré est toujours meilleur quand on le partage à deux.', power: 'Partage fondant' },
  { name: 'La promenade sous les étoiles', type: 'Balade', description: 'Marcher dans le froid en levant les yeux vers un ciel immense.', power: 'Ciel d’hiver' },
  { name: 'Le pull assorti', type: 'Tradition', description: 'Une tenue coordonnée qui prouve que la fête est prise au sérieux.', power: 'Style coordonné' },
  { name: 'La surprise dans la boîte aux lettres', type: 'Attention', description: 'Un courrier inattendu transforme une journée ordinaire.', power: 'Courrier enchanté' },
  { name: 'Le dessin de Noël', type: 'Création', description: 'Un dessin coloré qui trouve naturellement sa place sur le frigo.', power: 'Couleurs de fête' },
  { name: 'Le trajet vers la famille', type: 'Voyage', description: 'Les kilomètres passent plus vite quand on sait qui attend à l’arrivée.', power: 'Route du bonheur' },
  { name: 'Le premier flocon', type: 'Merveille hivernale', description: 'Le tout premier flocon fait taire la maison pendant quelques secondes.', power: 'Instant suspendu' },
]

export const epicCards: CardDefinition[] = [
  { name: 'Le film de Noël', type: 'Soirée cocooning', description: 'Une histoire réconfortante, une couverture et la même émotion à chaque fois.', power: 'Fin heureuse' },
  { name: 'Disney sous le plaid', type: 'Soirée cocooning', description: 'Un monde merveilleux à regarder bien au chaud, blotti contre ceux qu’on aime.', power: 'Rêve animé' },
  { name: 'La cheminée', type: 'Refuge hivernal', description: 'Le feu crépite et donne à toute la pièce une lumière dorée.', power: 'Flamme réconfortante' },
  { name: 'Le grand sapin', type: 'Décoration majestueuse', description: 'Le sapin qui rassemble tous les regards et toutes les décorations.', power: 'Présence royale' },
  { name: 'La maison en pain d’épices', type: 'Création gourmande', description: 'Une petite maison sucrée où l’imagination peut habiter.', power: 'Architecture sucrée' },
  { name: 'Le dîner aux chandelles', type: 'Repas de fête', description: 'Une table éclairée doucement pour un repas qui mérite de durer.', power: 'Lumière intime' },
  { name: 'Le conte au coin du feu', type: 'Histoire', description: 'Une histoire racontée lentement pendant que le feu veille.', power: 'Récit chaleureux' },
  { name: 'La neige qui tombe', type: 'Merveille hivernale', description: 'Le monde devient silencieux et tout semble possible.', power: 'Silence blanc' },
  { name: 'La nuit étoilée', type: 'Paysage céleste', description: 'Un ciel limpide qui ressemble à une carte pleine de promesses.', power: 'Constellation secrète' },
  { name: 'La grande décoration', type: 'Rituel de famille', description: 'Le moment où les cartons s’ouvrent et où la maison change de visage.', power: 'Métamorphose festive' },
  { name: 'Le feu de cheminée', type: 'Refuge hivernal', description: 'Ses flammes dansent pendant que la nuit s’installe derrière les vitres.', power: 'Cœur incandescent' },
  { name: 'Le dîner qui s’éternise', type: 'Moment précieux', description: 'On ne regarde plus l’heure parce que les conversations sont trop belles.', power: 'Temps suspendu' },
  { name: 'La table pleine de rires', type: 'Repas de fête', description: 'Une table où les histoires circulent aussi vite que les plats.', power: 'Rire collectif' },
  { name: 'Le secret sous le sapin', type: 'Mystère merveilleux', description: 'Un cadeau mystérieux dont tout le monde essaie de deviner l’origine.', power: 'Suspense doré' },
  { name: 'Le matin enneigé', type: 'Paysage hivernal', description: 'La lumière blanche du matin transforme le quartier en décor de conte.', power: 'Aube magique' },
  { name: 'Le parfum du four', type: 'Cuisine de fête', description: 'Une odeur délicieuse annonce que quelque chose de merveilleux se prépare.', power: 'Promesse gourmande' },
  { name: 'La valse des lumières', type: 'Ambiance féerique', description: 'Les guirlandes se reflètent dans les fenêtres comme des étoiles dansantes.', power: 'Danse lumineuse' },
  { name: 'Le grand câlin', type: 'Tendresse', description: 'Un câlin qui dure longtemps et dit tout ce que les mots ne disent pas.', power: 'Étreinte infinie' },
  { name: 'Le rêve éveillé', type: 'Merveille', description: 'Un instant si parfait qu’on voudrait le garder pour toujours.', power: 'Instant précieux' },
  { name: 'La veillée magique', type: 'Rituel de famille', description: 'Une nuit douce et lumineuse où chaque présence compte profondément.', power: 'Présence enchantée' },
]

export const legendaryCards: CardDefinition[] = [
  { name: 'Rocket', type: 'Compagnon de Noël', description: 'Le petit gardien à quatre pattes qui rend chaque fête plus vivante.', power: 'Ronronnement magique' },
  { name: 'Papa Noël', type: 'Figure légendaire', description: 'Le visiteur de la nuit qui fait voyager les rêves jusque sous le sapin.', power: 'Tournée enchantée' },
  { name: 'Le réveillon de Noël', type: 'Nuit sacrée', description: 'La grande soirée où les cœurs se rapprochent autour d’une table pleine de vie.', power: 'Minuit enchanté' },
  { name: 'La magie de Noël', type: 'Essence des fêtes', description: 'Cette sensation rare qui transforme les petits instants en souvenirs inoubliables.', power: 'Merveille absolue' },
  { name: 'Le foyer réuni', type: 'Trésor familial', description: 'Tous ceux qui comptent au même endroit, pour une soirée qui restera longtemps.', power: 'Cercle de chaleur' },
  { name: 'Le vœu exaucé', type: 'Miracle de Noël', description: 'Un souhait devenu réalité au moment où personne ne l’attendait plus.', power: 'Espoir accompli' },
  { name: 'La nuit de Noël', type: 'Moment légendaire', description: 'Une nuit suspendue, pleine de lumières, de douceur et de promesses.', power: 'Éternité blanche' },
  { name: 'L’esprit de Noël', type: 'Relique du solstice', description: 'La force invisible qui invite à aimer, partager et prendre soin les uns des autres.', power: 'Générosité infinie' },
]

export const extraordinaryCards: CardDefinition[] = [
  { name: 'L’étoile Mathilde', type: 'Lumière du souvenir', description: 'Une étoile douce qui veille dans le ciel et garde avec tendresse la mémoire de Mathilde.', power: 'Amour qui demeure' },
  { name: 'Dany', type: 'Maman exceptionnelle', description: 'La présence chaleureuse et aimante qui rend chaque moment spécial.', power: 'Amour infini' },
  { name: 'Florent', type: 'Papa attentionné', description: 'La présence rassurante et bienveillante qui rend chaque instant précieux.', power: 'Amour constant' },
  { name: 'Boubou', type: 'Trésor du cœur', description: 'Un nom qui porte une histoire, une présence et une chaleur que l’on garde près de soi.', power: 'Lien éternel' },
]

function addCardData(
  cardDefinitions: CardDefinition[],
  rarity: Rarity,
  accent: string,
  symbol: string,
): Card[] {
  return cardDefinitions.map((card) => ({
    ...card,
    id: card.name.toLowerCase().replace(/\s+/g, '-') as CardID<typeof card.name>,
    rarity,
    accent,
    symbol,
  }))
}

export const cards: Card[] = [
  ...addCardData(commonCards, 'Commun', 'ice', '✦'),
  ...addCardData(rareCards, 'Rare', 'blue', '◆'),
  ...addCardData(epicCards, 'Épique', 'violet', '✧'),
  ...addCardData(legendaryCards, 'Légendaire', 'gold', '★'),
  ...addCardData(extraordinaryCards, 'Extraordinaire', 'rainbow', '♥'),
]

// Take 1 common, 1 rare, 1 epic, and 1 legendary card for example
export const exempleCards: Card[] = [
  cards.find((card) => card.rarity === 'Commun')!,
  cards.find((card) => card.rarity === 'Rare')!,
  cards.find((card) => card.rarity === 'Épique')!,
  cards.find((card) => card.rarity === 'Légendaire')!,
]

export const rarityDetails: Array<{ name: Rarity; description: string; color: string }> = [
  { name: 'Commun', description: 'Les petites merveilles du quotidien', color: 'common' },
  { name: 'Rare', description: 'Des compagnons qu’on n’oublie pas', color: 'rare' },
  { name: 'Épique', description: 'Des histoires vraiment extraordinaires', color: 'epic' },
  { name: 'Légendaire', description: 'Une magie que l’on ne voit qu’une fois', color: 'legendary' },
  { name: 'Extraordinaire', description: 'Une carte unique, cachée dans les étoiles', color: 'extraordinary' },
]
