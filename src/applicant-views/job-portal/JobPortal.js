import React, { useCallback, useEffect, useState } from "react";
import { Text, InputGroup, Input, Flex, Button, Select, Grid, GridItem, Box, Image, Skeleton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Badge} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { AppstoreOutlined, ClockCircleOutlined, DeleteOutlined, FileOutlined, HomeOutlined } from "@ant-design/icons";
import tcsDarkLogo  from '../../tcs-dark-logo.png'
import CreateJobButton from "./admin/CreateJobButton";
import axios from "axios";
import EditDetailsButton from "./admin/EditDetailsButton";
import { Link } from "react-router-dom";

function JobPortal({isAdmin, applicantData}) {
    const jobFilters = ['Categories', 'Posting Dates', 'Work Setup'];
    const [jobsList, setJobsList] = useState([]);
    const [clickedJob, setClickedJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [filters, setFilters] = useState({category: '', postingDate: '', workSetup: ''});
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

    const fetchJobsList = useCallback(() => {
        if (!isAdmin && applicantData._id) {
            axios.get(`${process.env.REACT_APP_SYS_URL}/api/general-request/fetch-jobs-list-applicant/${applicantData._id}`)
                .then(response => {
                    setJobsList(response.data.jobs);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching jobs list:", error);
                    setIsLoading(false);
                });
        } else {
            axios.get(`${process.env.REACT_APP_SYS_URL}/api/general-request/fetch-jobs-list-admin`)
                .then(response => {
                    setJobsList(response.data.jobs);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching jobs list:", error);
                    setIsLoading(false);
                });
        }
    }, [isAdmin, applicantData?._id]);

    const delist = (id) => {
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/general-request/delist-job`, {jobID: id})
            .then(response => window.location.reload())
    }

    const enlist = (id) => {
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/general-request/enlist-job`, {jobID: id})
            .then(response => window.location.reload())
    }
    
    const handleFilters = (filter, type) => {
        setFilters(prev => ({ ...prev, [type]: filter }))
    }
    useEffect(() => {
        setClickedJob(null)
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/admin/job-portal-action/set-filters/${encodeURIComponent(JSON.stringify(filters))}`)
            .then(response => setJobsList(response.data))
    }, [filters])
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
        <Box
        width='100%'
        backgroundColor={isAdmin ? 'white' : '#f2f2f2'}
        >
        <InputGroup
        maxW='650px'
        margin='10px 0px 0px 20px'
        >  
            <Input
            zIndex='0'
            border='solid 0.2px black'
            placeholder='Search Job title, Skill, Keyword'
            borderRadius='0px'
            borderLeftRadius='5px'
            height='50px'
            onKeyUp={handleSearch}
            />
           
                <Button
                backgroundColor='tcs.main'
                height='50px'
                width='120px'
                borderLeftRadius='0px'
                _hover={{backgroundColor:''}}
                >
                    <Search2Icon
                    color='white'
                    fontSize='25px'
                    />
                </Button>

            {isAdmin ?
            <CreateJobButton fetchJobsList={fetchJobsList}/>:
            ''}
        </InputGroup>
         
        <Flex
        mt='20px'
        ml='20px'
        mb='10px'
        maxW='650px'
        gap={5}
        >
            {jobFilters.map((filterSetting, index) => (
                filterSetting === 'Categories' ? (
                    <Select
                        bg='white'
                        key={index}
                        fontSize='12px'
                        fontWeight='600'
                        size='sm'
                        border='solid 0.2px black'
                        onChange={(e) => handleFilters(e.target.value, 'category')}
                    >
                        <option disabled selected>Categories</option>
                        <option value='All'>All Categories</option>
                        <option value='Web Development'>Web Development</option>
                        <option value='Mobile Development'>Mobile Development</option>
                        <option value='SEO Marketing'>SEO Marketing</option>
                        <option value='Data Structures and Algorithms'>Data Structures and Algorithms</option>
                        <option value='Artificial Intelligence'>Artificial Intelligence</option>
                        <option value='Data Analytics'>Data Analytics</option>
                    </Select>
                ) : filterSetting === 'Posting Dates' ? (
                    <Select
                        bg='white'
                        key={index}
                        fontSize='12px'
                        fontWeight='600'
                        placeholder={filterSetting}  
                        size='sm'
                        border='solid 0.2px black'
                        onChange={(e) => handleFilters(e.target.value, 'postingDate')}
                    >
                        <option value='All'>All Posting Dates</option>      
                        <option value='1week'>Last 1 week</option>
                        <option value='3'>Last 3 months</option>
                        <option value='6'>Last 6 months</option>
                        <option value='12'>Last 12 months</option>
                    </Select>
                ) : filterSetting === 'Work Setup' ? (
                    <Select
                        bg='white'
                        key={index} 
                        fontSize='12px'
                        fontWeight='600'
                        size='sm'
                        border='solid 0.2px black'
                        onChange={(e) => handleFilters(e.target.value, 'workSetup')}
                    >
                        <option disabled selected>Work Setup</option>
                        <option value='All'>All Setups</option>
                        <option value='Onsite'>Onsite</option>
                        <option value='Online'>Online/Remote</option>
                        <option value='Hybrid'>Hybrid</option>
                    </Select>
                ) : null
            ))}
        </Flex>
        </Box>

        {!clickedJob ?
        <Grid
        
        margin='20px 10% 0px 10%'
        templateColumns='repeat(3, 1fr)'
        gap={10}
        >
            <Skeleton isLoaded={!isLoading} key='skeleton1'>
            <GridItem
            key='gridItemClicked1'
            border={isAdmin ? 'solid 0.2px' : ''}
            colSpan={2}
            bg='white'
            minW='500px'
            overflowY='scroll'
            maxHeight={`calc(100vh - 200px)`} 
            >
                {jobsList.length === 0 && <Text padding='5'>No Jobs Found</Text>}
                {jobsList.map((job, index) => {
                    return <>
                    <Box
                    key={index}
                    padding='20px'
                    borderBottom='solid 0.2px lightgray'
                    onClick={() => clickJob(index+1)}
                    >   
                        <Text
                        textDecoration='underline'
                        fontWeight='600'
                        >{job.jobTitleM}
                         {isAdmin && job.jobEnlistedM.toString() === 'true' && <Badge ml='5px' colorScheme='green'>Enlisted</Badge>}
                        {isAdmin && job.jobEnlistedM.toString() === 'false' && <Badge ml='5px' colorScheme='red'>Delisted</Badge>}
                        </Text>
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
                        </>
                    }
                    
                        
                )}
                
            </GridItem>
            </Skeleton>

            <GridItem
            
            key='gridItemClicked2'
            border={isAdmin ? 'solid 0.2px' : ''}
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
        margin='20px 10% 0px 10%'
        templateColumns='repeat(2, 1fr)'
        gap={10}
        >
            
            <GridItem
            key='gridItemUnclicked1'
            border={isAdmin ? 'solid 0.2px' : ''}
            bg='white'
            minW='500px'
            overflowY='scroll'
            maxHeight={`calc(100vh - 200px)`}
            >
                
                {jobsList && jobsList.map((job, index) => (
                    
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
                        >{job.jobTitleM}
                        {isAdmin && job.jobEnlistedM.toString() === 'true' && <Badge ml='5px' colorScheme='green'>Enlisted</Badge>}
                        {isAdmin && job.jobEnlistedM.toString() === 'false' && <Badge ml='5px' colorScheme='red'>Delisted</Badge>}
                        </Text>
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
            key='gridItemUnclicked2'
            border={isAdmin ? 'solid 0.2px' : ''}
            minW='500px'
            bg='white'
            overflowY='scroll'
            maxHeight={`calc(100vh - 200px)`}
            >
            <Box
            margin='20px 0px 20px 0px'
            padding='0px 20px 40px 20px'
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
                    
                    {isAdmin ?
                    <Button
                    zIndex='0'
                    size='xs'
                    fontWeight='400'
                    width='100px'
                    variant='ghost'
                    colorScheme='red'
                    color='red'
                    onClick={onOpen}
                    >
                        <DeleteOutlined/>
                        &nbsp;Delete Job
                    </Button>:
                    ''}
                </Flex>
               
                    {isAdmin ?
                    <>
                    <EditDetailsButton
                    id={jobsList[clickedJob-1]._id}
                    fetchJobsList={fetchJobsList}
                    />
                    <Button display={jobsList[clickedJob-1].jobEnlistedM.toString() === 'false' ? '' : 'none'} mt='10px' size='sm' borderRadius='2px' colorScheme='green' ml='2'
                    onClick={() => enlist(jobsList[clickedJob-1]._id)} boxShadow='5px 5px 5px lightgreen'
                    >Enlist</Button>

                    <Button display={jobsList[clickedJob-1].jobEnlistedM.toString() === 'true' ? '' : 'none'} mt='10px' size='sm' borderRadius='2px' colorScheme='red' ml='2'
                    onClick={() => delist(jobsList[clickedJob-1]._id)} boxShadow='5px 5px 5px pink'
                    >Delist</Button>
                    </>
                    :
                    <Link
                     to={{ pathname: `/application-progress/${applicantData._id}/${jobsList[clickedJob-1].jobTitleM}/personal-info`}}
                     state={{applicantData: applicantData, jobData: jobsList[clickedJob-1]}}
                    >
                        <Button
                        zIndex='0'
                        mt='10px'
                        size='sm'
                        borderRadius='0px'
                        fontWeight='600'
                        width='100px'
                        boxShadow='5px 5px 5px lightgray'
                        >
                        Apply
                        </Button>
                    </Link>
                    }
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
        </>
    )
}

export default JobPortal;