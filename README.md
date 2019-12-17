Como projeto final do bootcamp {reprograma}, essa API tem como proposta de ajudar os Profissionais de Estética, segue uma breve descrição:

--- Breve descrição da ideia:
Será para esteticistas que tem um pequeno negócio e que faz home care ou que está começando a carreira de estetica, que no momento precisam dos dados dos clientes para manter o contato.
Neste projeto Irá criar cadastros dos clientes de estetica, alterar os dados, consultar as informações e deletar, poderá verificar os produtos utilizados em procedimentos/tratamentos.

 --- Requisitos obrigatórios:
- Dados pessoais: nome, e-mail, senha.

 --- Requisitos não obrigatorios: 
- idade;
- telefone;
- endereço;
- alergias (se a pessoa tem alguma alergia, caso a pessoa tenha não podera fazer certos tratamentos);
- grupo que pertence (adm ou comum);
- Tratamento medico(medicamentos) - descrção.


--- Observações:
A ideia é desenvolver posteriormente ao trabalho de conclusão do curso, um site onde estes Esteticistas possam cadastrar clientes e consigam manter os contatos e verificar as informaçoes importantes para o dia a dia. 
E gostaria de criar um app deste mesmo site para facilitar e ajudar os profissionais de Estética.

-------------------------------------------------------------------------------------------------------------------------------

Instalação 👩‍💻
Para utilizar essa API, é necessário ter instalado na sua máquina

Fork esse repositório para seu github. Clone-o na sua máquina. Após entrar na pasta pelo PROMPT, dê npm init e npm install.

Utilização
Para inicialiazar o app:
npm run start  


Rotas
A API está sendo escutada na porta 3000, dessa forma, para todas as rotas serem acessadas localmente, use http://localhost:3000/

/clientes - visualizar ou adicionar clientes

/clientes/ProfissionalEstetica - adiciona o Profissional de Estética como ADD 

/clientes/:id - visualizar ou remover cliente por id



