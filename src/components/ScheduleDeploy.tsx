import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Select } from '@chakra-ui/react';
import dayjs from 'dayjs';

const ScheduleDeploy: React.FC = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>('');

  const generateDates = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = dayjs().add(i, 'day');
      dates.push(
        <option key={i} value={date.format('YYYY-MM-DD')}>
          {date.format('dddd, MMMM D, YYYY')}
        </option>
      );
    }
    return dates;
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedDate) {
      router.push(`/deploy/${selectedDate}`);
    }
  };

  return (
    <div>
      <h2>Schedule a deployment:</h2>
      <Select placeholder="Select a date" onChange={handleChange}>
        {generateDates()}
      </Select>
      <button onClick={handleSubmit} disabled={!selectedDate}>
        Submit
      </button>
    </div>
  );
};

export default ScheduleDeploy;
