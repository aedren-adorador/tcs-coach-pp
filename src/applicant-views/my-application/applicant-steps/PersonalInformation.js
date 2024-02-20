import { Input, Text} from "@chakra-ui/react";

function PersonalInformation({applicantData, getFieldProps}) {
    return(
        <>
        <Text color='gray'>First Name</Text>
        <Text mb='4'>{applicantData.firstNameM}</Text>

        <Text color='gray'>Last Name</Text>
        <Text mb='4'>{applicantData.lastNameM}</Text>

        <Text color='gray'>Email Address</Text>
        <Text mb='4'>{applicantData.emailM}</Text>

        <Text color='gray'>Birthday (YYYY-MM-DD)</Text>
         <Input
        {...getFieldProps('birthday')}
        size='sm'
        border='solid 0.2px black'
        width='300px'
        mb='4'
        ></Input>
        
        <Text color='gray'>Contact Number (09xxxxxxxxx)</Text>
        <Input
         {...getFieldProps('contactNumber')}
        size='sm'
        border='solid 0.2px black'
        width='300px'
        ></Input>
        </>
    )
}


export default PersonalInformation;