import {PropsWithChildren} from "react";
import Navbar from "@/app/components/information/navigation";

export default  function layout({children}:PropsWithChildren){
    return (
        <div>
                <Navbar/>
            {children}
        </div>
    )
}