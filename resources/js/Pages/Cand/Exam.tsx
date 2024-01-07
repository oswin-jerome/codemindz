import PrimaryButton from "@/Components/PrimaryButton";
import {
    Attempt,
    Exam as E,
    PageProps,
    Question,
    QuestionAttempt,
} from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import moment, { duration } from "moment";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type ExamProps = {
    questions: QuestionAttempt[];
    exam: E;
    attempt: Attempt;
};

const Exam = ({ questions, exam, attempt }: ExamProps) => {
    const page = usePage<PageProps>().props;
    const [selectedQuestion, setSelectedQuestion] = useState(0);
    const [malpracticeCount, setMalPracticeCount] = useState(0);
    const [time, setTime] = useState("");

    const handleAnswerUpdate = (value: string, questionId: number) => {
        router.put(
            route("candidate.exam.attempt_question", [
                exam.id,
                attempt.id,
                questionId,
            ]),
            { answer: value },
            {
                onSuccess: () => {
                    console.log("Success");
                },
            }
        );
    };
    var intervalId: NodeJS.Timeout;
    useEffect(() => {
        // window.
        document.addEventListener("visibilitychange", h);

        intervalId = setInterval(updateTime, 1000);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener("visibilitychange", h);
        };
    }, []);

    function h() {
        if (document.hidden) {
            // User switched to another tab or minimized the window

            setMalPracticeCount((pre) => {
                console.log(pre, pre >= 3);
                if (pre >= 3) {
                    alert("You are blocked");
                    handleAttemptSubmit();
                }
                toast.error(
                    "Leaving the tab more than 3 times you will be blocked, you have  " +
                        (3 - (pre + 1)) +
                        " left",
                    {
                        position: "bottom-right",
                        className: "bg-red-400 scale-150",
                    }
                );
                return pre + 1;
            });
            // You can perform additional actions here
        } else {
            // User came back to the tab
        }
    }

    const updateTime = () => {
        var end = moment(exam.ends_at);
        var current = end.diff(moment(), "milliseconds");
        var current_seconds = end.diff(moment(), "seconds");

        if (current_seconds < 1) {
            clearInterval(intervalId);
            handleAttemptSubmit();
        }

        var dur = moment.duration(current);
        const minutes = Math.floor(dur.asMinutes());
        const seconds = Math.floor(dur.seconds());

        setTime(`${minutes}: ${seconds}`);
    };

    const handleAttemptSubmit = () => {
        router.put(route("candidate.attempt.submit", [exam.id, attempt.id]));
    };

    return (
        <div className="">
            <Toaster
                toastOptions={{
                    className: "",
                    style: {
                        border: "1px solid #D80000",
                        padding: "16px",
                        background: "#D80000",
                        color: "#fff",
                        marginBottom: "50vh",
                        marginRight: "50vw",
                    },
                }}
            />
            <nav className="bg-white shadow-lg p-4 flex justify-between">
                <p>Warning: {malpracticeCount}/3</p>
                {time}
                <div className="flex gap-3">
                    <Link href={route("logout")} as="button" method="post">
                        Logout
                    </Link>
                    <p className="text-sm">
                        <span className="block">{page.auth.user.name}</span>
                        <span>{page.auth.user.email}</span>
                    </p>
                </div>
            </nav>
            <main className="mx-auto p-4 min-h-[93vh] flex">
                <aside className="bg-slate-200 min-w-[350px] p-4">
                    <ul className="grid grid-cols-5 gap-2">
                        {questions.map((ques, o) => {
                            return (
                                <li
                                    onClick={() => setSelectedQuestion(o)}
                                    key={o}
                                    className={
                                        " aspect-square flex justify-center items-center cursor-pointer " +
                                        (ques.answer == null
                                            ? "bg-red-400 "
                                            : "bg-green-400 ") +
                                        (selectedQuestion == o &&
                                            "border-4 border-blue-500")
                                    }
                                >
                                    {o + 1}
                                </li>
                            );
                        })}
                    </ul>
                </aside>
                <section className="flex-1 p-4">
                    <p>{questions[selectedQuestion].question.question}</p>
                    <div className="mt-4">
                        {questions[selectedQuestion].question?.options.map(
                            (option, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="flex gap-2 items-center"
                                    >
                                        <input
                                            onChange={(e) => {
                                                handleAnswerUpdate(
                                                    e.target.value,
                                                    questions[selectedQuestion]
                                                        .id
                                                );
                                            }}
                                            checked={
                                                option ==
                                                questions[selectedQuestion]
                                                    .answer
                                            }
                                            value={option}
                                            name={
                                                "ques_" + selectedQuestion + ""
                                            }
                                            type="radio"
                                        />
                                        <p>{option}</p>
                                    </div>
                                );
                            }
                        )}
                    </div>

                    <div className="mt-12 flex justify-between">
                        <PrimaryButton
                            onClick={(e) => {
                                setSelectedQuestion((prev) => prev - 1);
                            }}
                            disabled={selectedQuestion == 0}
                        >
                            Back
                        </PrimaryButton>
                        {!(selectedQuestion >= questions.length - 1) && (
                            <PrimaryButton
                                disabled={
                                    selectedQuestion >= questions.length - 1
                                }
                                onClick={(e) => {
                                    setSelectedQuestion((prev) => prev + 1);
                                }}
                            >
                                Next
                            </PrimaryButton>
                        )}
                        {selectedQuestion >= questions.length - 1 && (
                            <PrimaryButton onClick={handleAttemptSubmit}>
                                Submit
                            </PrimaryButton>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Exam;
