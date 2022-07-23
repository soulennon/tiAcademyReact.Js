import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Container, Form, FormGroup, Input, Label, NavItem, Spinner } from 'reactstrap';
import { api } from '../../../config';

export const EditarPed = (props) => {

    const [id] = useState(props.match.params.id);
    const [ClienteId, setCliId] = useState('');
    const [ServicoId, setServId] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const edtPedido = async e => {
        e.preventDefault();
        console.log("Editar")

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.put(api + "/editarpedido", { id, ClienteId, ServicoId, valor, data }, { headers })
            .then((response) => {
                console.log(response.data.error);
                console.log(response.data.message);
                setStatus({
                    formSave: false,
                    type: 'success',
                    message: response.data.message
                });
            })
            .catch(() => {
                setStatus({
                    formSave: false,
                    type: 'error',
                    message: 'Não foi possível acessar a API.'

                });
            });
    };

    useEffect(() => {
        const getPedido = async () => {
            await axios.get(api + "/pedido/" + id)
                .then((response) => {
                    setCliId(response.data.pedido.ClienteId);
                    setServId(response.data.pedido.ServicoId);
                    setValor(response.data.pedido.valor);
                    setData(response.data.pedido.data);
                })
                .catch(() => {
                    console.log("Erro: Não foi possível conectar à API.")
                });
        }
        getPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h3>Editar um pedido</h3>
                    </div>
                    <div>
                        <Link to={"/visualizarservico/"}
                            className="btn btn-outline-primary btn-sm m-1">Listar</Link>
                        <Link to={"/servico/" + id}
                            className="btn btn-outline-primary btn-sm m-1">Consultar</Link>
                    </div>
                </div>

                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger"> {status.message}</Alert> : ""}

                {status.type === 'success' ? <Alert color="success"> {status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={edtPedido}>
                    <FormGroup className="p-2">
                        <Label>Cliente</Label>
                        <Input type="text" name="ClienteId"
                            placeholder="Cliente" value={ClienteId}
                            onChange={e => setCliId(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Serviço</Label>
                        <Input type="text" name="ServicoId"
                            placeholder="Serviço" value={ServicoId}
                            onChange={e => setServId(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Valor</Label>
                        <Input type="text" name="valor"
                            placeholder="Valor" value={valor}
                            onChange={e => setValor(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input type="text" name="data"
                            placeholder="Data" value={data}
                            onChange={e => setData(e.target.value)} />
                    </FormGroup>

                    {status.formSave ?
                        <Button type="submit" outline color="warning" disabled>Salvando...
                            <Spinner size="sm" color="warning" /></Button> :
                        <Button type="submit" outline color="info m-1">Salvar</Button>}
                    <Link to={"/visualizarpedido/"}
                        className="btn btn-outline-danger btn-sm m-1 p-2">Cancelar</Link>
                </Form>

            </Container>
        </div>
    )
}