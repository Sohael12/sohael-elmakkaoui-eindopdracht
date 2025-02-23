import {PropsWithChildren} from "react";
import Navbar from "@/src/components/navigation";

export default  function layout({children}:PropsWithChildren){
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}