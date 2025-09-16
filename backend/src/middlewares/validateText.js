const forbiddenWords = [
    // Palavrões comuns
    'porra', 'merda', 'caralho', 'buceta', 'puta', 'filho da puta', 'fdp',
    'cu', 'cuzao', 'cuzão', 'arrombado', 'babaca', 'idiota', 'imbecil',
    'otario', 'otário', 'burro', 'estupido', 'estúpido', 'retardado',
    'mongolóide', 'mongoloide', 'deficiente', 'aleijado',
    
    // Termos sexuais explícitos
    'sexo', 'porn', 'porno', 'pornografia', 'masturbacao', 'masturbação',
    'punheta', 'siririca', 'orgasmo', 'tesao', 'tesão', 'gozar', 'gozo',
    'penis', 'pênis', 'vagina', 'clitoris', 'clitóris',
    
    // Termos racistas e discriminatórios
    'negro', 'macaco', 'primata', 'escravo', 'senzala',
    'nazista', 'hitler', 'holocausto', 'kkk', 'supremacia',
    'gay', 'viado', 'bicha', 'sapatao', 'sapatão', 'traveco',
    
    // Incitação à violência
    'matar', 'morrer', 'morte', 'suicidio', 'suicídio', 'enforcar',
    'assassinar', 'homicidio', 'homicídio', 'violencia', 'violência',
    'estuprar', 'estupro', 'abusar', 'abuso', 'sequestrar', 'sequestro',
    
    // Drogas
    'maconha', 'marijuana', 'cocaina', 'cocaína', 'crack', 'heroina',
    'heroína', 'lsd', 'ecstasy', 'anfetamina', 'metanfetamina',
    'trafico', 'tráfico', 'dealer', 'biqueira',
    
    // Spam/Golpes
    'bitcoin gratis', 'bitcoin grátis', 'ganhe dinheiro', 'renda extra',
    'trabalhe em casa', 'click aqui', 'clique aqui', 'compre agora',
    'oferta limitada', '100% gratis', '100% grátis', 'sem custo',
    
    // Termos relacionados a hack/fraude
    'hack', 'hacker', 'crackeado', 'pirata', 'senha', 'password',
    'cartao de credito', 'cartão de crédito', 'cpf', 'rg', 'conta bancaria',
    'conta bancária', 'golpe', 'fraude', 'phishing',
    
    // Variações com números e símbolos
    'p0rn0', 'p@rn', 's3x0', 'f@ck', 'sh1t', 'b1tch', 'd@mn',
    'h3ll', 'a$$', 'f*ck', 's*x', 'p*rn', 'sh*t',
    
    // Termos em inglês comuns
    'fuck', 'shit', 'bitch', 'damn', 'hell', 'ass', 'bastard',
    'whore', 'slut', 'cunt', 'dick', 'cock', 'pussy', 'tits',
    'boobs', 'nude', 'naked', 'sex', 'porn', 'xxx',
    
    // Ameaças
    'vou te matar', 'vou te quebrar', 'vou te bater', 'tome cuidado',
    'você vai se arrepender', 'vou te pegar', 'te espero la fora',
    'te espero lá fora', 'acerto de contas',
    
    // Informações pessoais (padrões)
    'telefone:', 'celular:', 'whatsapp:', 'email:', 'endereço:',
    'endereco:', 'instagram:', 'facebook:', 'tiktok:', 'twitter:',
];

// Função para validar texto
export function validateText(req, res, next){

    const data = req.body;
    let text;

    if('texto' in data){
        text = data.texto
    }

    if('descricao' in data){
        text = data.descricao
    }

    if('nome_usuario' in data){
        text = data.nome_usuario
    }

    if (!text || typeof text !== 'string') {
        return { isValid: false, reason: 'Texto inválido' };
    }
    
    const textLower = text.toLowerCase();
    
    // Remove acentos para comparação
    const removeAccents = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };
    
    const normalizedText = removeAccents(textLower);
    
    for (let word of forbiddenWords) {
        const normalizedWord = removeAccents(word.toLowerCase());
        
        // Verifica palavra completa e como substring
        if (normalizedText.includes(normalizedWord)) {
            return res.status(400).json({ 
                ok: false, 
                status: 400,
                message: 'Conteúdo não permitido detectado'
            })
        }
    }
    
    // Verifica padrões de spam (muitos links)
    const linkPattern = /(https?:\/\/|www\.)/gi;
    const linkMatches = text.match(linkPattern);
    if (linkMatches && linkMatches.length > 2) {
        return res.status(400).json({ 
                ok: false, 
                status: 400,
                message: 'Muitos links detectados' ,
            })
    }
    
    // Verifica texto muito repetitivo
    const words = text.split(' ');
    const uniqueWords = new Set(words);
    if (words.length > 10 && uniqueWords.size / words.length < 0.3) {
        return res.status(400).json({ 
                ok: false, 
                status: 400,
                message: 'Texto muito repetitivo' ,
            })
    }

    next();
};
