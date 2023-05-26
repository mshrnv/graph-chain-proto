import React, {useState} from 'react';
import KnowledgeGraph from "./KnowledgeGraph";
import NodeInfo from "./NodeInfo";
import {styled} from "@mui/material/styles";

const GraphDiv = styled('div')(({theme}) => ({
    margin: theme.spacing(0, 2)
}))
const GraphBox = ({graphId, owner, data, setData}) => {
    const [selected, setSelected] = useState(null);

    return (
        <GraphDiv>
            <KnowledgeGraph
                data={data}
                setData={setData}
                setSelected={setSelected}
            />
            <NodeInfo
                data={data}
                setData={setData}
                selected={selected}
                setSelected={setSelected}
                graphId={graphId}
                owner={owner}
            />
        </GraphDiv>
    );
};

export default GraphBox;