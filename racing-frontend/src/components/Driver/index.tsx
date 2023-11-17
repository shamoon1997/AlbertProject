import React, { useState } from 'react';

interface DriverStateType {
  id: number | null;
  name: string;
  age: number;
  nationality: string;
  image: string;
}

const Driver: React.FC = () => {
  const initialDriverState: DriverStateType = { id: null, name: '', age: 0, nationality: '', image: '' };

  const [driver, setDriver] = useState<DriverStateType>(initialDriverState);
  const [drivers, setDrivers] = useState<DriverStateType[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setDriver({ ...driver, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      // Assuming you want to convert the image to a data URL for simplicity
      const reader = new FileReader();
      reader.onloadend = () => {
        setDriver({ ...driver, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUpdateDriver = (event: React.FormEvent): void => {
    event.preventDefault();

    if (!driver.name || !driver.age || !driver.nationality || !driver.image) {
      alert('Please fill in all fields');
      return;
    }

    if (isUpdating) {
      setDrivers(drivers.map((item) => (item.id === driver.id ? driver : item)));
      setIsUpdating(false);
    } else {
      setDrivers([...drivers, { ...driver, id: Date.now() }]);
    }

    setDriver(initialDriverState);
  };

  const handleDeleteDriver = (id: number | null): void => {
    setDrivers(drivers.filter((item) => item.id !== id));
  };

  const handleUpdateDriver = (id: number | null): void => {
    const selectedDriver = drivers.find((item) => item.id === id);
    setDriver(selectedDriver || initialDriverState);
    setIsUpdating(true);
  };

    return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h2 className='text-white'>Add/Update Driver</h2>
          <form onSubmit={handleAddUpdateDriver}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-white">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={driver.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label text-white">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                min={0}
                id="age"
                name="age"
                value={driver.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nationality" className="form-label text-white">
                Nationality
              </label>
              <input
                type="text"
                className="form-control"
                id="nationality"
                name="nationality"
                value={driver.nationality}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label text-white">
                Image Upload
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
            <button type="submit" className="btn btn-primary">
              {isUpdating ? 'Update Driver' : 'Add Driver'}
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <h2 className='text-white'>Driver List</h2>
          <ul className="list-group">
            {drivers.map((item) => (
              <li
                key={item.id || undefined}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                    {item.name}
                    
                    <div>
                        <img src={item.image} alt="driver"
                            className="img-fluid"
                           style={{ width: '300px', height: '200px' }}
                        />
                    </div>
                <div>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleUpdateDriver(item.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteDriver(item.id)}
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

export default Driver;
