
export type Cargo = 'user' | 'admin';

export interface User {
    id_usuario: number;
    nome_usuario: string | null;
    email: string | null;
    endereco_imagem: string | null;
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