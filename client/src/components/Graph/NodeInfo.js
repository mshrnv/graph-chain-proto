import React, {useContext} from 'react';
import {FormControl, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import GraphService from "../../api/GraphService";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {AppContext} from "../AppContext";
import {Button} from "flowbite-react";


const DescNode = styled('div')(({theme}) => ({
    width: '100%',
    marginTop: theme.spacing(1),

}))

const NodeBox = styled('div')(({theme}) => ({
    borderRadius: theme.shape.borderRadius.fields,
    marginBottom: theme.spacing(1)

}))

const AlertMessage = styled(Typography)(({theme}) => ({
    margin: theme.spacing(1, 1),

}))

const NodeInfo = ({data, setData, selected, setSelected, graphId, owner}) => {
    const [user, setUser] = useContext(AppContext)
    const handleNodeName = (oldName, newName) => {
        const newNodes = data.nodes.map((item) => {
            if (item.id === oldName) {
                return {...item, id: newName}
            }
            return item
        })

        const newLinks = data.links.map((item) => {
            if (item.source === oldName) {
                return {...item, source: newName}
            }
            if (item.target === oldName) {
                return {...item, target: newName}
            }
            return item
        })

        setData({nodes: newNodes, links: newLinks});
        setSelected({...selected, id: newName});
    }

    const handleNodeDescription = (node, description) => {
        const newNodes = data.nodes.map((item) => {
            if (item.id === node) {
                return {...item, description}
            }
            return item
        })

        setData({
            nodes: newNodes,
            links: data.links
        })
        setSelected({...selected, description});
    }

    const handleNodeUrl = (node, url) => {
        const newNodes = data.nodes.map((item) => {
            if (item.id === node) {
                return {...item, url}
            }
            return item
        })

        setData({
            nodes: newNodes,
            links: data.links
        })
        setSelected({...selected, url});
    }

    const updateGraph = async () => {
        await GraphService.updateGraphData(graphId, data)
        // toast("🔥Graph saved!");
        // setData(newData)
        toast("🔥Graph saved!");
    }

    const renderNodeInfo = (node) => {

        if (owner !== user) {
            if (node.isFolder) {
                return (
                    <h5 className="text-2xl font-bold tracking-tight text-white ml-2">
                        {selected.id}
                    </h5>
                )
            }

            return (
                <div>
                    <h5 className="text-2xl font-bold tracking-tight text-white ml-2">
                        {selected.id}
                    </h5>
                    <p className="font-normal text-gray-400 ml-3 mt-1 mb-4">
                        {selected.description}
                    </p>
                    <a href={selected.url}
                       className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 ml-2 mt-16 ">
                        Перейти к источнику
                    </a>
                </div>
            )
        }

        if (node.isFolder) {
            return (
                <FormControl sx={{width: '100%'}}>
                    <div className="relative">
                        <input type="text" id="floating_outlined"
                               value={selected.id} onChange={(e) => handleNodeName(selected.id, e.target.value)}
                               className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                               placeholder=" "/>
                        <label htmlFor="floating_outlined"
                               className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                            Название</label>
                    </div>
                </FormControl>
            )
        }

        return (
            <FormControl sx={{width: '100%'}}>
                <div className="relative">
                    <input type="text" id="floating_outlined"
                           value={selected.id} onChange={(e) => handleNodeName(selected.id, e.target.value)}
                           className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                           placeholder=" "/>
                    <label htmlFor="floating_outlined"
                           className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Название</label>
                </div>
                <div className="relative mt-4">
                    <input type="text" id="floating_outlined"
                           value={selected.description}
                           onChange={(e) => handleNodeDescription(selected.id, e.target.value)}
                           className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                           placeholder=" "/>
                    <label htmlFor="floating_outlined"
                           className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Описание</label>
                </div>
                <div className="relative mt-4">
                    <input type="text" id="floating_outlined"
                           value={selected.url} onChange={(e) => handleNodeUrl(selected.id, e.target.value)}
                           className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                           placeholder=" "/>
                    <label htmlFor="floating_outlined"
                           className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Ссылка на ресурс</label>
                </div>
            </FormControl>
        )
    }

    return (
        <NodeBox>
            <DescNode>
                {selected ? (
                    renderNodeInfo(selected)
                ) : (
                    <AlertMessage>Нода не выбрана</AlertMessage>
                )}
            </DescNode>
            <ToastContainer/>
            {
                owner === user ? (
                    <div className='mt-4'>
                        <Button onClick={updateGraph}>
                            📁Сохранить изменения
                        </Button>
                    </div>
                ) : (
                    <></>
                )
            }

        </NodeBox>
    );
};

export default NodeInfo;