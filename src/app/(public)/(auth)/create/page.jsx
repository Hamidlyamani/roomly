import dynamic from "next/dynamic";

const CreateAccountForm = dynamic(
  () => import("@/src/app/components/createAccountForm"),
  { ssr: false }
);

export default function Page() {

  return <CreateAccountForm/>;
}


