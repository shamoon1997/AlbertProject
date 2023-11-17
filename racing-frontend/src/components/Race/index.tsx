import React, { useState } from 'react';

interface RaceStateType {
  id: number | null;
  winnerName: string;
  winnerTime: string;
  grandPrix: string;
  numberOfLaps: number;
}

const Races: React.FC = () => {
  const initialRaceState: RaceStateType = {
    id: null,
    winnerName: '',
    winnerTime: '',
    grandPrix: '',
    numberOfLaps: 0,
  };

  const [race, setRace] = useState<RaceStateType>(initialRaceState);
  const [races, setRaces] = useState<RaceStateType[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setRace({ ...race, [name]: value });
  };

  const handleAddUpdateRace = (event: React.FormEvent): void => {
    event.preventDefault();

    if (
      !race.winnerName ||
      !race.winnerTime ||
      !race.grandPrix ||
      !race.numberOfLaps
    ) {
      alert('Please fill in all fields');
      return;
    }

    if (isUpdating) {
      setRaces(races.map((item) => (item.id === race.id ? race : item)));
      setIsUpdating(false);
    } else {
      setRaces([...races, { ...race, id: Date.now() }]);
    }

    setRace(initialRaceState);
  };

  const handleDeleteRace = (id: number | null): void => {
    setRaces(races.filter((item) => item.id !== id));
  };

  const handleUpdateRace = (id: number | null): void => {
    const selectedRace = races.find((item) => item.id === id);
    setRace(selectedRace || initialRaceState);
    setIsUpdating(true);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h2 className="text-white">Add/Update Race</h2>
          <form onSubmit={handleAddUpdateRace}>
            <div className="mb-3">
              <label htmlFor="winnerName" className="form-label text-white">
                Winner Name
              </label>
              <input
                type="text"
                className="form-control"
                id="winnerName"
                name="winnerName"
                value={race.winnerName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="winnerTime" className="form-label text-white">
                Winner Time
              </label>
              <input
                type="text"
                className="form-control"
                id="winnerTime"
                name="winnerTime"
                value={race.winnerTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="grandPrix" className="form-label text-white">
                Grand Prix
              </label>
              <input
                type="text"
                className="form-control"
                id="grandPrix"
                name="grandPrix"
                value={race.grandPrix}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numberOfLaps" className="form-label text-white">
                Number of Laps
              </label>
              <input
                type="number"
                min={0}
                className="form-control"
                id="numberOfLaps"
                name="numberOfLaps"
                value={race.numberOfLaps}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {isUpdating ? 'Update Race' : 'Add Race'}
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <h2 className="text-white">Race List</h2>
          <ul className="list-group">
            {races.map((item) => (
              <li
                key={item.id || undefined}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.winnerName} - {item.grandPrix}
                <div>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleUpdateRace(item.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteRace(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Races;
