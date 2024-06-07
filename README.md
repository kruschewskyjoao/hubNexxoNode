# Desafio técnico - HubNexxo

### Descrição do desafio proposto:
1) Criar conta de testes - https://sandbox.asaas.com/onboarding/createAccount
2) Criar CRUD (create, read, update, delete) de clientes com o ASAAS.
Documentação - https://docs.asaas.com/docs/criando-um-cliente

## Importante: Para a segurança foi utilizado variáveis de ambiente. Primeiro vá no https://sandbox.asaas.com/dashboard/index procure pelo icone de perfil no canto superior da tela, depois vá em Integrações (https://sandbox.asaas.com/customerConfigIntegrations/index). E gere uma nova chave de API para poder realizar os testes.
No arquivo .env.example tem alguns exemplos de como utilizar.
Depois só criar o arquivo .env baseado no exemplo. API_PORT=3001 e HOST_NAME=127.0.0.1 - acredito não ser dados importantes.

### Utilizei para a construção da aplicação: Express, babel, nodemon, dotenv, jest, is-email e 'julioakira/cpf-cnpj-utils'.

## Para rodar a aplicação sem Docker:
Utilizei a versão v20.12.1 LTS do Node.Js, então é recomendado estar atualizado para que seja possível rodar corretamente a aplicação.
- Para verificar sua versão entre no terminal e digite "node -v", caso seja mais antiga basta atualizar. Siga as instruções no site: https://nodejs.org/en


## Para rodar a aplicação com Docker:
Caso não tenha instalado o Docker recomendo ver a documentação
- Documentação de instalação para Ubuntu: https://docs.docker.com/engine/install/ubuntu/
- Documentação para instalação macOs: https://docs.docker.com/desktop/install/mac-install/

## Caso de estar utilizando windows
### Recomendo uso de wsl2 para simular o linux
- Documentação wsl2: https://learn.microsoft.com/pt-br/windows/wsl/install
- Documentação Docker wsl2: https://docs.docker.com/desktop/windows/wsl/

# Clone o repositório
- git clone git@github.com:kruschewskyjoao/hubNexxoNode.git

# Entre na pasta do projeto
- cd hubNexxoNode

## Comandos para rodar sem Docker:
- npm install

## Após instalar as dependências:
- npm run dev
Vai começar a rodar o projeto.

## Comandos para rodar com Docker:
- docker build -t hubapp .
- docker run -p 3001:3001 hubapp
Vai começar a rodar via docker.
As vezes ao rodar via docker é necessario ctrl+z para sair do terminal, e vai ter que 'matar' a imagem do docker que ainda vai estar rodando. Só rodar o comando para ver o id
- docker ps
E para parar a imagem:
- docker kill *8963a110376f
*EXEMPLO DE ID


# Com a aplicação rodando:


- Temos POST /newcustomer para a criação de um novo cliente. Aqui o body é obrigatorio ter name e cpfCnpj.
Exemplo de body válido:

{

	"name": "JOAO",
	"cpfCnpj": "30306294000145",
	"email": "joao@gmail.com"
}

Ou caso queira com algumas informações a mais:

{

	"name": "JOAO",
	"cpfCnpj": "30306294000145",
	"email": "joao@gmail.com",
	"postalCode": "41750166"
}

______________________________
- Temos um GET /customers/:infos, onde conseguimos listar clientes específicos utilizando alguma informação como o email, nome, cpf ou cnpj dele. Também pode utilizar offset ou limit nas opções para ajudar na pesquisa.
Exemplo de parametro baseado no usuario criado anteriormente:

-     /customers/joao@gmail.com

-     /customers/joao

-     /customers/30306294000145

-     /customers/30306294000145&limit=1
______________________________

- Temos um GET /customer/:id que é onde conseguimos recuperar um único cliente baseado em ID. Exemplo:
-     /customer/cus_000005958312


______________________________
- Temos um PUT /customer/:id para editar informações baseadas no ID de um cliente.

-     /customer/cus_000005958312

No body podemos ter name, email ou os dois:

{

	"name": "JOAO"

}

______________________________
- Temos o DELETE /customers/:id para remover um cliente baseado no ID dele. Exemplo:

-     /customers/cus_000005958157


teste aprovação