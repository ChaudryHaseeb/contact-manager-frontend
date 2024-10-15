'use client';
import React, {useEffect, useState } from 'react';
import Select from 'react-select';

const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: '1em' }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const CustomSelect = ({onChange}) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);


  const [Role, setRole] = useState(null);
  const [User, setUser] = useState([]);

  const fetchUsers = async () => {
      const token = localStorage.getItem('token')?.replace(/'/g, '');
      const role = localStorage.getItem('role');
      setRole(role);

      if (!token || !role) {
          console.error('User is not authorized');
          return;
      }

      try {
          const response = await fetch('http://localhost:8080/api/task/allusers/data', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
          });

          if (!response.ok) {
              return;
          }

          const data = await response.json();
          setUser(data);
      } catch (error) {
          console.error('Failed to fetch users', error);
      }
  };


  useEffect(() => {
      fetchUsers();
  }, []);


const  nameOptions = User.map((user) => ({
    value : user._id,
    label : user.username && user.email
}))

const handleSelectChange = (selectOption) =>{
return   onChange(selectOption ? selectOption.value : selectOption.value);
}

  return (
    <>
      <Select
        className="basic-single text-black"
        classNamePrefix="select"
        defaultValue={nameOptions[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={nameOptions}
        onChange={handleSelectChange}
      />

      <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 12,
          fontStyle: 'italic',
          marginTop: '1em',
        }}
      >
        <Checkbox
          checked={isClearable}
          onChange={() => setIsClearable((state) => !state)}
        >
          Clearable
        </Checkbox>
        <Checkbox
          checked={isSearchable}
          onChange={() => setIsSearchable((state) => !state)}
        >
          Searchable
        </Checkbox>
        <Checkbox
          checked={isDisabled}
          onChange={() => setIsDisabled((state) => !state)}
        >
          Disabled
        </Checkbox>
        <Checkbox
          checked={isLoading}
          onChange={() => setIsLoading((state) => !state)}
        >
          Loading
        </Checkbox>
        <Checkbox checked={isRtl} onChange={() => setIsRtl((state) => !state)}>
          RTL
        </Checkbox>
      </div>
    </>
  );
};

export default CustomSelect;
