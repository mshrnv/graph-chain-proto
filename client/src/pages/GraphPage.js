import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import GraphBox from "../components/Graph/GraphBox";
import SystemRec from "../components/SystemRec";
import {useParams} from "react-router-dom";
import GraphService from "../api/GraphService";

const GraphPage = () => {
    const {graphId} = useParams();

    const [owner, setOwner] = useState(null)
    const [graphName, setGraphName] = useState("")
    const [data, setData] = useState({nodes: [], likes: []});

    useEffect(() => {
        const fetchGraphData = async (graphId) => {
            const graph = await GraphService.getGraphData(graphId);

            setOwner(graph.owner)
            setData(JSON.parse(graph.data))
            setGraphName(JSON.parse(graph.data).nodes.find(item => item.isRoot).id)
        }
        fetchGraphData(graphId);
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={8} md={8}>
                <GraphBox
                    graphId={graphId}
                    owner={owner}
                    data={data}
                    setData={setData}
                />
            </Grid>
            <Grid item xs={4} md={4}>
                <SystemRec
                    name={graphName}
                    data={data}
                    setData={setData}
                    owner={owner}
                />
            </Grid>
        </Grid>
    );
};

export default GraphPage;