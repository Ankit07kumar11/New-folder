import React, { useState } from 'react'

const Home = () => {
    const [credentials, setCredentials] = useState({title: "", language: "", code:""})

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: credentials.email, description: credentials.password, code: credentials.code})
        });

        const json = await response.json()
        console.log(json);
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add Data</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={credentials.title} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="language" className="form-label">Language</label>
                        <input type="text" className="form-control" id="description" name='description' value={credentials.language}required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Code</label>
                        <input type="text" className="form-control" id="code" name='code' value={credentials.code} onChange={onChange}/>
                    </div>
                    <button disabled={credentials.title.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Data</button>
                </form>
            </div>
        </div>
    )
}

export default Home