import * as React from "react";
import {
  Html,
  Button,
  Head,
  Font,
  Text,
  Section,
  Heading,
  Row,
  Hr,
} from "@react-email/components";

interface emailProps {
  userName: string;
  url: string;
}

export default function Email({ userName, url }: emailProps) {
  return (
    <Html lang="en">
      <Head>
        <title>Forgot pssword</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="monospace"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Section style={{borderWidth:"2px", borderStyle:"solid", padding:"10px", borderRadius:"10px", borderColor:"#000", width:"300px"}}>
        <Row>
          <Heading>Hello {userName},</Heading>
        </Row>
        <Row>
          <Text>If you want to reset your password </Text>
          <Text>please click the button for reset password.</Text>
        </Row>
        <Row style={{display:"flex", width:"100%", justifyContent:"center", alignItems:"center"}}>
          <Button style={{ color: "#61dafb", padding: "10px 20px",backgroundColor:"#000" }} href={url}>
            Click me
          </Button>
          <Text>Link will not work after 5 min!</Text>
        </Row>
        <Hr />
        <Row>
          <Text>
            If you did not request this code, please ignore this email
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
