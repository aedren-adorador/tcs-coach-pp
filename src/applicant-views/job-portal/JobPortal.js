import React, { useCallback, useEffect, useState } from "react";
import { Text, InputGroup, Input, Modal, ModalOverlay, FormControl, ModalContent, ModalBody, ModalCloseButton, ModalHeader, FormLabel, ModalFooter, Flex, Button, Select, Grid, GridItem, Box, Image} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { AppstoreOutlined, ClockCircleOutlined, DeleteOutlined, FileOutlined, HomeOutlined } from "@ant-design/icons";
import tcsDarkLogo  from '../../tcs-dark-logo.png'
import CreateJobButton from "./admin/CreateJobButton";
import axios from "axios";
import EditDetailsButton from "./admin/EditDetailsButton";
function JobPortal({isAdmin}) {

    const jobFilters = [
        'Categories', 'Posting Dates', 'Job Types', 'More'
    ]

    const [jobsList, setJobsList] = useState([]);

    const [clickedJob, setClickedJob] = useState(null);

    const clickJob = (index) => {
        setClickedJob(index)
    }

    const fetchJobsList = async () => {
        const response = await axios.get('http://localhost:3001/api/fetch-jobs-list')
        console.log(response.data.jobs)
        setJobsList(response.data.jobs)
    }

    const deleteJob = (jobID) => {
        axios.delete(`http://localhost:3001/api/delete-job/${jobID}`)
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

    useEffect(() => {
        fetchJobsList()
    }, [])

    useEffect(() => {
        console.log(jobsList)
    }, [jobsList])

    useEffect(() => {
    }, [clickedJob])

    return(
        <>
        <Box
        width='100%'
        backgroundColor={isAdmin ? 'white' : '#f2f2f2'}
        >
        <InputGroup
        maxW='750px'
        margin='10px 0px 0px 20px'
        >  
            <Input
            type='tel'
            border='solid 0.2px black'
            placeholder='Search Job title, Skill, Keyword'
            borderRadius='0px'
            borderLeftRadius='5px'
            height='50px'
            onKeyDown={handleSearch}
            />
           
                <Button
                backgroundColor='#0C3C55'
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
            <Select
            bg='white'
            key={index}
           fontSize='12px'
           fontWeight='1000'
           placeholder={filterSetting}  
           size='sm'
           border='solid 0.2px black'
           >
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select>
            ))}
        </Flex>
        </Box>

        {!clickedJob ?
        <Grid
        margin='20px 10% 0px 10%'
        templateColumns='repeat(3, 1fr)'
        gap={10}
        >
            <GridItem
            border={isAdmin ? 'solid 0.2px' : ''}
            colSpan={2}
            bg='white'
            minW='500px'
            overflowY='scroll'
            maxHeight={`calc(100vh - 200px)`} 
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
                        fontWeight='1000'
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
            border={isAdmin ? 'solid 0.2px' : ''}
            minW='300px'
            height='250px'
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor massa quis urna vestibulum cursus. Donec placerat nisi at nulla accumsan finibus non sed metus.
            </Text>

            </GridItem>

        </Grid> :
        
        <Grid
        margin='20px 10% 0px 10%'
        templateColumns='repeat(2, 1fr)'
        gap={10}
        >
            <GridItem
            border={isAdmin ? 'solid 0.2px' : ''}
            bg='white'
            minW='500px'
            overflowY='scroll'
            maxHeight={`calc(100vh - 200px)`}
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
                        fontWeight='1000'
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
                    fontWeight='1000'
                    >{jobsList[clickedJob-1].jobTitleM}</Text>
                    
                    {isAdmin ?
                    <Button
                    zIndex='0'
                    size='xs'
                    fontWeight='1000'
                    width='100px'
                    variant='ghost'
                    colorScheme='red'
                    color='red'
                    onClick={() => deleteJob(jobsList[clickedJob-1]._id)}
                    >
                        <DeleteOutlined/>
                        &nbsp;Delete Job
                    </Button>:
                    ''}
                </Flex>
               
               
                    {isAdmin ?
                    <EditDetailsButton
                    id={jobsList[clickedJob-1]._id}
                    fetchJobsList={fetchJobsList}
                    />:
                     <Button
                    zIndex='0'
                    mt='10px'
                    size='sm'
                    borderRadius='0px'
                    fontWeight='1000'
                    width='100px'
                    boxShadow='5px 5px 5px lightgray'
                    >
                    Apply
                    </Button>
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
                    fontWeight='1000'
                    >Job Location</Text>
                    <Text>{jobsList[clickedJob-1].jobLocationM}</Text>

                    <Text
                    mt='20px'
                    fontWeight='1000'
                    >Job Description</Text>
                    <Text>
                        {jobsList[clickedJob-1].jobDescriptionM}
                    </Text>

                    <Text
                    mt='20px'
                    fontWeight='1000'
                    >Responsibilities</Text>
                    <Text>
                        {jobsList[clickedJob-1].jobResponsibilitiesM}
                    </Text>

                    <Text
                    mt='20px'
                    fontWeight='1000'
                    >Qualifications</Text>
                    <Text>
                        {jobsList[clickedJob-1].jobQualificationsM}
                    </Text>

                    <Text
                    mt='20px'
                    fontWeight='1000'
                    >Job Segmentation</Text>
                    <Text>
                        {jobsList[clickedJob-1].jobSegmentationM}
                    </Text>
            </Box>

            </GridItem>

        </Grid>
        }
        </>
    )
}

export default JobPortal;