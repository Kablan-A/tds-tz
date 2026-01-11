import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";

export function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    const isSameOrigin = document.referrer.startsWith(window.location.origin);
    if (isSameOrigin) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Button variant="outline" onClick={handleBack} className="mb-5">
      <ArrowLeft className="size-5" /> Back
    </Button>
  );
}
