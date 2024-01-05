import React from "react";
import { Text, InputGroup, Input, InputRightAddon, Flex, Button, Select, Grid, GridItem, Box, Image} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { AppstoreOutlined, ClockCircleOutlined } from "@ant-design/icons";
import tcsDarkLogo  from '../../tcs-dark-logo.png'
function JobPortal() {
    const jobFilters = [
        'Categories', 'Posting Dates', 'Job Types', 'More'
    ]

    const sampleJobs = [
        'Data Analytics Coach', 'Web Development Coach', 'Learning Intern', 'Roblox Coach', 'Basic Python Coach'
    ]


    return(
        <>
        <InputGroup
        maxW='650px'
        margin='10px 0px 0px 20px'
        >
            
            <Input
            type='tel'
            border='solid 0.2px black'
            placeholder='Search Job title, Skill, Keyword'
            borderRadius='0px'
            borderLeftRadius='5px'
            height='50px'
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
        </InputGroup>
        <Flex
        mt='20px'
        ml='20px'
        maxW='650px'
        gap={5}
        >
            {jobFilters.map((filterSetting, index) => (
            <Select
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
        <Grid
        margin='20px 10% 0px 10%'
        templateColumns='repeat(3, 1fr)'
        gap={10}
        >
            <GridItem
            colSpan={2}
            bg='white'
            minW='500px'
            >

                {sampleJobs.map(job => (
                    <Box

                    padding='20px'
                    borderBottom='solid 0.2px lightgray'
                    _hover={{backgroundColor:'#E5ECF9', border: 'solid #0C3C55'}}
                    >
                        <Text
                        textDecoration='underline'
                        fontWeight='1000'
                        >{job}</Text>
                        <Text
                        margin='5px 0px 5px 0px'
                        fontSize='12px'
                        >
                            <AppstoreOutlined/>
                            &nbsp;
                            Job ID: TCS101010101010
                        </Text>
                        <Text
                        fontSize='12px'
                        >
                            <ClockCircleOutlined/>
                            &nbsp;
                            Posted Today
                        </Text>
                    </Box>
                ))}
                
            </GridItem>

            <GridItem
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
            fontSize='12px'
            mt='20px'
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor massa quis urna vestibulum cursus. Donec placerat nisi at nulla accumsan finibus non sed metus.
            </Text>

            </GridItem>

        </Grid>


        </>
    )
}

export default JobPortal;