import React, { useState, useEffect } from 'react';

const states = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
  { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' },
  { name: 'Colorado', code: 'CO' },
  { name: 'Connecticut', code: 'CT' },
  { name: 'Delaware', code: 'DE' },
  { name: 'Florida', code: 'FL' },
  { name: 'Georgia', code: 'GA' },
  { name: 'Hawaii', code: 'HI' },
  { name: 'Idaho', code: 'ID' },
  { name: 'Illinois', code: 'IL' },
  { name: 'Indiana', code: 'IN' },
  { name: 'Iowa', code: 'IA' },
  { name: 'Kansas', code: 'KS' },
  { name: 'Kentucky', code: 'KY' },
  { name: 'Louisiana', code: 'LA' },
  { name: 'Maine', code: 'ME' },
  { name: 'Maryland', code: 'MD' },
  { name: 'Massachusetts', code: 'MA' },
  { name: 'Michigan', code: 'MI' },
  { name: 'Minnesota', code: 'MN' },
  { name: 'Mississippi', code: 'MS' },
  { name: 'Missouri', code: 'MO' },
  { name: 'Montana', code: 'MT' },
  { name: 'Nebraska', code: 'NE' },
  { name: 'Nevada', code: 'NV' },
  { name: 'New Hampshire', code: 'NH' },
  { name: 'New Jersey', code: 'NJ' },
  { name: 'New Mexico', code: 'NM' },
  { name: 'New York', code: 'NY' },
  { name: 'North Carolina', code: 'NC' },
  { name: 'North Dakota', code: 'ND' },
  { name: 'Ohio', code: 'OH' },
  { name: 'Oklahoma', code: 'OK' },
  { name: 'Oregon', code: 'OR' },
  { name: 'Pennsylvania', code: 'PA' },
  { name: 'Rhode Island', code: 'RI' },
  { name: 'South Carolina', code: 'SC' },
  { name: 'South Dakota', code: 'SD' },
  { name: 'Tennessee', code: 'TN' },
  { name: 'Texas', code: 'TX' },
  { name: 'Utah', code: 'UT' },
  { name: 'Vermont', code: 'VT' },
  { name: 'Virginia', code: 'VA' },
  { name: 'Washington', code: 'WA' },
  { name: 'West Virginia', code: 'WV' },
  { name: 'Wisconsin', code: 'WI' },
  { name: 'Wyoming', code: 'WY' },
  { name: 'District of Columbia', code: 'DC' },
  { name: 'Puerto Rico', code: 'PR' },
  { name: 'Guam', code: 'GU' },
  { name: 'American Samoa', code: 'AS' },
  { name: 'Northern Mariana Islands', code: 'MP' },
  { name: 'U.S. Virgin Islands', code: 'VI' }
];

const SchoolDropdown = ({selectedSchool, setSelectedSchool}) => {
  const [selectedState, setSelectedState] = useState('');
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedState) {
      const fetchSchools = async () => {
        setLoading(true);
        const apiKey = 'ZTFF0PtCZDbzNaKfR3COQGsv9CE3uFbzdLo5gKrQ';
        let allSchools = [];
        let page = 0;
        let fetchedAll = false;


        //logic for fetching all schools for a specific state
        while (!fetchedAll) {
          const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&fields=school.name&school.state=${selectedState}&page=${page}`;
          try {
            const response = await fetch(url);
            const data = await response.json();

            //concatenate results to allSchools if results exist and there are more results
            if (data.results && data.results.length > 0) {
              allSchools = [...allSchools, ...data.results];
              page += 1;
            } else {
              fetchedAll = true;
            }
          } catch (error) {
            console.error('Error fetching schools:', error);
            fetchedAll = true;
          }
        }

        //completion of fetching and setting of variables
        setSchools(allSchools);
        setLoading(false);
      };

      fetchSchools();
    }
  }, [selectedState]);
  //when selectedState changes, useEffect logic is triggered


  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedSchool('');
    setSchools([]);
    //reset the selected school and list of schools

  };

  const handleSchoolChange = (event) => {
    const school = event.target.value;
    setSelectedSchool(school);
    console.log("school is set to", selectedSchool)

  };

  return (
    <div>
      <label htmlFor="states">Search for School by State</label>
      <select id="states" value={selectedState} onChange={handleStateChange}>
        {/* we attach an event handler, handleStateChange */}
        <option value="" disabled>Select a state</option>
        {/* disabled means that the default cannot be selected */}
        {states.map((state, index) => (
          <option key={index} value={state.code}>
            {state.name}
          </option>
        ))}
        {/* we concatenate all the states to the "Select a state"*/}
      </select>

    {/* Only if we have selected a state then */}
      {selectedState && (
        <div>
          <label htmlFor="schools">Select a School</label>
          {/* If we are still loading then say so otherwise */}
          {loading ? (
            <p>Loading schools...</p>
          ) : (
            <select id="schools" value={selectedSchool} onChange={handleSchoolChange} required> 
              <option value="" disabled>Select a school</option>
              {schools.map((school, index) => (
                <option key={index} value={school['school.name']}>
                  {school['school.name']}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
};

export default SchoolDropdown;
