# API de Produtos

## Descrição

Esta é uma API RESTful simples que retorna uma lista de produtos. Cada produto tem informações como nome e preço. Atualmente, apenas o endpoint **GET /api/produtos** está implementado.

## Endpoint

### 1. **GET /api/produtos**

Este endpoint retorna uma lista de produtos disponíveis. Cada produto tem as seguintes propriedades:

- **id**: Identificador único do produto.
- **nome**: Nome do produto.
- **preco**: Preço do produto.

#### Exemplo de Requisição

```http
GET http://localhost:3000/api/produtos
```

#### Exemplo de Resposta

```json
[
  { "id": 1, "nome": "Tv OLED Samsung", "preco": 3500.00 },
  { "id": 2, "nome": "Console PS5 2 Controles", "preco": 3999.00 },
  { "id": 3, "nome": "Air-Fryer Mondial", "preco": 350.00 }
]
```
### 2. **POST /api/produtos**

Este endpoint permite adicionar um novo produto à lista de produtos. O corpo da requisição deve conter o nome e o preço do produto.

#### Exemplo de Requisição

```http
POST http://localhost:3000/api/produtos
```

```json
{
  "nome": "Smartphone Samsung Galaxy",
  "preco": 2999.99
}
```
### Exemplo de Resposta

```json
{
  "message": "Produto adicionado com sucesso!",
  "produto": {
    "id": 1618923400000,
    "nome": "Smartphone Samsung Galaxy",
    "preco": 2999.99
  }
}
```
id: Identificador único do produto (gerado com base no timestamp).

nome: Nome do produto.

preco: Preço do produto.

O **POST /api/produtos** é usado para adicionar um novo produto à lista.
- O **body** da requisição deve conter as informações do produto (`nome` e `preco`).
- Após a criação, a resposta é retornada com a mensagem de sucesso e o produto recém-adicionado, incluindo o `id` gerado automaticamente.


---

## Instruções para Uso

### 1. **Pré-requisitos**

- **Node.js**: Você precisa ter o Node.js instalado. Caso ainda não tenha, baixe-o [aqui](https://nodejs.org/).

- **Postman** ou **Insomnia** (opcional): Ferramentas para testar a API de forma fácil.

### 2. **Como Rodar a API**

1. Clone o repositório ou crie o arquivo `app.js` com o código fornecido acima.

2. Abra o terminal na pasta do projeto e execute o seguinte comando para inicializar o projeto:

    ```bash
    npm init -y
    npm install express
    ```

3. Após instalar as dependências, execute o servidor com o comando:

    ```bash
    node app.js
    ```

O servidor estará rodando em `http://localhost:3000`.

### 3. **Testando a API**

- **GET**: Abra o Postman ou Insomnia e envie uma requisição GET para `http://localhost:3000/api/produtos` para ver a lista de produtos.

## Decisão do Workflow

Optei por utilizar o workflow de **GET** e **POST** para interagir com a lista de produtos. Essa decisão foi tomada com base na simplicidade e eficiência do fluxo de dados:

1. **GET**: O método **GET** foi escolhido para **listar os produtos** já cadastrados, pois é uma forma simples de recuperar dados de uma API sem necessidade de envio de informações adicionais. A resposta será um conjunto de dados, retornando todos os produtos que estão armazenados na aplicação.

2. **POST**: O método **POST** foi implementado para **adicionar novos produtos** à lista. O **POST** é ideal para enviar dados do cliente para o servidor, permitindo que novos produtos sejam criados dinamicamente sem a necessidade de alterar diretamente o código da aplicação.

---

## Provisionamento de Infraestrutura com Vagrant

### 1. Subindo a infraestrutura

1. Certifique-se de ter o [Vagrant](https://www.vagrantup.com/downloads) e o [VirtualBox](https://www.virtualbox.org/wiki/Downloads) instalados em sua máquina.
2. Na raiz do projeto, execute o comando:

```bash
vagrant up
```

Isso irá criar e provisionar duas máquinas virtuais:
- **VM1**: 1024MB de RAM, IP privado 192.168.56.10
- **VM2**: 2048MB de RAM, IP privado 192.168.56.11, com Node.js instalado e aplicação rodando automaticamente

### 2. Acessando as VMs

- Para acessar a VM1:
  ```bash
  vagrant ssh vm1
  ```
- Para acessar a VM2:
  ```bash
  vagrant ssh vm2
  ```

### 3. Testando a rota GET dentro da VM1

1. Acesse a VM1:
   ```bash
   vagrant ssh vm1
   ```
2. Teste a rota GET da aplicação rodando na VM2 usando o comando:
   ```bash
   curl http://192.168.56.11:3000/api/produtos
   ```
   Você deverá receber a lista de produtos em formato JSON.

### 4. Parando as VMs

Para desligar as máquinas virtuais, execute:
```bash
vagrant halt
```

Para destruir as VMs e liberar espaço:
```bash
vagrant destroy
```

---

## Configuração e Execução com Ansible

### 1. Pré-requisitos

- As VMs devem estar criadas e rodando com `vagrant up`.
- O Ansible deve estar instalado na VM1 (nó de controle).

### 2. Executando o Playbook

1. Acesse a VM1:
   ```bash
   vagrant ssh vm1
   ```
2. Dentro da VM1, execute o playbook para configurar a VM2:
   ```bash
   ansible-playbook -i /vagrant/inventario configura-node.yaml
   ```
   > Certifique-se de que o arquivo `configura-node.yaml` está disponível em `/vagrant` ou no diretório corrente da VM1.

### 3. Testando a Aplicação

Após a execução do playbook, a aplicação estará rodando na VM2 (IP: 192.168.56.11, porta 3000). Para testar:

- Usando curl:
  ```bash
  curl http://192.168.56.11:3000/api/produtos
  ```
- Usando wget:
  ```bash
  wget -qO- http://192.168.56.11:3000/api/produtos
  ```

Você deverá receber a lista de produtos em formato JSON.

---

## Configuração e Execução com Vagrant e Ansible

### 1. Subindo as VMs

Execute na raiz do projeto:
```bash
vagrant up
```

### 2. Acessando a VM1 (nó de controle)
```bash
vagrant ssh vm1
```

### 3. Executando o Playbook Ansible
Dentro da VM1, rode:
```bash
ansible-playbook -i /vagrant/inventario /vagrant/configura-node.yaml
```

### 4. Testando a Aplicação
Após a execução do playbook, a aplicação estará rodando na VM2 (IP: 192.168.56.11, porta 3000). Para testar:

- Usando curl:
  ```bash
  curl http://192.168.56.11:3000/api/produtos
  ```
- Usando wget:
  ```bash
  wget -qO- http://192.168.56.11:3000/api/produtos
  ```

Você deverá receber a lista de produtos em formato JSON.
