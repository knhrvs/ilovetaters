import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={5} square={false} {...props} />
))(({ theme }) => ({
  backgroundColor: "#22201A",
  color: "white",
  border: "",

  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "white" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(255,255,255, 0.9)",
}));

export function SeeMeSnackshopFaqs() {
  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary aria-controls="panel0d-content" id="panel0d-header">
          <Typography>What is Snackshop?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Snackshop is the E-Commerce portal of Taters. It allows customers to
          order snacks directly from taters with better promos than other food
          delivery services or online marketplace
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            What do I need to apply for a Snackshop Store?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You just need to sign this form and we will immediately setup your
            account. Account setup can take between 3 to 5 working days upon
            receipt
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Do we get training for Snackshop?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            There will be a screen recorded training that will allow your team
            to understand how to use Snackshop as a customer and as a store
            merchant.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Do we get support for any issues?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes the MIS team will be providing support for any issues related to
            Snackshop
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>
            As a franchisee, how do we get paid for purchases?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The payment options available are COD and E-WALLETS such as GCASH or
            BANK. You will use your own E-WALLETS or BANK ACCOUNTS so the
            payment directly goes to you.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>What about logistics/delivery to customer?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Logistics/delivery will be handled by your store. Delivery Fee is
            calculated by the system so it may not always match the delivery fee
            charged by your logistics provider.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true}>
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>What about Refunds and/or Return?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This will follow the standard operating procedure provided by the
            operations team. You may reach out to our operations team head for
            more information
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
