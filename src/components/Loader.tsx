import { Oval } from "react-loader-spinner";
import React from "react";

type LoaderProps  ={
    width: string 
    height: string 
}

const Loader: React.FC <LoaderProps> = ({width,height}) => {
    return (
        <Oval
            visible={true}
            height={height}
            width={width}
            color="#131921"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
    )
}

export default Loader