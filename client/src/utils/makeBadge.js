import {Badge} from "flowbite-react";
import React from "react";

const makeBadge = (rec) => {
    if (rec.url.includes('vc.ru')) {
        return (
            <Badge className={'inline-block w-fit text-xs p-0'} color="purple">
                vc.ru
            </Badge>
        )
    }

    if (rec.url.includes('github.com')) {
        return (
            <Badge className={'inline-block w-fit'} color="dark">
                Github
            </Badge>
        )
    }

    if (rec.url.includes('habr.com')) {
        return (
            <Badge className={'inline-block w-fit'} color="success">
                Habr
            </Badge>
        )
    }

    return <></>
}

export default makeBadge;