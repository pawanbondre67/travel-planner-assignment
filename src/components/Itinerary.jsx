// src/components/Itinerary.js
import  { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth } from '../firebase';

const Itinerary = () => {
  const [destination, setDestination] = useState('');
  const [activities, setActivities] = useState('');
  const [date, setDate] = useState('');
  const [tripType, setTripType] = useState('');
  const [itineraries, setItineraries] = useState([]);

  const userId = auth.currentUser?.uid;

  const fetchItineraries = async () => {
    const q = query(collection(db, 'itineraries'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const fetchedItineraries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItineraries(fetchedItineraries);
  };

  useEffect(() => {
    if (userId) fetchItineraries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'itineraries'), {
      destination,
      activities: activities.split(','),
      date,
      tripType,
      userId,
    });
    fetchItineraries();
    setDestination('');
    setActivities('');
    setDate('');
    setTripType('');
  };

  return (
    <div className="p-8">
      <form className="bg-white p-8 rounded shadow-md mb-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Create Itinerary</h2>
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="Activities (comma-separated)"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
          required
        />
        <input
         
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
          required
        />
       <select
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
          required
        >
          <option value="Adventure">Adventure</option>
          <option value="Leisure">Leisure</option>
          <option value="Work">Work</option>
          <option value="Family">Family</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Add Itinerary
        </button>
      </form>
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Itineraries</h2>
        <ul>
          {itineraries.map(itinerary => (
            <li key={itinerary.id} className="border-b py-2">
              <h3 className="font-bold">{itinerary.destination}</h3>
              <p>Activities: {itinerary.activities.join(', ')}</p>
              <p>Date: {itinerary.date}</p>
              <p>Type: {itinerary.tripType}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Itinerary;
