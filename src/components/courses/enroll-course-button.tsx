"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api-error";
import { enrollmentApi, getStoredToken } from "@/lib/api/skillsync";

type EnrollCourseButtonProps = {
  courseId: string;
};

export function EnrollCourseButton({ courseId }: EnrollCourseButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEnroll = async () => {
    const token = getStoredToken();

    if (!token) {
      router.push("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      await enrollmentApi.enroll(courseId);
      toast.success("Enrolled successfully");
      router.push("/my-enrollments");
      router.refresh();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button disabled={isSubmitting} onClick={handleEnroll} size="lg" type="button">
      {isSubmitting ? "Enrolling..." : "Enroll now"}
    </Button>
  );
}
