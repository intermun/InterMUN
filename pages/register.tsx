import Form from "../components/form";
import { NextPage } from "next";

export type StepField = {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
  regex?: RegExp;
  errorText?: string;
};

export type Step = {
  name: string;
  fields: StepField[];
};

const _steps: Step[] = [
  {
    name: "Personal information",
    fields: [
      {
        id: "fullName",
        placeholder: "Full name",
        type: "normal",
        required: true,
        name: "What is your full name?",
        regex: /[^\d]+/,
        errorText: "Name should only contain letters"
      },
      {
        id: "highSchool",
        name: "What is your high school?",
        type: "normal",
        placeholder: "High school",
        required: true
      },
      {
        id: "email",
        name: "What is your email?",
        type: "normal",
        placeholder: "Email",
        required: true
      }
    ]
  },
  {
    name: "Committee",
    fields: [
      {
        id: "committee",
        name: "Select committee",
        type: "select",
        placeholder: "Committee",
        required: false
      }
    ]
  },
  {
    name: "Country",
    fields: [
      {
        id: "country",
        name: "Select country",
        type: "select",
        placeholder: "Country",
        required: false
      }
    ]
  },
  {
    name: "Review your data",
    fields: [
      {
        id: "",
        name: "Review your data",
        type: "review",
        required: true,
        placeholder: ""
      }
    ]
  }
];

const Register: NextPage<{ data: any }> = props => {
  return (
    <>
      <div id="test">{JSON.stringify(props.data)}</div>
      <Form steps={_steps} />
      <style jsx>{`
        #test {
          color: white;
        }
      `}</style>
    </>
  );
};

export default Register;
