import React from 'react'
import { Link } from 'react-router-dom'
const Landingpage = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <header className="bg-blue-600 text-white py-20 min-h-[60vh] text-center">
                <h1 className="text-5xl font-bold">Welcome to VoteEase</h1>
                <p className="mt-4 text-lg">A secure and seamless way to vote online</p>
                <div className="mt-6">
                    <Link to="/signup"> <button className="bg-white text-blue-600 px-6 py-3 mr-4 font-bold rounded hover:cursor-pointer">Get Started</button></Link>
                </div>
            </header>


            <section className="py-16 px-8 max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold">Why Choose VoteEase?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <svg className="text-blue-600 w-12 h-12 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <p className="font-semibold text-lg">Secure & Transparent</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <svg className="text-blue-600 w-12 h-12 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <p className="font-semibold text-lg">Easy to Use</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <svg className="text-blue-600 w-12 h-12 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <p className="font-semibold text-lg">Real-time Results</p>
                    </div>
                </div>
            </section>
            <footer className="bg-blue-600 text-white py-6 text-center">
                <p>&copy; 2025 VoteEase. All Rights Reserved.</p>
            </footer>
        </div>
    )
}

export default Landingpage
