# Defenser - Monitoramento de Aplicações de Defensivos Agrícolas


## Descrição do Projeto

O projeto Defenser é uma aplicação web desenvolvida utilizando Next.js, React.js com TypeScript e a biblioteca de componentes Radix-UI. Ele tem como objetivo fornecer monitoramento em tempo real e previsões meteorológicas específicas para a aplicação de defensivos agrícolas. Isso ajuda os agricultores a tomar decisões informadas sobre quando e como aplicar os defensivos para obter os melhores resultados.

## Funcionalidades Principais

- **Monitoramento em Tempo Real:** A aplicação fornece informações em tempo real sobre as condições meteorológicas e ambientais relevantes para a aplicação de defensivos agrícolas.

- **Previsões Meteorológicas Específicas:** Utilizando dados meteorológicos e informações sobre os defensivos, o Defenser oferece previsões detalhadas para os próximos dias, ajudando os agricultores a planejar suas atividades.

- **Integração com GPS:** O aplicativo pode se integrar com sistemas de GPS para fornecer informações precisas de localização, permitindo um planejamento ainda mais preciso.

## Instalação

1. Clone o repositório para sua máquina local.
   ```bash
   git clone [https://github.com/seu-usuario/defenser.git](https://github.com/folhastech/defenser-webapp.git)
   ```

2. Navegue até o diretório do projeto.
   ```bash
   cd defenser
   ```

3. Instale as dependências.
   ```bash
   npm install
   ```

## Configuração

Antes de iniciar a aplicação, é necessário configurar as credenciais e informações de API necessárias para acessar os dados meteorológicos e integrar-se com sistemas de GPS. Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:

```env
NEXT_PUBLIC_URL=chave_de_api_aqui
```

## Uso

Para iniciar o servidor local, execute o seguinte comando:

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).
---
Para mais informações sobre o Next.js, consulte a [documentação oficial](https://nextjs.org/docs).

Para informações sobre o React.js, visite a [página oficial do React](https://reactjs.org/).

Para obter detalhes sobre o Radix-UI, confira a [documentação no GitHub](https://github.com/radix-ui/primitives).

Para informações sobre TypeScript, visite a [página oficial do TypeScript](https://www.typescriptlang.org/).
