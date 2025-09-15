import React from "react";

function Config({ name_setting, type_setting, options_setting = null}) {
        <div className="h-15">
            <li>
                {name_setting}
            </li>
            <li>
                {type_setting}
            </li>
        </div>
}

export default Config;
