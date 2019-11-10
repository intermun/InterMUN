import Form from "../components/form";

const _steps = [
  {
    name: "Personal information",
    fields: [
      {
        name: "Full name",
        type: "normal"
      },
      {
        name: "High School",
        type: "normal"
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
