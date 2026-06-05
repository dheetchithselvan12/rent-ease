import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { CiCircleCheck, CiLocationOn, CiDeliveryTruck } from "react-icons/ci";
import { PiPackageLight } from "react-icons/pi";
import { styled } from "@mui/material/styles";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const CustomConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },

  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#3B82F6",
    },
  },

  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#3B82F6",
    },
  },

  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    borderRadius: 999,
    backgroundColor: "#d1d5df",
  },
}));

const steps = [
  {
    label: "Order Placed",
    icon: <CiCircleCheck size={35} className="  rounded-full p-1" />,
  },
  {
    label: "Shipped",
    icon: <CiDeliveryTruck size={35} className="  rounded-full p-1" />,
  },
  {
    label: "Out for Delivery",
    icon: <CiLocationOn size={35} className=" rounded-full p-1" />,
  },
  {
    label: "Delivered",
    icon: <PiPackageLight size={35} className="  rounded-full p-1" />,
  },
];

const statusMap = {
  "Order Placed": 0,
  Shipped: 1,
  "Out For Delivery": 2,
  Delivered: 3,
};

const OrderTrackingStepper = ({ orderStatus }) => {
  const activeStep = statusMap[orderStatus] ?? 0;

  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<CustomConnector />}
    >
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel
            icon={
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${
                    index <= activeStep
                      ? "bg-blue-500 text-white "
                      : "bg-gray-200 text-gray-500"
                  }
                `}
              >
                {step.icon}
              </div>
            }
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default OrderTrackingStepper;
