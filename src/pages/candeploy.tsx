import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Select, Button } from '@chakra-ui/react';
import DeployValidator from '../components/DeployValidator';
import dayjs from 'dayjs';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';

interface Option {
  value: string;
  label: string;
}

const CanDeployPage: React.FC = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs()
      .add(7, 'day')
      .format('YYYY-MM-DD')
  );

  const handleSubmit = () => {
    router.push(`/deploy/${selectedDate}`);
  };

  const options = Array.from({ length: 7 }).map((_, i) => {
    const date = dayjs().add(i + 1, 'day');
    const formattedDate = date.format('YYYY-MM-DD');
    return {
      value: formattedDate,
      label: date.format('dddd, MMMM D, YYYY')
    };
  });

  return (
    <Card align='center'>
      <CardHeader>
        <Heading size='md'>Can we deploy today</Heading>
      </CardHeader>
      <CardBody>
        <Text>check if deployment is possible</Text>
        <DeployValidator date={selectedDate} />
        <Select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </CardBody>
      <CardFooter>
        <Button colorScheme='blue' onClick={handleSubmit}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CanDeployPage;
