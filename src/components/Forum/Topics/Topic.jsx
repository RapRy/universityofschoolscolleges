import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'

const Topic = () => {
    const { params, url } = useRouteMatch()

    useEffect(() => {
        console.log(params.topicId)
    }, [url])
    
    return (
        <div>
           topic 
        </div>
    )
}

export default Topic
