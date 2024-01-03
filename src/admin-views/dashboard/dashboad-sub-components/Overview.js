import { HStack, Card, CardBody, Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import reviewApplication from '../../admin-view-imgs/review-application.png'
import interviewFeedback from '../../admin-view-imgs/interview-feedback.png'
import teachingDemoFeedback from '../../admin-view-imgs/teaching-demo-feedback.png'
import preEmploymentRequirements from '../../admin-view-imgs/pre-employment-requirements.png'

function Overview() {
  const boxesOverview = [
    "Review Application", "Interview Feedback", "Teaching Demo Feedback", "Pre-employment Requirements",
  ];
  const boxesOverviewPics = [
    reviewApplication, interviewFeedback, teachingDemoFeedback, preEmploymentRequirements
  ]

  return (
    <>
      <Text margin='20px 0px 0px 5%' color='#071C50' fontWeight='600' fontSize='14px'>Overview</Text>
      <HStack maxW="100%" display="flex" justify="space-between" margin="30px 5% 50px 5%">
        {boxesOverview.map((box, index) => (
          <Card
          key={index}
          height="200px"
          minW="250px"
          maxW="300px"
          position="relative"
          shadow='none'
          backgroundColor='#F3F8FF'
          >
            <Box
            backgroundColor='#F3F8FF'
            border="solid 1px"
            width="90px"
            height="90px"
            position="absolute"
            top="-20px"
            left="-20px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius='15px'
            borderColor='lightgray'
            >
              10
            </Box>
            <CardBody>
                <Image
                float='right'
                width='100px'
                margin='5px'
                src={boxesOverviewPics[index]}
                alt={`overview-img-${index+1}`}
                />
                <Box
                position='absolute'
                bottom='10'
                fontSize='12px'
                color='gray'
                >
                    {box}
                </Box>
            </CardBody>
          </Card>
        ))}
      </HStack>
    </>
  );
}

export default Overview;
