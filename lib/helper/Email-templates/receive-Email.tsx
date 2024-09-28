import * as React from "react";
import {
  Html,
  Head,
  Font,
  Text,
  Section,
  Heading,
  Hr,
  Container,
} from "@react-email/components";

interface emailProps {
  userName: string;
  message: string;
  date: Date;
}

export default function receiveMessageEmail({ userName, message, date }: emailProps) {
  return (
    <Html lang="en">
      <Head>
        <title>New Message Received</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="monospace"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      {/* Main container */}
      <Container style={styles.container}>
        
        {/* Header Bar */}
        <Section style={styles.headerBar}></Section>

        {/* Main Content */}
        <Section style={styles.card}>
          <Heading style={styles.heading}>Hello sir,</Heading>
          <Text style={styles.text}>
            You reseved a new masseage.
          </Text>
          <Text style={styles.text}>
           Sender name: {userName}
          </Text>
          <Section style={styles.messageSection}>
            <Text style={styles.messageLabel}>Message:</Text>
            <Text style={styles.messageContent}>{message}</Text>
          </Section>

          <Hr style={styles.divider} />

          <Text style={styles.footerText}>
            Sent on: {date.toDateString()} at {date.toLocaleTimeString()} <br />
           please response back to the person who message you.
          </Text>
        </Section>

        {/* Footer Bar */}
        <Section style={styles.footerBar}></Section>
      </Container>
    </Html>
  );
}

// Correct type-safe styles for the email template
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    backgroundColor: "#f9fafb",
    fontFamily: "Roboto, monospace",
  },
  headerBar: {
    backgroundColor: "#0070f3", // Blue header bar
    height: "50px",
    borderRadius: "8px 8px 0 0",
  },
  card: {
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#fff",
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
    position: "relative",
    zIndex: 1,
  },
  heading: {
    fontSize: "22px",
    color: "#333",
    marginBottom: "15px",
  },
  text: {
    fontSize: "16px",
    lineHeight: 1.6,
    color: "#555",
    marginBottom: "20px",
  },
  messageSection: {
    backgroundColor: "#f1f3f5",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
  },
  messageLabel: {
    fontWeight: "bold",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#333",
  },
  messageContent: {
    fontSize: "14px",
    color: "#444",
  },
  divider: {
    borderColor: "#e0e0e0",
    margin: "20px 0",
  },
  footerText: {
    fontSize: "12px",
    color: "#888",
  },
  footerBar: {
    backgroundColor: "#0070f3", // Blue footer bar
    height: "50px",
    borderRadius: "0 0 8px 8px",
  },
};
