// PriceTracker.js
import React, { useState } from 'react';
import axios from 'axios';
import './PriceTracker.css';
import EmailConfig from './EmailConfig';

function PriceTracker({ url }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [priceHistory, setPriceHistory] = useState([]);
    const [showPriceHistory, setShowPriceHistory] = useState(false);
    const [showEmailConfig, setShowEmailConfig] = useState(false);

    const fetchPriceHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/price-history?url=${encodeURIComponent(url)}`);
            setPriceHistory(response.data);
            setError(null);
            setShowPriceHistory(true); // Show price history after fetching
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    const handleClosePriceHistory = () => {
        setShowPriceHistory(false);
    };

    const handleTrackPrice = () => {
        setShowEmailConfig(true); // Show EmailConfig component
    };

    const handleCloseEmailConfig = () => {
        setShowEmailConfig(false);
    };

    return (
        <div className="price-tracker-container">
            <h2>Price Tracker</h2>
            <button  onClick={fetchPriceHistory} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Price History'}
            </button>
            <button style={{marginLeft:'10px'}} onClick={handleTrackPrice} className="track-button">
                Track
            </button>
            {showEmailConfig && <EmailConfig onClose={handleCloseEmailConfig} />}
            {error && <p className="error-message">Error: {error}</p>}
            {showPriceHistory && (
                <div className="price-history">
                    <h3>Price History:</h3>
                    <button className="close-button" onClick={handleClosePriceHistory}>Close</button>
                    {priceHistory.length > 0 ? (
                        <ul>
                            {priceHistory.map((priceData, index) => (
                                <li key={index}>
                                    <p>Price: {priceData.current_price}</p>
                                    <p>Date: {priceData.timestamp}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No price history available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default PriceTracker;
