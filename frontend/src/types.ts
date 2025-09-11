
export type Cargo = 'user' | 'admin';

export interface User {
    id_usuario: number;
    nome_usuario: string | null;
    email: string | null;
    endereco_imagem: string | null;
    endereco_banner: string | null;
    descricao: string | null;
    num_telefone: string | null;
    genero: string | null;
    localizacao: string | null;
    dt_nascimento: Date | null;
    cargo: Cargo | null;
    status: number | null;
    criado_em: Date;
    atualizado_em: Date;
}

export interface BackendPost {
    id_post: number;
    texto: string;
    imagem_post?: string;
    id_usuario: number;
    curtidas: number;
    status: number;
    criado_em: string;
    atualizado_em: string;
    tb_usuarios: {
        nome_usuario: string;
        endereco_imagem?: string;
    };
}