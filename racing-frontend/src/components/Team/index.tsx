import React, { useState } from 'react';

interface TeamStateType {
  id: number | null;
  manufacturer: string;
  image: string;
  driver1: string;
  driver2: string;
}

const Team: React.FC = () => {
  const initialTeamState: TeamStateType = {
    id: null,
    manufacturer: '',
    image: '',
    driver1: '',
    driver2: '',
  };

  const [team, setTeam] = useState<TeamStateType>(initialTeamState);
  const [teams, setTeams] = useState<TeamStateType[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setTeam({ ...team, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeam({ ...team, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUpdateTeam = (event: React.FormEvent): void => {
    event.preventDefault();

    if (
      !team.manufacturer ||
      !team.image ||
      !team.driver1 ||
      !team.driver2
    ) {
      alert('Please fill in all fields');
      return;
    }

    if (isUpdating) {
      setTeams(teams.map((item) => (item.id === team.id ? team : item)));
      setIsUpdating(false);
    } else {
      setTeams([...teams, { ...team, id: Date.now() }]);
    }

    setTeam(initialTeamState);
  };

  const handleDeleteTeam = (id: number | null): void => {
    setTeams(teams.filter((item) => item.id !== id));
  };

  const handleUpdateTeam = (id: number | null): void => {
    const selectedTeam = teams.find((item) => item.id === id);
    setTeam(selectedTeam || initialTeamState);
    setIsUpdating(true);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h2 className="text-white">Add/Update Team</h2>
          <form onSubmit={handleAddUpdateTeam}>
            <div className="mb-3">
              <label htmlFor="manufacturer" className="form-label text-white">
                Manufacturer
              </label>
              <input
                type="text"
                className="form-control"
                id="manufacturer"
                name="manufacturer"
                value={team.manufacturer}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label text-white">
                Car Image Upload
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="driver1" className="form-label text-white">
                Driver 1
              </label>
              <input
                type="text"
                className="form-control"
                id="driver1"
                name="driver1"
                value={team.driver1}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="driver2" className="form-label text-white">
                Driver 2
              </label>
              <input
                type="text"
                className="form-control"
                id="driver2"
                name="driver2"
                value={team.driver2}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {isUpdating ? 'Update Team' : 'Add Team'}
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <h2 className="text-white">Team List</h2>
          <ul className="list-group">
            {teams.map((item) => (
              <li
                key={item.id || undefined}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.manufacturer}
                <div>
                  <img
                    src={item.image}
                    alt="team"
                    className="img-fluid"
                    style={{ width: '300px', height: '200px' }}
                  />
                </div>
                <div>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleUpdateTeam(item.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteTeam(item.id)}
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

export default Team;
