import './Header.css'

//Header får till H1-titel som props 
function Header({title}: { title: string}) {

    return (
        <header>
                        <h1>{title}</h1>                    
        </header>
    )
}

export default Header
