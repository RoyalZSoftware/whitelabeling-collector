import React from "react"

export const FileUpload = (props) => {

    return <input id="file" type="file" onChange={(e) => {
        return props.onChange(e.target.files[0])
    }}/>
}