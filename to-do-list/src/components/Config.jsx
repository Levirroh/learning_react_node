import React from "react";

function Config({ name_setting, type_setting, options_setting = null}) {
        <div>
            <li className={`border rounded-2xl h-12 flex items-center p-3 mt-3 hover:cursor-pointer`}>
                {name_setting}
            </li>
            <li className={`border rounded-2xl h-12 flex items-center p-3 mt-3 hover:cursor-pointer`}>
                {type_setting}
            </li>
        </div>
}

export default Config;
