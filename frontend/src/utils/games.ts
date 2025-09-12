interface Game {
    id: number;
    name: string;
    image: string;
    category: 'fps' | 'rpg' | 'strategy' | 'racing' | 'indie' | 'mmo';
    rating: number;
    price: string;
    description: string;
    tags: string[];
    featured: boolean;
}

export const games: Game[] = [
    {
        id: 1,
        name: "Counter-Strike 2",
        image: "/images/games/cs2.jpg",
        category: "fps",
        rating: 4.8,
        price: "Free",
        description: "The legendary FPS returns with next-gen graphics and gameplay.",
        tags: ["Competitivo", "Multiplayer", "Tático"],
        featured: true
    },
    {
        id: 2,
        name: "Fortnite",
        image: "/images/games/fortnite.jpg",
        category: "fps",
        rating: 4.5,
        price: "Free",
        description: "Battle royale que define uma geração de jogadores.",
        tags: ["Battle Royale", "Construção", "Cross-platform"],
        featured: true
    },
    {
        id: 3,
        name: "The Witcher 3",
        image: "/images/games/thewitcher3.jpg",
        category: "rpg",
        rating: 4.9,
        price: "R$ 59,99",
        description: "Uma épica aventura de fantasia dark em mundo aberto.",
        tags: ["Mundo Aberto", "História Rica", "Escolhas"],
        featured: true
    },
    {
        id: 4,
        name: "Rocket League",
        image: "/images/games/rocketleague.jpg",
        category: "racing",
        rating: 4.7,
        price: "Free",
        description: "Futebol com carros em alta velocidade e acrobacias.",
        tags: ["Esports", "Multiplayer", "Física"],
        featured: false
    },
    {
        id: 5,
        name: "Age of Empires IV",
        image: "/images/games/ageofempires.png",
        category: "strategy",
        rating: 4.6,
        price: "R$ 129,99",
        description: "RTS clássico reimaginado para a era moderna.",
        tags: ["Estratégia", "Histórico", "Multiplayer"],
        featured: false
    },
    {
        id: 6,
        name: "Hollow Knight",
        image: "/images/games/hollowknight.avif",
        category: "indie",
        rating: 4.8,
        price: "R$ 31,99",
        description: "Metroidvania atmosférico com arte desenhada à mão.",
        tags: ["Metroidvania", "Arte 2D", "Desafiador"],
        featured: false
    },
    {
        id: 7,
        name: "Final Fantasy XIV",
        image: "/images/games/finalfantasy.jpg",
        category: "mmo",
        rating: 4.7,
        price: "R$ 19,99/mês",
        description: "MMORPG com uma das melhores histórias do gênero.",
        tags: ["MMORPG", "História", "Social"],
        featured: true
    },
    {
        id: 8,
        name: "Civilization VI",
        image: "/images/games/civilization.avif",
        category: "strategy",
        rating: 4.5,
        price: "R$ 199,99",
        description: "Construa um império que resistirá ao teste do tempo.",
        tags: ["4X", "Turnos", "Estratégia"],
        featured: false
    }
];

export const categories = [
    { id: 'all', name: 'Todos', count: games.length },
    { id: 'fps', name: 'FPS', count: games.filter(g => g.category === 'fps').length },
    { id: 'rpg', name: 'RPG', count: games.filter(g => g.category === 'rpg').length },
    { id: 'strategy', name: 'Estratégia', count: games.filter(g => g.category === 'strategy').length },
    { id: 'racing', name: 'Corrida', count: games.filter(g => g.category === 'racing').length },
    { id: 'indie', name: 'Indie', count: games.filter(g => g.category === 'indie').length },
    { id: 'mmo', name: 'MMO', count: games.filter(g => g.category === 'mmo').length },
];