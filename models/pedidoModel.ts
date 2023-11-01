interface IPedido {
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  interfaces: {
    quantidade: number;
    valor: number;
    imagem: string;
    itens: {
      descricao: string;
      preco: number;
      quantidade: number;
    }[];
    ambientes: string[];
  }[];
  cabos: { nome: string; quantidade: number; preco: number }[];
  observacoes?: string;
}

export default IPedido;