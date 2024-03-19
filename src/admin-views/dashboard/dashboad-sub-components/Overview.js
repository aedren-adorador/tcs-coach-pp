import { HStack, Card, CardBody, Box, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import reviewApplication from '../../admin-view-imgs/review-application.png'
import interviewFeedback from '../../admin-view-imgs/interview-feedback.png'
import teachingDemoFeedback from '../../admin-view-imgs/teaching-demo-feedback.png'
import preEmploymentRequirements from '../../admin-view-imgs/pre-employment-requirements.png'
import axios from "axios";

function Overview() {
  const boxesOverview = [
    "Review Application", "Interview Feedback", "Teaching Demo Feedback", "Pre-employment Requirements",
  ];
  const boxesOverviewPics = [
    reviewApplication, interviewFeedback, teachingDemoFeedback, preEmploymentRequirements
  ]

  
  return (
    <></>
  )
    
    
}

export default Overview;
