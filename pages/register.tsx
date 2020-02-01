import Form from "../components/form";
import { NextPage } from "next";
import { DialogTypes } from "../components/dialog";

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
        required: true,
        // fml
        regex: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        errorText: "Wrong email format"
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

const Register: NextPage<{
  data: any;
  dialogRef: React.MutableRefObject<DialogTypes | null>;
  configDialog(content: JSX.Element): void;
}> = props => {
  return (
    <>
      <div id="test">{JSON.stringify(props.data)}</div>
      <Form
        steps={_steps}
        dialogRef={props.dialogRef}
        configDialog={props.configDialog}
      />
      <style jsx>{`
        #test {
          color: white;
        }
      `}</style>
    </>
  );
};

export default Register;
