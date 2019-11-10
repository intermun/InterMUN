import Form from "../components/form";

const _steps = [
  {
    name: "Personal information",
    fields: [
      {
        placeholder: "Full name",
        type: "normal",
        additionalInfo: "Required",
        name: "What is your full name?"
      },
      {
        name: "What is your high school",
        type: "normal",
        placeholder: "High school",
        additionalInfo: "Required"
      },
      {
        name: "What is your email?",
        type: "normal",
        placeholder: "High school",
        additionalInfo: "Required"
      }
    ]
  },
  {
    name: "Committee",
    fields: [
      {
        name: "Select committee",
        type: "select"
      }
    ]
  },
  {
    name: "Country",
    fields: [
      {
        name: "Select country",
        type: "select"
      }
    ]
  },
  {
    name: "Review your data",
    fields: [
      {
        name: "Review your data",
        type: "review"
      }
    ]
  }
];

const Register = () => {
  return <Form steps={_steps} />;
};

export default Register;
