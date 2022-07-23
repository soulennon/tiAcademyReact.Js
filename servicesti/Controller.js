const express=require('express');
const cors=require('cors');

const models=require('./models');

const app=express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let servico=models.Servico;
let pedido=models.Pedido;

app.get('/', function(req,res){
    res.send('Olá Mundo!');
});

app.post('/clientes', async(req,res)=>{
    
    function aguardar(ms){
        return new Promise((resolve)=>{
            setTimeout(resolve.ms);
        });
    };

    await cliente.create(
        req.body
    ).then(function (){
        return res.json({
            error:false,
            message: "Novo cliente cadastrado!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message: "Erro ao cadastrar cliente."
        })
    });
    await aguardar(3000);
});

app.post('/servicos', async(req,res)=>{

    function aguardar(ms){
        return new Promise((resolve)=>{
            setTimeout(resolve.ms);
        });
    };

    await servico.create(
        req.body
    ).then(function (){
        return res.json({
            error:false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message: "Erro ao cadastrar serviço."
        })
    });
    await aguardar(3000);
});



app.post('/pedidos', async(req,res)=>{
    function aguardar(ms){
        return new Promise((resolve)=>{
            setTimeout(resolve.ms);
        });
    };

    await pedido.create(
        req.body
    ).then(function (){
        return res.json({
            error:false,
            message: "Pedido criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message: "Erro ao cadastrar pedido."
        })
    });
    await aguardar(3000);
});

app.get('/listaservicos', async(req,res)=>{
    await servico.findAll({
        order: [['nome', 'DESC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});


app.get('/ofertas', async(req,res)=>{
    await servico.count('id')
    .then(function(servicos){
        res.json(servicos);
    });
});

app.get('/servico/:id', async(req,res)=>{
    servico.findByPk(req.params.id)
    .then(servico =>{
        return res.json({
            error: false,
            servico
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Código não está cadastrado."
        });
    });
});

app.get('/cliente/:id', async(req,res)=>{
    cliente.findByPk(req.params.id)
    .then(cliente =>{
        return res.json({
            error: false,
            cliente
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Código não está cadastrado."
        });
    });
});

app.get('/pedido/:id', async(req,res)=>{
    pedido.findByPk(req.params.id)
    .then(pedido =>{
        return res.json({
            error: false,
            pedido
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Código não está cadastrado."
        });
    });
});

//visualize todos os clientes
app.get('/listaclientes',async(req, res)=>{
    await cliente.findAll({
        raw: true
    }).then(function(clientes){
        res.json({clientes})
    });
});

//visualize todos os clientes em ordem de antiguidade
app.get('/listaclientesantig',async(req, res)=>{
    await cliente.findAll({
        order:[['createdAt']]
    }).then(function(clientes){
        res.json({clientes})
    });
});

//visualizar todos os pedidos
app.get('/listapedidos', async(req,res)=>{
    await pedido.findAll({
        raw: true
    }).then((pedido)=>{
        res.json({
            pedido
        });
    });
});

//visualizar os pedidos em ordem de valor
app.get('/listapedidosvalor', async(req,res)=>{
    await pedido.findAll({
        order:[['valor','DESC']]
    }).then(function(pedidos){
        res.json(pedidos);
    });
});

//numero de clientes
app.get('/numclientes', async(req,res)=>{
    await cliente.count('id')
    .then(function(clientes){
        res.json(clientes);
    });
});

//quantidade de pedidos
app.get('/qtdpedidos', async(req,res)=>{
    await pedido.count('id')
    .then(function(pedidos){
        res.json(pedidos);
    });
});

//gasto do cliente
app.get('/somapedidos/:id',async(req,res)=>{
    await pedido.sum('valor', {where: {ClienteId:(req.params.id)}})
    .then(function(pedidos){
        res.json(pedidos)
    });
});

app.get('/atualizaservico', async(req,res)=>{
    await servico.findByPk(1)
    .then(servico =>{
        servico.nome='HTML/CSS/JS';
        servico.descricao='Páginas estáticas e dinâmicas estilizadas';
        servico.save();
        return res.json({servico});
    });
});

app.put('/editarservico', (req,res)=>{
    servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});

app.put('/editarcliente', (req,res)=>{
    cliente.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do cliente."
        });
    });
});

app.get('/servicospedidos', async(req,res)=>{
    await servico.findByPk(1, {
        include: [{all:true}]
    }).then(servico =>{
        return res.json({servico});
    });
});

app.put('/editarpedido', (req,res)=>{
    pedido.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do pedido."
        });
    });
});

app.put('/alterarpedido', (req,res)=>{
    pedido.update(req.body,{
        where: {ServicoId: req.body.ServicoId}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do pedido."
        });
    });
});

//buscar serviço de cliente passando o id do cliente no corpo da req
app.get('/servicosclientes', async (req,res)=>{
    await cliente.findByPk(req.body.id, {
        include: [{all: true}],
    }).then(cliente =>{
        return res.json({cliente});
    });
});

//usar rota para consultar cliente e edita-lo pelo metodo put
app.put('/editarcliente/:id', (req,res)=>{
    cliente.update(req.body,{
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do cliente."
        });
    });
});

//usar rota para consultar pedidos e edita-lo pelo metodo put
app.put('/editarpedido/:id', (req,res)=>{
    pedido.update(req.body,{
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do pedido."
        });
    });
});

app.get('/excluircliente', async(req,res)=>{
    cliente.destroy({
        where: {id: 5}
    });
});

app.delete('/apagarcliente/:id', (req,res)=>{
    cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
        error: false,
        message: "Cliente excluido."
    });
}).catch(function(erro){
    return res.status(400).json({
        error: true,
        message: "Não foi possível excluir o cliente."
        });
    });
});

app.delete('/apagarservico/:id', (req,res)=>{
    servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
        error: false,
        message: "Serviço excluido."
    });
}).catch(function(erro){
    return res.status(400).json({
        error: true,
        message: "Não foi possível excluir o serviço."
        });
    });
});

app.delete('/apagarcliente/:id', (req,res)=>{
    cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
        error: false,
        message: "Cliente excluido."
    });
}).catch(function(erro){
    return res.status(400).json({
        error: true,
        message: "Não foi possível excluir o cliente."
        });
    });
});

app.delete('/apagarpedido/:id', (req,res)=>{
    pedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
        error: false,
        message: "Pedido excluido."
    });
}).catch(function(erro){
    return res.status(400).json({
        error: true,
        message: "Não foi possível excluir o pedido."
        });
    });
});

//desafios aula 4
app.get('/pedidoscliente/:id', async (req, res)=>{
    await pedido.findAll({ where: { ClienteId: [req.params.id]  } })
    .then(function(pedidos){
        res.json(pedidos)
    });
    console.log(pedidos,valor,ClienteId)
    });
    
//desafio aula 4
app.put('/editarpedidocliente/:id',(req,res)=>{
    pedido.update(req.body,{
            where: {id: req.params.id}
        }).then(function(){
            return res.json({
                error: false,
                message: "Pedido alterado com sucesso."
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Não foi possível editar o pedido."
        });
    });
});

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo');
})