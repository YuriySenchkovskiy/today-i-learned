function Header({showForm, setShowForm}) {
    const appTitle = "Today I learned";

    return(
        <header className="header">
            <div className="logo">
                <img src="../public/logo.png" alt="Today I learned Logo"/>
                <h1>{appTitle}</h1>
            </div>
            <button className="btn btn-large btn-form"
                    onClick={() => setShowForm((show) => !show)}>
                {showForm ? "Close" : "Share a fact"}</button>
        </header>
    )
}

export default Header;