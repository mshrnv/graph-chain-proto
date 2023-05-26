import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import FolderIcon from '@mui/icons-material/Folder';
import GitHubIcon from '@mui/icons-material/GitHub';
import AdjustIcon from '@mui/icons-material/Adjust';
import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DeleteIcon from '@mui/icons-material/Delete';
import {styled} from "@mui/material/styles";
import IconButton from '@mui/material/IconButton'
import theme from "../../Theme";

const NodeBtn = styled(IconButton)(({theme}) => ({
    borderRadius: theme.shape.borderRadius.node,
    width: '20px',
    height: '20px',
}))

const NodeDiv = styled('div')(({theme}) => ({
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
}))

const Node = ({node, data, setData, setSelected}) => {
    // Menu configuration
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // View customization

    const variant = node.isFolder ? "contained" : "outlined";
    let background = node.isFolder ? theme.palette.nodes.folder : theme.palette.nodes.file;
    let icon = node.isFolder ? (<FolderIcon/>) : (<GitHubIcon/>);
    if (node.isRoot) {
        icon = (<AdjustIcon/>);
    }

    // Menu buttons click handlers
    const handleNewNode = (event) => {
        const randNum = Math.floor(Math.random() * 10000) + 1;
        setData({
            nodes: [...data.nodes, {
                id: `Новый ресурс #${randNum}`,
                isRoot: false,
                isFolder: false,
                x: node.x,
                y: node.y + 100
            }], links: [...data.links, {
                source: node.id,
                target: `Новый ресурс #${randNum}`
            }]
        })
        handleClose()
    }

    const handleNewFolder = (event) => {
        const randNum = Math.floor(Math.random() * 10000) + 1;
        setData({
            nodes: [...data.nodes, {
                id: `Новая папка #${randNum}`,
                isRoot: false,
                isFolder: true,
                x: node.x,
                y: node.y + 100
            }], links: [...data.links, {
                source: node.id,
                target: `Новая папка #${randNum}`
            }]
        })
        handleClose()
    }

    const handleDelete = (event) => {
        let link = data.links.find(item => item.source === node.id)

        if (link) {
            console.log('Можно удалять только листья дерева');
            // TODO: Alert
            handleClose()
            return;
        }

        const newLinks = data.links.filter(item => item.target !== node.id)
        const newNodes = data.nodes.filter(item => item.id !== node.id)

        setData({
            nodes: newNodes,
            links: newLinks
        })

        handleClose()
    }

    return (

        <NodeDiv>
            <NodeBtn
                aria-describedby={node.id}
                onClick={() => setSelected(node)}
                onContextMenu={handleClick}
                variant={variant}
                color='inherit'
            >
                {icon}
            </NodeBtn>


            <Menu
                id={node.id}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <ListItemIcon>
                        <AddIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Добавить ресурс" onClick={handleNewNode}/>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <CreateNewFolderIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Добавить папку" onClick={handleNewFolder}/>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Удалить ветку" onClick={handleDelete}/>
                </MenuItem>
            </Menu>
        </NodeDiv>

    );
};

export default Node;