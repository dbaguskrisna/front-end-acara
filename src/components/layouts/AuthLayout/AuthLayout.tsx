import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

type PropTypes = {
  title?: string;
  children: React.ReactNode;
};

const AuthLayout = (props: PropTypes) => {
  const { title, children } = props;

  return (
    <div className="flex min-h-screen win-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0">
      <PageHead title={title} />
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;