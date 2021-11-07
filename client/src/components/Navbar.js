import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <div className="py-2 bg-primary px-1">
            <Link to="/" className="me-2 text-white text-decoration-none">Upload</Link>
            <Link to="/api/images" className="me-2 text-white text-decoration-none">Images</Link>
        </div>
    )
}
