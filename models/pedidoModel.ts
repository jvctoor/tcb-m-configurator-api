interface IPedido {
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  interfaces: {
    quantidade: number;
    valor: number;
    imagem: string;
    itens_selecionados: {
      descricao: string;
      imagem: string;
      cod: number;
      preco: number;
    }[];
    ambiente: string[];
  }[];
  cabos: { lista_itens: {cod: number, descricao: string, imagem: string, preco: number, tipo: string, }; quantidade: number; valor: number }[];
  observacoes?: string;
}

export default IPedido;
