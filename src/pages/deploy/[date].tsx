import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import dayjs from 'dayjs';
import { Card, CardBody, Text, Button } from '@chakra-ui/react';

type DeployProps = {
  date: string;
  canDeploy: boolean;
};

const Deploy: React.FC<DeployProps> = ({ date, canDeploy }) => {
  const formattedDate = dayjs(date).format('dddd, MMMM D, YYYY');
  const message = canDeploy ? 'Yes, you can deploy on this date!' : 'Sorry, you cannot deploy on this date.';
  const router = useRouter();

  return (
    <Card>
      <CardBody>
        <Text>
          Deployment on {formattedDate}
        </Text>
        <Text>{message}</Text>
        <Button onClick={() => router.push('/candeploy')}>Back</Button>
      </CardBody>
    </Card>
  );
};

export const getStaticProps: GetStaticProps<DeployProps> = async ({ params }) => {
  if (!params || typeof params.date !== 'string') {
    return { notFound: true };
  }

  const date = dayjs(params.date);

  // Check if the day is not Friday
  const canDeploy = date.day() !== 5;

  // Check if the date is a Friday
  if (!canDeploy) {
    return { props: { date: params.date, canDeploy: false } };
  }

  return {
    props: {
      date: params.date,
      canDeploy: true,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default Deploy;
