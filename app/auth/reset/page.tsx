import { Suspense } from "react";

import { ResetForm } from "@/components/auth/form/reset-form";

function ResetPage() {
  return (
    <Suspense>
      <ResetForm />
    </Suspense>
  );
}
export default ResetPage;
