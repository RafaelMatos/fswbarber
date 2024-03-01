# FSW Barber💈

Plataforma destinado à barbearias, podendo oferecer seus serviços e realizar agendamentos para seus clientes. Aplicação full stack, utilizando o conceito de backend for frontend permitido pelo framework Next.js e na aplicação você já pode:

- Fazer login com conta Google ;
- Fazer listagem de barbearias cadastradas;
- Fazer listagem de serviços da barbearia selecionada;


<a href="https://fswbarber-rm.vercel.app/">Acesse a aplicação</a>



<img src='https://res.cloudinary.com/dkrhvi3kt/image/upload/v1708521853/github/FSW%20Barber/Gif/jzdopjggkdauhvlvilpi.gif' alt='gif da tela da aplicação FSW Barber'>
<!-- <img src='https://github.com/RafaelMatos/bookwise/raw/master/public/tela.gif' alt='gif da tela da aplicação FSW Barber'> -->

<!-- <details>
    <summary>Responsivo</summary>
    <img src='./src/assets/responsive.png' alt='print da tela da aplicação Ignite Call'>
</details> -->

## Tecnologias usadas ⚙

- Next.js
- React.js
- TailwindCSS
- Typescript
- Shadcn UI
- Prisma
- NextAuth.js
- Lucide-react
- Google Apis
- Date-fns
<!-- - Zod -->
<!-- - React Hook Form -->
<!-- - Axios -->
<!-- - Ignite-ui -->
<!-- - Nookies -->

## Atualizações 🔃

  <!-- <details>
    <summary>Histórico</summary>

      - Adicionado a configuração pageExtensions do Next.js;

    
</details> -->

  - Criada tela inicial;
  - Criada tela de barbearia
  - Criado menu lateral
  - Menu lateral fazendo autenticação com Google
  - Adicionada funcionalidade de agendamentos
  - Adicionada página de agendamentos
  - <details>
    <summary>Adicionada funcionalidade de cancelamento de agendamento</summary>
    <img src='https://github.com/RafaelMatos/projectsImages/blob/master/FSWBarber/printscreens/update-cancel-booking.gif?raw=true' alt='gif de atualização da aplicação FSW Barber'>
    </details>



  <!-- <img src='./src/assets/update.gif' alt='gif da tela da aplicação Ignite Call'> -->
  
  

## Como utilizar

- Clone o projeto do repositório

```
git clone https://github.com/RafaelMatos/fswbarber
```

- Acesse a pasta do projeto

```
cd /fswbarber
```

- Instale as dependências

```
npm install
```
- Criar arquivo .env com as chaves necessarias( seguir arquivo .envExample)

- Inicializa o Prisma( Usar banco de dados de sua preferencia, no exemplo é usado o postgresql)

```
npx prisma init --datasource-provider postgresql
```
- Realiza as migrations do Prisma

```
npx prisma migrate dev --name init
```

- Execute o projeto

```
npm run dev
```

- Acesse no navegador o endereço indicado no terminal
