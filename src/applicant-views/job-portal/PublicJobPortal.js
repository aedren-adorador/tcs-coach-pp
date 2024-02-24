import React, { useEffect, useState } from "react";
import { Text, InputGroup, Input, Flex, Button, Select, Grid, GridItem, Box, Image, Skeleton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, InputLeftAddon, InputRightAddon} from "@chakra-ui/react";
import { ExternalLinkIcon, Search2Icon } from "@chakra-ui/icons";
import { AppstoreOutlined, ClockCircleOutlined, DeleteOutlined, FacebookFilled, FileOutlined, HomeOutlined, LinkedinFilled } from "@ant-design/icons";
import tcsDarkLogo  from '../../tcs-dark-logo.png'
import CreateJobButton from "./admin/CreateJobButton";
import axios from "axios";
import EditDetailsButton from "./admin/EditDetailsButton";
import { Link } from "react-router-dom";
import tcsLogo from '../../tcs-logo.png'

function PublicJobPortal({applicantData}) {
    const jobFilters = ['Categories', 'Posting Dates', 'Job Types'];
    const [jobsList, setJobsList] = useState([]);
    const [clickedJob, setClickedJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)


    const clickJob = (index) => {
        setClickedJob(index)
    }

    const deleteJob = (jobID) => {
        axios.delete(`${process.env.REACT_APP_SYS_URL}/api/admin/job-portal-action/delete-job/${jobID}`)
            .then(() => {
                fetchJobsList();
                setClickedJob(prevIndex => prevIndex-1 < 1 ? 0 : prevIndex-1);
            })
    }

    const handleSearch = (e) => {
        if (e.target.value) {
            setClickedJob(null)
            setJobsList(prevJobsList => prevJobsList.filter(job => job.jobTitleM.toLowerCase().includes(e.target.value.toLowerCase())))
        } else {
            fetchJobsList();
        }
    }

    const fetchJobsList = () => {
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/general-request/fetch-jobs-list`)
            .then(response => {
                setJobsList(response.data.jobs)
                    setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchJobsList()
    }, [])

    useEffect(() => {
    }, [jobsList])

    useEffect(() => {
    }, [clickedJob])

    useEffect(() => {
    }, [applicantData])

    return(
        <>
         <Flex
         zIndex='99'
         top='0'
        position='fixed'
        width='100%'
        height='80px'
        backgroundColor='tcs.main'
        align='center'
        // justify='space-between'
        padding='20px'
        >
              <Image
            src={tcsLogo}
            ml='0.5%'
            height='70px'
            ></Image>
            <InputGroup
            maxW='650px'
            margin='10px 0px 12px 20px'
            >  
                <Input
                bg='white'
                zIndex='0'
                placeholder='Search Job title, Skill, Keyword'
                borderRadius='0px'
                borderLeftRadius='5px'
                height='40px'
                onKeyDown={handleSearch}
                />
            
                    <InputRightAddon

                    backgroundColor='tcs.main'
                    height='40px'
                    width='60px'
                    borderLeftRadius='0px'
                    _hover={{backgroundColor:''}}
                    bg='white'
                    >
                        <Search2Icon
                        color='tcs.main'
                        fontSize='25px'
                        />
                    </InputRightAddon>
            </InputGroup>
          
        </Flex>
        <Box
        border='solid red'
        width='100%'
        backgroundColor='white'
        >
        </Box>

        {!clickedJob ?
        <Grid
        margin='80px 10% 0px 10%'
        templateColumns='repeat(2, 1fr)'
        gap={5}
        >
            <Skeleton isLoaded={!isLoading}>
            <GridItem

            border='solid 0.2px'
            colSpan={2}
            bg='white'
            minW='500px'
            overflowY='scroll'
            height={`calc(100vh - 165px)`} 
            >

                {jobsList.map((job, index) => (
                    
                    <Box
                    key={index}
                    padding='20px'
                    borderBottom='solid 0.2px lightgray'
                    onClick={() => clickJob(index+1)}
                    >
                        <Text
                        textDecoration='underline'
                        fontWeight='600'
                        >{job.jobTitleM}</Text>
                        <Text
                        margin='5px 0px 5px 0px'
                        fontSize='12px'
                        >
                            <AppstoreOutlined/>
                            &nbsp;
                            Job ID: {job._id}
                        </Text>
                        <Text
                        fontSize='12px'
                        >
                            <ClockCircleOutlined/>
                            &nbsp;
                            Posted {
                              new Date(job.jobCreatedAt).toDateString()
                            }
                        </Text>
                    </Box>
                    
                ))}
                
            </GridItem>
            </Skeleton>

            <GridItem
            border='solid 0.2px'
            minW='300px'
            height='300px'
            bg='white'
            padding='30px'
            >
            <Image
            src={tcsDarkLogo}
            width='100px'
            ></Image>
            <Text
            textAlign='justify'
            fontSize='12px'
            mt='20px'
            >
                The Coding School is a community that encourages students to participate in activities related to programming, web development, robotics, and engineering. We aim to help and inspire the next generation of technology users and creators develop critical thinking, problem-solving skills and a boost in STEM disciplines through our programs. 
            </Text>

            </GridItem>

        </Grid> :
        
        <Grid
        margin='80px 10% 0px 10%'
        templateColumns='repeat(2, 1fr)'
        gap={5}
        >
            <GridItem
            border='solid 0.2px'
            bg='white'
            minW='500px'
            overflowY='scroll'
            height={`calc(100vh - 165px)`} 
            >

                {jobsList.map((job, index) => (
                    <Box
                    backgroundColor={index === clickedJob-1 ? '#E5ECF9' : ''}
                    key={index}
                    padding='20px'
                    borderBottom={index === clickedJob-1 ? '' :'solid 0.1px lightgray'}
                    onClick={() => clickJob(index+1)}
                    >
                        <Text
                        textDecoration='underline'
                        fontWeight='600'
                        >{job.jobTitleM}</Text>
                        <Text
                        margin='5px 0px 5px 0px'
                        fontSize='12px'
                        >
                            <AppstoreOutlined/>
                            &nbsp;
                            Job ID: {job._id}
                        </Text>
                        <Text
                        fontSize='12px'
                        >
                            <ClockCircleOutlined/>
                            &nbsp;
                            Posted {
                              new Date(job.jobCreatedAt).toDateString()
                            }
                        </Text>
                    </Box>
                ))}
                
            </GridItem>

            <GridItem
            border='solid 0.2px'
            minW='500px'
            bg='white'
            overflowY='scroll'
            height={`calc(100vh - 165px)`} 
            >
            <Box
            margin='20px 0px 0px 0px'
            padding='0px 20px 20px 20px'
            fontSize='12px'
            borderBottom='solid 0.2px lightgray'
            >   
                <Flex
                align='center'
                justify='space-between'
                >
                     <Text
                    fontSize='20px'
                    fontWeight='600'
                    >{jobsList[clickedJob-1].jobTitleM}</Text>
                    
                   
                </Flex>
                <Link to='/login'>
                <Button colorScheme='green' size='xs' variant='outline' mt='10px'>Sign-in or Create Account to Apply &nbsp; <ExternalLinkIcon></ExternalLinkIcon></Button>
                </Link>
            </Box>

            <Box
            margin='20px 0px 20px 0px'
            padding='0px 20px 40px 20px'
            fontSize='12px'
            >
               
                    <Flex align='center'>
                        <HomeOutlined/>
                        <Text>&nbsp;{jobsList[clickedJob-1].jobLocationM}</Text>
                    </Flex>

                    <Flex align='center'>
                        <FileOutlined/>
                        <Text>&nbsp;Job ID: {jobsList[clickedJob-1]._id}</Text>
                    </Flex>

                    <Flex align='center'>
                        <ClockCircleOutlined/>
                    <Text>&nbsp;Posted  {new Date(jobsList[clickedJob-1].jobCreatedAt).toDateString() } </Text>
                    </Flex>
                    <Text
                    mt='20px'
                    fontWeight='700'
                    >Job Location</Text>
                    <Text>{jobsList[clickedJob-1].jobLocationM}</Text>

                    <Text
                    mt='20px'
                    fontWeight='700'
                    >Job Description</Text>
                    <Text>
                        {jobsList[clickedJob-1].jobDescriptionM}
                    </Text>

                    <Text
                    mt='20px'
                    fontWeight='700'
                    >Responsibilities</Text>
                    <Text>
                        {jobsList[clickedJob-1].jobResponsibilitiesM}
                    </Text>

                    <Text
                    mt='20px'
                    fontWeight='700'
                    >Qualifications</Text>
                    <Text>
                        {jobsList[clickedJob-1].jobQualificationsM}
                    </Text>

                    <Text
                    mt='20px'
                    fontWeight='700'
                    >Job Segmentation</Text>
                    <Text>
                        {jobsList[clickedJob-1].jobSegmentationM}
                    </Text>
            </Box>
           

            </GridItem>

        </Grid>
        }
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent borderRadius='0'>
            <ModalHeader>Permanently Deletion Warning</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <h1>Are you sure you want to delete this job? This action cannot be undone.</h1>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose} borderRadius='0'>
                Cancel
                </Button>
                <Button variant='ghost' borderRadius='0px' colorScheme="red"
                onClick={() => {
                    deleteJob(jobsList[clickedJob-1]._id)
                    onClose()
                }}
                >Delete Job</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
         <Flex
        bottom='0'
        position='fixed'
        width='100%'
        height='80px'
        backgroundColor='tcs.main'
        color='white'
        fontSize='10px'
        align='center'
        justify='center'
        gap={3}
        >
           <Text xs='xs'>© 2024 The Coding School</Text>
           <Text xs='xs'>|</Text>
           <Text xs='xs'>Site Map</Text>
            <Text xs='xs'>|</Text>
           <Text xs='xs'>Careers</Text>
           <Link href='https://www.facebook.com/codingschoolph' target='_blank'>
           <FacebookFilled
           style={{fontSize:'35px', marginLeft: '20px'}}
           />
           </Link>

           <Link href='https://www.linkedin.com/company/thecodingschool/' target='_blank'>
            <LinkedinFilled
            style={{fontSize:'35px', marginLeft: '20px'}}
            />
            </Link>
        </Flex>
        </>
    )
}

export default PublicJobPortal;