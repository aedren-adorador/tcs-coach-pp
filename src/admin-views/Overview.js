import { Box, HStack, Stack, Card, Badge, CardBody } from "@chakra-ui/react";
import React from "react";


function Overview() {
    const boxesOverview = ['Review Application', 'Interview Feedback', 'Teaching Demo Feedback', 'Pre-employment Requirements']
    return(
        <>
            <HStack maxW='100%' display='flex' justify='space-between' margin='20px 10% 20px 10%'>
                {
                    boxesOverview.map(box => {
                        return(
                        <>
                        <Card minW ='240px' maxW='240px' minH='100px'>
                            <Badge width='50px' height='100px'>HELLo</Badge>
                            <CardBody>
                                {box}
                            </CardBody>
                        </Card>
                        </>
                        )
                    })
                }
            </HStack>
        </>
    )
}


export default Overview;