// src/LotteryTickets.js
import React, { useState, useEffect } from 'react';

function LotteryTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch available lottery tickets from the server
    const fetchLotteryTickets = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/lottery-tickets');
        if (response.ok) {
          const data = await response.json();
          setTickets(data.lotteryTickets);
        } else {
          console.error('Error fetching lottery tickets:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching lottery tickets:', error);
      }
    };

    fetchLotteryTickets();
  }, []);

  return (
    <div>
      <h2>Lottery Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <p>Drawing Date: {ticket.drawingDate}</p>
            <p>Price: {ticket.price}</p>
            <p>Potential Winnings: {ticket.potentialWinnings}</p>
            <button onClick={() => viewTicketDetails(ticket.id)}>View Details</button>
            <button onClick={() => addToCart(ticket.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LotteryTickets;
