import PrimaryButton from "@/Components/PrimaryButton";
import { Exam } from "@/types";
import { router } from "@inertiajs/react";
import moment from "moment";

const ExamIntro = ({
    exam,
    already_attempted,
    attempt_completed,
}: {
    exam: Exam;
    already_attempted: boolean;
    attempt_completed: boolean;
}) => {
    if (attempt_completed) {
        return (
            <div className="container mx-auto p-4">
                <p>You have completed this exam</p>
            </div>
        );
    }

    function requestFullscreen() {
        const element = document.documentElement; // Fullscreen for the entire page
        if (document.fullscreenElement) {
            console.log("Full screen already");
            return;
        }

        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl">{exam.title}</h1>
            <p
                className="prose"
                dangerouslySetInnerHTML={{
                    __html: exam.instructions,
                }}
            ></p>
            <p>
                {exam.starts_at} - {moment(exam.ends_at).fromNow()}
            </p>
            {moment(exam.starts_at).isSameOrBefore() &&
            moment(exam.ends_at).isSameOrAfter()
                ? "YEs"
                : "No"}
            <div className="mt-10">
                <PrimaryButton
                    onClick={() => {
                        requestFullscreen();
                        router.post(
                            route("candidate.exam.attempt", exam.id),
                            {},
                            {
                                preserveScroll: true,
                                onStart: () => {
                                    console.log("Starting your attempt");
                                },
                                onFinish: () => {
                                    console.log("Your attempt started");
                                },
                            }
                        );
                    }}
                    disabled={
                        !(
                            moment(exam.starts_at).isSameOrBefore() &&
                            moment(exam.ends_at).isSameOrAfter()
                        )
                    }
                >
                    {already_attempted ? "Continue" : "Start Attempt"}
                </PrimaryButton>
            </div>
        </div>
    );
};

export default ExamIntro;
