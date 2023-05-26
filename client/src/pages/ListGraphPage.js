import React, {useContext, useEffect, useState} from 'react';
import {FormControl, Input} from "@mui/material";
import GraphCard from "../components/UI/GraphCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import HubIcon from '@mui/icons-material/Hub';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckIcon from '@mui/icons-material/Check';
import IconButton from "@mui/material/IconButton";
import GraphService from "../api/GraphService";
import {AppContext} from "../components/AppContext";
import {CONTRACT_ABI, CONTRACT_ADDRESS} from "../ContractConfig";
import Web3 from "web3";
import parseResources from "../utils/resourseParser";


const CreateGraphButton = styled(Button)(({theme}) => ({
    margin: theme.spacing(2, 0)
}))

const CreateBox = styled(Box)(({theme}) => ({
    margin: theme.spacing(0, 1),

}))
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ListGraphPage = () => {
    const [user, setUser] = useContext(AppContext)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [graphs, setGraphs] = useState([]);

    const [graphName, setGraphName] = useState("");
    const [graphPrice, setGraphPrice] = useState(2);

    const createNewGraph = async () => {
        // Mongo
        const data = await GraphService.createGraph(graphName, user)

        // Blockchain
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        await contract.methods.newGraph(data._id, graphPrice).send({from: user})

        // Update
        await updateGraphs()
        handleClose()
    }

    const updateGraphs = async () => {
        let data = await GraphService.getAllGraphs();

        for (let i = 0; i < data.length; i++) {
            data[i] = {...data[i], ...parseResources(data[i].data)}
        }

        setGraphs(data);
    }

    useEffect(() => {
        updateGraphs();
    }, [])

    return (
        <Box sx={{width: '80%', margin: 'auto'}}>
            <CreateBox>
                <CreateGraphButton onClick={handleOpen}>
                    <HubIcon sx={{marginRight: 1}}/>
                    Создайте свой граф
                </CreateGraphButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <FormControl sx={style}>
                        <Typography>Введите название графа</Typography>
                        <div>
                            <Input value={graphName} onChange={(e) => setGraphName(e.target.value)}></Input>
                        </div>
                        <Typography>Введите стоимость графа в ETH</Typography>
                        <div>
                            <Input value={graphPrice} onChange={(e) => setGraphPrice(e.target.value)}></Input>
                            <IconButton onClick={createNewGraph} sx={{marginLeft: 2}}>
                                <CheckIcon/>
                            </IconButton>
                        </div>
                    </FormControl>
                </Modal>
            </CreateBox>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {graphs.map(item =>
                    <GraphCard key={item.name} item={item}></GraphCard>
                )}
            </div>
        </Box>
    );
};

export default ListGraphPage;