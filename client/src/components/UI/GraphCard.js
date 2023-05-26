import * as React from 'react';
import Card from '@mui/material/Card';
import {styled} from "@mui/material/styles";
import {useContext, useEffect, useState} from "react";
import LikeService from "../../api/LikeService";
import {Link} from "react-router-dom";
import Web3 from "web3";
import {CONTRACT_ADDRESS, CONTRACT_ABI} from "../../ContractConfig"
import {AppContext} from "../AppContext";
import BuyAccessButton from "./BuyAccessButton";
import {Badge, Button} from "flowbite-react";
import transformAddress from "../../utils/addressTransform";

const CardGraph = styled(Card)(({theme}) => ({
    margin: theme.spacing(2, 1),
    maxHeight: '400px',
}))

export default function GraphCard(props) {

    const [user, setUser] = useContext(AppContext)

    const [likesCount, setLikesCount] = useState(0);
    const [hasAccess, setHasAccess] = useState(false);
    const [purchasesCount, setPurchasesCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [updateAccess, setUpdateAccess] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
            const data = await LikeService.getGraphLikes(props.item._id);
            setLikesCount(data.count);
        }
        fetchLikes();
    }, [])

    useEffect(() => {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        contract.methods.hasAccess(user, props.item._id).call({from: user})
            .then((value) => setHasAccess(value))
            .catch((value) => console.log(value));

        contract.methods.purchasesCount(props.item._id).call({from: user})
            .then((value) => setPurchasesCount(value))
            .catch((value) => console.log(value));

        contract.methods.getPrice(props.item._id).call({from: user})
            .then((value) => setPrice(value))
            .catch((value) => console.log(value));
    }, [updateAccess])

    return (
        <div className='h-auto max-w-full rounded-lg'>
            <CardGraph className='p-2 rounded-lg'>
                <div className={'p-2'}>
                    <h5 className="text-2xl font-bold text-white">{props.item.name}</h5>
                    <div className='flex mt-4'>
                        <div className={'w-fit'}>
                            <Badge
                                color="info"
                                size="sm"
                                className='w-full h-full'
                            >
                                {transformAddress(props.item.owner)}
                            </Badge>
                        </div>
                        <div className={'w-full ml-2'}>
                            {
                                hasAccess ? (
                                    <Link className={'h-full w-full'} to={`/graph/${props.item._id}`}>
                                        <Button className='font-bold w-full rounded-lg p-0' gradientMonochrome="success">
                                            Перейти
                                        </Button>
                                    </Link>
                                ) : (
                                    <BuyAccessButton price={price} graphId={props.item._id} setUpdateAccess={setUpdateAccess}/>
                                )
                            }
                        </div>
                    </div>
                    <div className={'w-full mt-2'}>
                        <h6 className="text-md text-gray-300 font-bold dark:text-white">Количество покупок: {purchasesCount}</h6>
                    </div>
                    <hr className={'h-px my-2 border-0 bg-gray-700'}/>
                    <div className="flex flex-row">
                        <div className="basis-1/4 w-full">
                            <button disabled className="inline-flex items-center p-1 text-xs font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                VC.ru
                                <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-purple-800 bg-purple-200 rounded-full">
                                    {props.item.vc}
                                </span>
                            </button>
                        </div>
                        <div className="basis-1/4 w-full">
                            <button disabled className="inline-flex items-center p-1 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Habr
                                <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                    {props.item.habr}
                                </span>
                            </button>
                        </div>
                        <div className="basis-1/4 w-full">
                            <button disabled className="inline-flex items-center p-1 text-xs font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Github
                                <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">
                                    {props.item.github}
                                </span>
                            </button>
                        </div>
                        <div className="basis-1/4 w-full">
                            <button disabled className="inline-flex items-center p-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Cyberleninka
                                <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                                    {props.item.cyberleninka}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </CardGraph>
        </div>

    );
}