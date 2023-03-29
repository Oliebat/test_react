import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

type DeployValidatorProps = {
  date: string;
};

const DeployValidator: React.FC<DeployValidatorProps> = ({ date }) => {
  const [canDeploy, setCanDeploy] = useState(true);

  useEffect(() => {
    const isFriday = dayjs(date).day() === 5;
    setCanDeploy(!isFriday);
  }, [date]);

  const message = canDeploy ? 'Yes, you can deploy on this date!' : 'Sorry, you cannot deploy on this date.';

  return <p>{message}</p>;
};

export default DeployValidator;
