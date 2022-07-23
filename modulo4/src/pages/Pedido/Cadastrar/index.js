import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap"
import { api } from "../../../config";

export const CadastrarPed = () => {

    const[pedido, setPedido] = useState({
        ClienteId:'',
        ServicoId:'',
        valor:'',
        data:'',
    });

    const [status, setStatus] = useState({
        formSave:false,
        type:'',
        message:''
    });

    const valorInput = e => setPedido({
        ...pedido,[e.target.name]:e.target.value
    });
    
    const cadPedido = async e =>{
        e.preventDefault();

        setStatus({
            formSave:true
        });

        const headers = {
            'Content-Type':'application/json'
        };

        await axios.post(api + "/pedidos", pedido,{headers})
        .then((response) => {
            if(response.data.error){
                setStatus({
                    formSave:false,
                    type: 'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    formSave:false,
                    type: 'success',
                    message: response.data.message
                });
            }
        })
        .catch(() => {
            setStatus({
                formSave:false,
                type: 'error',
                message: "Erro: Não foi possível se conectar à API."
            });
        });
    };

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h3>Cadastrar Pedido</h3>
                    </div>
                    <div className="p-2">
                        <Link to="/visualizarpedido"
                            className="btn btn-outline-primary btn-sm">
                            Listar
                        </Link>
                    </div>
                </div>

                <hr className="m-1"/>

                {status.type === 'error'?<Alert color="danger"> 
                    {status.message}</Alert>:""}
                
                {status.type === 'success'?<Alert color="success">
                    {status.message}</Alert>:""}

                <Form className="p-2" onSubmit={cadPedido}>
                    <FormGroup className="p-2">
                        <Label>Cliente</Label>
                        <Input type="text" name="ClienteId" placeholder="Cliente" onChange={valorInput}/>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Serviço</Label>
                        <Input type="text" name="ServicoId" placeholder="Serviço" onChange={valorInput}/>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Valor</Label>
                        <Input type="text" name="valor" placeholder="Valor" onChange={valorInput}/>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input type="text" name="data" placeholder="Data" onChange={valorInput}/>
                    </FormGroup>
                    
                    {status.formSave ? 
                        <Button type="submit" outline color="info" disabled>Salvando...
                            <Spinner size="sm" color="info"/></Button>:
                        <Button type="submit" outline color="info m-1">Cadastrar</Button>}
                        <Button type="reset"  outline color="warning">Limpar</Button>
                </Form>
            </Container>
        </div>
    )
}