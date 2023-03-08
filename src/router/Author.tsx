import {Navigate} from 'react-router-dom';
function Author(props:AuthorProps){
    let token:string | null = localStorage.getItem('token')
    if(token){
        return (
            <div>
                {
                    props.oldComponent
                }
            </div>
        )
    }
    return <Navigate to={`/login?redricturl=${props.oldPath}`}></Navigate>
}

export default Author;