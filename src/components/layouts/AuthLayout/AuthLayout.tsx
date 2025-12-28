import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

type PropTypes = {
  title?: string;
  children: React.ReactNode;
};

const AuthLayout = (props: PropTypes) => {
  const { title, children } = props;

  return (
    <>
      <PageHead title={title}/>
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </>
  );
};

export default AuthLayout;